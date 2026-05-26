# BA Team – Dokumentációs oldal frissítése és GitHub Pages publikálás

Ez a leírás elmagyarázza, hogyan kell a dokumentációs oldalt frissíteni és közzétenni.

---

## Repo struktúra

A dokumentáció két repo között van felosztva:

| Repo | Tartalom | Elérési út |
|---|---|---|
| `ba-team/app` | Forrásfájlok — skillek, ügynökök, README-k, devdocs | `e:\Projects\ba-team\app\` |
| `ba-team/docs` | Docs oldal — `index.html`, CSS, JS + tükörmásolt MD fájlok | `e:\Projects\ba-team\docs\` |

**Szerkesztési szabály:** Mindig a `app/` repo forrásait módosítsd. A `docs/`-ban lévő `.md` fájlokat soha ne szerkeszd közvetlenül — a szkript felülírja őket.

---

## Másolási szkript

```bash
python scripts/copy_readmes.py
```

A szkript a `docs/` mappába másol mindent. Output:

```
-> E:\Projects\ba-team\docs
   README.md
   HANDBOOK.md
   devdocs/
   .claude/agents/README.md
   ...
   N items synced
```

**Mit másol:**

| Forrás (`app/`) | Cél (`docs/`) | Módszer |
|---|---|---|
| `README.md`, `README.en.md` | gyökér | fájl-egyenként |
| `HANDBOOK.md`, `AGENTS.md`, `CLAUDE.md` | gyökér | fájl-egyenként |
| `devdocs/` | `devdocs/` | teljes mappa (rmtree + copytree) |
| `.claude/agents/README*.md` | `.claude/agents/` | glob pattern |
| `.claude/skills/*/README*.md` | `.claude/skills/*/` | glob pattern |

---

## Lépések: dokumentáció frissítése és közzététele

### 1. Forrásanyag szerkesztése (`app/` repóban)

```
README.md
HANDBOOK.md
devdocs/troubleshooting.md
devdocs/performance.md
devdocs/improvements.md
.claude/agents/README.md
.claude/skills/*/README.md
```

### 2. Tükörmásolás futtatása

```bash
python scripts/copy_readmes.py
```

### 3. Helyi ellenőrzés

```bash
cd e:\Projects\ba-team\docs
python -m http.server 8080
```

Nyisd meg: [http://localhost:8080](http://localhost:8080)

> Böngészőből közvetlenül (`file://`) nem működik — a `fetch()` CORS hibát dob.

### 4. Commit és push — mindkét repóban

```bash
# app/ repo — forrásváltozások
cd e:\Projects\ba-team\app
git add .
git commit -m "docs: ..."
git push

# docs/ repo — tükörmásolt tartalom
cd e:\Projects\ba-team\docs
git add .
git commit -m "docs: sync from app"
git push
```

GitHub Pages automatikusan újrabuildi az oldalt (1–2 perc).

---

## GitHub Pages konfigurálása (egyszer)

1. Menj a `docs` GitHub oldalára → **Settings** → **Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `master` (vagy `main`) — **Folder:** `/` (root)
4. Mentés

---

## Webapp fájlok szerkesztése (`docs/`)

A `docs/` repo webapp fájljai (`index.html`, `styles/style.css`, `scripts/app.js`) **nem** másolódnak a szkripttel — ezeket közvetlenül kell szerkeszteni a `docs/` repóban.

### Új oldal hozzáadása a navigációhoz

**1. `docs/scripts/app.js` — route hozzáadása:**

```javascript
const routes = {
    // ... meglévő route-ok ...
    'uj-oldal': './devdocs/uj_oldal.md'
};
```

**2. `docs/index.html` — navigációs link:**

Egyszerű link:
```html
<li><a href="#uj-oldal"><i class="fas fa-file-alt"></i> Új oldal</a></li>
```

Almenübe (pl. Hibaelhárítás alá — ld. `troubleshootingSubmenu`):
```html
<li><a href="#uj-oldal">Új oldal</a></li>
```

**3. Ha új almenüt kell létrehozni** — másold a Hibaelhárítás almenü mintáját:

`index.html`:
```html
<li class="has-submenu" id="ujMenuMenu">
    <a href="javascript:void(0)" id="ujMenuToggle">
        <i class="fas fa-folder"></i> Cím <i class="fas fa-chevron-down toggle-icon"></i>
    </a>
    <ul class="submenu" id="ujMenuSubmenu">
        <li><a href="#oldal-1">Oldal 1</a></li>
        <li><a href="#oldal-2">Oldal 2</a></li>
    </ul>
</li>
```

`app.js` — toggle + auto-nyitás (a `troubleshootingToggle` minta alapján):
```javascript
const ujMenuToggle = document.getElementById('ujMenuToggle');
const ujMenuSubmenu = document.getElementById('ujMenuSubmenu');
const ujMenuMenu = document.getElementById('ujMenuMenu');

ujMenuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    ujMenuSubmenu.classList.toggle('open');
    ujMenuMenu.classList.toggle('open');
});

// loadPage()-ben az automatikus megnyitáshoz:
if (page === 'oldal-1' || page === 'oldal-2') {
    ujMenuSubmenu.classList.add('open');
    ujMenuMenu.classList.add('open');
}
```

---

## Struktúra összefoglaló

```
docs/               ← GitHub Pages root
├── index.html              ← Webalkalmazás belépési pontja (kézzel szerkesztendő)
├── styles/style.css        ← CSS (kézzel szerkesztendő)
├── scripts/app.js          ← Routing, Markdown rendering (kézzel szerkesztendő)
├── assets/                 ← PDF-ek, audio, képek (kézzel szerkesztendő)
├── .nojekyll               ← GitHub Pages Jekyll letiltása
│
│   ── Alább: copy_readmes.py által másolt tartalom ──
├── README.md
├── HANDBOOK.md
├── AGENTS.md
├── CLAUDE.md
├── devdocs/
│   ├── troubleshooting.md
│   ├── performance.md
│   ├── deploy_docs.md
│   └── improvements.md
└── .claude/
    ├── agents/README.md
    └── skills/*/README.md
```
