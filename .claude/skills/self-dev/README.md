# /self-dev – Rendszerfejlesztési igények elemzése és rögzítése

## Mire való?

A `/self-dev` paranccsal jelezheted, ha a **BA Team rendszert szeretnéd fejleszteni, bővíteni vagy módosítani**. A skill nem csak rögzíti az igényt — elvégez egy teljes építészeti elemzést is: megvizsgálja, hogyan illeszkedik a kért feature a jelenlegi skill/agent rendszerbe, milyen kommunikációt igényel a komponensek között, kell-e új sablon vagy Python script, majd kérdéseket tesz fel, ha valami nem egyértelmű.

Az elemzés eredménye és a válaszok egy markdown fájlba kerülnek (`app/featureRequests/`), amelyet a fejlesztő megkap.

## Hogyan használd?

```
/self-dev <fejlesztési igény leírása>
```

**Példák:**

```
/self-dev adjunk hozzá egy új agentet, ami automatikusan ellenőrzi a dokumentumok Mermaid diagramjait

/self-dev a spec-builder túl kevés FR-t generál, bővítsük ki a domain-checklistet

/self-dev kellene egy /check-contract skill, ami a szerződéses feltételeket kinyeri a feltöltött PDF-ből
```

## Mit csinál pontosan?

1. **Rögzíti az igényt** — összefoglalja a kért fejlesztést
2. **Elvégzi az építészeti elemzést** — átvizsgálja az aktuális skill és agent rendszert, meghatározza:
   - Hol helyezkedik el a BA workflow-ban
   - Melyik skillekhez és agentekhez kapcsolódik
   - Milyen kommunikáció szükséges a komponensek között (pl. memory-agent STORE a végén)
   - Kell-e új sablon (globális vagy skill-specifikus)
   - Kell-e Python script a token-hatékony megvalósításhoz
   - Melyik memória- vagy workflow-fájlokat kell olvasni / írni
3. **Kérdéseket tesz fel** — ha valami nem egyértelmű, konkrét kérdéseket generál és megvárja a válaszokat
4. **Menti az eredményt** — `app/featureRequests/YYYY-MM-DD_<rövid-név>.md` fájlba
5. **Jóváhagyást kér** — megkéri, hogy olvasd el a tervet és hagyd jóvá
6. **Továbbítja a fejlesztőnek** — Formspree-n keresztül, és megerősíti, hogy megérkezett

## Mikor nem csinál semmit?

Ha nem adtál meg leírást a `/self-dev` után — megkér, hogy írd le az igényt.

## Mit tekintünk rendszerfejlesztési igénynek?

| Típus | Példa |
|---|---|
| **Új agent** | „Kellene egy agent, ami automatikusan..." |
| **Új skill** | „Csináljunk egy `/check-contract` parancsot..." |
| **Meglévő módosítása** | „A self-dev skill elemezze az architektúrát is" |
| **Sablon javítása** | „A BRD sablonból hiányzik a jóváhagyási sor" |
| **Architektúra változás** | „Át kellene szervezni a workflow-t" |
| **Hibajavítás** | „Az rca-agent összeomlik, ha nincs SPEC_OUTPUT.md" |

## Mi NEM rendszerfejlesztési igény?

- BA projektek futtatása (`/ba`, `/discovery`, `/rca`)
- Kérdések a rendszer használatáról
- Segítségkérés a workflow-val kapcsolatban

Ezekhez használd a megfelelő BA parancsokat, vagy a `/help` paranccsot.

## Kapcsolódó skillek

| Skill | Mikor használd helyette |
|---|---|
| `/help` | Ha csak kérdésed van a rendszer használatával kapcsolatban |
