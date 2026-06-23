# GitHub Copilot — Instructions Labster DS

Ce repo est un Design System React + Tailwind + Storybook.
Ces instructions s'appliquent à toute suggestion Copilot dans ce projet.

## Règles critiques (non-négociables)

### Tokens — jamais de valeurs hardcodées

- ❌ Interdit : `style={{ color: '#0E2946' }}`, `className="bg-[#476AE3]"`, `rgba(71,106,227,0.5)`
- ✅ Obligatoire : classes Tailwind configurées (`bg-navy`, `bg-blue`, `text-red`, etc.)
- ✅ Obligatoire : variables CSS depuis `src/tokens/index.ts`
- Token manquant → insérer le commentaire `/* [TOKEN LABSTER MANQUANT — à définir] */`

### Composants — toujours réutiliser

Avant de suggérer `<div>` + classes Tailwind, chercher dans `src/components/` :
- `Button`, `Input`, `Card`, `Badge`, `StatusBadge`, `Icon`, `Avatar`, `KpiCard`, `AgentCard`, etc.
- Si un composant existant couvre ≥80% du besoin, l'utiliser.

### Données — jamais de fetch dans les patterns

- Stories Storybook : données mockées inline uniquement
- Pas de `fetch()`, `useEffect` data loading, ni `axios`

### Nouveaux composants — aligner sur les conventions

Si un nouveau composant est nécessaire :
1. Créer dans `src/components/<Nom>/<Nom>.tsx`
2. Utiliser `clsx` pour les variantes de classes
3. Props `tone?: 'red' | 'blue' | 'yellow'` pour les variantes de couleur
4. Créer la story dans `src/components/<Nom>/<Nom>.stories.tsx`

## Architecture Intent Layer

Chaque composant a deux artefacts dans `components/` :
- `<Nom>.design.md` — DESIGN.md avec tokens DTCG et documentation verbale
- `<Nom>.metadata.ts` — `ComponentMetadata` (cf. `rules/metadata-schema.ts`)

Ces fichiers sont la **source de vérité** — pas le code React.

## Fichiers de référence

| Besoin | Fichier |
|--------|---------|
| Palette couleurs | `tailwind.config.ts` (section `colors`) |
| Tokens TypeScript | `src/tokens/index.ts` |
| Inventaire composants | `.ai/index.json` |
| Schéma métadonnées | `rules/metadata-schema.ts` |
| Validation CI | `rules/component-schema.v1.json` |
| Descriptions Figma | `specs/figma-descriptions/` |

## Structure repo

```
src/
  components/    — 25+ composants React + Tailwind
  patterns/      — patterns composés (écrans Storybook)
  tokens/        — tokens TypeScript
components/      — Intent Layer (DESIGN.md + metadata.ts)
rules/           — schémas et conventions
.ai/             — indexes machine-readable
specs/           — spécifications (descriptions Figma)
tokens/          — tokens DTCG W3C (JSON)
```
