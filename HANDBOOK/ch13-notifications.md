# 13. Automatikus értesítések és Stop hook

## Mi az a Stop hook?

A BA Tool minden Claude-válasz után automatikusan ellenőrzi a projekt állapotát, és értesít, ha valami figyelmet igényel. Ezt a mechanizmust **Stop hook**-nak nevezik — egy Python szkript fut a háttérben, amely megvizsgálja a workflow mappáit, és szükség esetén üzenetet jelenít meg a terminálban.

A Stop hook nem blokkolja a munkát — csak informál.

---

## Mikor jelenít meg értesítést?

| Állapot | Értesítés tartalma |
|---|---|
| Q-XXX kérdések megválaszolatlanok | Listázza a nyitott kérdéseket és emlékeztet a válaszadásra |
| FORCED döntés újabb mint a spec | Figyelmeztet, hogy a spec frissítésre szorul |
| BA dokumentumok hiányosak | Jelzi, hogy a dokumentum-generálás még nem futott le |
| Minden rendben | Nincs értesítés |

---

## Hogyan működik technikai szinten?

A Stop hook a `app/.claude/settings.json`-ban van konfigurálva:

```json
{
  "hooks": {
    "Stop": [
      {
        "type": "command",
        "command": "python .claude/scripts/workflow_state.py --hook-check"
      }
    ]
  }
}
```

A `workflow_state.py` szkript:
1. Megvizsgálja a `workflow/` mappa állapotát
2. Ha akció szükséges → kiírja az értesítést a terminálba
3. Ha minden rendben → csendben kilép (0 visszatérési kód)

---

## Workflow állapotok

A Stop hook ugyanazt az állapot-detekciót használja, mint a `/ba` skill:

| Állapot | Feltétel | Hook üzenet |
|---|---|---|
| **Üres projekt** | `01_project_info/` üres | Emlékeztető: töltsd fel az anyagokat |
| **Q-XXX megválaszolatlan** | Spec létezik, de vannak nyitott kérdések | Listázza a kérdéseket |
| **FORCED döntés függőben** | `04_decisions/` fájl újabb mint a spec | Figyelmeztet a rebuild szükségességére |
| **Kész** | Minden Q-XXX megválaszolt, BA docs elkészültek | Nincs üzenet |

---

## A `/check-state` parancs

Ha részletes állapotjelentést szeretnél bármikor — nem csak a Stop hook passzív értesítéseit — használd a `/check-state` parancsot:

```
/check-state
```

Ez azonnali, strukturált riportot ad a workflow összes mappájáról, az aktuális fázisról és a javasolt következő lépésről. Részletek: [5. fejezet — Parancsok](ch05-commands.md).

---

## Értesítések kikapcsolása

A Stop hook letiltásához töröld vagy kommenteld ki a `settings.json`-ból a Stop szekciót. Ez nem ajánlott — az értesítések segítenek elkerülni, hogy feledékenységből kihagyj egy kötelező lépést.
