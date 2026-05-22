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

### Contenu (V1.0 — Refonte B.6 du 2026-05-22)

Le Figma DS V0.1 a été entièrement refondu pour matcher le code React V1 (Phase B.6). Tous les composants sont désormais en **Component Sets natifs** avec variant properties, instanciables depuis le panneau Assets.

| Page | Rôle | Contenu |
|---|---|---|
| **Cover** | Présentation | Titre V1.0 + lien repo GitHub + sommaire + note source-of-truth |
| **Tokens** | Styles natifs Figma | 23 Paint Styles (incl. `Success` NEW) + 17 Text Styles + 3 Effect Styles + Radius |
| **Atoms** | 6 Component Sets natifs | Button (6) · ButtonLink (2) · Badge (18) · Input (12) · Checkbox (4) · NavItem (12) = 54 variants |
| **Molecules** | 2 Component Sets natifs | Card (5 variants × 3 sizes = 15) · ManagerCard (4 managers Labster) |
| **Brand Assets** | Refs brand kit | Logo Labster + Floating shapes + références Pictos/Illustrations (placeholders) |
| **Patterns** | Compositions Labster | Contact Form (Labster) avec **vraies instances** Input + Button accent-cta |

**Total : 8 Component Sets · 73 variants · 1 pattern Labster**.

### Component Sets disponibles depuis Assets panel

Resources > Assets (icône en haut à gauche Figma) → cherche "Button", "Card", "Input", etc. → drag-and-drop dans n'importe quelle frame.

### Synchronisation Code ↔ Figma

- **Source de vérité = repo Git** (`DESIGN.md` + `src/components/*.tsx` + `metadata.ts`)
- Le Figma est un **miroir généré** via MCP (skill mandatory `figma-use`)
- Modifications → PR sur le repo → re-run B.6 si besoin de re-synchroniser Figma

### Migration de l'ancienne structure

V0.5.3 avait 5 pages (Cover + Tokens + Atoms planche visuelle + Brand Assets + Patterns + Component Library séparé). V1 consolide :
- ❌ Page "Component Library" supprimée — les Component Sets sont directement dans Atoms et Molecules
- ✅ Page "Atoms" devient la source instantiable + planche visuelle en même temps (Component Sets natifs)
- ✅ Page "Molecules" NEW créée pour Card + ManagerCard

### À étendre en V0.2 (scope complet du tutoriel V0.3)

- Page Atoms : ajouter Input avec ses 5 variants (size-default, size-small, label-inline, state-error, state-read-only)
- Page Molecules (NEW) : Dialog avec ses 4 patterns (informational, confirmation, destructive-confirmation, form)
- Page Patterns (NEW) : écran login (équivalent visuel de `examples/login-screen.html`)

### Statut validation (étape 6.5)

- [ ] Designer assigné : _à définir (Rachel auto-validation pour le POC, Christophe pour Labster prod)_
- [ ] Briefing envoyé : _en attente_
- [ ] Validation : _en attente_

> Source de vérité : **repo** (DESIGN.md). Ce fichier Figma est un **miroir généré** — modifications via PR sur le repo, pas par édition Figma directe.
