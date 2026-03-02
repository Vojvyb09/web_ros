import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Loader2 } from "lucide-react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      console.log("Odesílám přihlášení...");
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("Odpověď serveru:", res.status, res.statusText);

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Nesprávné heslo");
        }
        throw new Error(`Chyba serveru: ${res.status}`);
      }

      const data = await res.json();
      console.log("Data z serveru:", data);

      if (data.success) {
        console.log("Ukládám token:", data.token);
        localStorage.setItem("adminToken", data.token);
        console.log("Token uložen, přesměrovávám na /admin/panel");
        // Použijeme window.location pro jistotu, že se stránka skutečně přenačte
        window.location.href = "/admin/panel";
      } else {
        throw new Error(data.message || "Přihlášení selhalo");
      }
    } catch (err: any) {
      console.error("Chyba při přihlášení:", err);
      if (err.name === 'AbortError') {
        setError("Časový limit vypršel. Server neodpovídá.");
      } else {
        setError(err.message || "Chyba spojení se serverem.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkHealth = async () => {
    try {
      const res = await fetch("/api/health");
      if (res.ok) {
        alert("Server je dostupný!");
      } else {
        alert("Server neodpovídá správně.");
      }
    } catch (err) {
      alert("Nelze se spojit se serverem.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-serif font-medium text-center text-gray-900 mb-6">
          Přihlášení do administrace
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heslo
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Zadejte heslo"
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Přihlašování...
              </>
            ) : (
              "Přihlásit se"
            )}
          </button>
          
          <button 
            type="button" 
            onClick={checkHealth}
            className="w-full text-xs text-gray-400 hover:text-gray-600 mt-4"
          >
            Zkontrolovat dostupnost serveru
          </button>
        </form>
      </div>
    </div>
  );
}
