import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { SectionDivider } from "@/components/SectionDivider";

const testimonials = [
  {
    name: "Veronika Adámková",
    role: "Pacientka",
    text: "Velmi spokojená s přístupem paní doktorky. Vše mi vysvětlila a vyšetření proběhlo v pořádku.",
    rating: 5,
  },
  {
    name: "Martin Horák",
    role: "Pacient",
    text: "Profesionální a lidský přístup. Paní doktorka je velmi pečlivá a ochotná.",
    rating: 5,
  },
  {
    name: "Zdenek Zamecnik",
    role: "Pacient",
    text: "Doporučuji. Skvělá péče a příjemné prostředí ordinace.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <SectionDivider position="top" variant="wave" fill="white" />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-medium mb-6">
            Příběhy našich pacientů
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Vaše spokojenost a zdravý zrak jsou pro nás tou největší odměnou.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/15 transition-colors"
            >
              <Quote className="w-10 h-10 text-accent mb-6 opacity-80" />
              <p className="text-lg leading-relaxed mb-6 italic opacity-90">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>

              <div>
                <h4 className="font-medium text-lg">{testimonial.name}</h4>
                <p className="text-sm text-white/60">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <SectionDivider position="bottom" variant="wave" fill="white" />
    </section>
  );
}
