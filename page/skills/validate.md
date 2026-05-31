# `/validate` – Specifikáció minőségkapu

[English version](README.en.md)

> Leellenőrzi a meglévő specifikációt 8 minőségi dimenzión, és PASS / WARN / BLOCK eredményt ad — dokumentumot nem generál.

---

## Mire való?

A `/validate` skill a `/ba` workflow önálló minőségellenőrző lépése. Futtathatod:
- Mielőtt BA dokumentumokat generálsz — megelőző ellenőrzés
- Ha új anyag érkezett, de még nem akarod újragenerálni a dokumentumokat
- Ha BLOCK státuszt kapott a workflow, és szeretnéd látni a részleteket javítás előtt

> **Megjegyzés:** A `/ba` automatikusan futtatja a validációt a dokumentumgenerálás előtt —
> általában nincs szükség a `/validate` kézi futtatására.

---

## Hogyan használd?

```
/validate
```

---

## Mit ellenőriz?

| Dimenzió | Szint |
|---|---|
| BR metrika-lefedettség (KPI) | ⚠️ WARN |
| NFR taxonómia (5 kategória) | ⚠️ WARN |
| FR domain-lefedettség (OB-24b) | ⚠️ WARN |
| GDPR trigger (személyes adat FR) | ❌ BLOCK ha hiányzik |
| SCOPE CONFLICT nyitott kérdések | ⚠️ WARN |
| INFERRED:HIGH melletti RISK-XXX | ⚠️ WARN |
| Q-XXX arány (> 50% unanswered) | ⚠️ WARN |
| ID konzisztencia (duplikátum) | ❌ BLOCK ha duplikált |

---

## Mit állít elő?

`workflow/01_project_info/_system/SPEC_VALIDATION.md` — részletes validációs riport:
- Összesített státusz: ✅ PASS / ⚠️ WARN / ❌ BLOCK
- Minden problémás elemhez javítási javaslat

---

## Mikor nem csinál semmit?

- Ha `SPEC_OUTPUT.md` nem létezik → hibaüzenet + útmutató

---

## Kapcsolódó skillek

| Skill | Kapcsolat |
|---|---|
| `/ba` | A teljes workflow — automatikusan tartalmazza a validációt |
| `/extractor` | Csak spec-generálás, validáció nélkül |
| `/rca` | Gyökérok-elemzés — a validáció figyelembe veszi az RCA eredményeit |
