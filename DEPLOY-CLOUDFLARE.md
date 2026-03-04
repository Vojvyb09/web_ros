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

## 4. API token pro deploy (jen když používáte Deploy command)

**Pokud nechcete vytvářet token:** v Build configuration **nenechávejte vyplněný Deploy command** – nechte ho prázdný. Cloudflare sám nasadí výstup z buildu (`dist`) a token nepotřebujete.

Následující postup je jen pro případ, že máte nebo chcete používat **Deploy command** (`npx wrangler pages deploy ...`). Pak build potřebuje **API token s oprávněním na Pages**, jinak dostanete *Authentication error [code: 10000]*.

1. **Vytvořte token:** [Cloudflare Dashboard](https://dash.cloudflare.com/) → **My Profile** (ikona osoby vpravo nahoře) → **API Tokens** → **Create Token**.
2. Zvolte šablonu **Edit Cloudflare Workers** nebo **Create Custom Token** a přidejte oprávnění:
   - **Account** → **Cloudflare Pages** → **Edit**
   - (Volitelně: Account → Workers KV Storage → Edit, pokud chcete spravovat KV z tokenu.)
3. **Create Token** a zkopírujte vygenerovaný token (zobrazí se jen jednou).
4. **Do projektu Pages:** **Workers & Pages** → váš projekt **webros** → **Settings** → **Builds & deployments** → **Build configuration** → **Environment variables** (Build-time).
5. Přidejte proměnnou:
   - **Variable name:** `CLOUDFLARE_API_TOKEN`
   - **Value:** vložte zkopírovaný token  
   (zaškrtněte **Encrypt** / „Sensitive“, aby se hodnota neměnila v logu.)
6. Uložte a spusťte nový deploy (např. **Retry deployment** nebo nový push).

---

## 4b. Když token pořád nefunguje (chyba 10000)

Máte token i proměnnou nastavené, ale deploy stále padá na *Authentication error [code: 10000]*? Zkuste jednu z těchto cest.

### Varianta A: No-op v Deploy command

Cloudflare u standardního Git projektu sám nahrává obsah **Build output directory** po úspěšném buildu. Deploy command může být jen „nic nedělej“.

1. **Build configuration** → **Deploy command** změňte na:
   ```bash
   true
   ```
   (Příkaz `true` jen vrátí úspěch a nic nespustí.)
2. Uložte a spusťte **Retry deployment**.
3. Pokud build projde a na stránce se objeví nová verze, Cloudflare výstup nahrál sám a další nic řešit nemusíte.

### Varianta B: Deploy přes GitHub Actions

Nasazení proběhne z GitHubu; token dáte do **GitHub Secrets**, ne do Cloudflare.

1. Na GitHubu: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
2. Přidejte dva secrety:
   - **Name:** `CLOUDFLARE_API_TOKEN`  
     **Value:** váš API token (s oprávněním Cloudflare Pages – Edit).
   - **Name:** `CLOUDFLARE_ACCOUNT_ID`  
     **Value:** ID účtu (v Dashboardu v URL nebo Workers & Pages vpravo – např. `3dd428a239dcfb5bcc7477aa4663dbe3`).
3. V repozitáři je workflow **`.github/workflows/deploy-pages.yml`** – při pushi na `main` se spustí build a deploy na projekt **webros**.
4. V Cloudflare u projektu **webros** nastavte **Deploy command** na `true` (viz varianta A), aby Cloudflare build nepadal. Skutečné nasazení pak dělá jen GitHub Actions.

Po prvním pushi na `main` se deploy spustí v záložce **Actions** na GitHubu. Pokud běží zeleně, stránka je nasazená.

---

## 5. Vytvoření projektu a nasazení

### A) Přes Git (doporučeno – automatické deploye po pushi)

1. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Vyberte repozitář (GitHub/GitLab) a projekt **web_ros**.
3. **Build settings** (důležité):
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** (prázdné)
   - **Deploy command:** **Nechte prázdné.** Cloudflare automaticky nasadí obsah složky `dist` – žádný API token ani Wrangler v buildu nepotřebujete.  
  Pokud tam už máte `npx wrangler pages deploy ...`, **smažte to** a pole nechte prázdné – deploy bude fungovat bez tokenu.
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
   npx wrangler pages project create webros
   npx wrangler pages deploy dist --project-name=webros
   ```
4. Heslo do adminu nastavte v Dashboardu (krok 3).

---

## 6. Po nasazení

- Stránka poběží na adrese typu: `https://webros.pages.dev` (nebo vlastní doména, kterou v Pages nastavíte).
- **Admin:** `https://vase-adresa.pages.dev/admin` – přihlášení heslem (výchozí `admin`, nebo to, které jste nastavili jako `ADMIN_PASSWORD`).
- Ordinační doba a „zavřená ordinace“ se ukládají do KV; po změně v adminu se hned projeví na webu.

---

## 7. (Volitelně) První naplnění ordinačních hodin

- Po prvním deployi je KV prázdné – stránka použije výchozí hodiny z kódu.
- Přihlaste se do adminu a jednou uložte ordinační dobu (včetně náhrad, poznámek atd.) – tím se data zapíší do KV a dál se budou načítat odtud.

---

## Shrnutí

| Krok | Co udělat |
|------|-----------|
| 1 | Účet Cloudflare, `wrangler login` |
| 2 | Vytvořit KV namespace, zkopírovat **id** a doplnit do **wrangler.toml** |
| 3 | V projektu Pages nastavit Secret **ADMIN_PASSWORD** (nebo nechat výchozí `admin`) |
| 4 | **Connect to Git:** build `npm run build`, output `dist`, **Deploy command nechat prázdné** (bez tokenu) |
| 5 | Otevřít stránku a `/admin`, přihlásit se a případně uložit ordinační dobu |

Problémy s buildem nebo s tím, že se neukládají hodiny, bývají kvůli chybějícímu nebo špatnému **KV namespace id** v **wrangler.toml** nebo kvůli tomu, že projekt nepoužívá Wrangler config (Settings → Functions).
