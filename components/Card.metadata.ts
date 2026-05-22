import type { ComponentMetadata } from "../rules/metadata-schema";

export const metadata: ComponentMetadata = {
  name: "Card",
  description:
    "Molecule of composition. Used for service cards (labster.io pattern), content blocks in dashboards, selectable list items, and featured content. Replaces Dialog as the primary molecule in MVP V1.0 — Dialog is reserved for true modal use cases.",
  type: "molecule",
  version: "V1.0",

  variants: [
    {
      name: "default",
      description:
        "Static block. Title + body, no actions. Used for content display.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.grey-1",
        "colors.neutral.grey-3",
        "colors.neutral.grey-4",
        "colors.neutral.grey-6",
        "typography.headings.h5",
        "typography.text_styles.label_m",
        "typography.paragraphs.small",
        "shapes.radius.md",
      ],
      status: "stable",
    },
    {
      name: "interactive",
      description:
        "Full-surface clickable card. Hover applies elevation.medium + grey-2 border. Used as navigation tiles.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.grey-1",
        "colors.neutral.grey-2",
        "colors.semantic.action-primary",
        "elevation.medium",
        "shapes.radius.md",
      ],
      status: "stable",
    },
    {
      name: "with-actions",
      description:
        "Card with 1-2 Button instances in an action area. Labster.io service card pattern (e.g., 'En savoir plus' on each service).",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.grey-1",
        "colors.neutral.grey-6",
        "typography.headings.h5",
        "typography.paragraphs.small",
        "shapes.radius.md",
      ],
      status: "stable",
    },
    {
      name: "selectable",
      description:
        "Card with selected state. Border 2px action-primary when selected. Used in Radio-Card patterns (plan selection, feature toggle).",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.grey-1",
        "colors.semantic.action-primary",
        "shapes.radius.md",
      ],
      status: "stable",
    },
    {
      name: "elevated",
      description:
        "Permanent shadow card. Used for featured content, marketing hero, dashboard alerts.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.grey-1",
        "elevation.small",
        "elevation.medium",
        "shapes.radius.md",
      ],
      status: "stable",
    },
    {
      name: "size-Small",
      description: "Compact (max-width 280px, padding 16px). For dense grids.",
      tokens_consumed: ["shapes.radius.md"],
      status: "stable",
    },
    {
      name: "size-Medium",
      description: "Default (max-width 400px, padding 24px).",
      tokens_consumed: ["shapes.radius.md"],
      status: "stable",
    },
    {
      name: "size-Large",
      description: "Hero (max-width 560px, padding 32px).",
      tokens_consumed: ["shapes.radius.md"],
      status: "stable",
    },
  ],

  props: [
    {
      name: "variant",
      type: "'default' | 'interactive' | 'with-actions' | 'selectable' | 'elevated'",
      required: false,
      default: "'default'",
      description: "Visual variant of the card.",
    },
    {
      name: "size",
      type: "'Small' | 'Medium' | 'Large'",
      required: false,
      default: "'Medium'",
      description: "Size variant — controls max-width and padding.",
    },
    {
      name: "title",
      type: "string",
      required: true,
      description: "Card title (max 6 words recommended). Rendered as H5.",
    },
    {
      name: "subtitle",
      type: "string",
      required: false,
      description: "Optional subtitle (e.g., 'Service' category). Rendered as Label M.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      description: "Body content (Paragraph Small typography, max 3-4 lines for preview).",
    },
    {
      name: "image",
      type: "string | ReactNode",
      required: false,
      description: "Optional media slot at the top of the card (image URL or illustration).",
    },
    {
      name: "actions",
      type: "ReactNode[]",
      required: false,
      description: "Array of Button instances (max 2). Required for variant=with-actions.",
    },
    {
      name: "selected",
      type: "boolean",
      required: false,
      default: "false",
      description: "For variant=selectable, controls selected state.",
    },
    {
      name: "onClick",
      type: "(event: MouseEvent) => void",
      required: false,
      description: "Click handler. Required for variant=interactive (use <a> or <button> HTML for accessibility).",
    },
    {
      name: "ariaLabel",
      type: "string",
      required: false,
      description: "Accessibility label, especially for variant=interactive without visible title.",
    },
  ],

  states: ["default", "hover", "focus", "selected", "disabled"],

  tokens_consumed: [
    "colors.neutral.white",
    "colors.neutral.grey-1",
    "colors.neutral.grey-2",
    "colors.neutral.grey-3",
    "colors.neutral.grey-4",
    "colors.neutral.grey-6",
    "colors.semantic.action-primary",
    "typography.headings.h5",
    "typography.text_styles.label_m",
    "typography.paragraphs.small",
    "elevation.small",
    "elevation.medium",
    "shapes.radius.md",
  ],

  usage_recommended: [
    "Use Medium size as default — fits most layouts.",
    "Keep titles concise (max 6 words).",
    "Limit body preview to 3-4 lines (truncate if longer).",
    "For with-actions, max 2 buttons (1 primary + 1 secondary).",
    "For interactive, make the entire surface clickable (not just the title).",
    "Use elevation.small as default for elevated, elevation.medium for high-priority content.",
  ],

  usage_discouraged: [
    "Do not nest a Dialog inside a Card (modal anti-pattern).",
    "Do not put more than 5 sub-elements (refactor into a page or section).",
    "Do not mix elevation levels in the same grid (visual noise).",
    "Do not hardcode internal dimensions (use auto-layout for content-driven sizing).",
    "Do not omit focus ring on interactive variants (keyboard accessibility).",
  ],

  examples: [
    {
      context: "Service card on labster.io homepage",
      code_snippet:
        "<Card\n  variant=\"with-actions\"\n  size=\"Medium\"\n  subtitle=\"Service\"\n  title=\"Digital Product Design\"\n  actions={[<Button variant=\"link\">En savoir plus →</Button>]}\n>\n  Description of the service offering...\n</Card>",
    },
    {
      context: "Navigation tile in a dashboard",
      code_snippet:
        "<Card variant=\"interactive\" size=\"Small\" onClick={() => navigate('/insights')} ariaLabel=\"Open Insights dashboard\">\n  <h5>Insights</h5>\n  <p>12 new findings this week</p>\n</Card>",
    },
    {
      context: "Plan selection (Radio-Card pattern)",
      code_snippet:
        "<Card variant=\"selectable\" selected={plan === 'pro'} onClick={() => setPlan('pro')}>\n  <h5>Pro plan</h5>\n  <p>Best for teams of 5-50</p>\n</Card>",
    },
    {
      context: "Featured content (elevated)",
      code_snippet:
        "<Card variant=\"elevated\" size=\"Large\">\n  <h5>Annual report 2026</h5>\n  <p>Discover our impact this year.</p>\n  <Button variant=\"primary\">Read the report</Button>\n</Card>",
    },
  ],

  composition: [
    {
      child_component: "Button",
      child_variant: "any (typically secondary, ghost, link, or primary for CTA)",
      cardinality: "0..2",
    },
    {
      child_component: "Input",
      child_variant: "any (rare, for form cards)",
      cardinality: "0..n (typically 0)",
    },
  ],

  source: {
    figma_file_key: "fTtwrwxa74iSPMMTbq5GK8",
    figma_node_id: "TO_CREATE",
    figma_url: "https://www.figma.com/design/fTtwrwxa74iSPMMTbq5GK8 (page Component Library, to be created)",
    inventory_date: "2026-05-22",
  },

  accessibility_target: "WCAG AA",

  notes: [
    "V1.0 component, introduced 2026-05-22 as MVP replacement for Dialog.",
    "No Shadcn master — pattern is invented for Labster, inspired by Material 3 Card + Shadcn Card + labster.io observation.",
    "Labster.io service cards are the primary pattern reference (variant=with-actions, size=Medium, Button variant=link).",
    "Selectable variant implements WAI-ARIA Radio-Card pattern.",
    "Interactive variant uses native HTML <a> or <button> for accessibility (no div onClick).",
  ],
};
