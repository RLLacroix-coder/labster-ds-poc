---
component: Dialog
type: molecule
source:
  figma_file: "01-Shadcn-Kit-POC"
  figma_file_key: tPwrOV9EX9jLXuxsBskINR
  figma_node_id: "4:329"
  figma_url: "https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=4-329"
  master_page: Components
inventory_date: 2026-05-22
---

# Inventaire — Dialog

> Source : page **Components** du Shadcn UI Kit (nodeId `4:329`). Substitution de **Card** (inexistant dans ce kit Shadcn) — choix Rachel 2026-05-22.

## Vue d'ensemble

| Champ | Valeur |
|---|---|
| Type | molecule |
| Nb variants | 1 (master statique, pas de prop type/state) |
| Composition | Content (title + description) + inputs section + button section |
| Sous-composants utilisés | Input/small (`4:324`, `4:325`), Button (`3:305`) |
| Radius dialog | 8px |
| Padding dialog | 24px |
| Largeur de référence | 425px |
| Gap interne | 32px entre Content / inputs / button section, 16px entre inputs |

## Structure

```
dialog (4:329, rounded-[8px], p-[24px], bg-white border slate/300)
├── Content (3:300, gap-[8px])
│   ├── Title "Edit profile" (3:301, large, slate/900)
│   └── Description (3:302, subtle, slate/500)
├── inputs section (4:314, gap-[16px], w-[377px])
│   ├── Field row "Name" + Input/small (4:316)
│   └── Field row "Username" + Input/small (4:319)
└── button section (3:303, justify-end)
    └── Button "Save changes" (3:305, slate/900 bg, body-medium white)
```

## Tokens consommés

### Couleur

| Nom Shadcn | Hex | Usage |
|---|---|---|
| white | `#FFFFFF` | Background dialog |
| slate/900 | `#0F172A` | Title, button bg, button text, value Input |
| slate/500 | `#64748B` | Description text |
| slate/300 | `#CBD5E1` | Border dialog + border Input/small |
| black | `#000000` | Labels inline (Name, Username) — distinct du slate/900 |

### Typographie

| Style nommé | Valeur | Usage |
|---|---|---|
| large | Inter Semi Bold 18/28/0 | Title "Edit profile" |
| subtle | Inter Regular 14/20/0 | Description |
| small | Inter Medium 14/14/0 | Labels inline (Name, Username) |
| body-medium | Inter Medium 14/24/0 | Button text, Input value |

### Élévation

Aucune. Le master Dialog n'a **pas d'ombre** déclarée dans le rendu Figma. C'est inhabituel pour un dialog modal — la spec WAI-ARIA recommande un backdrop semi-opaque et une élévation visuelle.

**À flagger en étape 6** : `[ÉLÉVATION MANQUANTE — à définir pour le DS Labster]` (utiliser le token Labster `Elevation` qui existe en style Figma).

## Hex hardcodés détectés

Tous inlinés en Tailwind. À re-tokeniser à l'étape 6.

## Variants attendus état de l'art vs présents

| Variant attendu | Présent ? | Note |
|---|---|---|
| static (basic dialog) | ✅ | master unique |
| **with backdrop** | ❌ | absent — critique pour modal |
| **with elevation/shadow** | ❌ | absent |
| confirm/cancel pattern | ⚠️ | un seul bouton "Save changes" — pas de Cancel/Close visible |
| destructive variant (delete confirmation) | ❌ | absent |
| with form errors | ❌ | absent |
| scrollable content | ❌ | absent |

**À flagger en étape 6** :
- `[VARIANT MANQUANT EN FIGMA — with backdrop]`
- `[VARIANT MANQUANT EN FIGMA — confirm/cancel pattern]`
- `[ÉLÉVATION MANQUANTE — à associer au token Labster Elevation]`

## Notes pour la re-tokenisation Labster (étape 6)

- Le **token Labster `Elevation`** (Effect style observé dans le styleguide Labster) est l'opportunité naturelle pour combler le manque d'élévation Shadcn. À utiliser systématiquement pour le dialog.
- Le `black` (#000000) utilisé pour les labels inline est suspect : sans doute une erreur du kit Shadcn (devrait être `slate/900` comme le reste). À normaliser dans le DESIGN.md Labster.
- La composition `Input + Label inline gauche` du Dialog est exactement le variant `Input size=small type=label to the left` documenté dans `inventaire-Input.md`. Cohérence vérifiée.
- Le bouton "Save changes" est une instance du variant `Button type=default state=Default` (slate/900 bg). Cohérence vérifiée.

## Relations component-usage (à reporter dans .ai/component-usage.json à l'étape 8)

| Source | Target | Relation | Count |
|---|---|---|---|
| Dialog | Input | contains | 2 |
| Dialog | Button | contains | 1 |
