import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster DS Input. Source : components/Input.design.md + components/Input.metadata.ts. " +
          "Atom for user text input. Variants: size (default/small), labelPlacement (above/inline-left), " +
          "states (default/focused/completed/error/disabled/read-only). " +
          "⚠ state=error is CREATED FOR LABSTER (absent from Shadcn source) — border `semantic.danger` + alert-circle icon + helper in danger color.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "small"],
    },
    labelPlacement: {
      control: { type: "select" },
      options: ["above", "inline-left"],
    },
    label: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    helperText: { control: { type: "text" } },
    errorMessage: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    readOnly: { control: { type: "boolean" } },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

// =============================================================================
// PLAYGROUND
// =============================================================================

export const Playground: Story = {
  args: {
    label: "Email",
    placeholder: "name@example.com",
    helperText: "We will send your sign-in link to this address.",
    size: "default",
    labelPlacement: "above",
  },
};

// =============================================================================
// STATES
// =============================================================================

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "name@example.com",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    helperText: "Minimum 8 characters, including 1 uppercase and 1 number.",
  },
};

export const Completed: Story = {
  args: {
    label: "Email",
    defaultValue: "rachel.lacroix@labster.io",
    helperText: "We will send your sign-in link to this address.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    defaultValue: "rachel.lacroix",
    errorMessage:
      "Email format is incorrect — example: name@example.com",
  },
  parameters: {
    docs: {
      description: {
        story:
          "state=error is CREATED FOR LABSTER (border `semantic.danger`, alert-circle icon, error message in danger). Triggered by `errorMessage` prop.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    defaultValue: "Locked field",
    disabled: true,
    helperText: "This field is disabled because authentication is required first.",
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Account ID",
    defaultValue: "LAB-2026-0042",
    readOnly: true,
    helperText: "This identifier is generated automatically.",
  },
};

// =============================================================================
// SIZES
// =============================================================================

export const SizeDefault: Story = {
  args: {
    label: "Default (40px height)",
    placeholder: "Default size",
    size: "default",
  },
};

export const SizeSmall: Story = {
  args: {
    label: "Small (32px height)",
    placeholder: "Compact contexts",
    size: "small",
  },
};

// =============================================================================
// LABEL PLACEMENT
// =============================================================================

export const LabelInlineLeft: Story = {
  args: {
    label: "Width",
    labelPlacement: "inline-left",
    size: "small",
    defaultValue: "100%",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Label rendered to the left of the field (84px right-aligned). Used in dense forms like settings or preferences.",
      },
    },
  },
};

// =============================================================================
// WITH ICONS
// =============================================================================

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const WithIconPrefix: Story = {
  args: {
    label: "Search",
    placeholder: "Search components, tokens, patterns…",
    iconPrefix: <SearchIcon />,
  },
};

// =============================================================================
// ALL STATES MATRIX (visual reference)
// =============================================================================

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4 w-[420px]">
      <Input label="Default" placeholder="Type here…" />
      <Input label="With value" defaultValue="rachel.lacroix@labster.io" />
      <Input
        label="Error"
        defaultValue="rachel.lacroix"
        errorMessage="Email format is incorrect — example: name@example.com"
      />
      <Input label="Disabled" defaultValue="Locked" disabled />
      <Input label="Read-only" defaultValue="LAB-2026-0042" readOnly />
    </div>
  ),
};
