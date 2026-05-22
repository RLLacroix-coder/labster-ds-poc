---
source: "00-Labster-Tokens"
source_file_key: PVYjz7w3CG5Lh0GU2iAoG3
extracted_via: mcp__figma__get_design_context (nodeId 0:7068 "Color palette")
extracted_date: 2026-05-22
status: RAW — to be transformed to DTCG JSON in étape 6
---

# Labster Styles RAW — couche Tokenization (source de vérité)

Extraction exhaustive des styles Figma déclarés dans le fichier Labster Tokens, depuis le panneau "These styles are contained in the design" retourné par MCP.

## Pourquoi un fichier .md et pas .json DTCG direct

Le tutoriel original prévoyait `figma-variables-raw.json` issu de `get_variable_defs`. Comme le fichier Labster n'a **pas de Variables Figma** (plan Pro + DS legacy), MCP ne renvoie rien via cet outil. On reconstruit donc depuis les **styles**, qui sont l'équivalent legacy.

Conversion vers `tokens/labster-tokens.json` (format DTCG W3C) à l'étape 6.

---

## Couleurs

### Brand colors

| Nom officiel Labster | Hex | Usage probable |
|---|---|---|
| `Palette/Brand colors/Blue` | `#476AE3` | Bleu brand principal |
| `Palette/Brand colors/Red` | `#EF4C59` | Rouge brand principal |
| `Palette/Brand colors/Yellow` | `#FFC31D` | Jaune brand principal |
| `Palette/Brand colors/Blue light` | `#D6DFFF` | Bleu pastel (backgrounds, badges) |
| `Palette/Brand colors/Red light` | `#FCD9D9` | Rouge pastel |
| `Palette/Brand colors/Yellow light` | `#FFECB8` | Jaune pastel |

### Accent colors (états)

| Nom officiel Labster | Hex | Usage |
|---|---|---|
| `Palette/Accent color/default` | `#EF4C59` | Couleur accent par défaut (= Red brand) |
| `Palette/Accent color/hover` | `#E04854` | Couleur accent hover (légèrement plus foncé) |

> **Finding important** : la couleur Accent par défaut est `#EF4C59` = exactement la couleur `Red` brand. Il y a donc un **conflit sémantique potentiel** entre "rouge brand identitaire" et "rouge accent action / danger". À arbitrer dans le DESIGN.md global Labster (étape 6).

### Neutral colors

| Nom officiel Labster | Hex |
|---|---|
| `Palette/Neutral colors/White` | `#FFFFFF` |
| `Palette/Neutral colors/Smoke` | `#F5F6F8` (gris très clair, type background page) |

### Greyscale (6 niveaux du clair au foncé)

| Nom officiel Labster | Hex | Usage probable |
|---|---|---|
| `Palette/Greyscale/Grey 1` | `#E3E5E8` | Borders très claires, dividers |
| `Palette/Greyscale/Grey 2` | `#A9B2BC` | Placeholders, icons disabled |
| `Palette/Greyscale/Grey 3` | `#707F8F` | Textes secondaires |
| `Palette/Greyscale/Grey 4` | `#465B72` | Textes standard |
| `Palette/Greyscale/Grey 5` | `#273C53` | Headlines secondaires |
| `Palette/Greyscale/Grey 6` | `#0E2946` | Headlines principales, textes high contrast |

### Styleguide colors (utilité interne styleguide)

| Nom officiel Labster | Hex |
|---|---|
| `Labster Styleguide/Styleguide color` | `#2F80ED` |
| `Blue 1` | `#2F80ED` |

> Ces deux couleurs semblent ne servir qu'aux titres internes du styleguide ("Color Palette" titre du frame). Pas pertinent pour les composants. À exclure de la couche Tokenization productive.

---

## Élévation (Effect styles)

| Nom officiel Labster | Détail |
|---|---|
| `Elevation/Small` | DROP_SHADOW, color #002E461A (rgba 0,46,70,0.1), offset (0, 2), blur 8, spread 0 |
| `Elevation/Medium` | DROP_SHADOW, color #002E461A, offset (0, 4), blur 16, spread 0 |
| `Elevation/Large` | DROP_SHADOW, color #002E461A, offset (0, 8), blur 24, spread 0 |

> 3 niveaux d'élévation, exploitables pour le Dialog (étape 6 : utiliser `Elevation/Medium` ou `Elevation/Large` pour combler le manque de shadow Shadcn).

---

## Typographie

### Famille principale détectée

| Famille | Variantes observées | Source |
|---|---|---|
| **Barlow** | Bold, Medium, Regular | Page Color palette + frames Type scale |

> Échantillon observé sur la frame Color palette uniquement. Les **tailles exactes** des styles `Presentation Labster`, `UI Design Labster`, `Label` (vu en panneau Styles dans le screenshot du fichier Figma) n'ont pas encore été extraites — à faire à l'étape 6 via un get_design_context ciblé sur "Type scale Web" (nodeId `0:6886`) si besoin précis.

### Hypothèses à valider à l'étape 6

- `Presentation Labster` = échelle typo pour les slides / présentations (Type scale Presentation)
- `UI Design Labster` = échelle typo pour le web / UI (Type scale Web)
- `Label` = micro-typo pour labels de formulaires

---

## Mapping Shadcn → Labster (draft, à finaliser étape 6)

| Token Shadcn | Hex Shadcn | Token Labster équivalent | Hex Labster | Note |
|---|---|---|---|---|
| slate/900 | #0F172A | `Greyscale/Grey 6` | #0E2946 | Très proche, mapping OK |
| slate/700 | #334155 | `Greyscale/Grey 5` | #273C53 | Mapping OK |
| slate/500 | #64748B | `Greyscale/Grey 4` | #465B72 | Léger décalage, OK |
| slate/400 | #94A3B8 | `Greyscale/Grey 3` | #707F8F | Décalage notable. Vérifier WCAG |
| slate/300 | #CBD5E1 | `Greyscale/Grey 2` | #A9B2BC | Décalage notable |
| slate/200 | #E2E8F0 | `Greyscale/Grey 1` | #E3E5E8 | Mapping OK |
| slate/100 | #F1F5F9 | `Neutral colors/Smoke` | #F5F6F8 | Mapping OK |
| white | #FFFFFF | `Neutral colors/White` | #FFFFFF | Mapping identique |
| red/500 | #EF4444 | `Brand colors/Red` ou `Accent color/default` | #EF4C59 | **Conflit sémantique** : Brand vs Action. À arbitrer |
| red/600 | #DC2626 | `Accent color/hover` | #E04854 | Mapping OK pour le rôle hover |

**Arbitrages restants pour l'étape 6** :
1. Le Button `default` Shadcn (slate/900 = noir-bleuté) doit-il être mappé sur Grey 6 (gris foncé Labster) ou sur Blue brand (`#476AE3`) ? Labster a une identité bleue forte — le bouton principal Labster est probablement bleu, pas gris foncé.
2. Le bouton `destructive` Shadcn (red/500) doit-il utiliser le rouge brand Labster (`#EF4C59`) ou un rouge sémantique distinct ? Si pas de rouge sémantique distinct → conflit identitaire vs sémantique.
3. Pour l'input `error` state (manquant dans Shadcn), quel rouge utiliser ? Probablement même question.

---

## Limites assumées de cet inventaire

- Les **tailles typo exactes** ne sont pas extraites (à faire à l'étape 6 si besoin).
- Les **icônes Labster** (page Icons du styleguide) ne sont pas inventoriées (hors scope POC 3 composants).
- Les **pictos Labster** (page Pictos) ne sont pas inventoriés.
- Le **logo Labster** n'est pas inventorié.
- L'extraction repose sur un seul get_design_context (sur Color palette) qui a réussi à exposer l'intégralité des styles utilisés. Si certains styles ne sont consommés que sur d'autres pages (ex : un style "Disabled" qui n'apparaîtrait que dans des composants de formulaire), ils sont absents de cet inventaire. À cross-check si suspicion.
