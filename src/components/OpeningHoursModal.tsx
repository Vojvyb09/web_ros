import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Clock, Phone, Calendar, AlertCircle } from "lucide-react";

interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  note: string;
}

export function OpeningHoursModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState<OpeningHours | null>(null);

  useEffect(() => {
    // Fetch hours from API
    fetch("/api/hours")
      .then((res) => res.json())
      .then((data) => setHours(data))
      .catch((err) => console.error("Failed to fetch hours:", err));

    // Show modal after a short delay
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!hours) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  <span className="font-medium text-accent uppercase tracking-wide text-xs">Důležité informace</span>
                </div>
                <h2 className="text-2xl font-serif font-medium">Aktuální informace</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-8">
                <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  Ordinační doba
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Pondělí</span>
                    <span className="font-medium text-gray-900">{hours.monday}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Úterý</span>
                    <span className="font-medium text-gray-900">{hours.tuesday}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Středa</span>
                    <span className="font-medium text-gray-900">{hours.wednesday}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Čtvrtek</span>
                    <span className="font-medium text-gray-900">{hours.thursday}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Pátek</span>
                    <span className="font-medium text-gray-900">{hours.friday}</span>
                  </div>
                </div>
                {hours.note && (
                  <p className="text-xs text-gray-500 mt-3 italic">
                    {hours.note}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Objednání
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  K vyšetření je nutné se předem objednat telefonicky nebo e-mailem.
                </p>
                <a 
                  href="tel:+420734476654"
                  className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 text-gray-900 py-2 rounded-lg hover:border-primary hover:text-primary transition-colors font-medium text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +420 734 476 654
                </a>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Rozumím
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
