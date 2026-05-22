---
component: Input
type: atom
source:
  figma_file: "01-Shadcn-Kit-POC"
  figma_file_key: tPwrOV9EX9jLXuxsBskINR
  figma_node_id: "2:285"
  figma_url: "https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=2-285"
  master_page: Primitives
inventory_date: 2026-05-22
---

# Inventaire — Input

> Source : page **Primitives** du Shadcn UI Kit (nodeId `2:285`).

## Vue d'ensemble

| Champ | Valeur |
|---|---|
| Type | atom |
| Nb variants | 13 |
| Props détectés | `size`, `state`, `type`, `label`, `helperText`, `button` |
| Famille typo | Inter (Medium pour labels, Regular pour placeholder/value) |
| Radius standard | 6px (8px pour le wrapper focused) |
| Padding standard | `pl-[12px] pr-[56px] py-[8px]` |
| Largeur de référence | 384px |

## Variants détaillés

Combinaisons `size × state × type` :

| # | size | state | type | nodeId | Background | Border | Note |
|---|---|---|---|---|---|---|---|
| 1 | default | default | default | `2:283` | white | slate/300 (#CBD5E1) | placeholder slate/400 |
| 2 | default | completed | default | `6:296` ou `6:341` | white | slate/300 | value slate/900 |
| 3 | default | focused | default | `6:360` | white | slate/300 + outer 2px slate/400 | wrapper rounded-[8px] |
| 4 | default | disabled | default | `6:278` | white | slate/300 | opacity 50% |
| 5 | small | default | default | `6:244` | white | slate/300 | line-height 20 (au lieu de 24) |
| 6 | small | completed | default | `6:305` | white | slate/300 | — |
| 7 | small | focused | default | `6:371` | white | slate/300 + outer 2px slate/400 | — |
| 8 | small | disabled | default | `6:287` | white | slate/300 | opacity 50% |
| 9 | small | default | label to the left | `13:810` | white | slate/300 | label inline gauche, 84px |
| 10 | small | completed | label to the left | `13:820` | white | slate/300 | — |
| 11 | small | focused | label to the left | `13:838` | white | slate/300 + outer | — |
| 12 | small | disabled | label to the left | `13:832` | white | slate/300 | opacity 50% |

> **À noter** : variant `error` **absent** du kit Shadcn. C'est un manque critique pour un formulaire.

## Tokens consommés

### Couleur

| Nom Shadcn | Hex | Usage |
|---|---|---|
| slate/900 | `#0F172A` | Texte value, label |
| slate/500 | `#64748B` | helper text |
| slate/400 | `#94A3B8` | placeholder, outline focus 2px |
| slate/300 | `#CBD5E1` | border standard |
| white | `#FFFFFF` | background |

### Typographie

| Style nommé | Valeur | Usage |
|---|---|---|
| body-medium | Inter Medium 14/24/0 | Label |
| p-ui | Inter Regular 16/24/0 | Placeholder / value (size default) |
| subtle | Inter Regular 14/20/0 | Placeholder / value (size small), helper text |

## Hex hardcodés détectés

Idem Button : tous les hex sont inlinés via Tailwind. À re-tokeniser à l'étape 6.

## Variants attendus état de l'art vs présents

| Variant attendu | Présent ? | Note |
|---|---|---|
| default | ✅ | — |
| focused | ✅ | wrapper 2px slate/400 |
| filled / completed | ✅ | `state=completed` |
| disabled | ✅ | opacity 50% |
| **error** | ❌ | **MANQUANT — critique pour un formulaire** |
| read-only | ❌ | absent |
| with prefix / suffix icon | ⚠️ | seulement le bouton suffix `Subscribe` est documenté, pas d'icon prefix générique |
| label visible | ✅ | au-dessus par défaut, à gauche en option |
| helper text | ✅ | sous le champ |

**À flagger en étape 6** :
- `[VARIANT MANQUANT EN FIGMA — error]` à créer pour le DS Labster cible (border rouge brand + texte d'erreur en helper)
- `[VARIANT MANQUANT EN FIGMA — read-only]` optionnel selon use cases Labster

## Notes pour la re-tokenisation Labster (étape 6)

- L'`error` state devra utiliser le rouge brand Labster (`#E20A18` approx selon screenshot Color palette). Conflit sémantique avec rouge brand à arbitrer (cf. Button destructive).
- La palette Shadcn distingue `slate/300` (border standard) et `slate/400` (focus outline). Labster a 6 niveaux de gris : on devrait pouvoir mapper sans `[TOKEN MANQUANT]`.
- Le placeholder en `slate/400` (low contrast) peut poser un problème WCAG AA. À vérifier avec les gris Labster.
