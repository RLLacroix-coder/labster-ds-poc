---
title: Schéma metadata.ts — Labster DS
version: V0.1
status: stable for POC
---

# Schéma metadata.ts Labster DS

Tout composant Labster DS fournit un fichier `<Composant>.metadata.ts` exportant un objet `metadata` conforme au schéma ci-dessous.

## Rôle de metadata.ts (couche Intent du modèle 4 couches)

- **Exposer le composant à la consommation machine** : LLM, codegen, design linting.
- **Garantir la traçabilité** : chaque metadata doit citer son source Figma (fileKey + nodeId).
- **Permettre les queries Report** : "Quels tokens consomme X ?" "Où est utilisé Y ?" se répondent en lisant les metadata.

Le `DESIGN.md` reste la source de vérité humaine. Le `metadata.ts` est sa transcription machine-readable, **dérivée** du DESIGN.md (pas l'inverse).

## Schéma TypeScript

```typescript
type ComponentType = "atom" | "molecule" | "organism";

type Variant = {
  /** Identifiant unique du variant (ex: "primary", "size-small") */
  name: string;
  /** Description courte : quand l'utiliser */
  description: string;
  /** Tokens consommés par ce variant (référence DTCG dot-path) */
  tokens_consumed: string[];
  /** Optionnel : statut du variant ("stable" | "to_create_in_figma" | "deprecated") */
  status?: "stable" | "to_create_in_figma" | "deprecated";
};

type Prop = {
  /** Nom de la prop côté code consommateur */
  name: string;
  /** Type TypeScript (ex: "string", "boolean", "ButtonVariant", "ReactNode") */
  type: string;
  /** Si false, prop optionnelle */
  required: boolean;
  /** Description : à quoi sert la prop, exemples de valeur attendus */
  description: string;
  /** Optionnel : valeur par défaut */
  default?: string;
};

type Example = {
  /** Contexte d'usage (ex: "primary CTA in login form") */
  context: string;
  /** Snippet de code minimal */
  code_snippet: string;
};

type Composition = {
  /** Composant enfant utilisé */
  child_component: string;
  /** Variant du child consommé */
  child_variant?: string;
  /** Cardinality (ex: "1", "0..n", "1..2") */
  cardinality: string;
};

type Source = {
  /** Clé du fichier Figma */
  figma_file_key: string;
  /** NodeId du master component */
  figma_node_id: string;
  /** URL Figma complète */
  figma_url: string;
  /** Date d'extraction des données */
  inventory_date: string;
};

export type ComponentMetadata = {
  /** Nom du composant (PascalCase) */
  name: string;
  /** Description : What + When utiliser */
  description: string;
  /** Niveau d'atomicité */
  type: ComponentType;
  /** Version du composant côté DS Labster */
  version: string;
  /** Variants du composant */
  variants: Variant[];
  /** Props exposées (pour codegen) */
  props: Prop[];
  /** États gérés (ex: ["default", "hover", "focus", "disabled"]) */
  states: string[];
  /** Tokens consommés agrégés (union des tokens_consumed des variants + tokens structurels) */
  tokens_consumed: string[];
  /** Contextes recommandés (1 phrase par contexte) */
  usage_recommended: string[];
  /** Contextes déconseillés (1 phrase par contexte) */
  usage_discouraged: string[];
  /** Snippets d'usage exemplaires */
  examples: Example[];
  /** Composition : autres composants Labster utilisés (uniquement pour molecules/organisms) */
  composition?: Composition[];
  /** Référence Figma source */
  source: Source;
  /** Niveau WCAG visé */
  accessibility_target?: "WCAG AA" | "WCAG AAA";
  /** Notes critiques (conflits, manques, à confirmer) */
  notes?: string[];
};
```

## Conventions

### Valeurs `TO_DEFINE`
Quand un champ n'est pas déductible du DESIGN.md (ex : prop dont le nom n'est pas finalisé, valeur de token manquante), marquer `"TO_DEFINE"` avec un commentaire inline expliquant l'incertitude.

### Référencement des tokens
Les `tokens_consumed` utilisent le **dot-path DTCG** depuis la racine du DS Labster :
- `colors.brand.blue`
- `colors.semantic.action-primary`
- `colors.neutral.grey-6`
- `typography.body-medium`
- `elevation.large`
- `shapes.radius.sm`

Les hex bruts (`#476AE3`) sont **interdits** dans metadata.ts. Si le token n'existe pas, marquer `"TOKEN_MISSING:description"`.

### Cohérence DESIGN.md / metadata.ts
À chaque modification d'un `<Composant>.design.md`, le `<Composant>.metadata.ts` doit être régénéré. Le DESIGN.md est la source de vérité ; metadata.ts en dérive.

## Validation

Aucun validateur automatique n'est implémenté dans le POC V0.1. À industrialisation Phase 2 SIG :
- Ajouter un test JSON-schema sur le shape de l'export `metadata`.
- Ajouter une CI qui vérifie que tous les `tokens_consumed` existent dans `tokens/labster-tokens.json`.
- Ajouter une CI qui vérifie la cohérence DESIGN.md ↔ metadata.ts (au moins : noms de variants identiques).
