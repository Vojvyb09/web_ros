import { motion } from "motion/react";
import { GraduationCap, Award, Stethoscope } from "lucide-react";

export function Doctor() {
  return (
    <section id="doctor" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://picsum.photos/seed/doctor_marta/600/800"
                alt="MUDr. Marta Rösnerová"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative background */}
            <div className="absolute top-10 -left-10 w-full h-full bg-primary/5 rounded-3xl -z-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-medium tracking-wide uppercase text-sm mb-4 block">
              O lékařce
            </span>
            <h2 className="text-4xl font-serif font-medium text-gray-900 mb-6">
              MUDr. Marta Rösnerová
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Jsem oční lékařka s dlouholetou praxí v oboru oftalmologie. Ve své ordinaci ve Frenštátě pod Radhoštěm poskytuji komplexní diagnostickou a léčebnou péči pro dospělé i dětské pacienty.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Mým cílem je poskytovat odbornou péči v příjemném a klidném prostředí. Kladu důraz na individuální přístup ke každému pacientovi a využití moderních vyšetřovacích metod.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-lg">Vzdělání a praxe</h4>
                  <p className="text-gray-600">
                    Atestace v oboru oftalmologie, celoživotní vzdělávání a účast na odborných kongresech.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-lg">Specializace</h4>
                  <p className="text-gray-600">
                    Diagnostika a léčba očních vad, glaukomová poradna, péče o pacienty s šedým zákalem.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-lg">Přístup</h4>
                  <p className="text-gray-600">
                    Empatický a pečlivý přístup k řešení vašich zrakových potíží.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
