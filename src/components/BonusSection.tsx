import mockup30Oracoes from "@/assets/mockup-30-oracoes.png";
import mockupVersiculosPoderosos from "@/assets/mockup-versiculos-poderosos.png";
import mockup50Versiculos from "@/assets/mockup-50-versiculos.png";
import mockupBiblia90Dias from "@/assets/mockup-biblia-90-dias.png";

const bonuses = [
  {
    image: mockupVersiculosPoderosos,
    title: "Versículos Poderosos",
    description: "Recibe una selección exclusiva con los versículos más poderosos para cada área de la vida.",
    value: "$ 8,57 USD"
  },
  {
    image: mockup50Versiculos,
    title: "Los 50 Versículos Más Memorables",
    description: "Descubre los versículos más memorables de la Biblia para transformar tu vida espiritual.",
    value: "$ 4,92 USD"
  },
  {
    image: mockupBiblia90Dias,
    title: "Cómo Leer la Biblia en 90 Días",
    description: "Un plan estructurado paso a paso para leer toda la Biblia en solo 90 días.",
    value: "$ 4,92 USD"
  },
  {
    image: mockup30Oracoes,
    title: "30 Oraciones Guiadas",
    description: "Oraciones poderosas para cada área de tu vida con guía paso a paso.",
    value: "$ 8,57 USD"
  }
];

const BonusSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="inline-block bg-gold/20 text-gold-foreground px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
            Bonos Exclusivos
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl text-center mb-4">
          Completa tu Jornada de Fe y Oración
        </h2>

        <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
          Preparamos herramientas adicionales para potenciar tu vida de oración y conexión con Dios.
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
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{bonus.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through">{bonus.value}</span>
                  <span className="text-success font-bold">GRATIS</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
