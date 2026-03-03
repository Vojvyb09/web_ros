import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SectionDivider } from "@/components/SectionDivider";

export function Hero() {
  const [acceptingPatients, setAcceptingPatients] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/hours")
      .then((res) => res.json())
      .then((data) => setAcceptingPatients(data.acceptingPatients !== false))
      .catch(() => setAcceptingPatients(null));
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/photo/main.jpg"
          alt="Pozadí ordinace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 tracking-wide uppercase">
            Moderní oční péče
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-gray-900 leading-[1.1] mb-6">
            Jasný pohled <br />
            <span className="text-primary italic">pro lepší život.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
            Kombinuji špičkovou technologii s osobním přístupem. Vaše oči si zaslouží tu nejlepší péči.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              Domluvit konzultaci
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              Naše služby
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8 text-sm text-gray-500 font-medium">
            {acceptingPatients !== null && (
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full shrink-0 ${acceptingPatients ? "bg-green-500" : "bg-red-500"}`} />
                <span className={acceptingPatients ? "text-gray-700" : "text-red-700"}>
                  {acceptingPatients ? "Přijímáme nové pacienty" : "Momentálně nepřijímáme nové pacienty"}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              Špičkové vybavení
            </div>
          </div>
        </motion.div>
      </div>

      {/* Visual Transition to Next Section */}
      <SectionDivider position="bottom" variant="wave" fill="white" className="z-20" />
    </section>
  );
}
