import { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/Logo";

interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  mondayBreak?: string;
  tuesdayBreak?: string;
  wednesdayBreak?: string;
  thursdayBreak?: string;
  fridayBreak?: string;
  note?: string;
}

export function Footer() {
  const [hours, setHours] = useState<OpeningHours | null>(null);

  useEffect(() => {
    fetch("/api/hours")
      .then((res) => res.json())
      .then((data) => setHours(data))
      .catch(() => setHours(null));
  }, []);

  const days = [
    { label: "Pondělí", value: hours?.monday ?? "", break: hours?.mondayBreak },
    { label: "Úterý", value: hours?.tuesday ?? "", break: hours?.tuesdayBreak },
    { label: "Středa", value: hours?.wednesday ?? "", break: hours?.wednesdayBreak },
    { label: "Čtvrtek", value: hours?.thursday ?? "", break: hours?.thursdayBreak },
    { label: "Pátek", value: hours?.friday ?? "", break: hours?.fridayBreak },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="block mb-6 hover:opacity-90 transition-opacity">
              <Logo variant="light" />
            </a>
            <p className="text-gray-400 leading-relaxed mb-6">
              Moderní oční ordinace poskytující komplexní péči pro celou rodinu. Vaše oči jsou u nás v bezpečí.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Rychlé odkazy</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-primary transition-colors">Domů</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">O nás</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Služby</a></li>
              <li><a href="#doctor" className="hover:text-primary transition-colors">Lékařka</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Služby</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Laserové operace</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Léčba šedého zákalu</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Estetická chirurgie</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dětská oftalmologie</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Preventivní prohlídky</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Otevírací doba</h4>
            <ul className="space-y-4 text-gray-400">
              {hours
                ? days.map(({ label, value, break: breakVal }) => {
                    const isClosed = (value ?? "").trim().toLowerCase() === "zavřeno";
                    const hasBreak = (breakVal ?? "").trim();
                    return (
                      <li key={label} className="flex flex-col gap-0.5">
                        <div className="flex justify-between items-center">
                          <span>{label}</span>
                          <span className={isClosed ? "text-red-400 font-medium" : ""}>
                            {value || "—"}
                          </span>
                        </div>
                        {hasBreak && (
                          <span className="text-xs text-gray-500 italic">
                            Polední pauza {breakVal}
                          </span>
                        )}
                      </li>
                    );
                  })
                : (
                  <>
                    <li className="flex justify-between"><span>Pondělí - Pátek</span><span>8:00 - 18:00</span></li>
                    <li className="flex justify-between"><span>Sobota</span><span>Na objednání</span></li>
                    <li className="flex justify-between"><span>Neděle</span><span>Zavřeno</span></li>
                  </>
                )}
              {hours?.note && (
                <li className="text-xs italic text-gray-500 pt-1 border-t border-gray-700 mt-2">
                  {hours.note}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MUDr. Marta Rösnerová. Všechna práva vyhrazena.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Ochrana osobních údajů</a>
            <a href="#" className="hover:text-white transition-colors">Obchodní podmínky</a>
            <a href="/admin" className="hover:text-white transition-colors opacity-50 hover:opacity-100">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
