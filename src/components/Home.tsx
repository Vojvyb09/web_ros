import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Doctor } from "@/components/Doctor";
import { Testimonials } from "@/components/Testimonials";
import { InsurancePartners } from "@/components/InsurancePartners";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { OpeningHoursModal } from "@/components/OpeningHoursModal";
import { OpeningHoursIndicator } from "@/components/OpeningHoursIndicator";

export function Home() {
  const [hoursModalOpen, setHoursModalOpen] = useState(false);
  const [gallerySlideTo, setGallerySlideTo] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHoursModalOpen(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const handleShowInGallery = (slideIndex: number) => {
    setGallerySlideTo(slideIndex);
    setTimeout(() => {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <OpeningHoursModal isOpen={hoursModalOpen} onClose={() => setHoursModalOpen(false)} />
      <OpeningHoursIndicator onOpenModal={() => setHoursModalOpen(true)} />
      <Navbar />
      <main>
        <Hero />
        <Services onShowInGallery={handleShowInGallery} />
        <About />
        <Gallery scrollToSlide={gallerySlideTo} onScrolledTo={() => setGallerySlideTo(null)} />
        <Doctor />
        <Testimonials />
        <InsurancePartners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
