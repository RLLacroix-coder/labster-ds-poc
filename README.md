# labster-ds-poc

POC AI-ready Design System (Labster).

- **Objectif** : valider end-to-end l'approche AI-ready / agentique sur 3 composants, en dry-run avant l'industrialisation SIG (Phase 2, CW22-CW26).
- **Tutoriel suivi** : `projects/labster-ds/tutoriel-ds-ai-ready-labster-2026-05-13.md` (dans le repo `labster-aipm-jti`).
- **Pivot 2026-05-22** : le DS Labster est un brand kit sans composants UI. Le POC utilise donc :
  - **Sources tokens** : fichier Figma "00-Labster-Tokens" (styles legacy, pas de variables — plan Figma Professional)
  - **Sources composants** : Shadcn UI Kit dupliqué dans "01-Shadcn-Kit-POC"

## Structure

| Dossier | Couche agentique | Contenu |
|---|---|---|
| `tokens/` | Tokenization | Tokens DTCG extraits des styles Labster + mapping Shadcn |
| `components/` | Intent | 1 `DESIGN.md` + 1 `.metadata.ts` par composant (Button, Input, Card) |
| `.ai/` | Indexing | Index pré-calculés (`index.json`, `component-usage.json`, `design-tokens.json`) |
| `CLAUDE.md` + `rules/` + `skills/` | Orchestration | Contrat runtime agent + règles + skills |
| `prompts/` | — | Prompt library mobilisée pendant le POC |
| `examples/` | — | Écran login généré (étape 9) + mesures ARC (étape 10) |

## Sources Figma

Voir `notes-figma.md`.
