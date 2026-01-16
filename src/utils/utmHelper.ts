/**
 * Extrai todos os parâmetros UTM da URL atual
 */
export const getUtmParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  // Lista de parâmetros para capturar
  const utmKeys = [
    'utm_source',
    'utm_medium', 
    'utm_campaign',
    'utm_content',
    'utm_term',
    'utm_id',
    'fbclid',  // Facebook Click ID
    'gclid'    // Google Click ID
  ];
  
  utmKeys.forEach(key => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });
  
  return utmParams;
};

/**
 * Adiciona parâmetros UTM e SCK à URL de checkout da Hotmart
 * SCK é o formato preferido da Hotmart para rastreamento de vendas
 */
export const addUtmToCheckoutUrl = (checkoutUrl: string): string => {
  const utmParams = getSavedUtmParams();
  
  console.log('🔍 UTMs recuperados para checkout:', utmParams);
  
  if (Object.keys(utmParams).length === 0) {
    console.log('⚠️ Nenhum UTM salvo - checkout sem parâmetros');
    return checkoutUrl;
  }
  
  // Cria o parâmetro SCK (formato Hotmart)
  // Formato: sck=source|medium|campaign|content|term
  const sckParts = [
    utmParams.utm_source || '',
    utmParams.utm_medium || '',
    utmParams.utm_campaign || '',
    utmParams.utm_content || '',
    utmParams.utm_term || ''
  ].filter(part => part !== ''); // Remove partes vazias
  
  let finalUrl = checkoutUrl;
  const separator = checkoutUrl.includes('?') ? '&' : '?';
  
  // Adiciona SCK (parâmetro principal da Hotmart)
  if (sckParts.length > 0) {
    const sckValue = sckParts.join('|');
    finalUrl = `${finalUrl}${separator}sck=${encodeURIComponent(sckValue)}`;
    console.log('✅ SCK adicionado:', sckValue);
  }
  
  // Também adiciona UTMs individuais como backup
  const utmString = Object.entries(utmParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  
  if (utmString) {
    finalUrl = `${finalUrl}&${utmString}`;
  }
  
  console.log('✅ URL final do checkout:', finalUrl);
  
  return finalUrl;
};

/**
 * Salva UTMs no sessionStorage
 */
export const saveUtmParams = (): void => {
  if (typeof window === 'undefined') return;
  
  const utmParams = getUtmParams();
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
    console.log('✅ UTMs salvos:', utmParams);
  } else {
    console.log('⚠️ Nenhum UTM encontrado na URL');
  }
};

/**
 * Recupera UTMs salvos do sessionStorage
 */
export const getSavedUtmParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  
  const saved = sessionStorage.getItem('utm_params');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  }
  
  return getUtmParams();
};

