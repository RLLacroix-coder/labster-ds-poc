---
title: Méthode reproductible — Ajouter un composant au DS Labster
version: V1.0
date: 2026-05-22
audience: Designer, PM, Dev qui veulent ajouter un composant au DS Labster
related:
  - workflow-agentique-vision.md (Phase B livrable)
  - tutoriel-ds-ai-ready-labster-2026-05-13.md (V0.5)
goal: Donner une checklist reproductible en 8 étapes pour ajouter un composant. Utilisable manuellement OU via le futur skill labster-ds:add-component (Phase C).
---

# Méthode reproductible — Ajouter un composant au DS Labster

## Pourquoi cette méthode

Le POC V0.1-V0.5 a accumulé 4 composants (Button, Input, Dialog, Card) avec **4 méthodes différentes** (Shadcn import + mapping pour Button/Input, substitution Dialog, création from-scratch Card). Pour un kit prototype utilisable par l'équipe (cf. `workflow-agentique-vision.md`), il faut **une méthode unique reproductible**.

Cette méthode documente la séquence canonique en 8 étapes. Chaque étape produit un artefact concret. Une fois validée par 2-3 utilisations, elle sera implémentée comme skill `labster-ds:add-component` (Phase C).

## Pré-requis

- Repo `labster-ds-poc` cloné en local
- Accès au Figma DS Labster (`02-Labster-DS-V0.1`)
- Claude Code avec Figma MCP configuré
- Le composant existe **soit** comme master Figma (lib externe, brand kit, etc.) **soit** est à créer from-scratch sur tokens Labster

## Les 8 étapes

### Étape 1 — Cadrage initial (5 min)

Avant tout artefact, répondre à 5 questions :

| Question | Pour l'aide à la réponse |
|---|---|
| **Nom du composant** ? | PascalCase, singulier (ex: `Card`, pas `Cards`) |
| **Type** ? | `atom` (Button, Input, Avatar) / `molecule` (Card, Dialog, Form Field) / `organism` (Navbar, Sidebar) |
| **Origine** ? | Master Figma existant (URL + nodeId) / From-scratch sur tokens Labster / Adaptation depuis lib externe (Shadcn, Material) |
| **Variants attendus** ? | Liste exhaustive en première intention. Affinable plus tard. |
| **Composition** ? | Pour molecule/organism : quels autres composants Labster utilise-t-il ? |

Output : un commentaire dans une issue Linear ou un commit message — pas de fichier dédié à cette étape.

### Étape 2 — Inventaire (si source externe) ou exploration (si from-scratch) (30 min)

**Si source externe (Figma master existant)** :
```
1. mcp__figma__get_metadata sur la page Primitives/Components du fichier source
   → identifier le master (pas une doc-card)
2. mcp__figma__get_design_context sur le master nodeId
   → extraire variants, tokens utilisés, structure
3. Sauvegarder en components/inventaire-<Composant>.md
   (Markdown avec tableau variants × tokens × notes)
```

**Si from-scratch** :
```
1. Identifier le pattern de référence (Material 3, Shadcn, Apple HIG, ou observation site client)
2. Documenter le pattern dans components/inventaire-<Composant>.md
3. Citer les sources d'inspiration explicitement
```

Garde-fous critiques :
- ⚠ Cibler les **vrais masters**, pas des doc-cards (cf. tutoriel V0.4 Finding 7)
- ⚠ Préserver les **noms exacts** des variants source (traçabilité)
- ⚠ Si tokens : extraire depuis frames **canonicals** (Type scale, Color palette), pas frame quelconque (cf. tutoriel V0.4 Finding 7)

Output : `components/inventaire-<Composant>.md`

### Étape 3 — Arbitrages de mapping (15 min)

Avant de propager dans les 4 fichiers downstream, **trancher les décisions structurantes**. Questions typiques :

| Question | Exemple |
|---|---|
| Couleur du variant principal : brand identitaire ou neutre ? | Button primary = bleu brand vs gris foncé |
| Conflit identité/sémantique ? | brand.red = accent-cta (positif) + danger (négatif) → 2 tokens sémantiques distincts |
| Variants manquants à créer ? | Input state=error absent de Shadcn → à créer pour Labster |
| Tokens à extrapoler vs flagger manquants ? | semantic.action-primary-hover non observé → extrapolé `#3A57BC` `[À CONFIRMER]` |

Documenter chaque décision **dans le YAML frontmatter** du DESIGN.md (étape 4) avec un champ `decisions:` ou des `[À CONFIRMER]` flags.

Output : pas de fichier, mais une liste des arbitrages tranchés en mémoire avant l'étape 4.

### Étape 4 — DESIGN.md (45 min)

Le fichier humain + LLM. Structure canonique :

```markdown
---
component: <Nom>
type: atom | molecule | organism
version: V<num>
source: { figma_file_key, figma_node_id OR pattern_inspiration }
tokens: { variants, sizes, composition, states } # YAML frontmatter machine-readable
---

# <Composant> — DESIGN.md

## Overview
Description + when to use + when NOT to use.

## Anatomie
Schéma ASCII ou description de la structure interne.

## Variants détaillés
Section par variant avec specs (background, border, text, padding, radius).

## Sizes (si applicable)
Tableau height × padding × font_size par taille.

## États
Tableau : default / hover / focus / active / disabled / loading / error / etc.

## Accessibilité (WCAG AA)
- Contraste validé
- ARIA roles
- Focus ring obligatoire
- Touch targets

## Do's and Don'ts
2 listes courtes (5-8 items chacune).

## Composition validée (molecules/organisms only)
Quels enfants Labster sont utilisés.

## Variants à créer en Figma (POC findings)
Liste des `[VARIANT À CRÉER]` flaggés.
```

Garde-fous :
- ⚠ Aucun hex hardcodé — toujours `{tokens.path}`
- ⚠ Référencer les Text Styles Labster réels (UI Design Labster/Headings/H5, etc.)
- ⚠ Verbeux dans le Markdown body (les LLM lisent ce contexte)
- ⚠ Citer la source Figma (URL + nodeId) ou le pattern d'inspiration

Output : `components/<Composant>.design.md`

### Étape 5 — metadata.ts (30 min)

Transcription machine-readable du DESIGN.md, conforme au schéma `rules/metadata-schema.ts`.

```typescript
import type { ComponentMetadata } from "../rules/metadata-schema";

export const metadata: ComponentMetadata = {
  name: "<Composant>",
  description: "What + When (1-2 phrases)",
  type: "atom" | "molecule" | "organism",
  version: "V<num>",
  variants: [...],
  sizes?: [...],
  icon_only_property?: {...},
  props: [...],
  states: [...],
  tokens_consumed: [...], // union des tokens des variants
  usage_recommended: [...], // 5-8 phrases
  usage_discouraged: [...], // 5-8 phrases
  examples: [...], // 3-4 snippets
  composition?: [...], // molecules/organisms only
  source: {...},
  accessibility_target: "WCAG AA",
  notes: [...], // conflits, manques, à confirmer
};
```

Garde-fous :
- ⚠ Tokens en dot-path DTCG (`colors.semantic.action-primary`), pas hex
- ⚠ Aucune invention : si une donnée n'est pas déductible du DESIGN.md, marquer `"TO_DEFINE"`
- ⚠ Cohérence forte avec DESIGN.md (mêmes noms de variants, mêmes tokens)

Output : `components/<Composant>.metadata.ts`

### Étape 6 — Update .ai/ indexes (15 min)

3 fichiers à mettre à jour :

1. `.ai/index.json` : ajouter le composant dans `components[]`, mettre à jour `statistics.total_components`.
2. `.ai/component-usage.json` : ajouter les relations source→target si molecule/organism. Ajouter à `expected_screens` si pertinent.
3. `.ai/design-tokens.json` : ajouter dans `components[]` la liste des tokens consommés. Mettre à jour `token_to_components` reverse index.

Validation JSON :
```bash
cd labster-ds-poc
jq . .ai/index.json > /dev/null && jq . .ai/component-usage.json > /dev/null && jq . .ai/design-tokens.json > /dev/null
```

Output : 3 fichiers `.ai/*.json` mis à jour et JSON-validés.

### Étape 7 — Figma Component Set natif (60 min)

C'est l'étape la plus longue. Via MCP `use_figma` :

1. **Charger les styles Labster** (`figma.getLocalPaintStylesAsync`, `getLocalTextStylesAsync`, `getLocalEffectStylesAsync`).
2. **Définir les specs JS** : variants × sizes × states (cf. DESIGN.md).
3. **Créer les components un par un** via `figma.createComponent()`, appliquer styles via `setFillStyleIdAsync`, `setTextStyleIdAsync`, `setStrokeStyleIdAsync`.
4. **Naming** : `variant=X, size=Y, state=Z, ...` (Figma reconnaît ce pattern pour les variant properties).
5. **Combiner en Component Set** via `figma.combineAsVariants([components], page)`.
6. **Donner une description** au Component Set (visible dans Assets panel) : ce que fait le composant, ses variants, sa source DESIGN.md.
7. **Placer sur la page "Component Library"** avec auto-layout HORIZONTAL/WRAP pour organisation visuelle.

Garde-fous :
- ⚠ Activer le skill `figma-use` AVANT l'appel `use_figma` (mandatory)
- ⚠ Si fonte commerciale (Fieldwork), `try/catch` sur `loadFontAsync` + fallback Inter
- ⚠ Référencer les Paint Styles + Text Styles natifs (pas inline fills/fontes)

Pour les composants riches (Button avec 4 properties × 300 variants), prévoir de **wrap les operations** dans des sous-fonctions pour ne pas dépasser 50KB de code dans 1 appel `use_figma`.

Output : Component Set dans Figma DS Labster, page "Component Library".

### Étape 8 — Pattern d'exemple (30 min)

Pour chaque nouveau composant, créer **au moins 1 exemple d'usage** dans la page "Patterns" du Figma. C'est ce qui démontre la valeur du composant en contexte.

Process :
1. Identifier un pattern réel Labster qui utilise ce composant (ex: pour Card → labster.io service cards section).
2. Créer une frame dédiée dans la page Patterns.
3. Insérer une ou plusieurs **instances** du Component Set créé en étape 7.
4. Ajouter le contexte visuel (header, container, background) avec les tokens Labster.
5. Ajouter une **annotation textuelle** listant les tokens + components consommés (pour traçabilité dev).

Output : Frame de pattern dans Figma `Patterns` page + (optionnel) un fichier `examples/<pattern>.html` dans le repo si vibe-codable.

## Checklist finale

À cocher avant de considérer le composant "livré" :

- [ ] `components/<Composant>.design.md` créé et review interne
- [ ] `components/<Composant>.metadata.ts` créé et compile sans erreur TS
- [ ] `.ai/index.json` updated et JSON valide
- [ ] `.ai/component-usage.json` updated et JSON valide (relations + expected_screens)
- [ ] `.ai/design-tokens.json` updated et JSON valide (tokens + token_to_components)
- [ ] Figma Component Set créé sur page "Component Library", visible dans Assets panel
- [ ] Au moins 1 pattern d'exemple dans page "Patterns"
- [ ] Commit + push avec message conventional (`feat(intent): add Card component to DS Labster V1.0`)
- [ ] (Optionnel) Validation visuelle designer
- [ ] (Optionnel) Tutoriel V0.x mis à jour si finding générique extrait

## Quand cette méthode sera-t-elle skill-isée ?

À l'issue de Phase C du workflow agentique (cf. `workflow-agentique-vision.md`). Le skill `labster-ds:add-component` prendra en input le résultat de l'étape 1 (cadrage) et produira automatiquement les artefacts des étapes 4-8, avec validation humaine entre chaque étape.

D'ici-là, la méthode est manuelle — mais reproductible par n'importe qui suivant cette checklist.

## Limites connues V1.0

- L'extraction depuis lib externe (étape 2) demande encore beaucoup de prompting manuel. À automatiser dans le skill.
- Les arbitrages de mapping (étape 3) restent humains — c'est du jugement design. À garder humain en V1+.
- L'étape 7 (Figma Component Set natif) est techniquement lourde — le code MCP `use_figma` doit être très précis pour produire un résultat propre. À encapsuler dans le skill.

## Référence opérationnelle

Pour voir cette méthode appliquée concrètement :
- **Button** : créé via Shadcn import + re-tokenisation Labster + accent-cta added (V0.1 → V0.5)
- **Input** : créé via Shadcn import + state=error added pour Labster (V0.1)
- **Card** : créé from-scratch pour Labster, inspiré Material 3 + observation labster.io (V1.0)
- **Dialog** : créé via Shadcn substitution (Card absent en V0.x) — sera repositionné V1.0 comme modal-only
