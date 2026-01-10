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
  country?: string;                 // País
  city?: string;                    // Cidade
  region?: string;                  // Estado/Região
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

// Busca IP e localização do usuário (com timeout de 3s)
const getIPAndLocation = async (): Promise<{
  ip?: string;
  country?: string;
  city?: string;
  region?: string;
}> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    // Usa ipapi.co que retorna IP + localização completa
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    
    return {
      ip: data.ip,
      country: data.country_name,
      city: data.city,
      region: data.region
    };
  } catch (error) {
    console.warn('Could not fetch IP and location:', error);
    
    // Fallback: tenta apenas pegar o IP
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch('https://api.ipify.org?format=json', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const data = await response.json();
      
      return { ip: data.ip };
    } catch (fallbackError) {
      console.warn('Fallback IP fetch also failed:', fallbackError);
      return {};
    }
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
      // Coleta IP e localização em paralelo (não bloqueia o envio)
      const locationPromise = getIPAndLocation();

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

      // Aguarda IP e localização (máx 3s)
      const locationData = await locationPromise;
      if (locationData.ip) {
        payload.ip_address = locationData.ip;
      }
      if (locationData.country) {
        payload.country = locationData.country;
      }
      if (locationData.city) {
        payload.city = locationData.city;
      }
      if (locationData.region) {
        payload.region = locationData.region;
      }

      console.log('📍 Localização capturada:', locationData);

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


