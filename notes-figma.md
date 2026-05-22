# Sources Figma — POC labster-ds

## Labster Tokens (source des tokens)
- URL : https://www.figma.com/design/PVYjz7w3CG5Lh0GU2iAoG3/00-Labster-Tokens
- Accès MCP : OK (lecture directe, pas besoin de publier)
- État : styles legacy uniquement (Color styles, Text styles, Effect styles). Pas de Variables Figma.
- Plan Figma Labster : Professional (publication variables bloquée — pré-requis Organization pour industrialisation cross-files).

### Styles observés (confirmé via re-extraction sur Type scale Web 2026-05-22)
- Color styles : Palette (Brand colors, Accent color, Greyscale, Neutral colors)
- Text styles : Presentation Labster, **UI Design Labster** (échelle complète extraite : H1-H6, Paragraph S/M/L, Texts Styles, Quotes), Label
- Effect styles : Elevation (Small, Medium, Large)
- **Famille typo confirmée** : **Fieldwork** (Geo Bold/Demibold/Regular/Light + Hum italic variants) — NOT Barlow comme initialement inféré

## Shadcn UI Kit (source des composants)
- URL : https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC
- Accès MCP : OK (lecture directe, pas besoin de publier)

### 3 composants ciblés (master components)

Découverte 2026-05-22 : les nodeIds initialement copiés par Rachel pointaient vers les *doc-cards* (frames de catalogue avec titre + description + mini-exemple), pas vers les masters réutilisables. Les vrais masters sont dans la page "Primitives" (atomic) ou "Components" (molecules).

Autre découverte : ce kit Shadcn **n'a pas de Card** classique. Card remplacé par **Dialog** (vraie molecule avec frame + titre + description + action buttons).

| Composant | Master nodeId | Page | URL Figma |
|---|---|---|---|
| **Button** (atom) | `1:85` | Primitives | https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=1-85 |
| **Input** (atom) | `2:285` | Primitives | https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=2-285 |
| **Dialog** (molecule) | `4:329` | Components | https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=4-329 |

### Variants observés (à confirmer en étape 5.1)

- **Button** : 19 variants — default, primary hover, destructive (default + hover), outline (default + hover), subtle (default + hover), ghost (default + hover), link (default + hover), with icon (default + hover), just icon (default + hover), just icon circle (default + hover), loading.
- **Input** : 13 variants — Size (default + small) × State (default, completed, focused, disabled) + type=label to the left (Size small).
- **Dialog** : à confirmer (probablement 1 master + sous-composants).

## Plan de re-tokenisation (à exécuter en étape 6)

Les composants Shadcn seront documentés avec leur structure + variants d'origine, mais les **valeurs de tokens (couleur, typo, élévation)** seront re-mappées sur les styles Labster équivalents. Quand un token Labster manque pour un usage Shadcn (ex : couleur "destructive" pour bouton danger), marquer `[TOKEN LABSTER MANQUANT — à définir]` plutôt que d'inventer.

---

## Output DS Figma V0.1 (étape 6.4 du tutoriel V0.3, exécutée 2026-05-22)

Fichier Figma généré comme miroir visuel du repo, pour validation designer (étape 6.5).

- **Nom** : `02-Labster-DS-V0.1`
- **Team** : Labster (plan Pro)
- **URL** : https://www.figma.com/design/fTtwrwxa74iSPMMTbq5GK8
- **fileKey** : `fTtwrwxa74iSPMMTbq5GK8`
- **Scope V0.1** : minimal (Cover + Tokens + Button atoms uniquement)

### Contenu

| Page | Contenu | Éléments |
|---|---|---|
| Cover | Titre + version + lien repo + note "source of truth = repo" | 7 |
| Tokens | Palette (6 brand + 5 semantic + 8 neutral) + typo Barlow (5 styles) + élévation (3 niveaux) | 83 |
| Atoms | Button × 5 variants × default+hover (9 instances), tokens communs, variants manquants flaggés | 42 |
| **Total** | | **132** |

### À étendre en V0.2 (scope complet du tutoriel V0.3)

- Page Atoms : ajouter Input avec ses 5 variants (size-default, size-small, label-inline, state-error, state-read-only)
- Page Molecules (NEW) : Dialog avec ses 4 patterns (informational, confirmation, destructive-confirmation, form)
- Page Patterns (NEW) : écran login (équivalent visuel de `examples/login-screen.html`)

### Statut validation (étape 6.5)

- [ ] Designer assigné : _à définir (Rachel auto-validation pour le POC, Christophe pour Labster prod)_
- [ ] Briefing envoyé : _en attente_
- [ ] Validation : _en attente_

> Source de vérité : **repo** (DESIGN.md). Ce fichier Figma est un **miroir généré** — modifications via PR sur le repo, pas par édition Figma directe.
