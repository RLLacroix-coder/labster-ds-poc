import type { ComponentMetadata } from "../rules/metadata-schema";

export const metadata: ComponentMetadata = {
  name: "Input",
  description:
    "Atom for user text input. Used for emails, short text, numeric values, and simple searches. For long text use Textarea; for exclusive choices use Select or Radio; for booleans use Checkbox or Switch.",
  type: "atom",
  version: "V0.1",

  variants: [
    {
      name: "size-default",
      description:
        "Standard size (~40px height). Use as default in most forms.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.grey-1",
        "colors.neutral.grey-2",
        "colors.neutral.grey-3",
        "colors.neutral.grey-6",
        "typography.body-medium",
        "typography.p-ui",
        "typography.subtle",
        "shapes.radius.sm",
      ],
      status: "stable",
    },
    {
      name: "size-small",
      description:
        "Compact size (~32px height) for dense contexts like settings pages.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.grey-2",
        "colors.neutral.grey-3",
        "colors.neutral.grey-6",
        "typography.subtle",
        "shapes.radius.sm",
      ],
      status: "stable",
    },
    {
      name: "label-inline-left",
      description:
        "Label rendered to the left of the field (84px width, right-aligned). Used in dense forms like settings or preferences.",
      tokens_consumed: [
        "colors.neutral.grey-6",
        "typography.body-medium",
      ],
      status: "stable",
    },
    {
      name: "state-error",
      description:
        "Error state — border in semantic.danger + helper text in semantic.danger + alert-circle icon suffix. CREATED FOR LABSTER (absent from Shadcn source).",
      tokens_consumed: [
        "colors.semantic.danger",
        "colors.brand.red-light",
        "colors.neutral.white",
        "colors.neutral.grey-6",
        "typography.body-medium",
        "typography.subtle",
        "shapes.radius.sm",
      ],
      status: "to_create_in_figma",
    },
    {
      name: "state-read-only",
      description:
        "Read-only state — no border or subtle dashed, smoke background. Display-only values.",
      tokens_consumed: [
        "colors.neutral.smoke",
        "colors.neutral.grey-1",
        "colors.neutral.grey-6",
      ],
      status: "to_create_in_figma",
    },
  ],

  props: [
    {
      name: "size",
      type: "'default' | 'small'",
      required: false,
      default: "'default'",
      description: "Visual size variant.",
    },
    {
      name: "label",
      type: "string",
      required: false,
      description:
        "Visible label above the field. If absent, ariaLabel becomes required.",
    },
    {
      name: "labelPlacement",
      type: "'above' | 'inline-left'",
      required: false,
      default: "'above'",
      description: "Label position.",
    },
    {
      name: "placeholder",
      type: "string",
      required: false,
      description: "Hint text shown in empty state. Must NOT replace the label.",
    },
    {
      name: "value",
      type: "string",
      required: false,
      description: "Controlled value.",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      required: false,
      description: "Change handler.",
    },
    {
      name: "helperText",
      type: "string",
      required: false,
      description:
        "Helper text below the field. Use to explain what data is expected.",
    },
    {
      name: "errorMessage",
      type: "string",
      required: false,
      description:
        "Error message shown when state is error. Must explain WHAT is invalid and HOW to fix it.",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      default: "false",
      description: "Disabled state.",
    },
    {
      name: "readOnly",
      type: "boolean",
      required: false,
      default: "false",
      description: "Read-only state.",
    },
    {
      name: "type",
      type: "'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'",
      required: false,
      default: "'text'",
      description: "HTML input type.",
    },
    {
      name: "iconPrefix",
      type: "ReactNode",
      required: false,
      description: "Icon shown at the left of the field (e.g. search, mail).",
    },
    {
      name: "iconSuffix",
      type: "ReactNode",
      required: false,
      description:
        "Icon shown at the right of the field (e.g. eye toggle for password, alert-circle on error).",
    },
    {
      name: "ariaLabel",
      type: "string",
      required: false,
      description: "Required if no visible label.",
    },
    {
      name: "ariaDescribedBy",
      type: "string",
      required: false,
      description:
        "ID of the helper or error message for screen reader association.",
    },
  ],

  states: [
    "default",
    "focused",
    "completed",
    "error",
    "disabled",
    "read-only",
  ],

  tokens_consumed: [
    "colors.neutral.white",
    "colors.neutral.smoke",
    "colors.neutral.grey-1",
    "colors.neutral.grey-2",
    "colors.neutral.grey-3",
    "colors.neutral.grey-6",
    "colors.semantic.danger",
    "colors.semantic.action-primary",
    "colors.brand.red-light",
    "typography.body-medium",
    "typography.p-ui",
    "typography.subtle",
    "shapes.radius.sm",
  ],

  usage_recommended: [
    "Always show a visible label (above or inline-left). Never use placeholder as label.",
    "Use helperText to explain what data is expected ('We need this to send you the report').",
    "Show error message near the field, not just at the top of the form.",
    "Provide specific, actionable error messages ('Email format is incorrect — example: name@example.com').",
    "For sensitive fields like password, offer an eye/eye-off toggle as iconSuffix.",
  ],

  usage_discouraged: [
    "Do not use placeholder-only without a label.",
    "Do not show generic error messages like 'Invalid input'.",
    "Do not disable a field without explaining why in helperText.",
    "Do not omit the focus ring (test mandatory at keyboard).",
  ],

  examples: [
    {
      context: "Email field in a login form",
      code_snippet:
        "<Input\n  label=\"Email\"\n  type=\"email\"\n  placeholder=\"name@example.com\"\n  helperText=\"We will send your sign-in link to this address.\"\n/>",
    },
    {
      context: "Inline label in a settings page",
      code_snippet:
        "<Input\n  size=\"small\"\n  label=\"Width\"\n  labelPlacement=\"inline-left\"\n  value=\"100%\"\n/>",
    },
    {
      context: "Error state on email validation",
      code_snippet:
        "<Input\n  label=\"Email\"\n  value={emailValue}\n  errorMessage=\"Email format is incorrect — example: name@example.com\"\n  ariaDescribedBy=\"email-error\"\n/>",
    },
  ],

  source: {
    figma_file_key: "tPwrOV9EX9jLXuxsBskINR",
    figma_node_id: "2:285",
    figma_url:
      "https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=2-285",
    inventory_date: "2026-05-22",
  },

  accessibility_target: "WCAG AA",

  notes: [
    "Source Figma = Shadcn UI re-tokenized on Labster (POC pivot 2026-05-22).",
    "state=error is CREATED for Labster (absent from Shadcn).",
    "Focus ring upgraded from grey neutral (Shadcn) to semantic.action-primary (blue brand) for better keyboard visibility.",
    "Placeholder color (grey-3 on white) ~5.3:1 contrast, acceptable for AA hint text — verify precisely if used as primary content cue.",
  ],
};
