import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María Elena",
    avatar: "https://ui-avatars.com/api/?name=Maria+Elena&background=D4A373&color=fff",
    text: "Después de seguir la guía por 30 días, mi vida financiera cambió completamente. Recibí una promoción inesperada y oportunidades que parecían imposibles. ¡Las oraciones realmente funcionan!"
  },
  {
    name: "Carlos Rodríguez",
    avatar: "https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=CCD5AE&color=fff",
    text: "Nunca supe cómo orar correctamente hasta que encontré esta guía. Ahora siento paz y claridad en mis decisiones. Mi negocio prosperó de manera increíble."
  },
  {
    name: "Ana Patricia",
    avatar: "https://ui-avatars.com/api/?name=Ana+Patricia&background=E9EDC9&color=333",
    text: "Cada oración parece escrita para mi situación específica. En solo 2 semanas vi cambios en mi salud y mis relaciones. ¡Dios realmente escucha cuando oramos con fe!"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl text-center mb-4">
          Testimonios de Transformación 🙏
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-card"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
