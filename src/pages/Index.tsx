import UrgencyBanner from "@/components/UrgencyBanner";
import HeroSection from "@/components/HeroSection";
import KitCarousel from "@/components/KitCarousel";
import BenefitsSection from "@/components/BenefitsSection";
import BonusSection from "@/components/BonusSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import SocialProofPopup from "@/components/SocialProofPopup";
import { useEffect } from "react";
import { saveUtmParams } from "@/utils/utmHelper";
import { useWebhook } from "@/hooks/useWebhook";

const Index = () => {
  const { sendLead } = useWebhook();

  useEffect(() => {
    // Salva os parâmetros UTM
    saveUtmParams();

    // Verifica se já enviou o evento new.lead nesta sessão
    const leadSent = sessionStorage.getItem('new_lead_sent');
    
    if (leadSent === 'true') {
      console.log('⏭️ Evento new.lead já foi enviado nesta sessão');
      return;
    }

    // Timer de 10 segundos para enviar evento new.lead
    const timer = setTimeout(() => {
      // Envia o evento new.lead após 10 segundos
      sendLead('page-visit-10s', 'new.lead')
        .then(() => {
          // Marca como enviado para não enviar novamente
          sessionStorage.setItem('new_lead_sent', 'true');
          console.log('✅ Evento new.lead enviado com sucesso após 10 segundos');
        })
        .catch((error) => {
          console.error('❌ Erro ao enviar evento new.lead:', error);
        });
    }, 10000); // 10 segundos = 10000 milissegundos

    // Cleanup: cancela o timer se o componente for desmontado antes de 10s
    return () => clearTimeout(timer);
  }, [sendLead]);

  return (
    <div className="min-h-screen bg-background">
      <UrgencyBanner />
      <HeroSection />
      <KitCarousel />
      <BenefitsSection />
      <BonusSection />
      <PricingSection />
      <TestimonialsSection />
      <GuaranteeSection />
      <FAQSection />
      <FinalCTA />
      <SocialProofPopup />
    </div>
  );
};

export default Index;
