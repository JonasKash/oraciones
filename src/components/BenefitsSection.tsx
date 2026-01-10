import { Brain, Heart, Sparkles, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "✔️ Oración con dirección",
    description: "No oras al azar. Cada oración tiene un propósito claro y una estructura simple para que sepas exactamente qué decir y por qué lo estás diciendo."
  },
  {
    icon: Heart,
    title: "✔️ Paz mental antes que respuestas",
    description: "La fe no crece en la ansiedad. Estas oraciones ayudan a calmar la mente primero, para que el corazón pueda escuchar."
  },
  {
    icon: Sparkles,
    title: "✔️ Oraciones para la vida real",
    description: "No son oraciones genéricas. Aquí encuentras oraciones específicas para: Dinero, Salud, Familia, Decisiones difíciles, Crecimiento espiritual. Un camino de 30 días, paso a paso."
  },
  {
    icon: TrendingUp,
    title: "✔️ Personas reales. Cambios reales.",
    description: "Miles de personas ya usaron esta guía durante 30 días y reportaron: Más paz, Más claridad, Mejores decisiones, Cambios visibles en su vida diaria."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-sage-dark uppercase tracking-wider text-sm font-medium">
            ¿Por qué esta guía funciona?
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl text-center mb-6 max-w-3xl mx-auto">
          Porque no te dice qué pedir.<br />
          Te enseña cómo orar para que tu mente y tu fe estén alineadas.
        </h2>

        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Si sientes que oras… y no pasa nada,<br />
          esta guía fue hecha para ti.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="w-7 h-7 text-sage-dark" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#offer"
            className="inline-block bg-gradient-cta text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all shadow-soft animate-pulse-glow"
          >
            QUIERO VER LAS OFERTAS
          </a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
