import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mockup30Oracoes from "@/assets/mockup-30-oracoes.png";
import mockupVersiculosPoderosos from "@/assets/mockup-versiculos-poderosos.png";
import mockup50Versiculos from "@/assets/mockup-50-versiculos.png";
import mockupBiblia90Dias from "@/assets/mockup-biblia-90-dias.png";

const kitItems = [
  {
    image: mockup30Oracoes,
    title: "✔️ 30 Oraciones Guiadas",
    description: "Una por día. Sabes exactamente qué decir y cómo orar."
  },
  {
    image: mockupVersiculosPoderosos,
    title: "✔️ Oraciones para cada área de tu vida",
    description: "Dinero, salud, familia, decisiones y paz interior."
  },
  {
    image: mockup50Versiculos,
    title: "✔️ Versículos Poderosos seleccionados",
    description: "La Palabra correcta para el momento correcto."
  },
  {
    image: mockupBiblia90Dias,
    title: "✔️ Los 50 Versículos más importantes",
    description: "Para fortalecer tu fe y tu mente cada día."
  },
  {
    image: mockupBiblia90Dias,
    title: "✔️ Guía práctica: Cómo leer la Biblia sin confundirte",
    description: "Paso a paso, incluso si nunca la has leído."
  }
];

const KitCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % kitItems.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + kitItems.length) % kitItems.length);
  };

  const getItemStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + kitItems.length) % kitItems.length);
    
    // Calculate position for circular carousel
    let translateX = 0;
    let scale = 1;
    let zIndex = 1;
    let opacity = 1;

    if (normalizedDiff === 0) {
      // Active item - center
      translateX = 0;
      scale = 1;
      zIndex = 10;
      opacity = 1;
    } else if (normalizedDiff === 1 || normalizedDiff === kitItems.length - 1) {
      // Adjacent items
      translateX = normalizedDiff === 1 ? 60 : -60;
      scale = 0.75;
      zIndex = 5;
      opacity = 0.7;
    } else {
      // Hidden items
      translateX = normalizedDiff > kitItems.length / 2 ? -120 : 120;
      scale = 0.5;
      zIndex = 1;
      opacity = 0;
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex,
      opacity,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  return (
    <section className="py-16 px-4 bg-card overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl text-center mb-4">
          Lo que vas a recibir al entrar hoy
        </h2>
        
        <div className="text-center mb-12 text-muted-foreground max-w-2xl mx-auto">
          Una guía simple para aprender a orar con dirección, paz y propósito.
        </div>

        {/* Immersive 3D Carousel */}
        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-8 z-20 p-3 rounded-full bg-background/80 backdrop-blur-sm shadow-elevated hover:bg-background transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          {/* Carousel Container */}
          <div className="relative w-full max-w-md h-full flex items-center justify-center">
            {kitItems.map((item, index) => (
              <div
                key={index}
                className="absolute cursor-pointer"
                style={getItemStyle(index)}
                onClick={() => setActiveIndex(index)}
              >
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-48 md:w-64 h-auto object-contain drop-shadow-2xl"
                  />
                  {/* Glow effect for active item */}
                  {index === activeIndex && (
                    <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gold scale-75" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-8 z-20 p-3 rounded-full bg-background/80 backdrop-blur-sm shadow-elevated hover:bg-background transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Active Item Info */}
        <div className="text-center mt-8 animate-fade-in-up">
          <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
            {kitItems[activeIndex].title}
          </h3>
          <p className="text-muted-foreground">
            {kitItems[activeIndex].description}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-6">
          {kitItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-gold w-8' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KitCarousel;
