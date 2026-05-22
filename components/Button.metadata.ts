import type { ComponentMetadata } from "../rules/metadata-schema";

export const metadata: ComponentMetadata = {
  name: "Button",
  description:
    "Atom that triggers an action or navigation. Most-used atom of the Labster DS. Use primary for the main call-to-action of a section, secondary/ghost for alternatives, danger for destructive irreversible actions, link for inline navigation.",
  type: "atom",
  version: "V0.1",

  variants: [
    {
      name: "primary",
      description:
        "Main call-to-action. Maximum one per section. Uses brand blue, white text.",
      tokens_consumed: [
        "colors.semantic.action-primary",
        "colors.semantic.action-primary-hover",
        "colors.neutral.white",
        "colors.neutral.grey-2",
        "typography.body-medium",
        "shapes.radius.sm",
      ],
      status: "stable",
    },
    {
      name: "secondary",
      description:
        "Alternative action or cancel. White background with grey border.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.smoke",
        "colors.neutral.grey-1",
        "colors.neutral.grey-2",
        "colors.neutral.grey-6",
        "typography.body-medium",
        "shapes.radius.sm",
      ],
      status: "stable",
    },
    {
      name: "ghost",
      description:
        "Discreet inline action. Transparent background. Used in lists, menus, toolbars.",
      tokens_consumed: [
        "colors.neutral.smoke",
        "colors.neutral.grey-6",
        "typography.body-medium",
        "shapes.radius.sm",
      ],
      status: "stable",
    },
    {
      name: "danger",
      description:
        "Destructive irreversible action (delete, revoke). Must be paired with a confirmation dialog. Note: uses brand red, see DESIGN.md global section 2 for identity/semantic conflict.",
      tokens_consumed: [
        "colors.semantic.danger",
        "colors.semantic.danger-hover",
        "colors.neutral.white",
        "colors.neutral.grey-2",
        "typography.body-medium",
        "shapes.radius.sm",
      ],
      status: "stable",
    },
    {
      name: "link",
      description:
        "Inline navigational action. Transparent background. Underline on hover.",
      tokens_consumed: [
        "colors.semantic.action-primary",
        "typography.body-medium",
      ],
      status: "stable",
    },
    {
      name: "size-small",
      description:
        "Compact size variant (32px height) for dense contexts.",
      tokens_consumed: ["typography.body-medium"],
      status: "to_create_in_figma",
    },
    {
      name: "icon-only-square",
      description:
        "Square icon-only button (32×32) for toolbars and dense UIs.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.smoke",
        "colors.neutral.grey-1",
        "colors.neutral.grey-6",
        "shapes.radius.sm",
      ],
      status: "stable",
    },
    {
      name: "icon-only-circle",
      description:
        "Pill-shaped icon-only button (40×40) for floating actions.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.smoke",
        "colors.neutral.grey-1",
        "colors.neutral.grey-6",
        "shapes.radius.pill",
      ],
      status: "stable",
    },
    {
      name: "loading",
      description:
        "Loading state overlay (not a standalone variant). Applies to any variant via opacity + spinner.",
      tokens_consumed: ["colors.neutral.grey-6"],
      status: "stable",
    },
  ],

  props: [
    {
      name: "variant",
      type: "'primary' | 'secondary' | 'ghost' | 'danger' | 'link'",
      required: false,
      default: "'primary'",
      description: "Visual variant of the button.",
    },
    {
      name: "size",
      type: "'default' | 'small' | 'icon-only-square' | 'icon-only-circle'",
      required: false,
      default: "'default'",
      description: "Size variant.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Button label text or icon node.",
    },
    {
      name: "onClick",
      type: "(event: MouseEvent) => void",
      required: false,
      description: "Click handler.",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      default: "false",
      description: "Disabled state.",
    },
    {
      name: "loading",
      type: "boolean",
      required: false,
      default: "false",
      description: "Loading state (spinner + reduced opacity).",
    },
    {
      name: "type",
      type: "'button' | 'submit' | 'reset'",
      required: false,
      default: "'button'",
      description: "HTML button type attribute.",
    },
    {
      name: "ariaLabel",
      type: "string",
      required: false,
      description:
        "Required for icon-only variants. Describes the button action for screen readers.",
    },
  ],

  states: ["default", "hover", "focus", "active", "disabled", "loading"],

  tokens_consumed: [
    "colors.semantic.action-primary",
    "colors.semantic.action-primary-hover",
    "colors.semantic.danger",
    "colors.semantic.danger-hover",
    "colors.neutral.white",
    "colors.neutral.smoke",
    "colors.neutral.grey-1",
    "colors.neutral.grey-2",
    "colors.neutral.grey-6",
    "typography.body-medium",
    "shapes.radius.sm",
    "shapes.radius.pill",
  ],

  usage_recommended: [
    "One primary button per section as the main CTA.",
    "Pair danger button with an explicit confirmation dialog.",
    "Use ghost for inline actions in lists and menus.",
    "Use icon-only variants in toolbars with mandatory aria-label.",
  ],

  usage_discouraged: [
    "Do not use two primary buttons in the same section (visual competition).",
    "Do not use danger for non-destructive actions like cancel or close.",
    "Do not use generic labels ('OK', 'Submit', 'Click here'). Prefer action verbs ('Save changes', 'Send invitation').",
    "Do not omit aria-label on icon-only variants.",
  ],

  examples: [
    {
      context: "Primary CTA in a login form",
      code_snippet:
        "<Button variant=\"primary\" type=\"submit\">Sign in</Button>",
    },
    {
      context: "Cancel + Confirm pair in a Dialog",
      code_snippet:
        "<Button variant=\"secondary\" onClick={cancel}>Cancel</Button>\n<Button variant=\"primary\" onClick={confirm}>Save changes</Button>",
    },
    {
      context: "Destructive action with confirmation",
      code_snippet:
        "<Button variant=\"danger\" onClick={openDeleteDialog}>Delete account</Button>",
    },
    {
      context: "Icon-only in a toolbar",
      code_snippet:
        "<Button variant=\"ghost\" size=\"icon-only-square\" ariaLabel=\"Edit project\"><EditIcon /></Button>",
    },
  ],

  source: {
    figma_file_key: "tPwrOV9EX9jLXuxsBskINR",
    figma_node_id: "1:85",
    figma_url:
      "https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=1-85",
    inventory_date: "2026-05-22",
  },

  accessibility_target: "WCAG AA",

  notes: [
    "Source Figma = Shadcn UI re-tokenized on Labster (POC pivot 2026-05-22).",
    "Variant `danger` uses brand red — see DESIGN.md global section 2 for identity/semantic conflict.",
    "States `focus`, `active`, and explicit `disabled` are missing in source Figma — to be created. Documented in DESIGN.md.",
  ],
};
