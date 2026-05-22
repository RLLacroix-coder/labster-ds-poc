---
title: Labster Design System
version: V0.1 (POC, dry-run SIG)
date: 2026-05-22
sources:
  tokens_figma_file_key: PVYjz7w3CG5Lh0GU2iAoG3
  tokens_figma_file: "00-Labster-Tokens"
  components_figma_file_key: tPwrOV9EX9jLXuxsBskINR
  components_figma_file: "01-Shadcn-Kit-POC (Shadcn UI re-tokenized on Labster)"
tokens:
  colors:
    brand:
      blue:
        value: "#476AE3"
        figma_style: "Palette/Brand colors/Blue"
        role: "primary brand color, CTA principal"
      red:
        value: "#EF4C59"
        figma_style: "Palette/Brand colors/Red"
        role: "secondary brand color"
      yellow:
        value: "#FFC31D"
        figma_style: "Palette/Brand colors/Yellow"
        role: "secondary brand color"
      blue-light:
        value: "#D6DFFF"
        figma_style: "Palette/Brand colors/Blue light"
      red-light:
        value: "#FCD9D9"
        figma_style: "Palette/Brand colors/Red light"
      yellow-light:
        value: "#FFECB8"
        figma_style: "Palette/Brand colors/Yellow light"
    semantic:
      action-primary:
        value: "{colors.brand.blue}"
        role: "boutons primaires, liens d'action"
      action-primary-hover:
        value: "#3A57BC"
        role: "boutons primaires en hover"
        status: "[TOKEN À CONFIRMER — dérivé de blue, non observé dans le styleguide]"
      danger:
        value: "{colors.brand.red}"
        figma_style: "Palette/Accent color/default"
        role: "actions destructives, états error"
        conflict_note: "Conflit identité/sémantique avec Brand Red. À documenter."
      danger-hover:
        value: "#E04854"
        figma_style: "Palette/Accent color/hover"
      success:
        status: "[TOKEN MANQUANT — à définir dans le DS Labster]"
      warning:
        value: "{colors.brand.yellow}"
        role: "états d'avertissement"
    neutral:
      white:
        value: "#FFFFFF"
        figma_style: "Palette/Neutral colors/White"
      smoke:
        value: "#F5F6F8"
        figma_style: "Palette/Neutral colors/Smoke"
        role: "background page, surface secondaire"
      grey-1:
        value: "#E3E5E8"
        figma_style: "Palette/Greyscale/Grey 1"
        role: "borders très claires, dividers"
      grey-2:
        value: "#A9B2BC"
        figma_style: "Palette/Greyscale/Grey 2"
        role: "borders standard, icônes disabled"
      grey-3:
        value: "#707F8F"
        figma_style: "Palette/Greyscale/Grey 3"
        role: "placeholder, texte tertiaire"
      grey-4:
        value: "#465B72"
        figma_style: "Palette/Greyscale/Grey 4"
        role: "texte standard"
      grey-5:
        value: "#273C53"
        figma_style: "Palette/Greyscale/Grey 5"
        role: "headlines secondaires"
      grey-6:
        value: "#0E2946"
        figma_style: "Palette/Greyscale/Grey 6"
        role: "headlines principales, texte high contrast"
  typography:
    family:
      primary: "Barlow"
    weights:
      regular: 400
      medium: 500
      bold: 700
    scales:
      status: "[ÉCHELLE PRÉCISE À EXTRAIRE — page 'Type scale Web' nodeId 0:6886 du fichier Labster]"
  elevation:
    small:
      figma_style: "Elevation/Small"
      box_shadow: "0 2px 8px 0 rgba(0, 46, 70, 0.1)"
    medium:
      figma_style: "Elevation/Medium"
      box_shadow: "0 4px 16px 0 rgba(0, 46, 70, 0.1)"
    large:
      figma_style: "Elevation/Large"
      box_shadow: "0 8px 24px 0 rgba(0, 46, 70, 0.1)"
  shapes:
    radius:
      sm: "6px"
      md: "8px"
      lg: "12px"
      pill: "96px"
      status: "[VALEURS DÉRIVÉES DU MAPPING SHADCN — À CONFIRMER côté Labster]"
  spacing:
    status: "[SCALE À DÉFINIR — non observée dans le styleguide Labster]"
---

# Labster Design System — DESIGN.md global

> Version 0.1, POC du 2026-05-22.
> Ce document est un **artefact AI-ready** : la couche YAML frontmatter est destinée à la consommation machine (LLM, codegen) ; le corps Markdown est destiné à la lecture humaine ET au contexte LLM.

## 1. Overview

Le Labster Design System (DS Labster) est l'ensemble des règles visuelles, des tokens et des composants permettant de produire les interfaces des services Labster (digital product design, software engineering, healthcare consulting, talents recruitment).

**État actuel** : un brand kit + tokens (couleurs, typo, élévation) versionné en styles Figma. Pas de bibliothèque UI variabilisée. Le POC 2026-05-22 documente 3 composants (Button, Input, Dialog) en se basant sur le kit Shadcn UI re-tokenisé sur les couleurs et typo Labster.

**Public cible** : équipes design + dev internes Labster, et clients qui auront accès au DS dans le cadre d'engagements (ex : Insight, SIG par capillarité).

**Périmètre POC** : 3 composants (Button, Input, Dialog). À l'échelle Phase 2 SIG, ce périmètre s'étendra à 8-10 composants.

## 2. Colors

### Palette brand

Les 3 couleurs brand sont la signature visuelle Labster.

| Token | Hex | Usage |
|---|---|---|
| `brand.blue` | `#476AE3` | **Couleur d'identité dominante**. CTA principaux, liens d'action, sélection. |
| `brand.red` | `#EF4C59` | Couleur secondaire d'accent. Utilisée aussi comme `semantic.danger` (cf. note conflit). |
| `brand.yellow` | `#FFC31D` | Couleur secondaire de highlight. Backgrounds attention. |

Chaque couleur brand a une version pastel :
- `brand.blue-light` `#D6DFFF` — backgrounds atténués, badges info
- `brand.red-light` `#FCD9D9` — backgrounds atténués, badges danger
- `brand.yellow-light` `#FFECB8` — backgrounds atténués, badges warning

### Palette sémantique

| Token | Référence | Usage |
|---|---|---|
| `semantic.action-primary` | → `brand.blue` | Boutons primaires, liens, sélection |
| `semantic.action-primary-hover` | `#3A57BC` `[À CONFIRMER]` | Hover sur action principale |
| `semantic.danger` | → `brand.red` (= `Accent color/default`) | Boutons destructifs, états error |
| `semantic.danger-hover` | → `Accent color/hover` `#E04854` | Hover sur action destructive |
| `semantic.warning` | → `brand.yellow` | États d'avertissement |
| `semantic.success` | `[MANQUANT]` | À définir |

> **⚠ Conflit identité/sémantique** : `brand.red` et `semantic.danger` pointent vers la même valeur. Conséquence : un badge "Red brand" et un message d'erreur partagent visuellement la même couleur, ce qui peut nuire à la lisibilité sémantique. **Recommandation pour l'équipe Labster** : créer un `semantic.danger` distinct (rouge plus saturé / plus orangé) au prochain itération du DS. Pour le POC, on assume la coexistence.

### Palette neutre

| Token | Hex | Usage |
|---|---|---|
| `neutral.white` | `#FFFFFF` | Backgrounds primaires, texte sur fonds foncés |
| `neutral.smoke` | `#F5F6F8` | Background page, surface secondaire |
| `neutral.grey-1` | `#E3E5E8` | Borders légères, dividers |
| `neutral.grey-2` | `#A9B2BC` | Borders standard, icônes disabled |
| `neutral.grey-3` | `#707F8F` | Placeholder, texte tertiaire |
| `neutral.grey-4` | `#465B72` | Texte de paragraphe standard |
| `neutral.grey-5` | `#273C53` | Headlines secondaires |
| `neutral.grey-6` | `#0E2946` | Headlines principales, texte high contrast |

### Contraste WCAG

Vérifications à valider à l'étape Accessibilité de chaque DESIGN.md composant :
- `grey-3` sur `white` (placeholder) : contraste à vérifier (probablement < 4.5:1 → WCAG AA fail pour texte normal mais OK pour placeholder hint).
- `grey-2` sur `white` (icônes disabled) : ratio non normatif (icônes disabled).
- `white` sur `blue.brand` : contraste à vérifier.
- `white` sur `red.brand` : contraste à vérifier.

## 3. Typography

**Famille principale** : **Barlow** (Regular, Medium, Bold).

L'échelle exacte des styles `Presentation Labster`, `UI Design Labster`, `Label` n'a pas été extraite en détail à l'étape 5. Elle sera lue à la demande lors de la génération d'un composant qui en a besoin (étape 6 ou 7 si nécessaire).

> **Action requise** : pour passer à un DS Labster production-ready, extraire l'échelle exacte des Type scale Web et Type scale Presentation, et la documenter en tokens DTCG.

### Conventions observées (POC)

Pour les 3 composants documentés à l'étape 6, on utilise :
- **Body medium** : Barlow Medium 14/24 (texte de bouton, label, input value)
- **Body small** : Barlow Regular 14/20 (helper text, description)
- **Body large** : Barlow Regular 16/24 (input value en taille default)
- **Title large** : Barlow Semi Bold 18/28 (titre de dialog)
- **Label inline** : Barlow Medium 14/14 (label de form inline)

Ces conventions sont **dérivées de Shadcn** et flaggées `[À RECONFIRMER]` quand l'échelle Labster sera extraite.

## 4. Layout

`[SECTION INCOMPLÈTE — la grille, le spacing et les breakpoints ne sont pas définis dans le styleguide Labster observé]`

**Conventions provisoires pour le POC** :
- Grille : à définir (probablement 12 colonnes pour web)
- Breakpoints : à définir
- Spacing scale : à définir (proposition d'utiliser une scale 4/8/12/16/24/32/48/64)

Recommandation Phase 2 SIG : avant d'industrialiser, le DS Labster doit définir une grille et une scale de spacing.

## 5. Elevation & Depth

3 niveaux d'élévation observés dans le styleguide Labster (Effect styles) :

| Token | Box-shadow | Usage recommandé |
|---|---|---|
| `elevation.small` | `0 2px 8px 0 rgba(0,46,70,0.1)` | Cards, dropdowns subtils |
| `elevation.medium` | `0 4px 16px 0 rgba(0,46,70,0.1)` | Popovers, tooltips |
| `elevation.large` | `0 8px 24px 0 rgba(0,46,70,0.1)` | Dialogs, modals |

L'ombre Labster utilise une teinte `#002E46` (bleu très foncé) à 10% d'opacité, ce qui donne des ombres légèrement bleutées et cohérentes avec la palette grey (qui dérive elle aussi du bleu).

## 6. Shapes

`[VALEURS DÉRIVÉES DU MAPPING SHADCN — À CONFIRMER côté Labster]`

| Token | Valeur | Usage |
|---|---|---|
| `radius.sm` | 6px | Buttons, inputs, badges |
| `radius.md` | 8px | Cards, dialogs |
| `radius.lg` | 12px | Surfaces larges |
| `radius.pill` | 96px | Boutons icon-circle |

## 7. Voice

Le ton du DS Labster (utilisé pour la copie produit, les messages d'erreur, les helper texts, les CTA) suit les principes Labster :

- **Analytique** : on explique, on documente, on argumente. Pas de phrase creuse.
- **Précis** : on dit ce qu'on veut dire. Pas d'ambiguïté.
- **Direct** : on ne fait pas de détour. Verbes d'action.
- **Pas de superlatifs** : pas de "transformatif", "révolutionnaire", "synergies", "game-changer". Si on doit qualifier, on mesure.
- **Trade-offs explicites** : on ne minimise pas les contraintes ou les limites. Si une feature ne supporte pas un cas, on le dit dans le helper text plutôt que de laisser l'utilisateur deviner.

### Anglais vs français

- Les **artefacts produits côté offering Labster** (PRD, PR/FAQ, doc commerciale, copy UI publique) sont en **anglais**.
- Les **notes internes POC / sprint** peuvent être en **français**.
- Pour les composants du DS : labels et helper texts sont produits en anglais par défaut, avec une mention de l'i18n nécessaire en production.

### Exemples appliqués (à utiliser dans les DESIGN.md composants)

| Anti-pattern | À éviter | À privilégier |
|---|---|---|
| Bouton générique | "Click here" | "Save changes", "Send invitation" |
| Helper text vague | "Required field" | "We need this to send you the report" |
| Message d'erreur | "Invalid input" | "Email format is incorrect — example: name@example.com" |

## 8. Brand

Le DS Labster incarne les valeurs Labster :

- **Expertise transversale** : on intervient à l'intersection produit IA, business analysis, UX research, gestion de projet.
- **Trade-off oriented** : on ne survend pas. On documente les choix et leurs alternatives.
- **Outcome-focused** : on mesure les résultats (cf. les 6 KPIs ARC du POC).

Les couleurs **bleu** et **gris foncé** dominent — c'est cohérent avec un positionnement "expertise sobre, B2B" plutôt que "produit grand public coloré".

## 9. Components

Le POC documente 3 composants :

| Composant | Type | Fichier DESIGN.md | Fichier metadata |
|---|---|---|---|
| Button | atom | [components/Button.design.md](./components/Button.design.md) | [components/Button.metadata.ts](./components/Button.metadata.ts) |
| Input | atom | [components/Input.design.md](./components/Input.design.md) | [components/Input.metadata.ts](./components/Input.metadata.ts) |
| Dialog | molecule | [components/Dialog.design.md](./components/Dialog.design.md) | [components/Dialog.metadata.ts](./components/Dialog.metadata.ts) |

À l'échelle Phase 2 SIG (CW22-CW26), 8-10 composants supplémentaires devraient être documentés (Checkbox, Radio, Select, Card, Tabs, Dropdown, Tooltip…).

## 10. Do's and Don'ts globaux

### Do

- ✅ Toujours référencer les couleurs par leur **token sémantique** (`semantic.action-primary`) plutôt que par leur valeur brand (`brand.blue`), pour permettre une évolution sémantique du DS sans casser les composants.
- ✅ Utiliser `Elevation/Medium` ou `Elevation/Large` pour tout overlay (dialog, popover, dropdown).
- ✅ Pour les états error : `semantic.danger` border + helper text en `semantic.danger` + icône `alert-circle` à droite du champ.
- ✅ Citer les nodeIds Figma source dans les `metadata.ts` pour traçabilité.
- ✅ Suivre la voice Labster (analytique, pas de superlatifs) pour tous les labels et helper texts.

### Don't

- ❌ **Ne pas inventer un hex** quand un token sémantique n'existe pas — flagger `[TOKEN MANQUANT]` au lieu d'inventer.
- ❌ **Ne pas utiliser `brand.red` comme couleur d'erreur sans documenter le conflit** avec l'identité brand.
- ❌ **Ne pas utiliser Barlow Bold pour du body text** — réservé aux headlines.
- ❌ **Ne pas hardcoder de hex** dans les CSS/templates des composants — passer par référence token systématique.
- ❌ **Ne pas créer un composant sans variant `error` ou `disabled`** quand applicable (cf. Shadcn Input qui n'a pas d'error → cas à éviter).

---

## Limites assumées de ce DESIGN.md V0.1

- Échelle typo précise non extraite (à faire en V0.2 ou à l'étape 6 si nécessaire)
- Grille, spacing, breakpoints à définir
- `semantic.success` à définir
- `semantic.action-primary-hover` extrapolé (non observé dans Labster)
- Choix Button primary = Bleu brand `[À CONFIRMER avec Christophe / équipe Labster]`
