import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Stethoscope, Cpu, Heart, Sparkles, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type EquipmentItem = {
  title: string;
  intro: string;
  points: string[];
  linkLabel?: string;
  linkUrl?: string;
};

type ModalContent = {
  modalTitle: string;
  equipment: EquipmentItem[];
} | null;

const EQUIPMENT_MODAL: ModalContent = {
  modalTitle: "Nejmodernější přístrojové vybavení",
  equipment: [
    {
      title: "Počítačový perimetr PTS 920 – vyšetření zorného pole",
      intro: "Přístroj zjišťuje, jak široce a kde přesně vidíte. Vyšetření je bezbolestné a trvá jen několik minut.",
      points: [
        "Pacient se dívá do přístroje (do kopule) a označuje tlačítkem místa, kde se objeví světelný bod. Připomíná to jednoduchou hru.",
        "Výsledek ukáže, zda nějaká část zorného pole nechybí nebo je oslabená – důležité např. u zeleného zákalu (glaukomu) nebo u některých neurologických potíží.",
        "Přístroj automaticky kontroluje, zda pacient během vyšetření správně fixuje pohled, takže výsledky jsou spolehlivé.",
      ],
      linkLabel: "Technické informace o perimetru PTS 920 (výrobce)",
      linkUrl: "https://www.cmi.sk/cs/diagnostika/automaticky-pocitacovy-perimetr-pts/",
    },
    {
      title: "TRK-2P Auto Kerato-Refracto-Tonometer – čtyři vyšetření v jednom",
      intro: "Jeden přístroj během chvíle změří čtyři důležité údaje o vašem oku. Nemusíte přecházet mezi několika zařízeními, vyšetření je rychlé a pohodlné.",
      points: [
        "Dioptrie (refrakce) – zjištění, zda potřebujete brýle a s jakými hodnotami.",
        "Zakřivení rohovky – důležité pro správný předpis brýlí i pro plánování operací.",
        "Nitrooční tlak – klíčový údaj u zeleného zákalu (glaukomu); měření je rychlé a šetrné.",
        "Tloušťka rohovky – doplňuje vyšetření oka a zvyšuje přesnost měření tlaku.",
      ],
      linkLabel: "Více o přístroji TRK-2P (výrobce)",
      linkUrl: "https://www.ocni.eu/pristroje/auto-kerato-refrakto-tono-pachymetr-trk-2p-topcon",
    },
  ],
};

const services: Array<{
  icon: ReactNode;
  text: string;
  className: string;
  modal: ModalContent;
}> = [
  {
    icon: <Stethoscope className="w-6 h-6 text-primary" />,
    text: "Komplexní ambulantní péče v oboru oftalmologie pro dospělé a dětské pacienty",
    className: "md:col-span-2 bg-primary/5 border-primary/10",
    modal: null,
  },
  {
    icon: <Cpu className="w-6 h-6 text-accent" />,
    text: "Nejmodernější přístrojové vybavení",
    className: "bg-white border-gray-100",
    modal: EQUIPMENT_MODAL,
  },
  {
    icon: <Heart className="w-6 h-6 text-rose-500" />,
    text: "Lidský a empatický přístup personálu",
    className: "bg-white border-gray-100",
    modal: null,
  },
  {
    icon: <Sparkles className="w-6 h-6 text-teal-500" />,
    text: "Estetická medicína včetně plastických operací víček",
    className: "md:col-span-2 bg-white border-gray-100",
    modal: null,
  },
];

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const content = openIndex !== null ? services[openIndex]?.modal : null;

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
              role={service.modal ? "button" : undefined}
              tabIndex={service.modal ? 0 : undefined}
              onClick={() => service.modal && setOpenIndex(index)}
              onKeyDown={(e) => service.modal && (e.key === "Enter" || e.key === " ") && setOpenIndex(index)}
              className={cn(
                "p-8 rounded-3xl border shadow-sm hover:shadow-md transition-all flex flex-col justify-between group",
                service.modal && "cursor-pointer",
                service.className
              )}
            >
              <div className="bg-white p-3 rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <p className="text-gray-700 text-base leading-relaxed mt-4">
                {service.text}
              </p>
              {service.modal && (
                <p className="text-sm text-primary font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Více o přístroji →
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {content && openIndex !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenIndex(null)}
              className="fixed inset-0 bg-black/50 z-40"
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl z-50 mx-4 p-6 md:p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
            >
              <div className="flex justify-between items-start gap-4 mb-5">
                <h3 id="service-modal-title" className="text-xl font-serif font-medium text-gray-900 pr-8">
                  {content.modalTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Zavřít"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-8">
                {content.equipment.map((item, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-6 border-t border-gray-100" : ""}>
                    <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {item.intro}
                    </p>
                    <ul className="space-y-2 mb-3">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex gap-2 text-gray-700 text-sm leading-relaxed">
                          <span className="text-primary mt-1.5 shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    {item.linkUrl && (
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {item.linkLabel ?? "Více informací"}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
