# Nasazení na Cloudflare Pages

Projekt je připraven na spuštění na **Cloudflare Pages** (frontend + API přes Functions a KV). Postup níže.

---

## 1. Účet a Wrangler

- Založte si účet na [Cloudflare](https://dash.cloudflare.com/) (free stačí).
- Nainstalujte Wrangler (jednou na počítači):
  ```bash
  npm install -g wrangler
  ```
- Přihlaste se:
  ```bash
  wrangler login
  ```

---

## 2. KV namespace (úložiště pro ordinační dobu)

- V **Cloudflare Dashboard**: **Workers & Pages** → v levém menu **KV** → **Create namespace**.
- Název např. `web-ros-hours` → Create.
- Otevřete vytvořený namespace a zkopírujte **Namespace ID** (např. `abc123...`).
- Do projektu v souboru **`wrangler.toml`** nahraďte řádek:
  ```toml
  id = "DOPLNTE_ID_NAMESPACE"
  ```
  skutečným ID, např.:
  ```toml
  id = "abc123vase_id_zkopirovane_z_dashboardu"
  ```

---

## 3. Heslo do adminu (Secret)

- V **Cloudflare Dashboard**: **Workers & Pages** → váš projekt (vytvoříte v kroku 4) → **Settings** → **Functions**.
- V sekci **Environment variables** (Production i Preview):
  - Klikněte **Add** (nebo **Encrypt**).
  - **Variable name:** `ADMIN_PASSWORD`
  - **Value:** vaše heslo do adminu (např. jiné než výchozí `admin`).
- Uložte (Encrypt = uložení jako Secret).

*(Pokud Secret nenastavíte, použije se v kódu výchozí heslo `admin`.)*

---

## 4. Vytvoření projektu a nasazení

### A) Přes Git (doporučeno – automatické deploye po pushi)

1. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Vyberte repozitář (GitHub/GitLab) a projekt **web_ros**.
3. **Build settings:**
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** (prázdné)
4. **Save and Deploy**.
5. Po prvním nasazení:
   - **Settings** → **Functions** → ujistěte se, že projekt používá **Wrangler configuration file** (váš `wrangler.toml`).
   - Doplňte v **wrangler.toml** správné **KV namespace id** (krok 2) a podle potřeby nastavte **ADMIN_PASSWORD** (krok 3).
6. Při dalším pushi do repozitáře se nasadí nová verze automaticky.

### B) Nasazení z příkazové řádky (Direct Upload)

1. V projektu spusťte build:
   ```bash
   npm run build
   ```
2. V **wrangler.toml** doplňte **id** KV namespace (krok 2).
3. Vytvořte projekt a nasaďte:
   ```bash
   npx wrangler pages project create web-ros
   npx wrangler pages deploy dist --project-name=web-ros
   ```
4. Heslo do adminu nastavte v Dashboardu (krok 3).

---

## 5. Po nasazení

- Stránka poběží na adrese typu: `https://web-ros.pages.dev` (nebo vlastní doména, kterou v Pages nastavíte).
- **Admin:** `https://vase-adresa.pages.dev/admin` – přihlášení heslem (výchozí `admin`, nebo to, které jste nastavili jako `ADMIN_PASSWORD`).
- Ordinační doba a „zavřená ordinace“ se ukládají do KV; po změně v adminu se hned projeví na webu.

---

## 6. (Volitelně) První naplnění ordinačních hodin

- Po prvním deployi je KV prázdné – stránka použije výchozí hodiny z kódu.
- Přihlaste se do adminu a jednou uložte ordinační dobu (včetně náhrad, poznámek atd.) – tím se data zapíší do KV a dál se budou načítat odtud.

---

## Shrnutí

| Krok | Co udělat |
|------|-----------|
| 1 | Účet Cloudflare, `wrangler login` |
| 2 | Vytvořit KV namespace, zkopírovat **id** a doplnit do **wrangler.toml** |
| 3 | V projektu Pages nastavit Secret **ADMIN_PASSWORD** (nebo nechat výchozí `admin`) |
| 4 | Buď **Connect to Git** (build: `npm run build`, output: `dist`), nebo `wrangler pages deploy dist` |
| 5 | Otevřít stránku a `/admin`, přihlásit se a případně uložit ordinační dobu |

Problémy s buildem nebo s tím, že se neukládají hodiny, bývají kvůli chybějícímu nebo špatnému **KV namespace id** v **wrangler.toml** nebo kvůli tomu, že projekt nepoužívá Wrangler config (Settings → Functions).
