import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Clock, Phone, Calendar, AlertCircle, DoorClosed, User, MapPin } from "lucide-react";

interface Replacement {
  name: string;
  contact: string;
  address?: string;
}

interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday?: string;
  sunday?: string;
  mondayBreak?: string;
  tuesdayBreak?: string;
  wednesdayBreak?: string;
  thursdayBreak?: string;
  fridayBreak?: string;
  saturdayBreak?: string;
  sundayBreak?: string;
  note: string;
  acceptingPatients?: boolean;
  closedOffice?: boolean;
  closedReason?: string;
  /** Platné do (YYYY-MM-DD) – po tomto datu se zobrazí běžné okno. */
  closedUntil?: string;
  replacements?: Replacement[];
}

function hasReplacementContent(r: Replacement) {
  return (r.name ?? "").trim() || (r.contact ?? "").trim() || (r.address ?? "").trim();
}

interface OpeningHoursModalProps {
  /** Když jsou předány, modal je řízen zvenčí (např. z bočního indikátoru). */
  isOpen?: boolean;
  onClose?: () => void;
}

export function OpeningHoursModal({ isOpen: isOpenProp, onClose }: OpeningHoursModalProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [hours, setHours] = useState<OpeningHours | null>(null);

  const isControlled = isOpenProp !== undefined && onClose != null;
  const isOpen = isControlled ? isOpenProp : internalOpen;
  const closeModal = () => {
    if (isControlled) onClose?.();
    else setInternalOpen(false);
  };

  useEffect(() => {
    fetch("/api/hours")
      .then((res) => res.json())
      .then((data) => setHours(data))
      .catch((err) => console.error("Failed to fetch hours:", err));
  }, []);

  useEffect(() => {
    if (!isControlled) {
      const timer = setTimeout(() => setInternalOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isControlled]);

  if (!hours) return null;

  const hasClosedContent =
    (hours.closedReason ?? "").trim() || (hours.replacements ?? []).some(hasReplacementContent);
  const closedUntilStr = (hours.closedUntil ?? "").trim();
  const stillInEffect =
    !closedUntilStr ||
    (() => {
      const until = new Date(closedUntilStr);
      until.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today <= until;
    })();
  const isClosed =
    hours.closedOffice && hasClosedContent && stillInEffect;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeModal()}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto my-auto"
          >
            {isClosed ? (
              /* ——— Jen okno „Zavřená ordinace“ ——— */
              <>
                <div className="bg-red-600 p-6 text-white flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DoorClosed className="w-5 h-5" />
                      <span className="font-medium uppercase tracking-wide text-xs opacity-90">
                        Důležité oznámení
                      </span>
                    </div>
                    <h2 className="text-2xl font-serif font-medium">Zavřená ordinace</h2>
                  </div>
                  <button
                    onClick={() => closeModal()}
                    className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8">
                  {hours.closedReason?.trim() && (
                    <p className="text-gray-800 text-lg mb-6 leading-relaxed">{hours.closedReason}</p>
                  )}

                  {hours.replacements && hours.replacements.filter(hasReplacementContent).length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-3">Na koho se obrátit (náhrada):</p>
                      <ul className="space-y-4">
                        {hours.replacements.filter(hasReplacementContent).map((r, i) => (
                          <li key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-start gap-2">
                              <User className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <div className="min-w-0">
                                <p className="font-medium text-gray-900">{r.name || "—"}</p>
                                {r.contact && (
                                  <p className="mt-1 text-sm">
                                    {/^[\d\s+]+$/.test((r.contact ?? "").replace(/\s/g, "")) ? (
                                      <a
                                        href={`tel:${(r.contact ?? "").replace(/\s/g, "")}`}
                                        className="text-primary hover:underline flex items-center gap-1"
                                      >
                                        <Phone className="w-4 h-4" />
                                        {r.contact}
                                      </a>
                                    ) : (
                                      <span className="text-gray-700">{r.contact}</span>
                                    )}
                                  </p>
                                )}
                                {r.address?.trim() && (
                                  <p className="mt-1 text-sm text-gray-600 flex items-start gap-1">
                                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    {r.address}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => closeModal()}
                    className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
                  >
                    Rozumím
                  </button>
                </div>
              </>
            ) : (
              /* ——— Běžné okno s ordinační dobou ——— */
              <>
                <div className="bg-primary p-6 text-white flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-accent" />
                      <span className="font-medium text-accent uppercase tracking-wide text-xs">
                        Důležité informace
                      </span>
                    </div>
                    <h2 className="text-2xl font-serif font-medium">Aktuální informace</h2>
                  </div>
                  <button
                    onClick={() => closeModal()}
                    className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8">
                  <div className="mb-8">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900 mb-4">
                      <Clock className="w-5 h-5 text-primary" />
                      Ordinační doba
                    </h3>
                    <div className="space-y-3">
                      {[
                        { day: "Pondělí", value: hours.monday, break: hours.mondayBreak },
                        { day: "Úterý", value: hours.tuesday, break: hours.tuesdayBreak },
                        { day: "Středa", value: hours.wednesday, break: hours.wednesdayBreak },
                        { day: "Čtvrtek", value: hours.thursday, break: hours.thursdayBreak },
                        { day: "Pátek", value: hours.friday, break: hours.fridayBreak },
                        { day: "Sobota", value: hours.saturday ?? "", break: hours.saturdayBreak },
                        { day: "Neděle", value: hours.sunday ?? "", break: hours.sundayBreak },
                      ].map(({ day, value, break: breakVal }) => {
                        const isClosed = (value ?? "").trim().toLowerCase() === "zavřeno";
                        const hasBreak = (breakVal ?? "").trim();
                        return (
                          <div key={day} className="border-b border-gray-100 pb-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">{day}</span>
                              <span
                                className={`font-medium ${isClosed ? "text-red-600" : "text-gray-900"}`}
                              >
                                {value || "—"}
                              </span>
                            </div>
                            {hasBreak && (
                              <p className="text-xs text-gray-500 mt-0.5 italic pl-0">
                                Polední pauza {breakVal}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className={`mt-4 py-3 px-4 rounded-xl border font-medium text-center ${hours.acceptingPatients !== false ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
                      {hours.acceptingPatients !== false
                        ? "Přijímáme nové pacienty"
                        : "Momentálně nepřijímáme nové pacienty"}
                    </div>
                    {hours.note && (
                      <p className="text-xs text-gray-500 mt-3 italic">{hours.note}</p>
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
                    onClick={() => closeModal()}
                    className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  >
                    Rozumím
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
