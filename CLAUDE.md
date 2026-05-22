# CLAUDE.md — Repo labster-ds-poc

## Contexte projet

POC AI-ready Design System Labster. Dry-run avant l'industrialisation SIG (Phase 2, CW22-CW26).
Tutoriel suivi : `projects/labster-ds/tutoriel-ds-ai-ready-labster-2026-05-13.md` (repo `labster-aipm-jti`).

### Sources Figma

- **Tokens (couleurs, typo, élévation)** : fichier "00-Labster-Tokens" (fileKey `PVYjz7w3CG5Lh0GU2iAoG3`)
  - Styles legacy uniquement (pas de Variables) — plan Labster Pro, publication Variables bloquée.
- **Composants (Button, Input, Card)** : fichier "01-Shadcn-Kit-POC" (fileKey `tPwrOV9EX9jLXuxsBskINR`)
  - Re-mappés sur les tokens Labster en étape 6.

## Couches agentiques (référentiel Cris Morales Achiardi)

Le repo implémente les 4 couches :

1. **Tokenization** → `tokens/labster-tokens.json` (DTCG W3C, extrait des styles Labster)
2. **Intent** → `components/<Composant>.design.md` + `components/<Composant>.metadata.ts`
3. **Indexing** → `.ai/index.json`, `.ai/component-usage.json`, `.ai/design-tokens.json`
4. **Orchestration** → ce fichier + `rules/` + `skills/`

## Protocole ARC (Audit / Report / Compose)

Avant toute génération, applique ce protocole :

- **Audit** (inventaire) : "combien de composants ?", "quels variants ?" → charge `.ai/index.json` et réponds depuis l'index. **JAMAIS** explorer le repo brute-force quand un index existe.
- **Report** (relation) : "où est utilisé X ?", "quels tokens consomme Y ?" → charge `.ai/component-usage.json` ou `.ai/design-tokens.json`.
- **Compose** (génération/transformation) : "génère un écran", "propose un variant" → charge le ou les `DESIGN.md` du ou des composants concernés + les indexes pertinents.

## Conventions de génération

### DESIGN.md (1 global + 1 par composant)

- **Global** : 10 sections — Overview, Colors, Typography, Layout, Elevation, Shapes, Voice, Brand, Components, Do's and Don'ts.
- **Composant** : YAML frontmatter (tokens machine-readable) + Markdown body verbeux (Overview, Usage, Variants détaillés, Accessibilité WCAG AA, Do's and Don'ts).
- Référencer les tokens via `{path.to.token}`. **JAMAIS de hex hardcodés**.
- Voice et Brand vivent au global, pas dans chaque composant.

### .metadata.ts (1 par composant)

- Conforme au schéma `rules/metadata-schema.md`.
- Champs : name, description, type, variants, props, states, tokens_consumed, usage_recommended, usage_discouraged, examples, source (figma_url + figma_node_id).

### Index .ai/

- Format JSON.
- Régénération à chaque modification de composant.

## Garde-fous (CRITIQUES)

1. **Human in the Loop** : toute génération est un draft que Rachel valide. Pas de merge auto.
2. **Pas d'invention** : si un token Labster manque pour un usage Shadcn (ex : couleur destructive), marquer `[TOKEN LABSTER MANQUANT — à définir]` au lieu d'inventer une valeur.
3. **Citation systématique** : pour tout audit, citer fileKey + nodeId du composant analysé.
4. **Pas de hex hardcodés** : tout passe par référence token. Exception explicite si commentée.
5. **Pas de variants inventés** : si un variant attendu n'existe pas dans Shadcn (ex : "loading" sur Card), le générer dans le DESIGN.md avec note `[VARIANT MANQUANT EN FIGMA — à créer]`.

## Voice Labster (à incarner dans toutes les générations de doc/copy)

- Ton : analytique, précis, direct.
- Pas de superlatifs ("transformatif", "révolutionnaire", "synergies", "game-changer").
- Trade-offs explicites, jamais minimisés.
- Anglais pour les artefacts si destinés à Labster offering ; français OK pour les notes internes du POC.

## Limites assumées du POC (à rappeler si on s'en éloigne)

- 3 composants seulement, peut masquer des problèmes d'échelle (>10 composants).
- Stack-agnostique HTML/CSS pour la génération d'écran (étape 9), pas Angular/React.
- Pas de Storybook, pas de CI.
- Mesure ARC à la main (étape 10), pas de control run sans `.ai/` pour comparaison.
