# `/mermaid-diagrams` – Diagram-generáló

[English version](README.en.md)

## Mire való?

A `/mermaid-diagrams` skill **vizuális diagramokat** készít Mermaid formátumban: folyamatábrákat, rendszerkapcsolati diagramokat, adatmodelleket, állapotgépeket és sok mást. A diagramok közvetlenül megjeleníthetők a VS Code Markdown előnézetében, GitHubon és a Mermaid Live Editorban.

A BA dokumentumokban a folyamatleírások mindig diagrammal párosulnak — ezt a skillt a `/business-analyst` is használja. De önállóan is meghívható, ha egyedi diagramra van szükség.

---

## Hogyan használd?

Egyszerűen írd le, mit szeretnél ábrázolni:

```
/mermaid-diagrams kérlek rajzold le a kárrendezési folyamatot
```

```
/mermaid-diagrams mutasd be a rendszerek közötti kapcsolatot
```

```
/mermaid-diagrams készíts ER diagramot az ügyfél és szerződés entitásokhoz
```

---

## Milyen diagramokat tud készíteni?

### Folyamatábra (`flowchart`)
Üzleti folyamatok, döntési fák, workflow-k ábrázolására.

```mermaid
flowchart TD
    A[Ügyfél bejelenti a kárt] --> B{Kötvény érvényes?}
    B -->|Igen| C[Fraud szűrés]
    B -->|Nem| D[Elutasítás]
    C --> E[Kárügyintéző átvizsgálja]
    E --> F[Jóváhagyás]
```

### Szekvencia diagram (`sequenceDiagram`)
Rendszerek vagy személyek közötti kommunikáció időrendi ábrázolására.

```mermaid
sequenceDiagram
    participant U as Ügyfél
    participant P as Portál
    participant API as Backend
    participant DB as Adatbázis
    U->>P: Bejelentkezés
    P->>API: Hitelesítési kérés
    API->>DB: Ellenőrzés
    DB-->>API: Eredmény
    API-->>P: Token
    P-->>U: Sikeres belépés
```

### ER diagram (`erDiagram`)
Adatentitások és kapcsolataik modellezésére.

```mermaid
erDiagram
    UGYFEL {
        int id
        string nev
        string email
    }
    SZERZODES {
        int id
        int ugyfel_id
        date kezdet
    }
    UGYFEL ||--o{ SZERZODES : "rendelkezik"
```

### Állapotdiagram (`stateDiagram-v2`)
Státuszátmenetek, munkafolyamat-állapotok ábrázolására.

```mermaid
stateDiagram-v2
    [*] --> Beérkezett
    Beérkezett --> Vizsgálat_alatt
    Vizsgálat_alatt --> Jóváhagyva
    Vizsgálat_alatt --> Elutasítva
    Jóváhagyva --> Kifizetve
    Kifizetve --> [*]
    Elutasítva --> [*]
```

### Git graph (`gitGraph`)
Fejlesztési ágak és release folyamatok ábrázolására.

### Gantt diagram (`gantt`)
Projekt ütemterv, mérföldkövek megjelenítésére.

---

## Mikor melyik diagram típust érdemes kérni?

| Helyzet | Kért diagram |
|---|---|
| Üzleti folyamat lépései | Folyamatábra |
| Melyik rendszer küld adatot melyiknek | Szekvencia diagram |
| Milyen adatok vannak és hogyan kapcsolódnak | ER diagram |
| Kérelem / ügy státuszai | Állapotdiagram |
| Projekt ütemterv | Gantt diagram |

---

## Hogyan jeleníts meg egy diagramot?

1. A Claude a diagramot egy Markdown kód blokkba írja
2. Nyisd meg az érintett `.md` fájlt VS Code-ban
3. Nyomj `Ctrl+Shift+V` (Windows) / `Cmd+Shift+V` (Mac) billentyűt
4. A jobb oldali panelen megjelenik a diagram vizuálisan

> A megjelenítéshez szükséges a **Markdown Preview Mermaid Support** VS Code bővítmény telepítése (lásd README telepítési útmutató).

---

## Kapcsolódó skillek

| Skill | Kapcsolat |
|---|---|
| `/business-analyst` | Kötelezően használja minden folyamatleíráshoz |
| `/ba` | Közvetetten, a BA dokumentumok generálásakor |
