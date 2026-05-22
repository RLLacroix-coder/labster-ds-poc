---
component: Button
type: atom
version: V0.1
source:
  figma_file_key: tPwrOV9EX9jLXuxsBskINR
  figma_node_id: "1:85"
  figma_url: "https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=1-85"
tokens:
  variants:
    primary:
      description: "CTA principal, action attendue de l'utilisateur"
      background:
        default: "{semantic.action-primary}"
        hover: "{semantic.action-primary-hover}"
        disabled: "{neutral.grey-2}"
      text:
        all_states: "{neutral.white}"
      typography: "{typography.text_styles.button_label}"
      radius: "{radius.sm}"
      padding: "8px 16px"
    secondary:
      description: "Action moins prioritaire, ou alternative au primary"
      background:
        default: "{neutral.white}"
        hover: "{neutral.smoke}"
        disabled: "{neutral.smoke}"
      border:
        default: "1px solid {neutral.grey-1}"
        hover: "1px solid {neutral.grey-2}"
      text:
        all_states: "{neutral.grey-6}"
      typography: "{typography.text_styles.button_label}"
      radius: "{radius.sm}"
      padding: "8px 16px"
    ghost:
      description: "Action discrète, intégrée dans du contenu"
      background:
        default: "transparent"
        hover: "{neutral.smoke}"
        disabled: "transparent"
      text:
        all_states: "{neutral.grey-6}"
      typography: "{typography.text_styles.button_label}"
      radius: "{radius.sm}"
      padding: "8px 16px"
    danger:
      description: "Action destructive, irréversible"
      background:
        default: "{semantic.danger}"
        hover: "{semantic.danger-hover}"
        disabled: "{neutral.grey-2}"
      text:
        all_states: "{neutral.white}"
      typography: "{typography.text_styles.button_label}"
      radius: "{radius.sm}"
      padding: "8px 16px"
      conflict_note: "Utilise brand.red — voir DESIGN.md global section 2 pour le conflit identité/sémantique"
    link:
      description: "Action navigationnelle, ressemble à un lien inline"
      background:
        all_states: "transparent"
      text:
        default: "{semantic.action-primary}"
        hover: "{semantic.action-primary} (underline)"
      typography: "{typography.text_styles.button_link_label}"
      padding: "8px 0"
    loading:
      description: "État pendant l'exécution d'une action — pas un variant indépendant mais un état overlay"
      background:
        any_variant: "Opacité 50% du variant actif"
      content: "spinner + texte 'Loading...' ou texte du bouton"
  sizes:
    default:
      height: "40px"
      padding: "8px 16px"
      typography: "{typography.text_styles.button_label}"
    small:
      height: "32px"
      padding: "6px 12px"
      typography: "Barlow Medium 13/20"
      status: "[VARIANT À CONFIRMER — Shadcn n'a pas de size small explicite pour Button]"
    icon_only_square:
      width: "32px"
      height: "32px"
      padding: "8px"
      radius: "{radius.sm}"
    icon_only_circle:
      width: "40px"
      height: "40px"
      padding: "12px"
      radius: "{radius.pill}"
  states:
    - default
    - hover
    - focus
    - active
    - disabled
    - loading
---

# Button — DESIGN.md

> **Source Figma** : [Shadcn UI Kit / Primitives / button (master `1:85`)](https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=1-85)
> Re-tokenisé sur les tokens Labster — voir [labster-styles-raw.md](../tokens/labster-styles-raw.md).
> **V0.3 correction** : la typo n'est PAS Barlow (erreur d'extraction initiale) — la vraie famille Labster est **Fieldwork**, voir [DESIGN.md global §3](../DESIGN.md).

## Overview

Le Button est l'atom le plus utilisé du DS Labster. Il déclenche une action ou une navigation. Il existe en 5 variants principaux (`primary`, `secondary`, `ghost`, `danger`, `link`), 4 tailles (`default`, `small`, `icon-only square`, `icon-only circle`), et 6 états (`default`, `hover`, `focus`, `active`, `disabled`, `loading`).

## Usage

**Quand utiliser un Button** :
- Pour une action qui va modifier l'état de l'application ou envoyer une requête (`primary`, `danger`).
- Pour une navigation interne qui ressemble à une action (`secondary`, `link`).
- Comme bouton d'icône dans une toolbar ou un menu (`icon-only`).

**Hiérarchie attendue dans un écran** :
- Maximum **1 `primary`** par section (CTA principal).
- 0-n `secondary` pour les actions alternatives ou les annulations.
- `ghost` pour les actions inline dans une liste ou un menu.
- `danger` uniquement pour les actions destructives (delete, archive, revoke) — toujours associé à une confirmation (dialog).

## Variants détaillés

### 1. Primary (`variant="primary"`)

**Background** : `semantic.action-primary` (`#476AE3` Bleu brand)
**Background hover** : `semantic.action-primary-hover` (`#3A57BC` `[À CONFIRMER]`)
**Text** : `neutral.white`
**Usage type** : Submit form, Save changes, Continue, Send invitation.

### 2. Secondary (`variant="secondary"`)

**Background** : `neutral.white`
**Border** : 1px `neutral.grey-1`
**Background hover** : `neutral.smoke`
**Border hover** : 1px `neutral.grey-2`
**Text** : `neutral.grey-6`
**Usage type** : Cancel, Back, Skip.

### 3. Ghost (`variant="ghost"`)

**Background** : transparent
**Background hover** : `neutral.smoke`
**Text** : `neutral.grey-6`
**Usage type** : Actions inline dans une liste (Edit, Duplicate, Move).

### 4. Danger (`variant="danger"`)

**Background** : `semantic.danger` (`#EF4C59` Brand red / Accent default)
**Background hover** : `semantic.danger-hover` (`#E04854`)
**Text** : `neutral.white`
**Usage type** : Delete, Remove, Revoke access.

> **⚠** Le rouge utilisé est la couleur brand Labster. Conflit identité/sémantique documenté dans [DESIGN.md global §2](../DESIGN.md). Toujours associer le bouton danger à une confirmation explicite (dialog avec "Are you sure ?").

### 5. Link (`variant="link"`)

**Background** : transparent
**Text** : `semantic.action-primary` (sans underline en default)
**Text hover** : `semantic.action-primary` + underline
**Usage type** : Navigation inline dans une phrase ou un helper text.

## États

| État | Comment Figma le rend | CSS attendu |
|---|---|---|
| `default` | Variant standard | — |
| `hover` | Variant hover documenté ci-dessus | `:hover` |
| `focus` | `[VARIANT MANQUANT EN FIGMA — pas de focus ring déclaré]` | Outline 2px `semantic.action-primary` (recommandation accessibilité) |
| `active` (pressed) | `[VARIANT MANQUANT EN FIGMA]` | Background = hover + opacity 0.85 |
| `disabled` | `[NON EXPLICITE EN FIGMA — opacité 50% utilisée comme proxy]` | Opacité 50% + cursor not-allowed + aria-disabled |
| `loading` | Variant `loading` documenté | Background semi-opaque + spinner |

## Accessibilité (WCAG AA)

- **Contraste texte sur background** :
  - Primary : `white` sur `#476AE3` → contraste à vérifier (probable > 4.5:1 ✅)
  - Secondary : `grey-6` sur `white` → 14:1 ✅
  - Danger : `white` sur `#EF4C59` → contraste à vérifier
- **Focus ring** : focus ring obligatoire pour navigation clavier. À ajouter via CSS `:focus-visible` outline 2px `semantic.action-primary`.
- **aria-label** : obligatoire pour les variants `icon-only` (sinon le screen reader ne sait pas ce que fait le bouton).
- **aria-disabled** : à positionner sur `disabled` (et pas seulement `disabled` HTML, pour que les screen readers l'annoncent).
- **aria-busy** : à positionner sur `loading` pour signaler l'état d'attente.
- **Taille de touch target** : 40×40px (height + padding suffisant) — conforme WCAG 2.1 SC 2.5.5.

## Do's and Don'ts

### Do

- ✅ Utiliser `primary` pour une seule action par section/écran.
- ✅ Combiner `danger` avec une confirmation explicite (dialog).
- ✅ Donner un texte de bouton qui décrit l'action ("Save changes" plutôt que "OK").
- ✅ Garder le label court (≤ 4 mots).
- ✅ Pour `icon-only`, fournir un `aria-label` descriptif.

### Don't

- ❌ Ne pas utiliser `primary` deux fois dans la même section (compétition visuelle).
- ❌ Ne pas utiliser `danger` pour une action non destructive (cancel, close).
- ❌ Ne pas mettre de texte vague ("Submit", "OK", "Click here").
- ❌ Ne pas oublier le `focus` ring pour le clavier (à ajouter via CSS même si pas dans Figma).
- ❌ Ne pas hardcoder un hex — toujours référencer via token sémantique.

## Variants à créer en Figma (POC findings)

Pour passer V0.1 → V1.0 du composant Button Labster, créer en Figma :
- `[VARIANT À CRÉER]` Focus ring (2px outline `semantic.action-primary`) pour chaque variant
- `[VARIANT À CRÉER]` Active (pressed) — background hover + opacité 0.85
- `[VARIANT À CRÉER]` Disabled explicite (pas seulement opacité 50% proxy)
- `[VARIANT À CRÉER]` Size small (h-32px) pour les contextes denses
