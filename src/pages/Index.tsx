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

const Index = () => {
  useEffect(() => {
    saveUtmParams();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <UrgencyBanner />
      <HeroSection />
      <BenefitsSection />
      <BonusSection />
      <PricingSection />
      <KitCarousel />
      <TestimonialsSection />
      <GuaranteeSection />
      <FAQSection />
      <FinalCTA />
      <SocialProofPopup />
    </div>
  );
};

export default Index;
