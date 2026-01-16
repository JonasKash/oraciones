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

// Busca IP e localização do usuário (com timeout de 5s)
const getIPAndLocation = async (): Promise<{
  ip?: string;
  country?: string;
  city?: string;
  region?: string;
}> => {
  // Tenta múltiplas APIs em sequência até conseguir uma resposta
  const apis = [
    {
      name: 'ipwhois.app',
      url: 'https://ipwhois.app/json/',
      parser: (data: any) => ({
        ip: data.ip,
        country: data.country,
        city: data.city,
        region: data.region
      })
    },
    {
      name: 'ipapi.co',
      url: 'https://ipapi.co/json/',
      parser: (data: any) => ({
        ip: data.ip,
        country: data.country_name,
        city: data.city,
        region: data.region
      })
    },
    {
      name: 'freeipapi.com',
      url: 'https://freeipapi.com/api/json',
      parser: (data: any) => ({
        ip: data.ipAddress,
        country: data.countryName,
        city: data.cityName,
        region: data.regionName
      })
    }
  ];

  // Tenta cada API até conseguir uma resposta válida
  for (const api of apis) {
    try {
      console.log(`🔍 Tentando API de geolocalização: ${api.name}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(api.url, {
        signal: controller.signal,
        method: 'GET'
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      const result = api.parser(data);
      
      // Verifica se os dados essenciais estão presentes
      if (result.ip && result.city && result.country) {
        console.log(`✅ GEOLOCALIZAÇÃO CAPTURADA via ${api.name}:`, result);
        console.log(`📍 País: ${result.country} | Cidade: ${result.city} | Região: ${result.region}`);
        return result;
      }
      
      throw new Error('Dados incompletos na resposta da API');
      
    } catch (error) {
      console.warn(`❌ Falha na API ${api.name}:`, error);
      // Continua para a próxima API
    }
  }
  
  // Se todas as APIs falharam, tenta apenas pegar o IP
  console.warn('⚠️ ATENÇÃO: Todas as APIs de geolocalização falharam! Tentando apenas IP...');
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch('https://api.ipify.org?format=json', {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const data = await response.json();
    
    console.log('⚠️ IP obtido sem dados de localização:', data.ip);
    return { ip: data.ip };
  } catch (fallbackError) {
    console.error('❌ ERRO CRÍTICO: Não foi possível obter nenhum dado de localização:', fallbackError);
    return {};
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

      // Tenta obter IP e localização com timeout de 2s (não bloqueia muito)
      let locationData: { ip?: string; country?: string; city?: string; region?: string } = {};
      try {
        const result = await Promise.race([
          locationPromise,
          new Promise<{}>(resolve => setTimeout(() => resolve({}), 2000))
        ]);
        locationData = result || {};
      } catch (err) {
        console.warn('⚠️ Timeout ou erro na geolocalização, continuando sem esses dados');
      }
      
      console.log('📍 DADOS DE LOCALIZAÇÃO RECEBIDOS:', locationData);
      
      if (locationData.ip) {
        payload.ip_address = locationData.ip;
        console.log('✅ IP adicionado:', locationData.ip);
      }
      if (locationData.country) {
        payload.country = locationData.country;
        console.log('✅ País adicionado:', locationData.country);
      }
      if (locationData.city) {
        payload.city = locationData.city;
        console.log('✅ Cidade adicionada:', locationData.city);
      }
      if (locationData.region) {
        payload.region = locationData.region;
        console.log('✅ Região adicionada:', locationData.region);
      }

      console.log('📦 PAYLOAD FINAL A SER ENVIADO:', JSON.stringify(payload, null, 2));
      console.log('🌐 Enviando para: https://wbn.araxa.app/webhook/receive-inf');

      // Cria um AbortController para timeout de 5s
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      // Envia para o webhook N8N
      const response = await fetch('https://wbn.araxa.app/webhook/receive-inf', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error('❌ Webhook retornou erro:', response.status, errorText);
        throw new Error(`Webhook error: ${response.status} - ${errorText}`);
      }

      const result = await response.json().catch(() => ({ success: true }));
      console.log('✅ Webhook respondido com sucesso:', result);
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


