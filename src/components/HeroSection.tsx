import { Sparkles } from "lucide-react";
import { useEffect } from "react";
import { AnimatedText } from "@/components/ui/animated-underline-text";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { id: string }, HTMLElement>;
    }
  }
}
const HeroSection = () => {
  useEffect(() => {
    // Load vturb player script
    if (!document.querySelector('script[src*="6961cc8eda723d6f8687275e"]')) {
      const script = document.createElement("script");
      script.src = "https://scripts.converteai.net/52bacd98-a3bc-41fb-8f3a-2f85ca584bcc/players/6961cc8eda723d6f8687275e/v4/player.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="bg-gradient-hero py-4 pt-2 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1 bg-card border border-border rounded-full px-2.5 py-0.5 mb-3 shadow-soft">
          <Sparkles className="w-2 h-2 text-gold" />
          <span className="text-[8px] text-muted-foreground">Más de 3000 vidas transformadas</span>
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-1 mb-2">
          <span className="text-sm">🙏</span>
          <h1 className="text-sage-dark uppercase tracking-[0.2em] text-[9px] font-medium font-body">
            Oraciones Guiadas
          </h1>
        </div>

        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight uppercase">
          Pides con fe, <AnimatedText 
            text="pero no recibes"
            textClassName="font-heading"
            underlineClassName="text-gold"
            underlineDuration={1.2}
          />
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          No es que Dios no responda,{" "}
          <span className="font-semibold text-foreground italic">
            es que tu mente no está preparada para orar.
          </span>
        </p>

        {/* Main Video */}
        <div className="relative mx-auto w-full md:w-auto">
          <vturb-smartplayer 
            id="vid-6961cc8eda723d6f8687275e" 
            style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}
          />
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <a
            href="#offer"
            className="inline-block bg-gradient-cta text-foreground px-10 py-5 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-elevated animate-pulse-glow"
          >
            RECIBIR GUÍA
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
