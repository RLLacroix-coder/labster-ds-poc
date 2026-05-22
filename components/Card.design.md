---
component: Card
type: molecule
version: V1.0 (introduced 2026-05-22 as MVP replacement for Dialog)
source:
  inspiration: Material 3 Card + Shadcn Card patterns
  labster_observation: "Pattern observed on labster.io homepage (service cards: 'Digital Product Design', 'Software Engineering', etc.)"
  no_figma_master: true
  note: "Created from scratch for Labster — no existing master in Shadcn kit nor brand kit. To be designed in Figma DS V1.0 (étape 6.4 of tutoriel)."
tokens:
  structure:
    container:
      background: "{neutral.white}"
      border:
        default: "1px solid {neutral.grey-1}"
        hover: "1px solid {neutral.grey-2}"
        selected: "2px solid {semantic.action-primary}"
      radius: "{shapes.radius.md}"
      padding: "24px"
      box_shadow:
        default: "none"
        elevated: "{elevation.small}"
        hover: "{elevation.medium}"
    title:
      typography: "{typography.headings.h5}"
      color: "{neutral.grey-6}"
    subtitle:
      typography: "{typography.text_styles.label_m}"
      color: "{neutral.grey-3}"
    body:
      typography: "{typography.paragraphs.small}"
      color: "{neutral.grey-4}"
    action_area:
      alignment: "left or full-width depending on variant"
      gap_between_actions: "12px"
  variants:
    default:
      description: "Static card with title + body. No actions. Used for content blocks, info display."
    interactive:
      description: "Clickable card with hover state. Used as link/navigation. Full surface is clickable."
    with_actions:
      description: "Card with explicit action(s) in a button area. Used for CTAs (ex: labster.io 'En savoir plus' buttons on service cards)."
    selectable:
      description: "Card with selected state (border action-primary). Used in lists where user picks one (settings, plan selection)."
    elevated:
      description: "Card with elevation.small/medium drop shadow. Used to draw attention or signal depth (dashboards, marketing)."
  sizes:
    Small:
      max_width: "280px"
      padding: "16px"
      use_for: "Compact cards in grids, lists"
    Medium:
      max_width: "400px"
      padding: "24px"
      use_for: "Default — service cards, content blocks"
    Large:
      max_width: "560px"
      padding: "32px"
      use_for: "Hero cards, featured content"
  composition:
    uses:
      - component: Button
        variant: "any (typically secondary, ghost, link, or primary for CTA)"
        cardinality: "0..2"
      - component: Input
        variant: "any (for forms inside cards)"
        cardinality: "0..n (typically 0)"
  states:
    - default
    - hover (only for interactive variant)
    - focus (only for interactive variant)
    - selected (only for selectable variant)
    - disabled (rare, but possible for interactive variant)
---

# Card — DESIGN.md

> **Source** : pattern dérivé Material 3 Card + Shadcn Card + observations labster.io.
> **V1.0 — introduit dans le DS Labster pour remplacer Dialog comme molecule MVP**. Cf. workflow-agentique-vision.md §"Périmètre V1.0".
> **Pas de master Figma source** — à créer dans le DS Labster Figma (étape 6.4 du tutoriel) suivant les specs ci-dessous.

## Overview

La Card est la **molecule de composition principale** du DS Labster. Elle est utilisée pour :
- Service cards (pattern labster.io : Digital Product Design, Software Engineering, Healthcare Consulting…)
- Content blocks dans des dashboards
- Listes d'éléments sélectionnables
- Mise en avant de contenu (hero, featured)

C'est le composant qui **structure la majorité des layouts** de l'application Labster. Plus important que Dialog (rare, modal-only).

## Usage

**Quand utiliser une Card** :
- Quand on présente un **bloc autonome de contenu** (titre + body + actions optionnelles)
- Quand on veut **grouper visuellement** des éléments associés
- Quand on veut **rendre cliquable une zone large** (variant `interactive`)

**Quand ne PAS utiliser une Card** :
- Pour un message critique nécessitant acquittement → Dialog (modal)
- Pour une liste plate sans grouping visuel → utiliser une simple list view
- Pour un seul bouton + texte → utiliser Button avec helper text

## Anatomie

```
┌────────────────────────────────────────┐  ← container : white bg, grey-1 border, radius md
│  [Optional media — image, icon, picto] │     padding 24px, optional shadow
│                                        │
│  Title (H5)                            │  ← Headings/H5, grey-6
│  Subtitle (Label M)                    │  ← Label M, grey-3 (optional)
│                                        │
│  Body text — Paragraph Small           │  ← Paragraphs/Small, grey-4
│  ...                                   │
│                                        │
│  [Button] [Button] (action area)       │  ← Button instances, gap 12px
└────────────────────────────────────────┘
```

## Variants détaillés

### 1. default
Static block. No interactivity. Title + body. No actions.

### 2. interactive
Full surface clickable. Hover state changes border to grey-2 and applies elevation.medium box-shadow. Cursor pointer. Focus ring 2px action-primary outside.

**Pattern** : navigation cards, "tile" UI elements.

### 3. with-actions
Card with 1-2 Button instances in an action area (typically below body, left or center aligned).

**Pattern labster.io** : "En savoir plus" buttons on service cards.

### 4. selectable
Card that can be selected. Selected state = border 2px action-primary (radius adjusted). Often used as a group (Radio-Card pattern).

**Pattern** : plan selection, feature toggle.

### 5. elevated
Card with permanent shadow (elevation.small or elevation.medium). Draws attention.

**Pattern** : featured content, marketing hero, dashboards alerts.

## Sizes

| Size | Max width | Padding | Use case |
|---|---|---|---|
| Small | 280px | 16px | Compact grids (e.g., 4-column dashboards) |
| Medium | 400px | 24px | Default — service cards, content blocks |
| Large | 560px | 32px | Hero cards, featured |

## États

| État | Quand il s'applique | Effet visuel |
|---|---|---|
| `default` | Tous variants | Standard render |
| `hover` | Variants `interactive`, `with-actions` (if card-level click) | Border grey-1 → grey-2, shadow none → elevation.medium |
| `focus` | Variants `interactive`, `selectable` | Outline 2px `semantic.action-primary` outside |
| `selected` | Variant `selectable` only | Border 2px `semantic.action-primary` |
| `disabled` | Rare, possible for `interactive` | Opacity 0.5, cursor not-allowed |

## Accessibilité (WCAG AA + WAI-ARIA)

- Variant `interactive` : utiliser `<a>` ou `<button>` HTML pour la zone cliquable (pas juste `onClick` sur div). Tabindex géré nativement.
- Variant `selectable` : pattern Radio Card → `role="radio"` + `aria-checked` + `aria-labelledby` pointing au title.
- Variant `with-actions` : les boutons enfants gardent leurs propres ARIA — Card ne doit pas capturer leurs événements.
- Focus ring obligatoire sur variants interactifs (test au clavier).
- Contraste : title `grey-6` sur `white` = 14:1 ✅. Subtitle `grey-3` sur `white` ≈ 5.3:1 ✅ (limite mais OK pour secondary text). Body `grey-4` sur `white` ≈ 8:1 ✅.

## Do's and Don'ts

### Do

- ✅ Utiliser Medium size par défaut (400px max-width).
- ✅ Donner un titre clair et concis (max 6 mots).
- ✅ Limiter le body à 3-4 lignes en preview (utiliser truncation si plus long).
- ✅ Pour `with-actions`, max 2 boutons dans l'action area (1 primary + 1 secondary).
- ✅ Pour `interactive`, rendre TOUTE la surface cliquable, pas juste le titre.
- ✅ Utiliser `elevation.small` par défaut pour `elevated`, `elevation.medium` pour les cards très importantes.

### Don't

- ❌ Ne pas mettre un Dialog DANS une Card (anti-pattern, confusion modale).
- ❌ Ne pas surcharger une Card avec >5 sous-éléments (refactorer en page ou section).
- ❌ Ne pas mélanger plusieurs niveaux d'élévation côte-à-côte (`elevated` + `default` dans la même grille = visuellement bruyant).
- ❌ Ne pas hardcoder des dimensions internes — laisser le contenu déterminer la hauteur (auto-layout vertical).
- ❌ Ne pas oublier le focus ring sur les variants interactifs.

## Composition validée

La Card consomme :
- **Button** (typiquement secondary, ghost, link, ou primary pour CTA) — 0 à 2 instances dans l'action area.
- **Input** (rare, mais possible pour les cards de formulaire) — 0 à n instances.

## Variants à créer en Figma (POC V1.0 findings)

À la création dans le DS Labster Figma (étape 6.4) :
- `[VARIANT À CRÉER]` 5 variants : default, interactive, with-actions, selectable, elevated
- `[VARIANT À CRÉER]` 3 sizes : Small, Medium, Large
- `[VARIANT À CRÉER]` 5 states : default, hover, focus, selected, disabled
- `[VARIANT À CRÉER]` 1 property booléenne : `with-image` (true/false) — quand true, ajoute un slot media en haut de la card

## Pattern de référence Labster

Sur labster.io homepage, on observe des **service cards** :
- Variant `with-actions`
- Size Medium ou Large
- Sub-title "Service" en label M grey-3
- Title H5 grey-6 ("Digital Product Design")
- Body Paragraph Small grey-4
- 1 Button variant `link` ou `secondary` ("En savoir plus →")

Ce pattern doit être reproductible avec les variants définis ci-dessus.
