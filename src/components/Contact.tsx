import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Navigation, Building2, Download } from "lucide-react";
import QRCode from "react-qr-code";

export function Contact() {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Dráhy+2189,+744+01+Frenštát+pod+Radhoštěm";
  const phoneUrl = "tel:+420734476654";
  
  const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Rösnerová;Marta;;MUDr.;
FN:MUDr. Marta Rösnerová
ORG:Oční ordinace MUDr. Marta Rösnerová
TEL;TYPE=WORK,VOICE:+420734476654
EMAIL;TYPE=WORK:marta.rosnerova@gmail.com
ADR;TYPE=WORK:;;Dráhy 2189;Frenštát pod Radhoštěm;;744 01;Czech Republic
END:VCARD`;

  const downloadVCard = () => {
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "mudr-marta-rosnerova.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <span className="text-accent font-medium tracking-wide uppercase text-sm mb-4 block">
              Kontaktujte nás
            </span>
            <h2 className="text-4xl font-serif font-medium text-gray-900 mb-8">
              Jsme tu pro vás
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-md">
              Máte dotazy nebo se chcete objednat na vyšetření? Neváhejte nás kontaktovat nebo využijte formulář.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-lg mb-1">Název ordinace</h4>
                  <p className="text-gray-600">
                    Oční ordinace MUDr. Marta Rösnerová
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-lg mb-1">Adresa ordinace</h4>
                  <p className="text-gray-600">
                    Dráhy 2189<br />
                    744 01 Frenštát pod Radhoštěm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-lg mb-1">Telefon</h4>
                  <p className="text-gray-600 hover:text-primary transition-colors">
                    <a href={phoneUrl}>+420 734 476 654</a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Po-Pá: 8:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-lg mb-1">Email</h4>
                  <p className="text-gray-600 hover:text-primary transition-colors">
                    <a href="mailto:marta.rosnerova@gmail.com">marta.rosnerova@gmail.com</a>
                  </p>
                </div>
              </div>

              {/* QR Code and Action Buttons */}
              <div className="pt-8 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 text-lg mb-4">Rychlá akce</h4>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                      <QRCode value={mapUrl} size={100} className="w-24 h-24" />
                      <p className="text-[10px] text-center text-gray-500 mt-2 uppercase tracking-wide font-medium">Navigovat</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                      <QRCode value={vCardData} size={100} className="w-24 h-24" />
                      <p className="text-[10px] text-center text-gray-500 mt-2 uppercase tracking-wide font-medium">Uložit kontakt</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full flex-wrap">
                    <a 
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-primary text-white px-4 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg justify-center flex-1 min-w-[140px]"
                    >
                      <Navigation className="w-5 h-5" />
                      Navigovat
                    </a>
                    <a 
                      href={phoneUrl}
                      className="flex items-center gap-3 bg-white text-gray-900 border border-gray-200 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-primary/30 transition-colors justify-center flex-1 min-w-[140px]"
                    >
                      <Phone className="w-5 h-5 text-primary" />
                      Zavolat
                    </a>
                    <button 
                      onClick={downloadVCard}
                      className="flex items-center gap-3 bg-white text-gray-900 border border-gray-200 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-primary/30 transition-colors justify-center flex-1 min-w-[140px]"
                    >
                      <Download className="w-5 h-5 text-primary" />
                      Uložit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100"
          >
            <h3 className="text-2xl font-serif font-medium text-gray-900 mb-6">
              Objednat se online
            </h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Jméno a příjmení</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                    placeholder="Jan Novák"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                    placeholder="+420 777 123 456"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                  placeholder="jan.novak@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-gray-700">Typ vyšetření</label>
                <select
                  id="service"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white text-gray-600"
                >
                  <option value="">Vyberte službu...</option>
                  <option value="vysetreni">Vstupní vyšetření</option>
                  <option value="laser">Konzultace laserové operace</option>
                  <option value="zakal">Konzultace šedého zákalu</option>
                  <option value="deti">Dětské vyšetření</option>
                  <option value="ine">Jiné</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Zpráva (nepovinné)</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white resize-none"
                  placeholder="Doplňující informace..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-medium py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
              >
                Odeslat žádost
              </button>
              <p className="text-xs text-center text-gray-500 mt-4">
                Odesláním formuláře souhlasíte se zpracováním osobních údajů.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
