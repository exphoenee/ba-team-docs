# BA Team – Legyél Te a főnök egy 7 fős AI csapat felett!

[English version](README.en.md) | [Kézikönyv](HANDBOOK.md)

> **Ne csak használd az AI-t – irányítsd!** 🚀
>
> Ezzel a workflow-val nem egy egyszerű chat-botot kapsz, hanem egy komplett, specializált Business Analyst csapatot, akiknek Te vagy a vezetője. Miközben Te a stratégiai döntésekre és az ügyfélkapcsolatokra fókuszálsz, az AI kollégáid elvégzik a munka nehezét:
>
> 1. 📋 **Orchestrator**: A projektmenedzsered, aki összefogja a szálakat és tudja, hol tartotok.
> 2. 🔍 **Discovery Agent**: A Discovery specialistád, aki korai anyagokból Business Concept dokumentumot és kérdéslistát állít elő — sosem blokkolja a munkát nyitott kérdések miatt.
> 3. 🏗️ **Extraction Agent**: A precíz elemződ, aki a nyers jegyzetekből tűpontos specifikációt farag.
> 4. ✍️ **BA Document Agent**: A technikai íród, aki BRD-ket, User Story-kat és folyamatábrákat gyárt.
> 5. 🔬 **RCA Agent**: A diagnosztikád, aki megmutatja, hol érdemes beavatkozni — oksági láncok, hurkok és driver/tünet besorolás.
> 6. 🔎 **Validation Agent**: A minőségőröd, aki az RCA után, dokumentumgenerálás előtt ellenőrzi, hogy minden kötelező elem megvan-e.
> 7. 📂 **File Converter**: Az adat-specialistád, aki bármilyen Office fájlt másodpercek alatt AI-kész formátumra hoz.
> 8. 🧠 **Memory Agent**: A stratégiai tanácsadód, aki egyetlen döntést vagy stakeholder adatot sem felejt el.
>
> **Emeld a hatékonyságodat a következő szintre: delegálj a BA Team-nek, és koncentrálj a valódi értékteremtésre!**

---

Ez a repository Claude AI-hoz készített skilleket és ügynököket tartalmaz, amelyek célja a **Business Analyst kollégák munkájának támogatása** az IT projektek teljes requirements engineering folyamatán át.

A részletes használati útmutató, parancsleírások, workflow-magyarázat és GYIK a **[Kézikönyvben](HANDBOOK.md)** található.

Mivel az AI a markdown fájlokat preferálja, ezért egy markdown szerkesztő és olvasó applikáció beszerzése a mint pl. a TypeDown a Microsoft Storeból erőssen ajánlott, és vagy a VS Code Markdown Preview Mermaid Support kiegészítő is.

---

## Telepítési útmutató

> Ez az útmutató nem igényel programozói ismereteket.

### A) Automatikus telepítés – egy paranccsal

A legegyszerűbb módszer: futtasd a telepítő szkriptet, amely mindent automatikusan feltelepít és konfigurál.

**Windows – PowerShell:**
```powershell
.\install.ps1
```

**Mac – Terminal:**
```bash
bash install.sh
```

**Mit telepít a szkript:**

| Eszköz | Mire való |
|---|---|
| Git | Verziókezelés, projekt letöltése |
| Visual Studio Code | Szövegszerkesztő, Claude beépülő |
| Python | Fájlkonverziókhoz szükséges |
| markitdown[docx] | Word (.docx) → Markdown |
| openpyxl | Excel (.xlsx) → Markdown |
| extract-msg | Outlook (.msg) → Markdown |
| Claude Code (VS Code ext.) | Az AI beépülő |
| Markdown Preview Mermaid Support | Folyamatábrák megjelenítéséhez |
| Markdown All in One | Markdown szerkesztéshez |

> A szkript idempotens — újrafuttatható, csak azt telepíti, ami még hiányzik.

---

### B) Manuális telepítés – lépésről lépésre

Ha a szkript helyett kézzel szeretnéd elvégezni a telepítést, kövesd az alábbi lépéseket sorban.

#### Amire szükséged lesz

| Eszköz | Mire való | Ár |
|---|---|---|
| GitHub fiók | A projekt tárolása és letöltése | Ingyenes |
| Visual Studio Code | Szövegszerkesztő, amelybe a Claude beépül | Ingyenes |
| Claude fiók | Az AI motor, amely a munkát végzi | Ingyenes / Pro |

---

#### 1. lépés – GitHub fiók létrehozása

1. Nyisd meg a böngészőt és menj a **[github.com](https://github.com)** oldalra
2. Kattints a **Sign up** gombra jobb felül
3. Add meg az e-mail címedet, válassz egy jelszót és egy felhasználónevet
4. Kövesd az e-mailes megerősítési lépéseket
5. Ha kész, be vagy jelentkezve a GitHubra

---

#### 2. lépés – Saját projekt létrehozása a sablonból

Ez a repository **sablon (template)**, tehát egyetlen kattintással létrehozhatsz belőle egy saját, független másolatot.

1. Menj a sablon repository oldalára GitHubon *(a csapatvezetőd elküldi a linket)*
2. Kattints a zöld **Use this template** gombra *(jobb felső sarok)*
3. Válaszd a **Create a new repository** lehetőséget
4. Töltsd ki az adatokat:
   - **Repository name**: adj egy nevet a projektednek, pl. `projekt-biztosito-rendszer`
   - **Visibility**: válaszd a **Private** lehetőséget *(privát marad)*
5. Kattints a **Create repository** gombra
6. Megnyílik az új, saját repository oldalad

> Minden BA kolléga a saját projektjéhez létrehoz egy ilyen saját másolatot. Az eredeti sablont nem módosítja senki.

---

#### 3. lépés – Visual Studio Code telepítése

1. Nyisd meg a **[code.visualstudio.com](https://code.visualstudio.com)** oldalt
2. Kattints a nagy kék **Download** gombra
   - Windows: `.exe` telepítőt tölt le
   - Mac: `.dmg` fájlt tölt le
3. Nyisd meg a letöltött fájlt és kövesd a telepítő utasításait
   - Windowson: hagyd bejelölve a *„Add to PATH"* és *„Open with Code"* opciókat
4. Indítsd el a VS Code-ot — megjelenik egy üdvözlő képernyő

---

#### 4. lépés – Claude Code bővítmény telepítése

A Claude Code az a bővítmény, amely az AI-t beépíti a VS Code-ba.

1. VS Code-ban kattints a bal oldali sávban a négyzetes **Extensions** ikonra (vagy nyomj `Ctrl+Shift+X` / `Cmd+Shift+X` Mac-en)
2. A keresőmezőbe írd be: `Claude Code`
3. Keresd meg a **Claude Code** bővítményt *(kiadó: Anthropic)*
4. Kattints az **Install** gombra
5. Telepítés után kattints a bal oldali sávban megjelenő **Claude** ikonra
6. Kattints a **Sign in** gombra és jelentkezz be a Claude fiókoddal *(ha nincs fiókod, a **[claude.ai](https://claude.ai)** oldalon tudod létrehozni)*

---

#### 5. lépés – Markdown előnézeti bővítmények telepítése

A BA dokumentumok Markdown formátumban készülnek, és tartalmaznak Mermaid folyamatábrákat. Két bővítményre van szükség a szép megjelenítéshez.

**5a. Markdown Preview Mermaid Support** *(folyamatábrák megjelenítéséhez)*

1. Extensions panelen (`Ctrl+Shift+X`) keresd meg: `Markdown Preview Mermaid Support`
2. Kiadó: **Matt Bierner**
3. Kattints az **Install** gombra

**5b. Markdown All in One** *(kényelmes markdown szerkesztéshez)*

1. Extensions panelen keresd meg: `Markdown All in One`
2. Kiadó: **Yu Zhang**
3. Kattints az **Install** gombra

> **Hogyan nézheted meg a dokumentumokat?** Nyiss meg egy `.md` fájlt, majd nyomj `Ctrl+Shift+V` (Windows) / `Cmd+Shift+V` (Mac) billentyűt — megnyílik a szép formázott előnézet, benne a folyamatábrákkal.

---

#### 6. lépés – A projekt letöltése VS Code-ba

1. VS Code-ban nyomj `Ctrl+Shift+P` (Windows) / `Cmd+Shift+P` (Mac) billentyűt
2. Írd be: `Git: Clone` és nyomj Entert
3. Kattints a **Clone from GitHub** lehetőségre
4. Ha először csinálod: VS Code megkér, hogy jelentkezz be GitHubra — kattints az **Allow** gombra és kövesd a böngészőben megjelenő lépéseket
5. A keresőmezőben keresd meg a saját repository nevedet *(amit a 2. lépésben hoztál létre)*
6. Válaszd ki, majd válaszd ki, **hová** mentse a számítógépeden *(pl. Dokumentumok mappa)*
7. Kattints az **Open** gombra — megnyílik a projekt VS Code-ban

---

#### 7. lépés – Python és konverziós könyvtárak telepítése *(opcionális)*

> Ez a lépés **nem kötelező**. Ha csak `.md`, `.txt` vagy `.pdf` fájlokat használsz, kihagyhatod.
> Ha Word, Excel vagy Outlook fájlokat is be szeretnél adni a rendszernek, ez szükséges.

**Támogatott fájlformátumok:**

| Fájltípus | Szükséges eszköz |
|---|---|
| Word (.docx) | Python + markitdown[docx] |
| Excel (.xlsx) | Python + openpyxl |
| Outlook (.msg) | Python + extract-msg |
| E-mail (.eml) | Python stdlib (külön csomag nem kell) |
| PDF (.pdf) | Python + markitdown[pdf] *(Claude natívan is olvassa, konverzió opcionális)* |
| PowerPoint (.pptx) | Python + markitdown + python-pptx |
| Képek (.png, .jpg, .bmp, .webp) | AI alapú – nincs szükség Python könyvtárra |

**7a. Python telepítése**

*Windows:*
1. Töltsd le a **[python.org/downloads](https://www.python.org/downloads/)** oldalról
2. **Fontos:** jelöld be az **„Add Python to PATH"** jelölőnégyzetet telepítés előtt

*Mac:*
```bash
brew install python
```

**7b. Python könyvtárak telepítése**

```
pip install "markitdown[docx,pdf]" openpyxl extract-msg python-pptx
```

**Ellenőrzés:**
```
pip show markitdown openpyxl extract-msg
```

---

#### 8. lépés – Első indítás ellenőrzése

1. VS Code-ban nyisd meg a Claude panelt *(bal oldali sáv, Claude ikon)*
2. Az alsó beviteli mezőbe írd be: `/session-loader`
3. Nyomj Entert
4. A Claude megmutatja a projekt aktuális állapotát:
   ```
   ============================================================
     BA WORKFLOW – SESSION LOADER
   ============================================================
     PROJEKT
     Név:    –
     ...
     JAVASOLT KÖVETKEZŐ LÉPÉS
     ⚠️  Nincs bemeneti anyag.
        → Másolj fájlokat a workflow/01_project_info/ mappába
   ============================================================
   ```
5. Ha ezt látod, az alap telepítés sikeres.

> **Python ellenőrzése:** Ha telepítetted a Pythont (7. lépés), a Claude panelen írd be: `/convert` — ha a rendszer jelzi, hogy nincs konvertálandó fájl, a Python és a könyvtárak is működnek.
