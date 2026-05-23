import type { Meta, StoryObj } from "@storybook/react";
import { LabsterShape } from "./LabsterShape";

const meta: Meta<typeof LabsterShape> = {
  title: "Brand/Labster Shape",
  component: LabsterShape,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Les 3 shapes constitutives du logo Labster — Design (rouge), Dev (bleu), Talents (jaune). " +
          "Représentent les 3 piliers métier Labster. Utilisables seules comme gros accents brand. " +
          "Source : Figma `00-Labster-Tokens`, page LABSTER LOGO section LOGO SHAPES (nodeId 705:2222). " +
          "Assets dans `public/assets/shapes/`.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["design", "dev", "talents"] },
    width: { control: { type: "number", min: 24, max: 600, step: 12 } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LabsterShape>;

export const Design: Story = { args: { variant: "design", width: 120 } };
export const Dev: Story = { args: { variant: "dev", width: 120 } };
export const Talents: Story = { args: { variant: "talents", width: 120 } };

export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <LabsterShape variant="design" width={120} />
        <span style={{ fontSize: 14, color: "#465B72" }}>Design</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <LabsterShape variant="dev" width={120} />
        <span style={{ fontSize: 14, color: "#465B72" }}>Dev</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <LabsterShape variant="talents" width={120} />
        <span style={{ fontSize: 14, color: "#465B72" }}>Talents</span>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  name: "Sizes (40 / 80 / 160 / 280)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 40, alignItems: "flex-end" }}>
      {[40, 80, 160, 280].map((w) => (
        <LabsterShape key={w} variant="talents" width={w} />
      ))}
    </div>
  ),
};
