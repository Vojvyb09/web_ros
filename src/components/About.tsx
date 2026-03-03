import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import { SectionDivider } from "@/components/SectionDivider";

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary/30 relative">
      <SectionDivider position="top" variant="curve" fill="white" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="/photo/oklinice.jpg"
              alt="Oční ordinace MUDr. Marta Rösnerová"
              className="rounded-3xl shadow-2xl object-cover w-full h-[600px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-medium tracking-wide uppercase text-sm mb-4 block">
              O naší klinice
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6 leading-tight">
              Spojujeme odbornost s lidským přístupem.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Ordinace MUDr. Marty Rösnerové je místem, kde se špičková medicína setkává s komfortem a porozuměním. Využívám nejmodernější diagnostické a operační technologie k tomu, abych vám vrátila ostrý zrak.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Dlouholetá praxe v oboru",
                "Moderní diagnostické přístroje",
                "Individuální přístup ke každému pacientovi",
                "Komplexní péče na jednom místě",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-8 border-t border-gray-200 pt-8">
              <div>
                <span className="block text-4xl font-serif font-bold text-primary mb-1">
                  15k+
                </span>
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  Spokojených pacientů
                </span>
              </div>
              <div>
                <span className="block text-4xl font-serif font-bold text-primary mb-1">
                  20+
                </span>
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  Let praxe
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <SectionDivider position="bottom" variant="curve" fill="white" />
    </section>
  );
}
