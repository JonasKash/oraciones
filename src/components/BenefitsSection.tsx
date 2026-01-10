import { Brain, Heart, Sparkles, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Oración con Propósito",
    description: "Aprende a orar de manera estructurada y con intención clara. Cada oración te guía paso a paso para conectar profundamente con Dios."
  },
  {
    icon: Heart,
    title: "Paz Interior y Claridad",
    description: "Transforma la ansiedad en paz. Las oraciones te ayudan a calmar la mente y abrir el corazón para recibir las bendiciones divinas."
  },
  {
    icon: Sparkles,
    title: "Prosperidad en Todas las Áreas",
    description: "Oraciones específicas para abundancia financiera, salud, relaciones y crecimiento espiritual. 30 días de transformación total."
  },
  {
    icon: TrendingUp,
    title: "Resultados Comprobados",
    description: "Miles de personas ya experimentaron cambios reales en sus vidas. Testimonios de prosperidad, sanación y milagros después de 30 días."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-sage-dark uppercase tracking-wider text-sm font-medium">
            Por qué elegir esta Guía
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl text-center mb-6 max-w-3xl mx-auto">
          Si sientes que tus oraciones no están siendo escuchadas...
        </h2>

        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Entonces estás en el lugar correcto. La <em>Guía de 30 Oraciones</em> te enseña a orar con poder, propósito y fe verdadera.
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
