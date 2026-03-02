import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Doctor } from "@/components/Doctor";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { OpeningHoursModal } from "@/components/OpeningHoursModal";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <OpeningHoursModal />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Doctor />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
