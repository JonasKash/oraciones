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
 * Adiciona parâmetros UTM à URL de checkout
 */
export const addUtmToCheckoutUrl = (checkoutUrl: string): string => {
  const utmParams = getSavedUtmParams();
  
  console.log('🔍 UTMs recuperados para checkout:', utmParams);
  
  if (Object.keys(utmParams).length === 0) {
    console.log('⚠️ Nenhum UTM salvo - checkout sem parâmetros');
    return checkoutUrl;
  }
  
  const separator = checkoutUrl.includes('?') ? '&' : '?';
  const utmString = Object.entries(utmParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  
  const finalUrl = `${checkoutUrl}${separator}${utmString}`;
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

