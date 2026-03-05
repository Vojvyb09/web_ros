import { motion } from "motion/react";
import { Stethoscope, Cpu, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: <Stethoscope className="w-6 h-6 text-primary" />,
    text: "Komplexní ambulantní péče v oboru oftalmologie pro dospělé a dětské pacienty",
    className: "md:col-span-2 bg-primary/5 border-primary/10",
  },
  {
    icon: <Cpu className="w-6 h-6 text-accent" />,
    text: "Nejmodernější přístrojové vybavení",
    className: "bg-white border-gray-100",
  },
  {
    icon: <Heart className="w-6 h-6 text-rose-500" />,
    text: "Lidský a empatický přístup personálu",
    className: "bg-white border-gray-100",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-teal-500" />,
    text: "Estetická medicína včetně plastických operací víček",
    className: "md:col-span-2 bg-white border-gray-100",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-medium text-gray-900 mb-2">
            Co nabízíme
          </h2>
          <p className="text-primary font-medium text-lg">
            Naše služby
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={cn(
                "p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all flex flex-col justify-between group",
                service.className
              )}
            >
              <div className="bg-white p-3 rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <p className="text-gray-700 text-base leading-relaxed mt-4">
                {service.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
