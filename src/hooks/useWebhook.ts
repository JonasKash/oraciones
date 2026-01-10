import { useState } from 'react';

// Interface para dados do Lead
interface LeadData {
  event: string;                    // Tipo de evento: 'button_click', 'new.lead', etc
  timestamp: string;                // ISO timestamp
  source: string;                   // Origem: 'hero-section', 'quiz-form', 'offer-12', 'offer-8', etc
  page_url: string;                 // URL completa da página
  referrer: string;                 // De onde veio o usuário
  user_agent: string;               // Navegador e sistema
  language: string;                 // Idioma do navegador
  timezone: string;                 // Timezone do usuário
  screen_resolution: string;        // Resolução da tela
  viewport_size: string;            // Tamanho da janela
  device_type: string;              // mobile/desktop/tablet
  platform: string;                 // Sistema operacional
  ip_address?: string;              // IP (opcional)
  lead?: {
    email?: string;
    name?: string;
    phone?: string;
  };
  session_data?: {
    [key: string]: any;
  };
}

// Detecta tipo de dispositivo
const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/Mobile|Android|iPhone/i.test(ua)) return 'mobile';
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  return 'desktop';
};

// Busca IP do usuário (com timeout de 2s)
const getIPAddress = async (): Promise<string | undefined> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch('https://api.ipify.org?format=json', {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn('Could not fetch IP address:', error);
    return undefined;
  }
};

// Coleta dados relevantes do localStorage/sessionStorage
const getSessionData = (): Record<string, any> => {
  const sessionData: Record<string, any> = {};
  
  try {
    // Coleta UTMs salvos
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'fbclid', 'gclid'];
    utmKeys.forEach(key => {
      const value = sessionStorage.getItem(key);
      if (value) {
        sessionData[key] = value;
      }
    });

    // Adiciona outros dados relevantes que você possa ter salvado
    // Exemplo: sessionData.visit_count = localStorage.getItem('visit_count');
    
  } catch (error) {
    console.warn('Error collecting session data:', error);
  }

  return sessionData;
};

// Hook principal
export const useWebhook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função principal para enviar lead
  const sendLead = async (
    source: string, 
    eventType: string = 'button_click',
    additionalData?: Partial<LeadData>
  ): Promise<any> => {
    setIsLoading(true);
    setError(null);

    try {
      // Coleta IP em paralelo (não bloqueia o envio)
      const ipPromise = getIPAddress();

      // Monta o payload
      const payload: LeadData = {
        event: eventType,
        timestamp: new Date().toISOString(),
        source: source,
        page_url: window.location.href,
        referrer: document.referrer || 'direct',
        user_agent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        device_type: getDeviceType(),
        platform: navigator.platform,
        session_data: getSessionData(),
        ...additionalData
      };

      // Aguarda IP (máx 2s)
      const ip = await ipPromise;
      if (ip) {
        payload.ip_address = ip;
      }

      // Envia para o webhook N8N
      const response = await fetch('https://wbn.araxa.app/webhook/receive-inf', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }

      const result = await response.json();
      setIsLoading(false);
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setIsLoading(false);
      console.error('Error sending webhook:', err);
      throw err;
    }
  };

  return {
    sendLead,
    isLoading,
    error
  };
};

