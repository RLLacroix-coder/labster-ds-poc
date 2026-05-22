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
          "Labster DS Input — refondu V1 pour matcher le pattern Labster officiel " +
          "observé dans 01-Labster-Web-components (nodeId 2:2302). " +
          "Specs : bg neutral.smoke, border grey-1, radius md (8px), height 44px, " +
          "label Fieldwork Hum DemiBold 14px ls 1px grey-3, required asterisk rouge. " +
          "3 variants : input / dropdown / search. 2 colorModes : light / dark. " +
          "Extensions DS (créées par POC) : state=error, disabled, read-only.",
      },
    },
  },
  argTypes: {
    variant: { control: { type: "select" }, options: ["input", "dropdown", "search"] },
    colorMode: { control: { type: "select" }, options: ["light", "dark"] },
    size: { control: { type: "select" }, options: ["default", "small"] },
    label: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    required: { control: { type: "boolean" } },
    helperText: { control: { type: "text" } },
    errorMessage: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    readOnly: { control: { type: "boolean" } },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
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
    label: "Input title",
    placeholder: "Input text",
    required: true,
  },
};

// =============================================================================
// FIGMA REFERENCE — 8 variants exactly as in the master
// =============================================================================

export const InputLightDefault: Story = {
  name: "Input · Light · Default",
  args: { label: "Input title", placeholder: "Input text", required: true },
};

export const InputLightFocus: Story = {
  name: "Input · Light · Focus (autofocus)",
  args: {
    label: "Input title",
    placeholder: "Input text",
    required: true,
    autoFocus: true,
  },
};

export const InputDarkDefault: Story = {
  name: "Input · Dark · Default",
  args: {
    label: "Input title",
    placeholder: "Input text",
    required: true,
    colorMode: "dark",
  },
  parameters: { backgrounds: { default: "Dark (neutral.grey-6)" } },
};

export const InputDarkFocus: Story = {
  name: "Input · Dark · Focus (autofocus)",
  args: {
    label: "Input title",
    placeholder: "Input text",
    required: true,
    colorMode: "dark",
    autoFocus: true,
  },
  parameters: { backgrounds: { default: "Dark (neutral.grey-6)" } },
};

export const DropdownLightDefault: Story = {
  name: "Dropdown · Light · Default",
  args: {
    variant: "dropdown",
    label: "Input dropdown title",
    placeholder: "Input text",
    required: true,
  },
};

export const DropdownLightFocus: Story = {
  name: "Dropdown · Light · Focus",
  args: {
    variant: "dropdown",
    label: "Input dropdown title",
    placeholder: "Input text",
    required: true,
    autoFocus: true,
  },
};

export const SearchLightDefault: Story = {
  name: "Search · Light · Default",
  args: {
    variant: "search",
    label: "Input search title",
    placeholder: "Search Input",
    required: true,
  },
};

export const SearchLightFocus: Story = {
  name: "Search · Light · Focus",
  args: {
    variant: "search",
    label: "Input search title",
    placeholder: "Search text",
    required: true,
    autoFocus: true,
  },
};

// =============================================================================
// LABSTER EXTENSIONS (error / disabled / read-only)
// =============================================================================

export const ErrorState: Story = {
  args: {
    label: "Email",
    placeholder: "name@example.com",
    required: true,
    defaultValue: "rachel.lacroix",
    errorMessage: "Email format is incorrect — example: name@example.com",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled field",
    placeholder: "Locked",
    disabled: true,
    helperText: "Authentification required first.",
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
// MATRIX — all 8 Figma variants in one view
// =============================================================================

export const FigmaMatrix: Story = {
  name: "📐 Figma matrix (3 types × 2 colorModes × 2 states)",
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="p-8 font-labster space-y-8">
      <section>
        <h3 className="text-h5 text-neutral-grey-6 mb-4">Type = input</h3>
        <div className="grid grid-cols-2 gap-6">
          <Input label="Input title" placeholder="Input text" required />
          <Input
            label="Input title"
            placeholder="Input text"
            required
            autoFocus
          />
        </div>
      </section>

      <section className="bg-neutral-grey-6 p-6 rounded-md">
        <h3 className="text-h5 text-neutral-white mb-4">Type = input · Dark mode</h3>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Input title"
            placeholder="Input text"
            required
            colorMode="dark"
          />
          <Input
            label="Input title"
            placeholder="Input text"
            required
            colorMode="dark"
            autoFocus
          />
        </div>
      </section>

      <section>
        <h3 className="text-h5 text-neutral-grey-6 mb-4">Type = dropdown</h3>
        <div className="grid grid-cols-2 gap-6">
          <Input
            variant="dropdown"
            label="Input dropdown title"
            placeholder="Input text"
            required
          />
          <Input
            variant="dropdown"
            label="Input dropdown title"
            placeholder="Input text"
            required
            autoFocus
          />
        </div>
      </section>

      <section>
        <h3 className="text-h5 text-neutral-grey-6 mb-4">Type = search</h3>
        <div className="grid grid-cols-2 gap-6">
          <Input
            variant="search"
            label="Input search title"
            placeholder="Search Input"
            required
          />
          <Input
            variant="search"
            label="Input search title"
            placeholder="Search text"
            required
            autoFocus
          />
        </div>
      </section>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
