import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo recibo la guía después de la compra?",
    answer: "El acceso se envía inmediatamente a tu correo electrónico justo después de la confirmación del pago."
  },
  {
    question: "¿Necesito experiencia previa en oración?",
    answer: "No, la guía está diseñada para todos los niveles. Cada oración viene con instrucciones claras y explicaciones del propósito espiritual."
  },
  {
    question: "¿Cuánto tiempo debo dedicar cada día?",
    answer: "Menos de 10 minutos por día son suficientes. Cada oración está estructurada para ser poderosa pero accesible para tu rutina."
  },
  {
    question: "¿Y si no me gusta?",
    answer: "Tienes 7 días de garantía. Si no sientes conexión con las oraciones, devolvemos el 100% de tu dinero."
  },
  {
    question: "¿Las oraciones son de alguna religión específica?",
    answer: "Las oraciones están basadas en principios bíblicos y son para todos los cristianos que desean fortalecer su conexión con Dios."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl text-center mb-12">
          Preguntas Frecuentes
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-xl px-6 border border-border shadow-soft"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
