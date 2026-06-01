# `/add-decision` — FORCED döntés hozzáadása

FORCED döntés (SDEC-XXX fájl) gyors létrehozása a `workflow/04_decisions/` mappába, YAML frontmatter-rel.

## Használat

```
/add-decision "Az FR-003 prioritását módosítani kell High-ról Medium-ra, mert az ügyfél csökkentette a költségvetést."
```

Ha nem adsz meg szöveget, a skill interaktívan kérdez.

## Mit csinál?

1. Értelmezi a megadott döntés szövegét
2. Automatikusan generálja a következő SDEC azonosítót (SDEC-XXX)
3. Ellenőrzi, hogy a megcélzott FR-XXX/NFR-XXX létezik-e a spec-ben (ha van spec)
4. Ha hiányzik valami (target, döntés típus, döntéshozó), visszakérdez
5. Létrehozza a YAML frontmatter-es SDEC fájlt a `workflow/04_decisions/` mappában
6. Javasolja: `/ba --force` futtatását

## Példa

```
/add-decision "OVERRIDE: FR-005 prioritását Low-ra kell venni, mert az ügyfél kivezette ezt a funkciót a scope-ból."
```

## Tipp

A döntés `/ba --force` után épül be a spec-be. A `/add-decision` **csak létrehozza** a fájlt — a workflow-t nem indítja el.
