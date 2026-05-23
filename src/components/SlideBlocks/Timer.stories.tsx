import type { Meta, StoryObj } from "@storybook/react";
import { Timer } from "./Timer";

const meta: Meta<typeof Timer> = {
  title: "Slide Blocks/Timer",
  component: Timer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Indicateur de durée circulaire (cercle blanc + icon clock + valeur + unité). " +
          "Source : Figma deck RFP fileKey 0akzw8mYzFByJcrrRgJbQp, nodeId 7:1833 (large) et 7:1816 (small).",
      },
    },
  },
  argTypes: {
    color: { control: "select", options: ["red", "blue", "yellow", "green"] },
    size: { control: { type: "number", min: 60, max: 400, step: 12 } },
    showIcon: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Timer>;

export const Default: Story = {
  args: { value: 15, unit: "min.", size: 193, showIcon: true, color: "red" },
};

export const Small: Story = {
  args: { value: 10, unit: "min.", size: 110, showIcon: false, color: "red" },
};

export const BlueLong: Story = {
  args: { value: 45, unit: "min.", size: 193, showIcon: true, color: "blue" },
};

export const Yellow: Story = {
  args: { value: "1h", unit: "30", size: 193, showIcon: true, color: "yellow" },
};

export const Row: Story = {
  name: "Sizes (small / medium / large)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <Timer value={5} size={80} showIcon={false} color="yellow" />
      <Timer value={10} size={110} showIcon={false} color="red" />
      <Timer value={15} size={193} showIcon color="red" />
      <Timer value={30} size={280} showIcon color="blue" />
    </div>
  ),
};
