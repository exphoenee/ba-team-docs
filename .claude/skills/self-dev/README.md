# /self-dev – Rendszerfejlesztési igények rögzítése

## Mire való?

A `/self-dev` paranccsal jelezheted, ha a **BA Team rendszert szeretnéd fejleszteni, bővíteni vagy módosítani** – új agent hozzáadása, meglévő skill módosítása, sablonok javítása, architektúra változtatás.

A rendszer **nem hajtja végre** a változtatást, hanem rögzíti az igényt és továbbítja a fejlesztőnek.

## Használat

```
/self-dev <fejlesztési igény leírása>
```

**Példák:**

```
/self-dev adjunk hozzá egy új agentet, ami automatikusan ellenőrzi a dokumentumok Mermaid diagramjait

/self-dev a spec-builder túl kevés FR-t generál, bővítsük ki a domain-checklistet

/self-dev a BRD sablonban a jóváhagyási sor hiányzik, vegyük fel
```

## Mit tekintünk rendszerfejlesztési igénynek?

| Típus | Példa |
|---|---|
| **Új agent** | "Kellene egy agent, ami..." |
| **Új skill** | "Csináljunk egy /check parancsot..." |
| **Meglévő módosítása** | "A spec-builder nem jól csinálja X-et" |
| **Sablon javítása** | "A BRD sablonból hiányzik Y" |
| **Architektúra változás** | "Át kellene szervezni a workflow-t" |
| **Hibajavítás** | "Az rca-agent összeomlik ha..." |

## Mi NEM rendszerfejlesztési igény?

- BA projektek futtatása (`/ba`, `/discovery`, `/rca`)
- Kérdések a rendszer használatáról
- Segítségkérés a workflow-val kapcsolatban

Ezekhez használd a megfelelő BA parancsokat.
