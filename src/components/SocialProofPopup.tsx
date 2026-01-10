import { useEffect, useState } from "react";
import { X } from "lucide-react";

const names = [
  { name: "María Elena", city: "México" },
  { name: "Carlos R.", city: "Colombia" },
  { name: "Ana Patricia", city: "Argentina" },
  { name: "José Luis", city: "España" },
  { name: "Carmen G.", city: "Perú" },
  { name: "Roberto M.", city: "Chile" },
  { name: "Lucía F.", city: "Ecuador" },
  { name: "Teresa S.", city: "Venezuela" }
];

const SocialProofPopup = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Show popup every 30 seconds
    const showInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % names.length);
      setVisible(true);
      
      // Hide after 5 seconds
      setTimeout(() => setVisible(false), 5000);
    }, 30000);

    // Show first popup after 10 seconds
    const initialTimeout = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 10000);

    return () => {
      clearInterval(showInterval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!visible) return null;

  const person = names[currentIndex];

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-fade-in-up">
      <div className="bg-card rounded-xl shadow-elevated p-4 pr-10 max-w-xs border border-border">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
        <p className="text-sm font-semibold text-success mb-1">
          ¡Nueva compra realizada!
        </p>
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">{person.name}</strong> de {person.city} acaba de adquirir la Guía de Oraciones.
        </p>
        <p className="text-xs text-muted-foreground mt-1">Ahora mismo</p>
      </div>
    </div>
  );
};

export default SocialProofPopup;
