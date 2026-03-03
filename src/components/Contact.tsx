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
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Jemné pozadí – fotka s bílým překryvem, aby nevyčnívala */}
      <div className="absolute inset-0 z-0">
        <img
          src="/photo/back.png"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-white/85" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-1 max-w-2xl">
          {/* Contact Info */}
          <div>
            <span className="text-accent font-medium tracking-wide uppercase text-sm mb-4 block">
              Kontaktujte nás
            </span>
            <h2 className="text-4xl font-serif font-medium text-gray-900 mb-8">
              Jsme tu pro vás
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-md">
              Máte dotazy? Neváhejte nás kontaktovat.
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
        </div>
      </div>
    </section>
  );
}
