# Sources Figma — POC labster-ds

## Labster Tokens (source des tokens)
- URL : https://www.figma.com/design/PVYjz7w3CG5Lh0GU2iAoG3/00-Labster-Tokens
- Accès MCP : OK (lecture directe, pas besoin de publier)
- État : styles legacy uniquement (Color styles, Text styles, Effect styles). Pas de Variables Figma.
- Plan Figma Labster : Professional (publication variables bloquée — pré-requis Organization pour industrialisation cross-files).

### Styles observés (à confirmer en étape 5.2)
- Color styles : Palette, …Complements, Labster Styleguide
- Text styles : Presentation Labster, UI Design Labster, Label
- Effect styles : Elevation

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
