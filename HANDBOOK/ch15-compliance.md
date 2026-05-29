# 15. Szabályozói megfelelőség

A BA Team automatikusan értékeli a projekt érintettségét az alábbi szabályozói területeken, és szükség esetén `Regulatory_Checklist.md` dokumentumot generál:

| Szabályozó | Terület |
|---|---|
| **GDPR** | Általános adatvédelmi rendelet |
| **PCI-DSS** | Bankkártyás fizetési adatok biztonsága |
| **AML/KYC** | Pénzmosás elleni és ügyfél-átvilágítási folyamatok |
| **SOX** | Sarbanes-Oxley – vállalati irányítás, pénzügyi beszámolás |
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
