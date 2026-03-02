import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Save, LogOut, Home } from "lucide-react";

interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  note: string;
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
        setHours(data);
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pondělí</label>
                <input
                  type="text"
                  value={hours.monday}
                  onChange={(e) => setHours({ ...hours, monday: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Úterý</label>
                <input
                  type="text"
                  value={hours.tuesday}
                  onChange={(e) => setHours({ ...hours, tuesday: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Středa</label>
                <input
                  type="text"
                  value={hours.wednesday}
                  onChange={(e) => setHours({ ...hours, wednesday: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Čtvrtek</label>
                <input
                  type="text"
                  value={hours.thursday}
                  onChange={(e) => setHours({ ...hours, thursday: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pátek</label>
                <input
                  type="text"
                  value={hours.friday}
                  onChange={(e) => setHours({ ...hours, friday: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
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
