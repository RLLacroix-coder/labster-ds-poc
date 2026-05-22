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

### 3 composants ciblés
| Composant | URL avec nodeId |
|---|---|
| Button | https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=13-1070 |
| Input | https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=13-1256 |
| Card | https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=13-1246 |

## Plan de re-tokenisation (à exécuter en étape 6)

Les composants Shadcn seront documentés avec leur structure + variants d'origine, mais les **valeurs de tokens (couleur, typo, élévation)** seront re-mappées sur les styles Labster équivalents. Quand un token Labster manque pour un usage Shadcn (ex : couleur "destructive" pour bouton danger), marquer `[TOKEN LABSTER MANQUANT — à définir]` plutôt que d'inventer.
