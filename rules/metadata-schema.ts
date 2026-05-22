// Schéma TypeScript de la couche Intent du DS Labster.
// Documenté en détail dans rules/metadata-schema.md.
// Source de vérité pour les imports des fichiers components/*.metadata.ts.

export type ComponentType = "atom" | "molecule" | "organism";

export type Variant = {
  /** Identifiant unique du variant (ex: "primary", "size-small") */
  name: string;
  /** Description courte : quand l'utiliser */
  description: string;
  /** Tokens consommés par ce variant (référence DTCG dot-path) */
  tokens_consumed: string[];
  /** Optionnel : statut du variant */
  status?: "stable" | "to_create_in_figma" | "deprecated";
};

export type Prop = {
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

export type Example = {
  /** Contexte d'usage (ex: "primary CTA in login form") */
  context: string;
  /** Snippet de code minimal */
  code_snippet: string;
};

export type Composition = {
  /** Composant enfant utilisé */
  child_component: string;
  /** Variant du child consommé */
  child_variant?: string;
  /** Cardinality (ex: "1", "0..n", "1..2") */
  cardinality: string;
};

export type Source = {
  /** Clé du fichier Figma */
  figma_file_key: string;
  /** NodeId du master component */
  figma_node_id: string;
  /** URL Figma complète */
  figma_url: string;
  /** Date d'extraction des données */
  inventory_date: string;
};

export type Size = {
  /** Nom du size (ex: "Giant", "Large", "Medium", "Small", "Tiny") */
  name: string;
  /** Description : usage attendu de cette taille */
  description: string;
  /** Statut (stable | to_validate_with_labster | deprecated) */
  status?: "stable" | "to_validate_with_labster" | "deprecated";
};

export type IconOnlyProperty = {
  /** Description du comportement icon-only */
  description: string;
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
  /** Sizes du composant (Component Set property `size`, optionnel) */
  sizes?: Size[];
  /** Property icon-only (booléenne, optionnel) */
  icon_only_property?: IconOnlyProperty;
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
