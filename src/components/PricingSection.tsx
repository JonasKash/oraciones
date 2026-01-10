import { Check, Star } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { useWebhook } from "@/hooks/useWebhook";

const PricingSection = () => {
  const { sendLead } = useWebhook();

  const handleBasicPlanClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const checkoutUrl = "https://pay.hotmart.com/J103688261V?off=sxnbohaq&checkoutMode=10";
    
    try {
      // Envia evento para webhook
      await Promise.race([
        sendLead('offer-6', 'button_click6'),
        new Promise(resolve => setTimeout(resolve, 500))
      ]);
      
      console.log('✅ Evento button_click6 enviado');
    } catch (error) {
      console.error('Erro ao enviar webhook:', error);
    }
    
    // Redireciona para checkout
    window.location.href = checkoutUrl;
  };

  const handleCompletePlanClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const checkoutUrl = "https://pay.hotmart.com/J103688261V?off=7duovx39&checkoutMode=10";
    
    try {
      // Envia evento para webhook
      await Promise.race([
        sendLead('offer-9', 'button_click9'),
        new Promise(resolve => setTimeout(resolve, 500))
      ]);
      
      console.log('✅ Evento button_click9 enviado');
    } catch (error) {
      console.error('Erro ao enviar webhook:', error);
    }
    
    // Redireciona para checkout
    window.location.href = checkoutUrl;
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
              <div className="text-4xl font-bold font-heading text-foreground">$ 6 USD</div>
              <span className="text-success text-sm font-medium">💰 Ahorra $ 4 USD</span>
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
              Quiero la Guía por $ 6 USD
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
              <div className="text-4xl font-bold font-heading text-foreground">$ 9 USD</div>
              <span className="text-success text-sm font-medium">💰 Ahorra $ 5 USD</span>
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
              PLAN COMPLETO $9
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
