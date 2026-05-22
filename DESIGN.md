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
        role: "boutons primaires, liens d'action, focus rings"
      action-primary-hover:
        value: "#3A57BC"
        role: "boutons primaires en hover"
        status: "[TOKEN À CONFIRMER — dérivé de blue, non observé dans le styleguide]"
      accent-cta:
        value: "{colors.brand.red}"
        figma_style: "Palette/Accent color/default"
        role: "CTA brand sur fonds sombres (ex: 'Envoyer' sur le formulaire contact Labster). USAGE POSITIF, pas destructif."
        added_in: "V0.5 (2026-05-22) — observé sur labster.io contact form"
      accent-cta-hover:
        value: "#E04854"
        figma_style: "Palette/Accent color/hover"
      danger:
        value: "{colors.brand.red}"
        figma_style: "Palette/Accent color/default (same hex, distinct semantic)"
        role: "états d'erreur (Input error, alert messages, Button destructive). USAGE NÉGATIF."
        usage_distinction: "Distinct de accent-cta par le contexte UI, pas par la valeur. Voir DESIGN.md §10 Do's and Don'ts."
      danger-hover:
        value: "#E04854"
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
      primary: "Fieldwork"
      figma_styles_available:
        - "Geo Bold (weight 700)"
        - "Geo Demibold (weight 600)"
        - "Geo Regular (weight 400)"
        - "Geo Light (weight 300)"
        - "Hum DemiBold Italic (weight 500, italic)"
        - "Hum Regular Italic (weight 400, italic)"
        - "Hum Light Italic (weight 300, italic)"
    weights:
      light: 300
      regular: 400
      demibold: 600
      bold: 700
    scales:
      headings:
        h1:
          figma_style: "UI Design Labster/Headings/H1"
          spec: "Fieldwork Geo Bold 64/72/0"
        h2:
          figma_style: "UI Design Labster/Headings/H2"
          spec: "Fieldwork Geo Bold 56/62/0"
        h3:
          figma_style: "UI Design Labster/Headings/H3"
          spec: "Fieldwork Geo Bold 40/44/0"
        h4:
          figma_style: "UI Design Labster/Headings/H4"
          spec: "Fieldwork Geo Bold 32/32/0.5"
        h5:
          figma_style: "UI Design Labster/Headings/H5"
          spec: "Fieldwork Geo Bold 24/auto/0"
        h6:
          figma_style: "UI Design Labster/Headings/H6"
          spec: "Fieldwork Geo Bold 18/auto/0"
      paragraphs:
        small:
          figma_style: "UI Design Labster/Quotes/Paragraphs/Small"
          spec: "Fieldwork Geo Regular 14/18/0"
        small_semibold:
          figma_style: "UI Design Labster/Quotes/Paragraphs/Small Semi-bold"
          spec: "Fieldwork Geo Bold 14/18/0"
        medium:
          figma_style: "UI Design Labster/Quotes/Paragraphs/Medium"
          spec: "Fieldwork Geo Light 20/24/0"
        medium_semibold:
          figma_style: "UI Design Labster/Quotes/Paragraphs/Medium Semi-bold"
          spec: "Fieldwork Geo Bold 20/24/0"
        large:
          figma_style: "UI Design Labster/Quotes/Paragraphs/Large"
          spec: "Fieldwork Geo Light 32/44/0"
        large_semibold:
          figma_style: "UI Design Labster/Quotes/Paragraphs/Large Semi-bold"
          spec: "Fieldwork Geo Bold 32/44/0"
      text_styles:
        label_m:
          figma_style: "UI Design Labster/Texts Styles/Label M"
          spec: "Fieldwork Geo Bold 18/auto/0"
          usage: "Input labels (above), section labels"
        button_label:
          figma_style: "UI Design Labster/Texts Styles/Button Label"
          spec: "Fieldwork Geo Demibold 16/auto/1"
          usage: "Button text (all variants except link)"
        button_link_label:
          figma_style: "UI Design Labster/Texts Styles/Button Link Label"
          spec: "Fieldwork Geo Demibold 16/auto/0.12"
          usage: "Button variant=link text"
        button_scroll_label:
          figma_style: "UI Design Labster/Texts Styles/Button Scroll Label"
          spec: "Fieldwork Geo Bold 12/auto/1 uppercase"
          usage: "Scroll-down indicators, micro-CTAs"
        links:
          figma_style: "UI Design Labster/Texts Styles/Links"
          spec: "Fieldwork Geo Regular 14/auto/0.5"
          usage: "Inline text links, navigation"
      quotes:
        status: "Available (italic variants Fieldwork Hum) but not used by Button/Input/Dialog of this POC"
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
| `semantic.action-primary` | → `brand.blue` | Boutons primaires (light bg), liens, focus rings |
| `semantic.action-primary-hover` | `#3A57BC` `[À CONFIRMER]` | Hover sur action principale |
| `semantic.accent-cta` | → `brand.red` (= `Accent color/default`) | **CTA positifs sur dark bg** (ex : "Envoyer" sur le formulaire contact Labster). Pill rounded recommandé. |
| `semantic.accent-cta-hover` | → `Accent color/hover` `#E04854` | Hover sur accent CTA |
| `semantic.danger` | → `brand.red` (même valeur que accent-cta, contexte distinct) | **États d'erreur** (Input error border, alert messages, Button destructive) |
| `semantic.danger-hover` | → `Accent color/hover` `#E04854` | Hover sur action destructive |
| `semantic.warning` | → `brand.yellow` | États d'avertissement |
| `semantic.success` | `[MANQUANT]` | À définir |

> **🔑 Multi-rôle du rouge brand (V0.5 finding)** : `brand.red` `#EF4C59` a **deux rôles sémantiques légitimes**, distingués par le contexte d'usage, pas par la valeur :
>
> 1. **`semantic.accent-cta`** — usage POSITIF, CTA brand sur fonds sombres. Pattern observé sur labster.io (bouton "Envoyer" du formulaire contact, pill rounded white text).
> 2. **`semantic.danger`** — usage NÉGATIF, état d'erreur ou action destructive (Input error border, Button "Delete").
>
> Le mapping V0.1 → V0.4 traitait `brand.red` comme uniquement `semantic.danger`, ce qui était **incomplet**. La V0.5 ajoute le rôle `accent-cta`.
>
> **Cohérence visuelle** : le contexte (background sombre vs light, libellé positif "Envoyer" vs négatif "Delete", forme pill rounded vs standard radius) garantit que l'utilisateur ne confonde pas les 2 rôles. À la lecture du DS, ce sont 2 tokens sémantiques distincts qui partagent une valeur source — pas une ambiguïté.

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

**Famille principale** : **Fieldwork** (confirmé par re-extraction 2026-05-22 via Type scale Web nodeId 0:6886).

> **Correction V0.3 / Finding** : l'inventaire initial avait extrait "Barlow" depuis la frame Color palette du styleguide. C'était une erreur — Barlow est utilisée pour les **titres internes du styleguide** ("Color Palette", "SUB Section title"), pas pour le DS Labster. La vraie famille Labster est **Fieldwork** (échelle UI Design Labster).

### Styles Fieldwork disponibles

- **Geo Bold** (weight 700) — Headings, paragraphs semi-bold, Label M, Button Scroll Label
- **Geo Demibold** (weight 600) — Button Label, Button Link Label
- **Geo Regular** (weight 400) — Paragraph Small, Links
- **Geo Light** (weight 300) — Paragraph Medium, Paragraph Large
- **Hum DemiBold Italic / Hum Regular Italic / Hum Light Italic** — Quotes (non utilisé par Button/Input/Dialog du POC)

### Échelle complète (depuis UI Design Labster)

#### Headings
| Style Labster | Spec | Usage POC |
|---|---|---|
| H1 | Fieldwork Geo Bold 64/72/0 | Display titles |
| H2 | Fieldwork Geo Bold 56/62/0 | Section titles |
| H3 | Fieldwork Geo Bold 40/44/0 | Sub-section titles |
| H4 | Fieldwork Geo Bold 32/32/letterSpacing 0.5 | Card titles |
| H5 | Fieldwork Geo Bold 24/auto/0 | Inline strong titles |
| H6 | Fieldwork Geo Bold 18/auto/0 | Dialog title (POC mapping) |

#### Paragraphs
| Style Labster | Spec | Usage POC |
|---|---|---|
| Paragraph Small | Fieldwork Geo Regular 14/18/0 | Input value/placeholder, helper text, description |
| Paragraph Small Semi-bold | Fieldwork Geo Bold 14/18/0 | Error messages (with `semantic.danger` color) |
| Paragraph Medium | Fieldwork Geo Light 20/24/0 | Body emphasis |
| Paragraph Medium Semi-bold | Fieldwork Geo Bold 20/24/0 | Body emphasis bold |
| Paragraph Large | Fieldwork Geo Light 32/44/0 | Marketing copy |
| Paragraph Large Semi-bold | Fieldwork Geo Bold 32/44/0 | Marketing copy bold |

#### Text styles
| Style Labster | Spec | Usage POC |
|---|---|---|
| Label M | Fieldwork Geo Bold 18/auto/0 | Input labels above field, section labels |
| Button Label | Fieldwork Geo Demibold 16/auto/letterSpacing 1 | Button text (primary, secondary, ghost, danger) |
| Button Link Label | Fieldwork Geo Demibold 16/auto/letterSpacing 0.12 | Button variant=link |
| Button Scroll Label | Fieldwork Geo Bold 12/auto/letterSpacing 1 uppercase | Scroll-down indicators |
| Links | Fieldwork Geo Regular 14/auto/letterSpacing 0.5 | Inline navigation links |

### Notes

- **lineHeight "auto"** : observé dans Figma (valeur 100 = 100% interprétation probable). À valider en CSS production.
- **Aucun token typographique manquant** pour les 3 composants du POC après cette extraction.
- L'ancienne nomenclature `body-medium`, `title-large`, `p-ui`, `subtle`, `label-inline` (inventée pendant V0.1) est remplacée par les vrais noms Labster (`Button Label`, `H6`, `Paragraph Small`, `Label M`).

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
