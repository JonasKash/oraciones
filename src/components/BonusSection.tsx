import mockup30Oracoes from "@/assets/mockup-30-oracoes.png";
import mockupVersiculosPoderosos from "@/assets/mockup-versiculos-poderosos.png";
import mockup50Versiculos from "@/assets/mockup-50-versiculos.png";
import mockupBiblia90Dias from "@/assets/mockup-biblia-90-dias.png";

const bonuses = [
  {
    image: mockupVersiculosPoderosos,
    title: "✔️ Versículos Poderosos por Área de la Vida",
    description: "Una selección especial de versículos para momentos de: Necesidad financiera, Ansiedad, Decisiones importantes, Paz y fortaleza espiritual.",
    value: "$ 19,97 USD"
  },
  {
    image: mockup50Versiculos,
    title: "✔️ Los 50 Versículos Más Memorables",
    description: "Los versículos que todo creyente debería conocer y recordar. Ideales para fortalecer la mente y el corazón cada día.",
    value: "$ 19,97 USD"
  },
  {
    image: mockupBiblia90Dias,
    title: "✔️ Cómo Leer la Biblia en 90 Días",
    description: "Un plan simple y claro para leer la Biblia sin confundirte, incluso si nunca lo intentaste antes.",
    value: "$ 19,97 USD"
  },
  {
    image: mockup30Oracoes,
    title: "✔️ 30 Oraciones Guiadas (Edición Completa)",
    description: "Oraciones paso a paso para cada área importante de tu vida. No improvisas. Solo sigues la guía.",
    value: "$ 19,97 USD"
  }
];

const BonusSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="inline-block bg-gold/20 text-gold-foreground px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
            🎁 Bonos incluidos hoy (sin costo adicional)
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl text-center mb-4">
          Para acompañar tu proceso de oración,
        </h2>

        <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
          recibes material extra que refuerza tu fe día tras día.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bonuses.map((bonus, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-b from-card to-secondary/20 flex items-center justify-center p-4">
                <img
                  src={bonus.image}
                  alt={bonus.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-5">
                <h4 className="font-heading text-lg font-semibold mb-2">{bonus.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{bonus.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through">Valor real: {bonus.value}</span>
                </div>
                <div className="mt-2">
                  <span className="text-success font-bold text-lg">Hoy: GRATIS</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Frase de Ancoragem */}
        <div className="text-center mt-12">
          <p className="text-lg font-semibold text-foreground">
            Todo esto está incluido sin costo adicional hoy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
