# `rca-agent` — Gyökérok-elemzés ügynök

[English version](README.en.md)

## Szerepe

A `rca-agent` a Chain/IR módszertan szerint teljes gyökérok-elemzést végez egy strukturált gyökéroklista alapján. Kizárólag az input listában szereplő okokat használja — soha nem talál ki újat.

## Mikor hívódik?

Az `/rca` skill dispatchilja, miután az input Excel fájlt a `convert_all` Python csomag Markdown-ra konvertálta.

## Mit olvas?

| Forrás | Tartalom |
|---|---|
| `workflow/01_project_info/rca_input*_converted.md` | Gyökéroklista, probléma-leírás, csoportosítás |
| `workflow/01_project_info/_system/SPEC_OUTPUT.md` | Opcionális — csak projekt neve kiegészítéshez |

## Mit állít elő?

**`workflow/05_ba_docs/RCA_Analysis.md`** — teljes elemzés:

| Szekció | Tartalom |
|---|---|
| Gyökéroklista | Sorszámozott, tisztított lista |
| Közvetlen kapcsolatok | Forrás → okozott táblázat |
| Chain_Long | Oksági lánc táblázat + Mermaid diagramok |
| Loop_Summary | Hurok táblázat + visszacsatoló diagram |
| IR_Mátrix | N×N kapcsolatmátrix (1 = közvetlen, lánccal igazolt) |
| IR_Elemzés | Driver index + Javasolt szerep (Driver / Tünet / Köztes / Hurokerősítő) |
| QA Riport | 7 invariáns ellenőrzési eredménye |
| Vezetői összefoglaló | Top driver okok + legsúlyosabb hurkok + megszakítási pont |

## Flag-ek

| Flag | Hatás |
|---|---|
| *(alapértelmezett)* | Teljes 9 lépéses elemzés |
| `--quick` | Chain_Long + Loop_Summary; IR_Mátrix és IR_Elemzés kihagyva |
| `--validate` | Csak QA ellenőrzés meglévő RCA_Analysis.md-n |

## Kapcsolódó komponensek

| Komponens | Kapcsolat |
|---|---|
| `/rca` skill | Elindítja ezt az agentet |
| `convert_all` Python csomag | Input konverzió — az agent az `*_converted.md` fájlt olvassa |
| `ba-document-agent` | Felhasználja az IR_Elemzés Szerep értékeit a RAID_Log kitöltéséhez |
