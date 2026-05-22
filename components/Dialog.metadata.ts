import type { ComponentMetadata } from "../rules/metadata-schema";

export const metadata: ComponentMetadata = {
  name: "Dialog",
  description:
    "Modal molecule that interrupts the user for a critical action or information. Used for confirmations, ponctual data entries, and acknowledgments. Substitute for Card (which does not exist in the source Shadcn kit).",
  type: "molecule",
  version: "V0.1",

  variants: [
    {
      name: "informational",
      description: "Read-only dialog with single dismiss button.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.grey-1",
        "colors.neutral.grey-3",
        "colors.neutral.grey-6",
        "typography.title-large",
        "typography.subtle",
        "shapes.radius.md",
        "elevation.large",
      ],
      status: "stable",
    },
    {
      name: "confirmation",
      description:
        "Asks 'are you sure?'. Cancel (secondary) + Confirm (primary) pair.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.grey-1",
        "colors.neutral.grey-3",
        "colors.neutral.grey-6",
        "typography.title-large",
        "typography.subtle",
        "shapes.radius.md",
        "elevation.large",
      ],
      status: "stable",
    },
    {
      name: "destructive-confirmation",
      description:
        "Before irreversible action. Cancel (secondary) + Delete (danger) pair. Initial focus on Cancel.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.grey-1",
        "colors.neutral.grey-3",
        "colors.neutral.grey-6",
        "colors.semantic.danger",
        "typography.title-large",
        "typography.subtle",
        "shapes.radius.md",
        "elevation.large",
      ],
      status: "stable",
    },
    {
      name: "form",
      description:
        "Dialog with user input. The Shadcn master 4:329 implements this pattern. Maximum 4-5 fields recommended; use a dedicated page beyond.",
      tokens_consumed: [
        "colors.neutral.white",
        "colors.neutral.grey-1",
        "colors.neutral.grey-3",
        "colors.neutral.grey-6",
        "typography.title-large",
        "typography.subtle",
        "shapes.radius.md",
        "elevation.large",
      ],
      status: "stable",
    },
    {
      name: "backdrop-overlay",
      description:
        "Backdrop covering the page behind. grey-6 at opacity 0.5. CREATED FOR LABSTER (absent from Shadcn master).",
      tokens_consumed: ["colors.neutral.grey-6"],
      status: "to_create_in_figma",
    },
  ],

  props: [
    {
      name: "open",
      type: "boolean",
      required: true,
      description: "Controls dialog visibility.",
    },
    {
      name: "onClose",
      type: "() => void",
      required: true,
      description:
        "Handler called on Escape, backdrop click, or close button.",
    },
    {
      name: "variant",
      type:
        "'informational' | 'confirmation' | 'destructive-confirmation' | 'form'",
      required: false,
      default: "'informational'",
      description: "Dialog pattern.",
    },
    {
      name: "title",
      type: "string",
      required: true,
      description:
        "Dialog title. Must describe the action and its consequences ('Delete project Octopus?'), not 'Are you sure?'.",
    },
    {
      name: "description",
      type: "string",
      required: false,
      description:
        "Explains consequences ('All members will lose access.'). Recommended for confirmation and destructive variants.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      description:
        "Body content (form fields, message, etc.). Omitted in pure confirmation dialogs.",
    },
    {
      name: "primaryAction",
      type: "{ label: string; onClick: () => void; variant?: 'primary' | 'danger' }",
      required: false,
      description:
        "Right-most button. Defaults to variant=primary; use variant=danger for destructive-confirmation.",
    },
    {
      name: "secondaryAction",
      type: "{ label: string; onClick: () => void }",
      required: false,
      description: "Cancel/dismiss button. Rendered to the left of primary.",
    },
    {
      name: "dismissOnBackdropClick",
      type: "boolean",
      required: false,
      default: "true",
      description:
        "Disable for destructive-confirmation or when form has unsaved changes.",
    },
    {
      name: "initialFocus",
      type: "'primary' | 'secondary' | 'firstField' | 'auto'",
      required: false,
      default: "'auto'",
      description:
        "For destructive-confirmation, force 'secondary' to focus Cancel (never auto-focus a danger button).",
    },
  ],

  states: ["closed", "open", "closing"],

  tokens_consumed: [
    "colors.neutral.white",
    "colors.neutral.grey-1",
    "colors.neutral.grey-3",
    "colors.neutral.grey-6",
    "colors.semantic.danger",
    "typography.title-large",
    "typography.subtle",
    "typography.body-medium",
    "shapes.radius.md",
    "elevation.large",
  ],

  usage_recommended: [
    "Use confirmation or destructive-confirmation before irreversible actions.",
    "Give a title that describes the action AND its consequences.",
    "Place primary action right, secondary action left.",
    "For destructive-confirmation, set initialFocus='secondary' so Cancel is focused first.",
    "Use Elevation/Large + backdrop to signal modal depth.",
    "Support Escape key to close (except when form has unsaved changes).",
  ],

  usage_discouraged: [
    "Do not use Dialog for non-critical messages (prefer Toast or Banner).",
    "Do not stack two Dialogs (UX anti-pattern).",
    "Do not place more than 2-3 buttons in the action zone.",
    "Do not show a Dialog on page load (forced intrusion).",
    "Do not omit focus trap (mandatory keyboard test).",
    "Do not omit backdrop (content behind must not be interactive).",
  ],

  examples: [
    {
      context: "Confirm before saving profile changes",
      code_snippet:
        "<Dialog\n  open={isOpen}\n  onClose={close}\n  variant=\"confirmation\"\n  title=\"Save changes to your profile?\"\n  description=\"These changes will be visible to all members of your team.\"\n  primaryAction={{ label: 'Save changes', onClick: handleSave }}\n  secondaryAction={{ label: 'Cancel', onClick: close }}\n/>",
    },
    {
      context: "Destructive confirmation before account deletion",
      code_snippet:
        "<Dialog\n  open={isOpen}\n  onClose={close}\n  variant=\"destructive-confirmation\"\n  title=\"Delete your account?\"\n  description=\"All your data will be permanently deleted. This cannot be undone.\"\n  primaryAction={{ label: 'Delete', onClick: handleDelete, variant: 'danger' }}\n  secondaryAction={{ label: 'Cancel', onClick: close }}\n  dismissOnBackdropClick={false}\n  initialFocus=\"secondary\"\n/>",
    },
    {
      context: "Edit profile form (the Shadcn master pattern)",
      code_snippet:
        "<Dialog\n  open={isOpen}\n  onClose={close}\n  variant=\"form\"\n  title=\"Edit profile\"\n  description=\"Make changes to your profile here. Click save when you're done.\"\n  primaryAction={{ label: 'Save changes', onClick: handleSave }}\n  secondaryAction={{ label: 'Cancel', onClick: close }}\n>\n  <Input size=\"small\" labelPlacement=\"inline-left\" label=\"Name\" value={name} />\n  <Input size=\"small\" labelPlacement=\"inline-left\" label=\"Username\" value={username} />\n</Dialog>",
    },
  ],

  composition: [
    {
      child_component: "Input",
      child_variant: "size-small",
      cardinality: "0..n (typically 0..5)",
    },
    {
      child_component: "Button",
      child_variant: "secondary | primary | danger",
      cardinality: "1..2",
    },
  ],

  source: {
    figma_file_key: "tPwrOV9EX9jLXuxsBskINR",
    figma_node_id: "4:329",
    figma_url:
      "https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=4-329",
    inventory_date: "2026-05-22",
  },

  accessibility_target: "WCAG AA",

  notes: [
    "Source Figma = Shadcn UI re-tokenized on Labster (POC pivot 2026-05-22).",
    "Substitution of Card (does not exist in Shadcn kit) — decision Rachel 2026-05-22.",
    "Backdrop overlay is CREATED FOR LABSTER (absent from Shadcn master).",
    "Elevation/Large applied per Labster styleguide token.",
    "Implements full WAI-ARIA Dialog Pattern (role, aria-modal, aria-labelledby, focus trap, restitution).",
  ],
};
