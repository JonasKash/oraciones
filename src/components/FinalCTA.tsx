const FinalCTA = () => {
  return (
    <section className="py-16 px-4 bg-gradient-cta text-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg mb-4 opacity-90">
          ⚠️ Atención: esta oferta es válida hasta las 23:59 de Hoy.
        </p>
        <p className="text-xl mb-8 opacity-90">
          Aprovecha ahora y transforma tu vida espiritual con 30 oraciones poderosas que abren las puertas de la prosperidad
        </p>

        <a
          href="#offer"
          className="inline-block bg-card text-foreground px-10 py-5 rounded-full font-bold text-lg hover:bg-card/90 transition-colors shadow-elevated"
        >
          QUIERO APROVECHAR AHORA
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
