# 20. AI-jogosultságok és biztonsági kockázatok

## 20.1 Áttekintés

A BA Tool Claude Code-re épül, amely egy **jogosultság-kezelő rendszeren** keresztül szabályozza, hogy az AI milyen fájlokat olvashat, írhat, és milyen terminálparancsokat futtathat. Ez a rendszer véd a véletlen adatvesztéstől és a nem kívánt módosításoktól, ugyanakkor a zökkenőmentes workflow érdekében bizonyos műveleteket előre engedélyezni kell.

A jogosultságok két szinten vannak konfigurálva:

| Szint | Fájl | Verziókezelt | Célja |
|---|---|---|---|
| **Projekt-szintű** | `.claude/settings.json` | ✅ Igen (git által) | A teljes csapat számára szükséges alapjogosultságok |
| **Helyi override** | `.claude/settings.local.json` | ❌ Nem (git-ignore) | Gépspecifikus kiegészítések, egyéni beállítások |

> ⚠️ **Fontos:** A `.claude/settings.local.json` fájlt soha ne commitold – a `.gitignore` automatikusan kizárja, de ellenőrizd, hogy nem került véletlenül a staging area-ba.

---

## 20.2 Jogosultság típusok

### Read (olvasás)

Meghatározza, hogy az AI milyen fájlokat és mappákat olvashat. Minden olvasási művelet előtt a rendszer ellenőrzi, hogy az elérési út illeszkedik-e valamelyik engedélyezett mintára.

**Példák:**
```json
"Read(workflow/01_project_info/**)",
"Read(workflow/05_ba_docs/**)",
"Read(.claude/agents/**)"
```

### Write (írás)

Meghatározza, hogy az AI hova hozhat létre vagy írhat felül fájlokat. Szigorúbban kell konfigurálni, mint a Read-et – csak azokra a helyekre adj írási jogot, ahol a workflow ténylegesen létrehoz fájlokat.

**Példák:**
```json
"Write(workflow/01_project_info/_system/**)",
"Write(workflow/05_ba_docs/**)",
"Write(workflow/03_answers/**)"
```

### Edit (célzott módosítás)

Meghatározza, hogy az AI milyen meglévő fájlokat módosíthat **célzott, részleges cserével**. Az `Edit` jogosultság a `Write`-tól **külön kezelt** – ha egy fájlhoz csak `Write(...)` van engedélyezve, az Edit-alapú módosításnál a rendszer külön engedélyt kér.

> **Megjegyzés:** A memóriafájlok frissítése tipikusan Edit műveleten alapul (a memory-agent meglévő bejegyzéseket ír felül célzottan). Ezért mind a `Write`, mind az `Edit` jogosultság szükséges a `.claude/memory/` mappára.

**Példák:**
```json
"Edit(.claude/memory/**)",
"Edit(workflow/05_ba_docs/**)"
```

### Bash (terminál parancsok)

Meghatározza, hogy az AI milyen shell parancsokat futtathat. A minták glob pattern alapján illeszkednek a teljes parancssorra.

**Példák:**
```json
"Bash(python .claude/scripts/get_path.py *)",
"Bash(python .claude/scripts/run_convert.py *)",
"Bash(sha256sum *)"
```

---

## 20.3 Mintaillesztés – hogyan működik?

A jogosultsági rendszer **glob pattern**-eket használ:

| Minta | Mit illeszt | Példa egyezés |
|---|---|---|
| `*` | Bármilyen karakter (új sor és `/` kivételével) | `Bash(python *)` → `python script.py --flag` |
| `**` | Bármilyen karakter, beleértve a `/`-t is | `Read(workflow/**)` → `workflow/01_project_info/file.md` |
| `**/*_converted.md` | Bármilyen mélységben, ami `_converted.md`-re végződik | `01_project_info/meeting.docx_converted.md` |

**Fontos szabályok:**
- A Bash minták a **teljes parancssort** illesztik, nem csak a program nevét
- A Read/Write minták a **fájl elérési útját** illesztik a projekt gyökeréhez képest
- A minták sorrendje nem számít – ha bármelyik minta illeszkedik, a művelet engedélyezett
- Ha egy művelet nem illeszkedik egyetlen engedélyezett mintára sem, Claude Code engedélyt kér a felhasználótól

> **Fontos:** A `settings.json`-t a rendszer **session indulásakor** olvassa be. Az aktív session közben végzett módosítások csak a következő session indításakor lépnek életbe – az éppen futó workflow-n nem lesz hatásuk.

---

## 20.4 Jelenlegi jogosultságok

### Projekt-szintű (`.claude/settings.json`)

**Read jogosultságok:**
| Minta | Cél |
|---|---|
| `Read(workflow/01_project_info/**)` | Bemeneti anyagok olvasása |
| `Read(workflow/02_discovery/**)` | Discovery kimenetek olvasása |
| `Read(workflow/03_answers/**)` | Válaszok olvasása |
| `Read(workflow/04_decisions/**)` | Döntések olvasása |
| `Read(workflow/05_ba_docs/**)` | Elkészült dokumentumok olvasása |
| `Read(workflow/REGULATION/**)` | Szabályozói megfelelőségi fájlok |
| `Read(.claude/memory/**)` | Projekt memória olvasása |
| `Read(.claude/agents/**)` | Agent definíciók (/help számára) |
| `Read(.claude/skills/**)` | Skill definíciók (/help számára) |
| `Read(.claude/references/**)` | Referencia fájlok (/check-state, /help) |
| `Read(HANDBOOK/**)` | Kézikönyv fejezetek (/help számára) |
| `Read(app/HANDBOOK/**)` | Alternatív útvonal a kézikönyvhöz |

**Write jogosultságok:**
| Minta | Cél |
|---|---|
| `Write(workflow/01_project_info/**/*_converted.md)` | Konvertált fájlok létrehozása (akár almappákban is) |
| `Write(workflow/01_project_info/_system/**)` | Spec kimenetek (_system mappa) |
| `Write(workflow/02_discovery/**)` | Discovery kimenetek |
| `Write(workflow/03_answers/**)` | Konvertált válasz fájlok |
| `Write(workflow/04_decisions/_system/**)` | Döntés log (_system mappa) |
| `Write(workflow/05_ba_docs/**)` | BA dokumentumok |
| `Write(.claude/memory/**)` | Projekt memória új fájljainak létrehozása |

**Edit jogosultságok:**
| Minta | Cél |
|---|---|
| `Edit(.claude/memory/**)` | Memóriafájlok meglévő bejegyzéseinek célzott módosítása |

**Bash jogosultságok:**
| Minta | Cél |
|---|---|
| `Bash(python .claude/scripts/get_path.py *)` | Konfigurációs útvonalak lekérése |
| `Bash(python .claude/scripts/workflow_state.py *)` | Stop hook állapotellenőrzés |
| `Bash(python .claude/scripts/session_loader.py *)` | Session betöltő |
| `Bash(python .claude/scripts/run_convert.py *)` | Fájlkonverzió |
| `Bash(python .claude/scripts/reset_project.py *)` | Projekt reset |
| `Bash(python .claude/scripts/fingerprint.py *)` | SHA-256 ujjlenyomat számítás |
| `Bash(python .claude/scripts/formspree_send.py *)` | Formspree API küldés |
| `Bash(python .claude/scripts/check_doc_sync.py *)` | Dokumentáció szinkron ellenőrzés |
| `Bash(python .claude/scripts/test_convert.py *)` | Konverzió teszt segéd |
| `Bash(python .claude/skills/convert/scripts/find_pending_images.py *)` | Kép detekció konverzióhoz |
| `Bash(python -m convert_all *)` | Alternatív konverzió |
| `Bash(*)` | Catch-all – minden Bash parancs engedélyezve (termék döntés) |

### Helyi override (`.claude/settings.local.json`)

**Bash jogosultságok:**
| Minta | Cél |
|---|---|
| `Bash(sha256sum *)` | Fájl ujjlenyomat számítás |
| `Bash(du *)` | Méretbecslés |
| `Bash(awk *)` | Pipe-os feldolgozás |
| `Bash(for * sha256sum *)` | SHA-256 számítás for ciklusban |
| `Bash(ls *)` | Fájllista |
| `Bash(echo *)` | Kimenet |
| `Bash(python .claude/scripts/fingerprint.py *)` | Fingerprint számítás |
| `Bash(python .claude/skills/convert/scripts/find_pending_images.py *)` | Kép detekció konverzióhoz |

---

## 20.5 Biztonsági kockázatok és ajánlások

### Kockázati szintek

| Kockázat | Leírás | Példa |
|---|---|---|
| 🔴 **Magas** | Olyan művelet, amely adatvesztést, adatszivárgást vagy visszafordíthatatlan változást okozhat | `Bash(rm *)` – fájlok törlése; `Bash(git push *)` – kód feltöltése |
| 🟠 **Közepes** | Olyan művelet, amely nem kívánt módosításokat okozhat, de visszafordítható | `Write(workflow/01_project_info/**)` – input fájlok felülírása |
| 🟢 **Alacsony** | Olvasási műveletek, amelyek nem változtatnak semmit | `Read(workflow/01_project_info/**)` |

### Biztonsági alapelvek

1. **Least Privilege elv:** Minden jogosultságot a lehető legszűkebbre állíts be. Csak azt engedélyezd, amire a workflow-nak ténylegesen szüksége van.

2. **Write vs. Read:** Az írási jogosultságok legyenek mindig szűkebbek, mint az olvasásiak. A bemeneti anyagok mappájába (`01_project_info/`) csak a konvertált fájlok létrehozásához adj írási jogot, ne a teljes mappára.

3. **Bash parancsok szűrése:** A Bash jogosultságok a legveszélyesebbek, mert tetszőleges shell parancsokat engedélyezhetnek. Csak konkrét, ismert parancsokat engedélyezz. A termékváltozatban `Bash(*)` catch-all minta van a zökkenőmentes workflow érdekében – ha ezt eltávolítod, győződj meg róla, hogy minden szükséges parancs explicit engedélyezve van.

4. **Rendszeres felülvizsgálat:** Időnként ellenőrizd a `settings.json` és `settings.local.json` fájlokat, és távolítsd el azokat a jogosultságokat, amelyekre már nincs szükség.

### Mit NE tegyél

| Kerülendő minta | Miért veszélyes? |
|---|---|
| `Write(workflow/**)` | Bármilyen workflow fájl felülírását engedi, beleértve a bemeneti anyagokat is |
| `Read(//**/**(/)**)` | A teljes fájlrendszer olvasását engedélyezi, beleértve a jelszavakat, titkos kulcsokat |
| `Bash(rm -rf /*)` | Katasztrofális adatvesztés – a teljes fájlrendszer törlése |

---

## 20.6 Helyi beállítások kezelése

### Helyi override létrehozása

Ha olyan jogosultságra van szükséged, ami a projekt-szintű `settings.json`-ban nincs benne:

1. Hozd létre a `.claude/settings.local.json` fájlt (ha még nem létezik)
2. Add hozzá a kívánt mintákat az `allow` listához
3. A fájl automatikusan kikerül a git-ből a `.gitignore` miatt

**Példa:**
```json
{
  "permissions": {
    "allow": [
      "Bash(kubectl *)",
      "Read(secrets/**)"
    ]
  }
}
```

### Jogosultság tesztelése

Ha egy művelet engedélyt kér, vedd észre, melyik parancs/fájl blokkolta, és add hozzá a megfelelő mintát a `settings.local.json`-hoz. A Codebuff CLI megmutatja a pontos parancsot vagy elérési utat, ami blokkolva lett.

---

## 20.7 `settings.json` vs `settings.local.json` – mikor mit használj?

| Helyzet | settings.json | settings.local.json |
|---|---|---|
| Minden csapattagnak szüksége van rá | ✅ Igen | ❌ Nem |
| Csak a te gépeden futó parancsok | ❌ Nem | ✅ Igen |
| IDE plugin-ok és eszközök elérése | ✅ Igen | ❌ Nem |
| Kísérleti, ideiglenes jogosultságok | ❌ Nem | ✅ Igen |
| Biztonsági szempontból érzékeny engedélyek | ❌ Nem | ✅ Igen |

---

## 20.8 Összefoglalás

- A BA Tool kétszintű jogosultság-kezelést használ: projekt-szintű (`settings.json`) és helyi (`settings.local.json`)
- Négy jogosultság típus van: **Read** (olvasás), **Write** (teljes fájl írás/létrehozás), **Edit** (célzott módosítás), **Bash** (terminál parancsok)
- Az `Edit` és a `Write` külön kezelt – mindkettőt be kell állítani azokra a mappákra, ahol a workflow módosít is és létrehoz is fájlokat (pl. `.claude/memory/`)
- A minták glob pattern alapúak – a `*` bármilyen karaktert, a `**` bármilyen elérési útvonalat illeszt
- A `settings.json` session indulásakor töltődik be – a futás közbeni módosítások csak a következő session-ben lépnek életbe
- A Bash jogosultságok a legveszélyesebbek – mindig a lehető legszűkebb mintát használd; a termékváltozat `Bash(*)` catch-all-t használ a zavartalan workflow érdekében
- A helyi override fájlt (`settings.local.json`) soha ne commitold git-be
- Tartsd be a Least Privilege elvet: csak azt engedélyezd, amire ténylegesen szükség van
