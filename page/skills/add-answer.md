# `/add-answer` — Válasz hozzáadása

Stakeholder válaszok gyors rögzítése a `workflow/03_answers/` mappába.

## Használat

```
/add-answer "Q-003: A rendszer három szerepkört támogasson: Admin, Operator, Viewer."
```

Ha nem adsz meg szöveget, a skill interaktívan kérdez.

## Mit csinál?

1. Értelmezi a megadott szöveget
2. Ellenőrzi, hogy a Q-XXX ID létezik-e a spec-ben (ha van spec)
3. Ha ellentmondást vagy hiányzó adatot talál, visszakérdez
4. Elmenti a fájlt a `workflow/03_answers/` mappába
5. Javasolja: `/ba` futtatását

## Példák

```
/add-answer "Q-001: Igen, a rendszernek támogatnia kell a böngészős hozzáférést."
/add-answer "Q-003: Admin, Operator és Viewer szerepkörök"
```

## Tipp

A `/add-answer` **csak ment** — a workflow-t nem indítja el. A válasz beépüléséhez futtasd `/ba`-t a mentés után.
