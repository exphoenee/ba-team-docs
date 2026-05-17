# `/spec-builder` – Specifikáció-készítő

[English version](README.en.md)

## Mire való?

A `/spec-builder` skill strukturálatlan, nyers emberi kommunikációból — meetingjegyzetekből, emailekből, Slack/Teams üzenetekből, egyeztetési feljegyzésekből — **döntéshozásra alkalmas, strukturált specifikációs csomagot** készít.

A skill felszínre hozza az ellentmondásokat, feltételezéseket és hiányosságokat, amelyek a nyersek anyagokban rejtve maradnának. Azonosítja azokat a kérdéseket, amelyeket az ügyféltől vagy az érintettektől még meg kell kérdezni, mielőtt a BA dokumentáció elkészülhet.

---

## Inkrementális Specifikáció Frissítés

A `/spec-builder` intelligensen kezeli a projekt változásait:
- **Csak az újdonságokat olvassa be**: Ha új fájlt adsz a projekthez, vagy módosítasz egy meglévőt, a rendszer felismeri ezt, és csak a változásokat "fésüli bele" a meglévő `SPEC_OUTPUT.md`-be.
- **Megőrzi a folytonosságot**: Az inkrementális frissítés során a korábban kiosztott követelmény-ID-k (`FR-XXX`) és kérdés-ID-k (`Q-XXX`) nem változnak meg, az újak pedig folytatólagos sorszámot kapnak.
- **Token-takarékos**: Nem kell minden alkalommal a teljes bemeneti anyagot újra feldolgozni, ami jelentősen csökkenti a futási időt és a költségeket.

> **Mikor történik teljes újragenerálás?** Ha fájlokat törölsz a projektből, a rendszer biztonsági okokból a teljes specifikációt újraépíti, hogy elkerülje az árván maradt vagy érvénytelen követelményeket.

> **Megjegyzés:** A legtöbb esetben nem kell közvetlenül meghívni — a `/ba` skill automatikusan futtatja, amikor szükséges.

---

## Hogyan használd?

1. Másold be az ügyfél anyagait (meetingjegyzetek, emailek, stb.) a `workflow/01_project_info/` mappába
2. A Claude panelen írd be:

```
/spec-builder
```

---

## Mit vesz bemenetként?

Bármilyen nyers szöveges anyagot elfogad:

- Meetingjegyzetek
- Email levelezések
- Slack / Teams kivonatok
- Workshopok összefoglalói
- Ügyfél visszajelzések
- Hangfelvétel-átiratok

Több dokumentum esetén azokat **egyetlen összefüggő modellbe** olvasztja össze, nem kezeli őket külön specifikációként.

---

## Mit állít elő?

Az eredményt a `workflow/01_project_info/SPEC_OUTPUT.md` fájlba menti. Ez az egyetlen fájl, amely az összes alábbi részt tartalmazza:

### 1. Strukturált specifikáció
Normalizált, implementációra kész követelmények egyedi azonosítókkal:

| Azonosító típus | Példa | Jelentés |
|---|---|---|
| `FR-001` | Funkcionális követelmény | Mit kell tudnia a rendszernek |
| `NFR-001` | Nem-funkcionális követelmény | Teljesítmény, biztonság, skálázhatóság |
| `US-001` | User Story | Felhasználói igény |
| `A-001` | Feltételezés | Amire a spec épít, de nincs kimondva |

Minden elem jelölve van:
- `[EXPLICIT]` – szó szerint szerepelt a bemeneti anyagban
- `[INFERRED]` – erősen következik belőle, de nincs kimondva

**Minden elemhez forrásjelzés kerül** — melyik fájlból, annak melyik verziójából született:

```
| FR-001 | A rendszer naplóz minden belépési kísérletet | `meeting.docx · e3b0c442` |
```

```
Q-003 [DATA] Milyen formátumban tárolódnak az ügyféladatok?
`[Forrás: requirements.xlsx · fa3b1c9a]`
```

A `e3b0c442` az eredeti fájl SHA-256 ujjlenyomatának első 8 karaktere. Ezzel visszakereshető, hogy pontosan melyik dokumentum-verzióból származik az adott elem. A teljes SHA-256 a `SPEC_LOG`-ban van eltárolva.

### 2. Ellentmondások és konfliktusok
Ha az anyagokban egymásnak ellentmondó állítások szerepelnek, a skill ezt jelzi és megmutatja a konfliktust — nem oldja fel csendben.

### 3. Nyitott kérdések (Q-XXX lista)
Minden hiányzó, tisztázatlan vagy megválaszolatlan pont Q-XXX azonosítót kap és kategóriába sorolódik:

| Kategória | Mit jelent |
|---|---|
| `BUSINESS LOGIC` | Üzleti logika nincs definiálva |
| `DATA` | Adatok, mezők, formátumok hiányoznak |
| `UX/UI` | Felhasználói felület nincs specifikálva |
| `INTEGRATION` | Külső rendszer kapcsolat tisztázatlan |
| `PRIORITY` | Fontossági sorrend nincs meghatározva |

A kérdések végén kötelező összefoglaló tábla jelenik meg — ezt a `/ba` orchestrator gépileg olvassa:

```
| ID    | Kategória      | Státusz    |
|-------|----------------|------------|
| Q-001 | BUSINESS LOGIC | UNANSWERED |
| Q-002 | DATA           | UNANSWERED |
```

### 4. Feltételezések
Minden olyan állítás, amelyre a spec épít, de az ügyfél nem mondta ki kifejezetten.

### 5. Követhetőségi térkép
Megmutatja, hogy az ügyfél melyik kijelentéséből melyik követelmény született.

---

## Szabályok, amelyeket mindig betart

- Soha nem talál ki követelményt, amit az ügyfél nem mondott vagy nem implikált
- Soha nem oldja fel csendben az ellentmondásokat
- Soha nem rendel prioritást, ha az ügyfél nem adott meg ilyet
- Minden kétértelműséget a nyitott kérdések listájában jelenít meg

---

## Kapcsolódó skillek

| Skill | Kapcsolat |
|---|---|
| `/ba` | Automatikusan hívja, ha nincs még spec |
| `/ba` | A spec alapján ellenőrzi a válaszokat és generálja a BA dokumentumokat |
| `/business-analyst` | A specifikáció alapján generálja a BA dokumentumokat |
