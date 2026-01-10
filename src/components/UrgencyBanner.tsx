const UrgencyBanner = () => {
  const message = "⚠️ OFERTA ESPECIAL DISPONIBLE SOLO HASTA LAS 23:59 DE HOY";
  
  return (
    <div className="bg-urgency text-urgency-foreground py-2 overflow-hidden">
      <div className="flex animate-scroll-left whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 font-semibold text-sm">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UrgencyBanner;
