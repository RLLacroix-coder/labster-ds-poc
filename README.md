# labster-ds-poc — Labster Design System V1.0

POC AI-ready Design System pour Labster. **Lib React + Tailwind + Storybook** synchronisée avec un miroir Figma natif.

## 🎨 URLs

| Surface | Lien |
|---|---|
| **Storybook live** | ⏳ À compléter après 1er déploiement Chromatic (voir [CHROMATIC.md](./CHROMATIC.md)) |
| **Figma DS V1.0** | https://www.figma.com/design/fTtwrwxa74iSPMMTbq5GK8 |
| **GitHub repo** | https://github.com/RLLacroix-coder/labster-ds-poc |

## 📦 Contenu

| Couche agentique | Localisation | Contenu |
|---|---|---|
| **Tokenization** | `src/tokens/` + `tailwind.config.ts` + `tokens/` | 23 colors (brand + semantic incl. `success` + neutral) · 17 text styles · 3 elevations · 5 radius |
| **Intent** | `components/` (specs) | DESIGN.md + metadata.ts par composant |
| **Indexing** | `.ai/` | index.json + component-usage.json + design-tokens.json |
| **Orchestration** | `CLAUDE.md` + `rules/` | Contrat runtime agent + méthode reproductible |
| **Code React** | `src/components/` | 10 composants : Button, ButtonLink, Input, Checkbox, Badge, NavItem, Icon, Card, ManagerCard, LabsterLogo, Picto, Illustration |
| **Storybook** | `src/**/*.stories.tsx` | 150+ stories |
| **Patterns** | `src/patterns/` | Contact Form (Labster) |
| **Assets** | `public/assets/` | 14 illustrations + 70+ pictos + 4 portraits managers |

## 🚀 Quickstart

```bash
# Install
npm install

# Lance Storybook en local (http://localhost:6006)
npm run storybook

# Build statique
npm run build-storybook

# TypeScript check
npm run typecheck

# Publier sur Chromatic (cf. CHROMATIC.md)
npm run chromatic -- --project-token=chpt_XXXXX
```

## 📐 Sources Figma

| Fichier | Rôle |
|---|---|
| `00-Labster-Tokens` | Brand kit Labster (styles legacy) — source tokens |
| `01-Labster-Web-components` | Composants Web officiels Labster |
| `01-Labster-illustrations` | 14 web illustrations |
| `02-Labster-DS-V0.1` | **Miroir Figma généré** du DS code (refait V1 le 2026-05-22) |

Voir `notes-figma.md` pour détails et `workflow-agentique-vision.md` pour la vision workflow.

## 🤝 Workflow agentique

Le DS est conçu pour être consommé par 4 lecteurs :
- **Agents Claude Code** (machine reading) via `.ai/` + `metadata.ts`
- **Designer humain** via Figma `02-Labster-DS-V0.1`
- **Dev humain** via `src/components/` + Storybook
- **PM humain** via Storybook (prototypage rapide)

Vision complète dans `workflow-agentique-vision.md`.

## ⚠ Notes

- **Source of truth** = repo Git. Le Figma est un miroir généré via MCP. Modifications via PR sur le repo.
- **Typo brand** = Fieldwork (commercial). Storybook/Figma fallback Inter car Fieldwork pas installée par défaut.
- **Phase** : POC dry-run avant industrialisation SIG (Phase 2, CW22-CW26).
