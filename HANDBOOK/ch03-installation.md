# 3. Telepítési útmutató

> Ez az útmutató nem igényel programozói ismereteket.

## 3.1 Automatikus telepítés

A legegyszerűbb módszer: futtasd a telepítő szkriptet, amely mindent automatikusan beállít.

**Windows – PowerShell:**
```powershell
.\install.ps1
```

**Mac – Terminal:**
```bash
bash install.sh
```

A szkript idempotens – újrafuttatható, csak azt telepíti, ami még hiányzik.

**Mit telepít a szkript:**

| Eszköz | Mire való |
|---|---|
| Git | Verziókezelés, projekt letöltése |
| Visual Studio Code | Szövegszerkesztő, Claude beépülő |
| Python | Fájlkonverziókhoz szükséges |
| markitdown[docx] | Word (.docx) → Markdown |
| openpyxl | Excel (.xlsx) → Markdown |
| extract-msg | Outlook (.msg) → Markdown |
| Claude Code (VS Code ext.) | Az AI beépülő modul |
| Markdown Preview Mermaid Support | Folyamatábrák megjelenítéséhez |
| Markdown All in One | Markdown szerkesztéshez |

---

## 3.2 Manuális telepítés lépésről lépésre

Ha a szkript helyett kézzel szeretnéd elvégezni a telepítést:

### Szükséges eszközök

| Eszköz | Mire való | Ár |
|---|---|---|
| GitHub fiók | A projekt tárolása és letöltése | Ingyenes |
| Visual Studio Code | Szövegszerkesztő | Ingyenes |
| TypeDown App | Markdown szerkesztés és megjelenítés | Ingyenes |
| Claude fiók | Az AI motor | Ingyenes / Pro |

---

### 1. lépés – GitHub fiók létrehozása

1. Nyisd meg a [github.com](https://github.com) oldalt
2. Kattints a **Sign up** gombra jobb felül
3. Add meg az e-mail címedet, jelszavadat és felhasználónevedet
4. Erősítsd meg az e-mail-es megerősítést
5. Bejelentkezés után kész vagy

---

### 2. lépés – Saját projekt létrehozása a sablonból

> A BA Team **sablon (template) repository** – egyetlen kattintással létrehozol belőle egy saját, független másolatot.

1. Menj a sablon repository oldalára GitHubon (a csapatvezetőd elküldi a linket)
2. Kattints a zöld **Use this template** gombra (jobb felső sarok)
3. Válaszd a **Create a new repository** lehetőséget
4. Töltsd ki az adatokat:
   - **Repository name**: pl. `projekt-biztosito-rendszer`
   - **Visibility**: válaszd a **Private** lehetőséget
5. Kattints a **Create repository** gombra

> **Fontos:** Minden BA kolléga a saját projektjéhez létrehoz egy ilyen saját másolatot. Az eredeti sablont senki nem módosítja.

---

### 3. lépés – Visual Studio Code telepítése

1. Nyisd meg a [code.visualstudio.com](https://code.visualstudio.com) oldalt
2. Kattints a nagy kék **Download** gombra
   - Windows: `.exe` telepítő
   - Mac: `.dmg` fájl
3. Futtasd a telepítőt – Windowson hagyd bejelölve az *„Add to PATH"* és *„Open with Code"* opciókat
4. Indítsd el a VS Code-ot

---

### 4. lépés – Claude Code bővítmény telepítése

1. VS Code-ban kattints az **Extensions** ikonra (bal oldali sáv) – vagy nyomj `Ctrl+Shift+X` (`Cmd+Shift+X` Mac-en)
2. Keresd: `Claude Code`
3. Kiadó: **Anthropic** – kattints az **Install** gombra
4. A bal oldali sávban megjelenik a Claude ikon – kattints rá
5. Kattints a **Sign in** gombra és jelentkezz be a Claude fiókoddal

---

### 5. lépés – Markdown bővítmények telepítése

A BA dokumentumok Markdown formátumban készülnek és Mermaid folyamatábrákat tartalmaznak. Két bővítményre van szükség:

**5a. Markdown Preview Mermaid Support**
- Keresd az Extensions panelen: `Markdown Preview Mermaid Support`
- Kiadó: **Matt Bierner** – telepítés

**5b. Markdown All in One**
- Keresd: `Markdown All in One`
- Kiadó: **Yu Zhang** – telepítés

> **Dokumentumok megtekintése:** Nyiss meg egy `.md` fájlt, nyomj `Ctrl+Shift+V` (Windows) / `Cmd+Shift+V` (Mac) – megnyílik a formázott előnézet a folyamatábrákkal.

---

### 6. lépés – A projekt letöltése VS Code-ba

1. VS Code-ban nyomj `Ctrl+Shift+P` (`Cmd+Shift+P` Mac-en)
2. Írd be: `Git: Clone` → Enter
3. Kattints: **Clone from GitHub**
4. Ha először csinálod: engedélyezd a GitHub bejelentkezést a böngészőben
5. Keresd meg a saját repository nevedet (2. lépésben hoztad létre)
6. Válaszd ki a mentési helyet (pl. Dokumentumok mappa)
7. Kattints az **Open** gombra – megnyílik a projekt

---

## 3.3 Python és fájlkonverziós könyvtárak (opcionális)

> Csak akkor szükséges, ha Word, Excel vagy Outlook fájlokat is be szeretnél adni a rendszernek.

**Támogatott fájlformátumok konverzióhoz:**

| Fájltípus | Szükséges eszköz |
|---|---|
| Word (.docx) | Python + markitdown[docx] |
| Excel (.xlsx) | Python + openpyxl |
| Outlook (.msg) | Python + extract-msg |
| E-mail (.eml) | Python stdlib (külön csomag nem kell) |
| PDF (.pdf) | Python + markitdown[pdf] |
| PowerPoint (.pptx) | Python + markitdown + python-pptx |

**Python telepítése:**

*Windows:*
1. Töltsd le: [python.org/downloads](https://www.python.org/downloads/)
2. **Fontos:** jelöld be az **„Add Python to PATH"** jelölőnégyzetet!

*Mac:*
```bash
brew install python
```

**Python könyvtárak telepítése:**
```
pip install "markitdown[docx,pdf]" openpyxl extract-msg python-pptx
```

**Ellenőrzés:**
```
pip show markitdown openpyxl extract-msg python-pptx
```

---

## 3.4 Első indítás ellenőrzése

1. VS Code-ban nyisd meg a Claude panelt (bal oldali sáv, Claude ikon)
2. Írd be: `/session-loader`
3. Nyomj Entert

Ha a rendszer megfelelően települt, az alábbi üzenetet látod:

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

> **Python ellenőrzése:** Írd be `/convert` – ha a rendszer jelzi, hogy nincs konvertálandó fájl, a Python is működik.
