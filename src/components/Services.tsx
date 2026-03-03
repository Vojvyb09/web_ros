import { motion } from "motion/react";
import { Eye, Glasses, Microscope, Syringe, ScanEye, Baby } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: <ScanEye className="w-6 h-6 text-blue-500" />,
    title: "Komplexní vyšetření",
    description: "Detailní diagnostika zraku, vstupní a preventivní prohlídky.",
    className: "md:col-span-2 md:row-span-2 bg-primary/5 border-primary/10",
  },
  {
    icon: <Microscope className="w-6 h-6 text-accent" />,
    title: "Šedý a zelený zákal",
    description: "Kontroly a sledování pacientů s návazností na operativu.",
    className: "bg-white border-gray-100",
  },
  {
    icon: <Glasses className="w-6 h-6 text-teal-500" />,
    title: "Předpis brýlí",
    description: "Měření zraku a odborné poradenství při výběru korekce.",
    className: "bg-white border-gray-100",
  },
  {
    icon: <Baby className="w-6 h-6 text-pink-500" />,
    title: "Dětská oftalmologie",
    description: "Specializovaná péče pro dětské pacienty.",
    className: "md:col-span-2 bg-white border-gray-100",
  },
  {
    icon: <Syringe className="w-6 h-6 text-purple-500" />,
    title: "Drobné zákroky",
    description: "Ošetření drobných poranění spojivky a rohovky.",
    className: "bg-white border-gray-100",
  },
  {
    icon: <Eye className="w-8 h-8 text-primary" />,
    title: "Konzultace",
    description: "Odborné konzultace a perimetrie.",
    className: "bg-white border-gray-100",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-medium text-gray-900 mb-4">
            Naše služby
          </h2>
          <p className="text-gray-600 text-lg">
            Poskytuji komplexní oční péči s využitím nejnovějších technologií a postupů.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={cn(
                "p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer",
                service.className
              )}
            >
              <div className="bg-white p-3 rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
