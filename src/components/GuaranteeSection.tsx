import { ShieldCheck } from "lucide-react";

const GuaranteeSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10 text-success" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl mb-6">
          Garantía Incondicional de 7 Días
        </h2>

        <p className="text-lg text-muted-foreground mb-8">
          Puedes conocer la <strong className="text-foreground">Guía de 30 Oraciones para Prosperidad</strong> sin riesgos. 
          Descarga la guía, practica las oraciones y siente la transformación. Si por cualquier motivo no sientes 
          conexión con las oraciones o no es lo que esperabas, devolvemos <strong className="text-foreground">100% de tu dinero</strong>.
        </p>

        <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
          <h3 className="font-heading text-xl font-semibold mb-4">
            No dejes para después la oportunidad de transformar tu vida con el poder de la oración.
          </h3>
          <a
            href="#offer"
            className="inline-block bg-gradient-cta text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all animate-pulse-glow"
          >
            QUIERO VER LAS OFERTAS
          </a>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
