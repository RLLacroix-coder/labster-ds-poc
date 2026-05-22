import type { Meta, StoryObj } from "@storybook/react";
import { LabsterLogo } from "./LabsterLogo";

const meta: Meta<typeof LabsterLogo> = {
  title: "Brand/Labster Logo",
  component: LabsterLogo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Logo Labster — reproduction SVG inline du logo brand observé dans le brand kit " +
          "(00-Labster-Tokens, page Logo Labster nodeId 705:2220). " +
          "3 types (tagline / normal / symbol), 2 modes (light / dark), 5 colorVariants (3-colors / monochrome / red / blue / yellow). " +
          "⚠ Version POC SVG inline. Pour pixel-perfect, exporter depuis Figma et substituer.",
      },
    },
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["tagline", "normal", "symbol"],
    },
    mode: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
    colorVariant: {
      control: { type: "select" },
      options: ["3-colors", "monochrome", "red", "blue", "yellow"],
    },
    width: {
      control: { type: "number", min: 24, max: 600, step: 24 },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LabsterLogo>;

export const Playground: Story = {
  args: { type: "tagline", mode: "light", colorVariant: "3-colors" },
};

// =============================================================================
// PRIMARY VARIANTS (3-colors light)
// =============================================================================

export const Tagline3ColorsLight: Story = {
  name: "Tagline · 3 colors · Light",
  args: { type: "tagline", mode: "light", colorVariant: "3-colors" },
};

export const Normal3ColorsLight: Story = {
  name: "Normal · 3 colors · Light",
  args: { type: "normal", mode: "light", colorVariant: "3-colors" },
};

export const Symbol3ColorsLight: Story = {
  name: "Symbol · 3 colors · Light",
  args: { type: "symbol", mode: "light", colorVariant: "3-colors" },
};

// =============================================================================
// DARK MODE
// =============================================================================

export const TaglineMonochromeDark: Story = {
  name: "Tagline · Monochrome · Dark",
  args: { type: "tagline", mode: "dark", colorVariant: "monochrome" },
  parameters: {
    backgrounds: { default: "Dark (neutral.grey-6)" },
  },
};

export const Symbol3ColorsDark: Story = {
  name: "Symbol · 3 colors · Dark",
  args: { type: "symbol", mode: "dark", colorVariant: "3-colors" },
  parameters: {
    backgrounds: { default: "Dark (neutral.grey-6)" },
  },
};

// =============================================================================
// MONOCHROME COLOR VARIANTS
// =============================================================================

export const SymbolRed: Story = {
  args: { type: "symbol", colorVariant: "red" },
};

export const SymbolBlue: Story = {
  args: { type: "symbol", colorVariant: "blue" },
};

export const SymbolYellow: Story = {
  args: { type: "symbol", colorVariant: "yellow" },
};

// =============================================================================
// ALL VARIANTS MATRIX
// =============================================================================

export const AllVariants: Story = {
  render: () => (
    <div className="p-8 font-labster space-y-12">
      <section>
        <h3 className="text-h5 text-neutral-grey-6 mb-4">Tagline variants</h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-neutral-white p-6 rounded-md border border-neutral-grey-1">
            <p className="text-p-sm text-neutral-grey-3 mb-3">3-colors / Light</p>
            <LabsterLogo type="tagline" mode="light" colorVariant="3-colors" />
          </div>
          <div className="bg-neutral-grey-6 p-6 rounded-md">
            <p className="text-p-sm text-neutral-grey-2 mb-3">Monochrome / Dark</p>
            <LabsterLogo type="tagline" mode="dark" colorVariant="monochrome" />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-h5 text-neutral-grey-6 mb-4">Normal variants</h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-neutral-white p-6 rounded-md border border-neutral-grey-1">
            <p className="text-p-sm text-neutral-grey-3 mb-3">3-colors / Light</p>
            <LabsterLogo type="normal" mode="light" colorVariant="3-colors" />
          </div>
          <div className="bg-neutral-grey-6 p-6 rounded-md">
            <p className="text-p-sm text-neutral-grey-2 mb-3">Monochrome / Dark</p>
            <LabsterLogo type="normal" mode="dark" colorVariant="monochrome" />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-h5 text-neutral-grey-6 mb-4">Symbol variants</h3>
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-neutral-white p-4 rounded-md border border-neutral-grey-1 flex flex-col items-center gap-2">
            <LabsterLogo type="symbol" colorVariant="3-colors" />
            <p className="text-[10px] text-neutral-grey-3">3-colors</p>
          </div>
          <div className="bg-neutral-white p-4 rounded-md border border-neutral-grey-1 flex flex-col items-center gap-2">
            <LabsterLogo type="symbol" colorVariant="red" />
            <p className="text-[10px] text-neutral-grey-3">red</p>
          </div>
          <div className="bg-neutral-white p-4 rounded-md border border-neutral-grey-1 flex flex-col items-center gap-2">
            <LabsterLogo type="symbol" colorVariant="blue" />
            <p className="text-[10px] text-neutral-grey-3">blue</p>
          </div>
          <div className="bg-neutral-white p-4 rounded-md border border-neutral-grey-1 flex flex-col items-center gap-2">
            <LabsterLogo type="symbol" colorVariant="yellow" />
            <p className="text-[10px] text-neutral-grey-3">yellow</p>
          </div>
          <div className="bg-neutral-white p-4 rounded-md border border-neutral-grey-1 flex flex-col items-center gap-2">
            <LabsterLogo type="symbol" colorVariant="monochrome" mode="light" />
            <p className="text-[10px] text-neutral-grey-3">mono / light</p>
          </div>
          <div className="bg-neutral-grey-6 p-4 rounded-md flex flex-col items-center gap-2">
            <LabsterLogo type="symbol" colorVariant="monochrome" mode="dark" />
            <p className="text-[10px] text-neutral-grey-2">mono / dark</p>
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
