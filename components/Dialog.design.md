---
component: Dialog
type: molecule
version: V0.1
source:
  figma_file_key: tPwrOV9EX9jLXuxsBskINR
  figma_node_id: "4:329"
  figma_url: "https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=4-329"
  substitution_note: "Substitution de Card (inexistant dans Shadcn kit) — décision Rachel 2026-05-22"
tokens:
  structure:
    container:
      background: "{neutral.white}"
      border: "1px solid {neutral.grey-1}"
      radius: "{radius.md}"
      padding: "24px"
      box_shadow: "{elevation.large}"
      width:
        default: "425px"
        min: "320px"
        max: "640px"
    backdrop:
      background: "{neutral.grey-6}"
      opacity: 0.5
      status: "[VARIANT CRÉÉ POUR LABSTER — n'existe pas dans Shadcn]"
    title:
      typography: "{typography.headings.h6}"
      color: "{neutral.grey-6}"
    description:
      typography: "{typography.paragraphs.small}"
      color: "{neutral.grey-3}"
    button_section:
      alignment: "right (justify-end)"
      gap_between_buttons: "12px"
  composition:
    uses:
      - component: Input
        variant: "size=small"
        count: "0..n"
      - component: Button
        variant: "primary | secondary | danger"
        count: "1..2"
  states:
    - default
    - open
    - closing
  variants:
    informational:
      description: "Dialog d'info (read-only, dismissible)"
      buttons: "1 secondary (Close)"
    confirmation:
      description: "Dialog qui demande une confirmation d'action"
      buttons: "1 secondary (Cancel) + 1 primary (Confirm)"
    destructive_confirmation:
      description: "Dialog avant action irréversible"
      buttons: "1 secondary (Cancel) + 1 danger (Delete)"
    form:
      description: "Dialog avec saisie utilisateur (le master Figma observé)"
      buttons: "1 secondary (Cancel) + 1 primary (Save)"
---

# Dialog — DESIGN.md

> **Source Figma** : [Shadcn UI Kit / Components / dialog (master `4:329`)](https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=4-329)
> Re-tokenisé sur les tokens Labster. **Substitution de Card** (inexistant dans le kit Shadcn) — décision documentée dans le README du POC.
> **V0.3 correction** : typo Labster = Fieldwork. Title = `H6` (Fieldwork Geo Bold 18/auto/0), Description = `Paragraph Small` (Fieldwork Geo Regular 14/18/0), Buttons = `Button Label` / `Button Link Label` hérités du composant Button.

## Overview

Le Dialog est la molecule modale du DS Labster. Il interrompt l'utilisateur pour une action ou une information critique. Il est composé d'un container (avec backdrop), d'un titre, d'une description optionnelle, d'un contenu (formulaire, message ou éléments d'UI), et d'une zone d'actions (buttons).

Le Dialog est aussi le **test case principal de composition** dans ce POC : il consomme `Input` et `Button` documentés séparément.

## Usage

**Quand utiliser un Dialog** :
- Pour une confirmation avant action destructive (delete account, revoke access).
- Pour une saisie ponctuelle de données (edit profile, invite member).
- Pour un message critique nécessitant acquittement (consent, important notice).

**Quand ne PAS utiliser un Dialog** :
- Pour un message non critique (préférer un Toast ou Banner).
- Pour de la navigation (préférer une page dédiée).
- Pour un long formulaire (préférer une page ou un Drawer).

## Anatomie

```
[Backdrop]                                    ← grey-6 @ opacity 0.5
└── [Dialog container]                        ← white, border grey-1, radius 8, shadow elevation.large
    └── [Content stack, gap 32px]
        ├── [Content section]                 ← gap 8px
        │   ├── Title                         ← Barlow Semi Bold 18/28, grey-6
        │   └── Description (optional)        ← Barlow Regular 14/20, grey-3
        ├── [Body section] (optional)         ← gap 16px
        │   └── Inputs / message / content
        └── [Button section]                  ← justify-end, gap 12px
            ├── Button secondary (Cancel)
            └── Button primary | danger (Confirm)
```

## Variants détaillés

### 1. Informational
Dialog read-only avec acquittement.
- 1 bouton `secondary` "Close" (ou "OK").
- Pas de description si le titre est explicite.

### 2. Confirmation
Dialog qui demande "êtes-vous sûr ?".
- 1 bouton `secondary` "Cancel" + 1 bouton `primary` "Confirm" / "Save".
- Title : phrase complète qui résume l'action ("Save your changes ?").
- Description : conséquences de l'action ("These changes will be visible to all members of your team.").

### 3. Destructive confirmation
Variante de Confirmation pour action irréversible.
- 1 bouton `secondary` "Cancel" + 1 bouton `danger` "Delete" / "Revoke".
- Title : doit mentionner l'irréversibilité ("Delete your account?").
- Description : doit lister les conséquences ("All your data will be permanently deleted. This cannot be undone.").

### 4. Form
Le master observé dans Shadcn — utilisé pour les saisies ponctuelles.
- Inputs (généralement size=small, label inline gauche) + 1 bouton `secondary` "Cancel" + 1 bouton `primary` "Save changes".
- Maximum recommandé : 4-5 champs. Au-delà, préférer une page dédiée.

## États

| État | Comportement | Notes |
|---|---|---|
| `default` (closed) | Non rendu | DOM peut contenir un portal vide |
| `open` | Backdrop + container visibles, focus trap actif, scroll body bloqué | Animation fade-in (200ms) recommandée |
| `closing` | Backdrop + container en fade-out (200ms) | Focus rendu à l'élément qui a ouvert le dialog |

## Accessibilité (WCAG AA + WAI-ARIA Dialog Pattern)

- **`role="dialog"`** ou **`role="alertdialog"`** (pour les confirmations destructives).
- **`aria-modal="true"`**.
- **`aria-labelledby`** pointant vers l'ID du title.
- **`aria-describedby`** pointant vers l'ID de la description (si présente).
- **Focus trap** : le focus doit rester à l'intérieur du dialog tant qu'il est ouvert (Tab / Shift+Tab cyclent dans le dialog).
- **Focus initial** : sur le premier élément interactif (champ ou bouton secondary "Cancel" pour les confirmations destructives, JAMAIS sur le bouton danger).
- **Escape key** : ferme le dialog (équivalent Cancel).
- **Click backdrop** : ferme le dialog (sauf pour les confirmations destructives ou form unsaved).
- **Restitution focus** : après fermeture, focus rendu à l'élément qui a déclenché l'ouverture.
- **Scroll lock** : `body { overflow: hidden }` quand le dialog est open.

## Do's and Don'ts

### Do

- ✅ Utiliser `confirmation` ou `destructive_confirmation` avant toute action irréversible.
- ✅ Donner un titre qui décrit clairement l'action et ses conséquences ("Delete your project Octopus?", pas "Are you sure?").
- ✅ Donner une description qui explicite les conséquences ("All members will lose access.").
- ✅ Placer le bouton de confirmation à droite (`justify-end`).
- ✅ Placer le focus initial sur le bouton non-destructif (Cancel) pour les confirmations destructives.
- ✅ Permettre Escape pour fermer (sauf si data non sauvegardée → demander confirmation).
- ✅ Utiliser `Elevation/Large` pour signaler la profondeur.

### Don't

- ❌ Ne pas utiliser un Dialog pour un message non critique (préférer un Toast).
- ❌ Ne pas empiler deux Dialogs (anti-pattern UX).
- ❌ Ne pas mettre plus de 2-3 boutons dans la zone d'actions.
- ❌ Ne pas afficher de Dialog au chargement de page (intrusion forcée).
- ❌ Ne pas oublier le focus trap (test obligatoire au clavier).
- ❌ Ne pas oublier le backdrop (test obligatoire — le contenu derrière ne doit pas être interactif).

## Composition validée

Le Dialog re-tokenisé est composé exclusivement de :
- `Input` (variants size=small, label inline gauche) — voir [Input.design.md](./Input.design.md)
- `Button` (variants primary, secondary, danger) — voir [Button.design.md](./Button.design.md)

Aucune duplication de tokens : tous les sous-tokens (couleur, typo, radius) sont hérités des composants enfants, qui eux-mêmes consomment les tokens globaux du DS Labster.

## Variants à créer en Figma (POC findings)

Pour V0.1 → V1.0 du composant Dialog Labster :
- `[VARIANT À CRÉER]` Backdrop overlay (grey-6 @ 0.5 opacity)
- `[VARIANT À CRÉER]` Elevation visible (utiliser style Labster `Elevation/Large`)
- `[VARIANT À CRÉER]` Pattern Confirmation (Cancel + Confirm)
- `[VARIANT À CRÉER]` Pattern Destructive (Cancel + danger Delete)
- `[VARIANT À CRÉER]` Animation fade-in/fade-out (200ms)
- `[VARIANT À CRÉER]` Bouton close (X) en haut à droite, optionnel
