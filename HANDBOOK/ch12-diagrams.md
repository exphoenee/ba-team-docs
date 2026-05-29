# 12. Diagramkészítés (/mermaid-diagrams)

A BA Team minden folyamatleíráshoz kötelezően Mermaid diagramot készít. Önállóan is kérhetsz diagramot:

```
/mermaid-diagrams kérlek rajzold le a kárrendezési folyamatot
```

## Diagramtípusok

| Helyzet | Diagram típus |
|---|---|
| Üzleti folyamat lépései | `flowchart` – folyamatábra |
| Rendszerek közötti kommunikáció | `sequenceDiagram` – szekvencia diagram |
| Állapotátmenetek | `stateDiagram-v2` – állapotdiagram |
| Adatentitások és kapcsolataik | `erDiagram` – ER diagram |
| Érintetti kapcsolatok | `graph LR` – gráf |
| Projekt ütemterv | `gantt` – Gantt diagram |

## Diagram megtekintése

1. Nyiss meg egy `.md` fájlt VS Code-ban
2. Nyomj `Ctrl+Shift+V` (Windows) / `Cmd+Shift+V` (Mac)
3. A Mermaid diagram vizuálisan jelenik meg

---

# 13. Automatikus értesítések

A rendszer minden Claude válasz után automatikusan ellenőrzi a workflow állapotát:

| Állapot | Értesítés |
|---|---|
| Feldolgozatlan bemeneti fájlok | `📋 N bemeneti fájl feldolgozásra vár. Futtasd: /ba` |
| Spec kész, válaszok hiányoznak | `❓ Spec elkészült. Válaszokat várok a 03_answers/ mappában.` |
| Válaszok megvannak, dokumentum nincs | `✅ Válaszok megtalálhatók. BA dokumentumok generálásához futtasd: /ba` |

## Az automatikus értesítés aktiválása (Stop hook)

Az értesítések egy **Stop hook** segítségével működnek, amelyet a `.claude/settings.json` fájlban kell konfigurálni.

**Aktiválás:**
1. Nyisd meg a projektet VS Code-ban
2. Másold a hook konfigurációját:
   ```
   cp .claude/settings.json.example .claude/settings.json
   ```
   *Vagy Windows PowerShell-ben:*
   ```powershell
   Copy-Item .claude\settings.json.example .claude\settings.json
   ```
3. Ellenőrizd, hogy a `.claude/settings.json` tartalmaz-e `"hooks"` szekciót
