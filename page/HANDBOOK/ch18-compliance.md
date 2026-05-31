# 17. Szabályozói megfelelőség

## 15.1 Áttekintés

A BA Tool kétrétegű megfelelőségi rendszert alkalmaz:

1. **`workflow/REGULATION/` mappa** — domain fájlok (beépített + felhasználói), amelyek kulcsszavakat és szükséges spec-elemeket definiálnak
2. **Automatikus ellenőrzés** — az `extraction-agent` proaktívan hozzáadja a szükséges RISK/ISSUE elemeket; a `validation-agent` ellenőrzi és BLOCK/WARN státuszt ad

Nincs égetett szólista az AI agent fájlokban — minden kulcsszó a `workflow/REGULATION/*.md` fájlokból olvasódik be. Ez lehetővé teszi, hogy projektenként testre szabd, milyen szabályozói területek legyenek aktívak.

---

## 15.2 A `workflow/REGULATION/` mappa

```
workflow/REGULATION/
├── gdpr.md                    ← beépített (GDPR személyes adatvédelem) — BLOCK
├── pci-dss.md                 ← beépített (bankkártyás adatok) — BLOCK
├── security.md                ← beépített (biztonsági alapkövetelmények) — WARN
├── custom_domain_template.md  ← sablon saját domain fájlhoz
└── (aml-kyc.md, sox.md, ...)  ← saját domain fájlok, amit te adsz hozzá
```

A mappa a `workflow/` részeként projektenként példányosítható és verziókezelhető. A beépített fájlok módosíthatók.

---

## 15.3 Domain fájl formátuma

Minden fájl (beépített és felhasználói egyaránt) ugyanezt a struktúrát követi:

```markdown
---
domain: GDPR
block: true
description: Személyes adat kezelés — GDPR megfelelőség kötelező
required_elements: [RISK-XXX, ISSUE-XXX]
---

## Kulcsszavak

personal data, PII, name, email, phone, address, social security number,
health data, medical record, biometric, HR, payroll, timelog,
személyes adat, munkavállalói, egészségügyi, bér, munkaidő, bónusz,
ügyfél adat, adóazonosító, employee, user data, customer data
```

**Frontmatter mezők:**

| Mező | Típus | Leírás |
|---|---|---|
| `domain` | szöveg | Emberi olvasható azonosító — megjelenik a validációs riportban |
| `block` | `true` / `false` | `true` = BLOCK státusz ha trigger tüzel; `false` = WARN |
| `description` | szöveg | Rövid leírás — a BLOCK/WARN üzenetben jelenik meg |
| `required_elements` | lista | Milyen elemeknek kell jelen lenniük a specben (pl. `[RISK-XXX, ISSUE-XXX]`) |

A `## Kulcsszavak` szekció alatti kulcsszavakat vesszővel kell elválasztani. Nagy- és kisbetű érzéketlen. Egy sor = egy logikai csoport.

---

## 15.4 Beépített domain fájlok

| Fájl | Domain | Szint | Példa kulcsszavak |
|---|---|---|---|
| `gdpr.md` | GDPR | ❌ BLOCK | personal data, PII, HR, payroll, timelog, bér, munkaidő, egészségügyi... |
| `pci-dss.md` | PCI-DSS | ❌ BLOCK | credit card, CVV, PAN, kártyaszám, bankkártya, payment card... |
| `security.md` | Security | ⚠️ WARN | password, encryption, authentication, RBAC, audit log, titkosítás... |

---

## 15.5 Saját compliance domain hozzáadása

1. Másold a `custom_domain_template.md` fájlt:
   ```
   workflow/REGULATION/custom_domain_template.md → workflow/REGULATION/sajat_domain.md
   ```
2. Szerkeszd a frontmatter-t: töltsd ki a `domain`, `block`, `description`, `required_elements` mezőket
3. Add hozzá a kulcsszavakat a `## Kulcsszavak` szekcióban
4. Mentsd el — a rendszer automatikusan betölti a következő `/ba` futásnál

**Példa — AML/KYC domain:**
```markdown
---
domain: AML/KYC
block: true
description: Pénzmosás elleni és ügyfél-átvilágítási folyamatok — AML/KYC megfelelőség kötelező
required_elements: [RISK-XXX, ISSUE-XXX]
---

## Kulcsszavak

money laundering, KYC, customer due diligence, suspicious transaction,
pénzmosás, ügyfél-átvilágítás, gyanús tranzakció, PEP, beneficial owner
```

---

## 15.6 Hogyan működik a megfelelőségi ellenőrzés?

**Extraction fázisban** (`extraction-agent`):
- Betölti a REGULATION fájlokat
- Ha egy FR szövege `block: true` domainből való kulcsszót tartalmaz és a szükséges elem (pl. RISK-XXX) hiányzik → automatikusan hozzáadja a spechez

**Validáció fázisban** (`validation-agent`, Check 4):
- Ismét ellenőrzi az összes betöltött domain kulcsszavát
- Ha szükséges elem hiányzik: `block: true` → **BLOCK**, `block: false` → **WARN**
- Minden üzenetben megjelenik, melyik fájl szabálya váltotta ki

**Ha a `workflow/REGULATION/` mappa nem létezik:**
- Extraction: csendes fallback (nincs hiba)
- Validation: Check 4 kihagyva + WARN a riportban (nem BLOCK)

---

## 15.7 Regulatory_Checklist.md generálása

A BA Tool szükség esetén `Regulatory_Checklist.md` dokumentumot is generál a `workflow/05_ba_docs/` mappába:

| Szabályozó | Trigger |
|---|---|
| **GDPR** | Személyes adat kezelés FR-ben |
| **PCI-DSS** | Bankkártyás fizetési adat FR-ben |
| **AML/KYC** | Pénzmosás elleni folyamat FR-ben |
| **SOX** | Vállalati irányítás / pénzügyi beszámolás |
| **Solvency II** | Biztosítók fizetőképessége |
| **HIPAA** | Egészségügyi adatok kezelése |
| **FCA** | Pénzügyi felügyeleti követelmények |

---

# 16. Gyakori kérdések (GYIK)

**Hol találom a kész BA dokumentumokat?**
A `workflow/05_ba_docs/` mappában.

**Hogyan olvasom el szépen a dokumentumokat?**
Kattints duplán a `.md` fájlra, majd nyomj `Ctrl+Shift+V` (Windows) / `Cmd+Shift+V` (Mac).

**Mi az a Q-XXX?**
A Claude által generált, sorszámozott kérdések az ügyféltől hiányzó információkról.

**Elromlott valami, mit tegyek?**
Írd be: `/session-loader` – megmutatja az aktuális állapotot és a következő lépést.

**Újra lehet futtatni a `/ba`-t ha változott valami?**
Igen, bármikor futtatható. A rendszer mindig az aktuális állapotból indul ki.

**Miért nem enged a rendszer dokumentumot generálni?**
Mert valamelyik Q-XXX kérdés még megválaszolatlan.

**Lehet törölni a memóriából?**
Nem automatikusan – manuálisan szerkesztheted a `.claude/memory/` mappában lévő fájlokat.

**Van más parancs a BA workflow futtatásához, nem csak a `/ba`?**
Speciális esetekben: `/extractor`, `/business-analyst`, `/convert`.

**Több projekthez is használhatom?**
Igen – minden projekthez hozz létre egy külön repository másolatot a sablonból.
