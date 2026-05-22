---
component: Input
type: atom
version: V0.1
source:
  figma_file_key: tPwrOV9EX9jLXuxsBskINR
  figma_node_id: "2:285"
  figma_url: "https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=2-285"
tokens:
  variants:
    default:
      description: "Input standard, taille default"
      background: "{neutral.white}"
      border:
        default: "1px solid {neutral.grey-2}"
        focused: "1px solid {neutral.grey-2} + outer ring 2px {semantic.action-primary} avec offset 2px"
        error: "1px solid {semantic.danger}"
        disabled: "1px solid {neutral.grey-1}"
      text:
        placeholder: "{neutral.grey-3}"
        value: "{neutral.grey-6}"
        disabled: "{neutral.grey-3}"
      typography:
        label: "Barlow Medium 14/20"
        placeholder_value: "Barlow Regular 16/24"
        helper: "Barlow Regular 14/20"
      radius: "{radius.sm}"
      padding: "8px 12px"
    small:
      description: "Input compact, contextes denses"
      typography:
        placeholder_value: "Barlow Regular 14/20"
      padding: "6px 10px"
      height: "32px"
    label_inline:
      description: "Label à gauche du champ, pour les formulaires denses (preferences, settings)"
      label_width: "84px"
      label_alignment: "right-aligned, vertically centered"
  states:
    - default
    - focused
    - completed (filled)
    - error
    - disabled
    - read-only
  composition:
    - label (optional, above or inline)
    - input field
    - helper_text (optional)
    - error_message (optional, when state=error)
    - icon_prefix (optional)
    - icon_suffix (optional)
---

# Input — DESIGN.md

> **Source Figma** : [Shadcn UI Kit / Primitives / input (master `2:285`)](https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=2-285)
> Re-tokenisé sur les tokens Labster.

## Overview

L'Input est l'atom de saisie de données utilisateur (texte libre). Il existe en 2 tailles (`default`, `small`), 2 layouts (label au-dessus, label inline gauche), et 6 états (`default`, `focused`, `completed`, `error`, `disabled`, `read-only`).

L'état `error` est **manquant dans la source Shadcn** — il est défini dans ce DESIGN.md comme une création nécessaire pour le DS Labster.

## Usage

**Quand utiliser un Input** :
- Pour toute saisie texte libre (email, nom, message court).
- Pour des valeurs numériques courtes (avec `type="number"`).
- Pour des recherches simples (avec icône suffix recherche).

**Quand ne PAS utiliser un Input** :
- Pour les longs textes → utiliser `Textarea` (à documenter quand le DS s'étend).
- Pour les choix exclusifs → utiliser `Select` ou `Radio Group`.
- Pour les booléens → utiliser `Checkbox` ou `Switch`.

## Anatomie

```
[Label]                          ← Barlow Medium 14/20, grey-6
[Input field with placeholder]   ← border grey-2, padding 8/12, radius 6px
[Helper text]                    ← Barlow Regular 14/20, grey-3
[Error message si state=error]   ← Barlow Regular 14/20, semantic.danger
```

## États détaillés

### Default
- Border : 1px `neutral.grey-2`
- Background : `neutral.white`
- Placeholder : `neutral.grey-3`

### Focused
- Border : 1px `neutral.grey-2` + **outer ring 2px `semantic.action-primary`** (avec un offset de 2px qui crée un effet de "focus ring" autour du champ)
- Background : `neutral.white`
- Value : `neutral.grey-6`

> **Différence avec Shadcn** : Shadcn utilise un focus outer en `slate/400` (gris neutre). Pour Labster, on substitue par `semantic.action-primary` (bleu brand) pour cohérence avec l'identité et meilleure visibilité du focus clavier.

### Completed (filled)
- Border : 1px `neutral.grey-2`
- Background : `neutral.white`
- Value : `neutral.grey-6`

### Error `[VARIANT CRÉÉ POUR LABSTER — n'existe pas dans Shadcn]`
- Border : 1px `semantic.danger`
- Background : `neutral.white`
- Value : `neutral.grey-6`
- **Icône suffix** `alert-circle` en `semantic.danger`
- **Error message** sous le champ : Barlow Regular 14/20, `semantic.danger`, max 2 lignes
- Optionnel : background `brand.red-light` pour un effet plus voyant (à utiliser parcimonieusement, surtout sur les erreurs critiques)

### Disabled
- Border : 1px `neutral.grey-1`
- Background : `neutral.white`
- Value/placeholder : `neutral.grey-3`
- Opacité 0.6 sur tout le bloc (label + champ + helper)
- `aria-disabled="true"`

### Read-only `[VARIANT À CRÉER]`
- Border : aucune (ou 1px `neutral.grey-1` dashed)
- Background : `neutral.smoke`
- Value : `neutral.grey-6`
- Pas de cursor text
- `aria-readonly="true"`

## Variants taille

### Default (height ≈ 40px)
- Typography placeholder/value : Barlow Regular 16/24 (`p-ui`)
- Padding : 8px 12px (avec 56px à droite si bouton suffix)

### Small (height ≈ 32px)
- Typography placeholder/value : Barlow Regular 14/20 (`subtle`)
- Padding : 6px 10px

## Variant layout : label inline gauche

Utiliser pour les formulaires denses (settings, preferences) où le label sert d'étiquette de propriété.

- Label : 84px de large, right-aligned, vertically centered avec le champ
- Gap label-champ : 16px

## Accessibilité (WCAG AA)

- **Label obligatoire** (`<label for=...>` ou `aria-label`). Pas de placeholder-only.
- **Focus ring** : 2px `semantic.action-primary` outer, visible au clavier. Le focus default Shadcn (gris) est remplacé par bleu brand pour Labster (meilleure visibilité).
- **Erreur annoncée** : associer le message d'erreur via `aria-describedby`. Utiliser `aria-invalid="true"` quand state=error.
- **Disabled** : `aria-disabled="true"` + `disabled` HTML.
- **Read-only** : `readonly` HTML + `aria-readonly="true"`.
- **Contraste placeholder** : `grey-3` sur `white` → ~ 5.3:1, suffisant pour AA (texte normal seuil 4.5:1). À vérifier précisément.
- **Touch target** : 40×40px minimum (taille default OK ; small à vérifier en contexte mobile).

## Do's and Don'ts

### Do

- ✅ Toujours afficher un label visible (au-dessus ou inline gauche). Pas de placeholder-only.
- ✅ Utiliser le helper text pour expliquer la donnée attendue ("We need this to send you the report").
- ✅ Afficher l'erreur près du champ (et pas en haut de formulaire seulement) avec un message précis ("Email format is incorrect — example: name@example.com").
- ✅ Utiliser `state=disabled` quand un champ dépend d'une condition non remplie (et expliquer la condition dans le helper text).
- ✅ Pour les champs sensibles (mot de passe), proposer un toggle d'affichage (icon suffix `eye/eye-off`).

### Don't

- ❌ Ne pas utiliser un placeholder à la place d'un label.
- ❌ Ne pas hardcoder une couleur d'erreur — toujours `semantic.danger`.
- ❌ Ne pas afficher un message d'erreur générique ("Invalid input"). Toujours expliquer **quoi** est invalide et **comment** corriger.
- ❌ Ne pas désactiver un champ sans expliquer pourquoi (helper text).
- ❌ Ne pas oublier le focus ring (test obligatoire au clavier).

## Variants à créer en Figma (POC findings)

Pour V0.1 → V1.0 du composant Input Labster :
- `[VARIANT À CRÉER]` State=error (border + helper text + icon, sur les 2 tailles)
- `[VARIANT À CRÉER]` State=read-only (bg smoke + border subtle)
- `[VARIANT À CRÉER]` Icon prefix (search, mail, lock)
- `[VARIANT À CRÉER]` Icon suffix générique (au-delà du bouton Subscribe Shadcn)
- `[VARIANT À CRÉER]` Password type avec eye/eye-off toggle
