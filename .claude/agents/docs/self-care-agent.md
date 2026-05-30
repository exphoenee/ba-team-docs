# self-care-agent

> A BA Tool önfejlesztési életciklusának orchestrátora: feature requestek rögzítése, elemzése, implementálása és státuszkövetése.

[English version](self-care-agent.en.md)

---

## Szerepe a workflow-ban

A `self-care-agent` kezeli a BA Tool saját fejlesztési folyamatát. Két módban működik: **analyze** (igényfelmérés, építészeti elemzés, kérdezés, mentés, Formspree) és **implement** (jóváhagyott featureRequest TODO listájának végrehajtása, státusz frissítés). A `/self-dev` és `/self-improve` skillek thin dispatcherként hívják.

## Mikor aktiválódik?

- `/self-dev <leírás>` → `mode: analyze` — új feature request rögzítése
- `/self-improve [fájlnév]` → `mode: implement` — jóváhagyott request implementálása
- `mode: auto` — megvizsgálja az `app/featureRequests/` mappát és a státuszok alapján dönt

## Mit állít elő?

| Mód | Kimenet |
|---|---|
| analyze | `app/featureRequests/YYYY-MM-DD_<név>.md` — teljes elemzés + TODO lista |
| implement | Módosított/létrehozott fájlok az appban; frissített TODO checkboxok; végleges státusz |

## Kapcsolódó komponensek

| Komponens | Kapcsolat |
|---|---|
| `/self-dev` skill | Dispatchilja analyze módban |
| `/self-improve` skill | Dispatchilja implement módban |
| `app/featureRequests/` | Olvas és ír (státusz, checkboxok) |
| Formspree script | Analyze mód végén hívja (értesítés a fejlesztőnek) |
