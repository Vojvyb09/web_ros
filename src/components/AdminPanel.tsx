import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Save, LogOut, Home, DoorClosed, Plus, Trash2 } from "lucide-react";

export interface Replacement {
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
  saturday: string;
  sunday: string;
  mondayBreak?: string;
  tuesdayBreak?: string;
  wednesdayBreak?: string;
  thursdayBreak?: string;
  fridayBreak?: string;
  saturdayBreak?: string;
  sundayBreak?: string;
  note: string;
  closedOffice?: boolean;
  closedReason?: string;
  /** Platné do (datum) – po tomto datu se zobrazí běžné okno. Prázdné = bez automatického zrušení. */
  closedUntil?: string;
  replacements?: Replacement[];
}

export function AdminPanel() {
  const [hours, setHours] = useState<OpeningHours | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    console.log("AdminPanel: Token z localStorage:", token);
    
    if (!token) {
      console.log("AdminPanel: Žádný token, přesměrovávám na /admin");
      navigate("/admin");
      return;
    }

    console.log("AdminPanel: Načítám ordinační dobu...");
    fetch("/api/hours")
      .then((res) => {
        console.log("AdminPanel: Odpověď API:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("AdminPanel: Načtená data:", data);
        setHours({
          ...data,
          mondayBreak: data.mondayBreak ?? "",
          tuesdayBreak: data.tuesdayBreak ?? "",
          wednesdayBreak: data.wednesdayBreak ?? "",
          thursdayBreak: data.thursdayBreak ?? "",
          fridayBreak: data.fridayBreak ?? "",
          saturday: data.saturday ?? "Zavřeno",
          sunday: data.sunday ?? "Zavřeno",
          saturdayBreak: data.saturdayBreak ?? "",
          sundayBreak: data.sundayBreak ?? "",
          closedOffice: data.closedOffice ?? false,
          closedReason: data.closedReason ?? "",
          closedUntil: data.closedUntil ?? "",
          replacements: Array.isArray(data.replacements)
            ? data.replacements.map((r: Replacement) => ({ name: r.name ?? "", contact: r.contact ?? "", address: r.address ?? "" }))
            : [],
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("AdminPanel: Chyba při načítání:", err);
        setLoading(false);
        setMessage("Chyba při načítání dat. Zkuste obnovit stránku.");
        setMessageType("error");
      });
  }, [navigate]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!hours) return;
    
    setMessage("");
    const token = localStorage.getItem("adminToken");
    
    if (!token) {
      setMessage("Nejste přihlášeni. Přesměrovávám...");
      setMessageType("error");
      setTimeout(() => navigate("/admin"), 2000);
      return;
    }

    try {
      console.log("Ukládám ordinační dobu:", hours);
      const res = await fetch("/api/hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, data: hours }),
      });

      console.log("Odpověď při ukládání:", res.status);

      if (res.ok) {
        const result = await res.json();
        console.log("Výsledek ukládání:", result);
        setMessage("Úspěšně uloženo!");
        setMessageType("success");
        setTimeout(() => setMessage(""), 3000);
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error("Chyba při ukládání:", errorData);
        setMessage(`Chyba při ukládání: ${errorData.error || res.statusText}`);
        setMessageType("error");
      }
    } catch (err) {
      console.error("Chyba při ukládání:", err);
      setMessage("Chyba při ukládání. Zkuste to znovu.");
      setMessageType("error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Načítání ordinační doby...</p>
        </div>
      </div>
    );
  }
  
  if (!hours) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Chyba načítání dat.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Obnovit stránku
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-medium text-gray-900">
            Správa ordinační doby
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoHome}
              className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              Hlavní menu
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Odhlásit se
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { key: "monday" as const, breakKey: "mondayBreak" as const, label: "Pondělí" },
                { key: "tuesday" as const, breakKey: "tuesdayBreak" as const, label: "Úterý" },
                { key: "wednesday" as const, breakKey: "wednesdayBreak" as const, label: "Středa" },
                { key: "thursday" as const, breakKey: "thursdayBreak" as const, label: "Čtvrtek" },
                { key: "friday" as const, breakKey: "fridayBreak" as const, label: "Pátek" },
                { key: "saturday" as const, breakKey: "saturdayBreak" as const, label: "Sobota" },
                { key: "sunday" as const, breakKey: "sundayBreak" as const, label: "Neděle" },
              ].map(({ key, breakKey, label }) => {
                const value = hours[key] ?? "";
                const breakValue = hours[breakKey] ?? "";
                const isClosed = String(value).trim().toLowerCase() === "zavřeno";
                return (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={String(value)}
                        onChange={(e) => setHours({ ...hours, [key]: e.target.value })}
                        disabled={isClosed}
                        placeholder={isClosed ? "" : "např. 7:00 - 15:30"}
                        className={`flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none ${isClosed ? "bg-gray-100 text-gray-500" : ""}`}
                      />
                      <label className="flex items-center gap-2 shrink-0 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isClosed}
                          onChange={(e) =>
                            setHours({
                              ...hours,
                              [key]: e.target.checked ? "Zavřeno" : "",
                            })
                          }
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Zavřeno</span>
                      </label>
                    </div>
                    {!isClosed && (
                      <input
                        type="text"
                        value={String(breakValue)}
                        onChange={(e) => setHours({ ...hours, [breakKey]: e.target.value })}
                        placeholder="Polední přestávka (např. 12:00 - 12:30)"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Poznámka (zobrazí se pod hodinami)</label>
              <input
                type="text"
                value={hours.note}
                onChange={(e) => setHours({ ...hours, note: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>

            {/* Zavřená ordinace */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setHours({ ...hours, closedOffice: !hours.closedOffice })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-medium transition-colors ${
                    hours.closedOffice
                      ? "bg-amber-50 border-amber-400 text-amber-800"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <DoorClosed className="w-5 h-5" />
                  Zavřená ordinace
                </button>
                {hours.closedOffice && (
                  <span className="text-sm text-amber-700">(zobrazí se návštěvníkům)</span>
                )}
              </div>
              {hours.closedOffice && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Platné do (datum) – po tomto datu se zobrazí běžné okno, nevyplněno = zrušíte jen ručně</label>
                    <input
                      type="date"
                      value={hours.closedUntil ?? ""}
                      onChange={(e) => setHours({ ...hours, closedUntil: e.target.value })}
                      className="mt-1 w-full max-w-xs px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Důvod zavření (např. dovolená, nemoc)</label>
                    <textarea
                      value={hours.closedReason ?? ""}
                      onChange={(e) => setHours({ ...hours, closedReason: e.target.value })}
                      placeholder="Např. Dovolená 1.–15. 8."
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Náhrada / na koho se obrátit (seznam)</label>
                    <div className="space-y-3">
                      {(hours.replacements ?? []).map((r, i) => (
                        <div key={i} className="space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={r.name}
                              onChange={(e) => {
                                const next = [...(hours.replacements ?? [])];
                                next[i] = { ...next[i], name: e.target.value };
                                setHours({ ...hours, replacements: next });
                              }}
                              placeholder="Název / jméno (např. MUDr. Novák)"
                              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setHours({ ...hours, replacements: (hours.replacements ?? []).filter((_, j) => j !== i) })}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Odebrat"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={r.contact}
                            onChange={(e) => {
                              const next = [...(hours.replacements ?? [])];
                              next[i] = { ...next[i], contact: e.target.value };
                              setHours({ ...hours, replacements: next });
                            }}
                            placeholder="Telefon / e-mail"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                          <input
                            type="text"
                            value={r.address ?? ""}
                            onChange={(e) => {
                              const next = [...(hours.replacements ?? [])];
                              next[i] = { ...next[i], address: e.target.value };
                              setHours({ ...hours, replacements: next });
                            }}
                            placeholder="Adresa ordinace"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setHours({ ...hours, replacements: [...(hours.replacements ?? []), { name: "", contact: "", address: "" }] })}
                        className="flex items-center gap-2 text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors font-medium text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Přidat náhradu
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              {message && (
                <span className={`font-medium ${
                  messageType === "success" ? "text-green-600" : "text-red-600"
                }`}>
                  {message}
                </span>
              )}
              <button
                type="submit"
                className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors ml-auto"
              >
                <Save className="w-5 h-5" />
                Uložit změny
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
