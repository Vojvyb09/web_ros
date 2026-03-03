import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { SectionDivider } from "@/components/SectionDivider";
import { cn } from "@/lib/utils";

/** Fotky ze složky public/photo (názvy podle vašich souborů) */
const images = [
  { src: "/photo/cekarna.jpg", alt: "Čekárna", title: "Příjemná čekárna", description: "Prostředí navržené pro váš komfort a klid." },
  { src: "/photo/ordinace_main.jpg", alt: "Ordinace", title: "Hlavní ordinace", description: "Vybavena nejmodernější diagnostickou technikou." },
  { src: "/photo/pristroj_1.jpg", alt: "Přístroj 1", title: "Špičkové vybavení", description: "OCT a další přístroje pro přesnou diagnostiku." },
  { src: "/photo/pristorj_2.jpg", alt: "Přístroj 2", title: "Diagnostika", description: "Přesná a šetrná vyšetření." },
  { src: "/photo/pristroj_3.jpg", alt: "Přístroj 3", title: "Technologie", description: "Nejmodernější přístrojové vybavení." },
  { src: "/photo/pristroj_4.jpg", alt: "Přístroj 4", title: "Prostředí ordinace", description: "Čisté a moderní prostředí pro vaši péči." },
];

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the second image centered

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + images.length) % images.length;
  };

  return (
    <section id="gallery" className="py-24 bg-gray-900 text-white relative overflow-hidden">
      <SectionDivider position="top" variant="curve" fill="white" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium tracking-wide uppercase text-sm mb-4 block">
            Fotogalerie
          </span>
          <h2 className="text-4xl font-serif font-medium mb-6">
            Prohlédněte si naši ordinaci
          </h2>
          <p className="text-gray-400 text-lg">
            Zakládáme si na čistém a moderním prostředí, kde se budete cítit dobře.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto h-[500px] flex items-center justify-center perspective-1000">
          {/* Previous Button */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white border border-white/10 hover:scale-110"
            aria-label="Předchozí fotka"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next Button */}
          <button 
            onClick={nextSlide}
            className="absolute right-4 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white border border-white/10 hover:scale-110"
            aria-label="Další fotka"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Carousel Track */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence initial={false} mode="popLayout">
              {[-1, 0, 1].map((offset) => {
                const index = getSlideIndex(offset);
                const image = images[index];
                
                return (
                  <motion.div
                    key={`${index}-${offset}`}
                    initial={{ 
                      opacity: 0,
                      scale: 0.8,
                      x: offset * 100 + "%", 
                      zIndex: offset === 0 ? 20 : 10,
                      rotateY: offset * -15 // 3D rotation effect
                    }}
                    animate={{ 
                      opacity: offset === 0 ? 1 : 0.4,
                      scale: offset === 0 ? 1 : 0.8,
                      x: offset === 0 ? "0%" : offset === -1 ? "-60%" : "60%", // Adjust spacing
                      zIndex: offset === 0 ? 20 : 10,
                      rotateY: offset * -15
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={cn(
                      "absolute w-[70%] md:w-[60%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4",
                      offset === 0 ? "border-accent shadow-accent/20" : "border-transparent cursor-pointer"
                    )}
                    onClick={() => {
                      if (offset === -1) prevSlide();
                      if (offset === 1) nextSlide();
                    }}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Caption for active slide */}
                    {offset === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 text-left">
                        <h3 className="text-2xl font-serif font-medium mb-2">{image.title}</h3>
                        <p className="text-gray-300">{image.description}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                idx === currentIndex ? "bg-accent w-8" : "bg-gray-600 hover:bg-gray-500"
              )}
              aria-label={`Přejít na fotku ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <SectionDivider position="bottom" variant="curve" fill="white" />
    </section>
  );
}
