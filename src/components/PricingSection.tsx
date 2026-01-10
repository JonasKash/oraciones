import { Check, Star } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { useEffect } from "react";
import { addUtmToCheckoutUrl, saveUtmParams } from "@/utils/utmHelper";
import { useWebhook } from "@/hooks/useWebhook";

const PricingSection = () => {
  const { sendLead } = useWebhook();

  useEffect(() => {
    saveUtmParams();
  }, []);

  // Handler para o botão da oferta de $8
  const handleBasicPlanClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    console.log('🛒 Clique no botão $8 USD detectado');
    
    // 1. Envia webhook para N8N com evento específico
    const webhookPromise = sendLead('offer-8', 'button_click_offer_8').catch(error => {
      console.error('Error sending lead for $8 offer:', error);
    });

    // 2. Dispara eventos do Pixel Meta
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Plan Básico $8',
        value: 8.00,
        currency: 'USD'
      });
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Plan Básico $8',
        value: 8.00,
        currency: 'USD'
      });
    }

    // 3. Aguarda webhook (máx 500ms) ou timeout
    await Promise.race([
      webhookPromise,
      new Promise(resolve => setTimeout(resolve, 500))
    ]);

    // 4. Redireciona para checkout com UTMs
    const hotmartUrl = 'https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10';
    const finalUrl = addUtmToCheckoutUrl(hotmartUrl);
    console.log('🚀 Redirecionando para:', finalUrl);
    window.location.href = finalUrl;
  };

  // Handler para o botão da oferta de $12
  const handleCompletePlanClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    console.log('🛒 Clique no botão $12 USD detectado');
    
    // 1. Envia webhook para N8N com evento específico
    const webhookPromise = sendLead('offer-12', 'button_click_offer_12').catch(error => {
      console.error('Error sending lead for $12 offer:', error);
    });

    // 2. Dispara eventos do Pixel Meta
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Plan Completo $12',
        value: 12.00,
        currency: 'USD'
      });
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Plan Completo $12',
        value: 12.00,
        currency: 'USD'
      });
    }

    // 3. Aguarda webhook (máx 500ms) ou timeout
    await Promise.race([
      webhookPromise,
      new Promise(resolve => setTimeout(resolve, 500))
    ]);

    // 4. Redireciona para checkout com UTMs
    const hotmartUrl = 'https://pay.hotmart.com/J103688261V?off=7duovx39&checkoutMode=10';
    const finalUrl = addUtmToCheckoutUrl(hotmartUrl);
    console.log('🚀 Redirecionando para:', finalUrl);
    window.location.href = finalUrl;
  };
  return (
    <section id="offer" className="py-20 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Urgency Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-urgency font-semibold mb-4">
            <span className="text-2xl">⚠️</span>
            <span>Atención: esta oferta es válida hasta las 23:59 de Hoy</span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Transforma tu vida espiritual con el poder de la oración que abre las puertas de la prosperidad.
          </p>
        </div>

        {/* Timer */}
        <div className="mb-12">
          <CountdownTimer />
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
            <h3 className="font-heading text-2xl font-semibold mb-4">Plan Básico</h3>
            
            <div className="mb-6">
              <span className="text-muted-foreground line-through">$ 10 USD</span>
              <div className="text-4xl font-bold font-heading text-foreground">$ 8 USD</div>
              <span className="text-success text-sm font-medium">💰 Ahorra $ 2 USD</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>Guía de 30 Oraciones para Prosperidad</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>Acceso Inmediato</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>Garantía de 7 días</span>
              </li>
            </ul>

            <a
              href="https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10"
              onClick={handleBasicPlanClick}
              className="block w-full bg-secondary text-secondary-foreground py-4 rounded-full font-semibold text-center hover:bg-secondary/80 transition-colors"
            >
              RECIBIR GUÍA POR $8USD
            </a>
          </div>

          {/* Complete Plan */}
          <div className="bg-card rounded-3xl p-8 shadow-elevated border-2 border-primary relative">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                <Star className="w-4 h-4 fill-current" />
                MÁS POPULAR
              </span>
            </div>

            <h3 className="font-heading text-2xl font-semibold mb-4 mt-2">Plan Completo</h3>
            
            <div className="mb-6">
              <span className="text-muted-foreground line-through">$ 14 USD</span>
              <div className="text-4xl font-bold font-heading text-foreground">$ 12 USD</div>
              <span className="text-success text-sm font-medium">💰 Ahorra $ 2 USD</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="font-semibold">Guía de 30 Oraciones para Prosperidad</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🎁</span>
                <span className="font-semibold">Oraciones Guiadas Versión Audio</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🎁</span>
                <span className="font-semibold">Modelo de Carta de Dios</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🎁</span>
                <span className="font-semibold">Versículo Diario</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>Acceso Inmediato</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>Garantía de 7 días</span>
              </li>
            </ul>

            <a
              href="https://pay.hotmart.com/J103688261V?off=7duovx39&checkoutMode=10"
              onClick={handleCompletePlanClick}
              className="block w-full bg-gradient-cta text-foreground py-4 rounded-full font-semibold text-center hover:opacity-90 transition-all animate-pulse-glow"
            >
              RECIBIR GUÍA COMPLETA POR $12USD
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
