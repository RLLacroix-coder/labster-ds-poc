import type { Meta, StoryObj } from "@storybook/react";
import { CapacityBar } from "./CapacityBar";

const meta: Meta<typeof CapacityBar> = {
  title: "App UI/CapacityBar",
  component: CapacityBar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CapacityBar>;

export const Normal: Story = {
  args: { name: "Sam Rivière", bgColor: "blue", percentage: 70 },
  render: (args) => <div style={{ width: 480 }}><CapacityBar {...args} /></div>,
};

export const Alert: Story = {
  args: { name: "Alex Mercier", bgColor: "purple", percentage: 100 },
  render: (args) => <div style={{ width: 480 }}><CapacityBar {...args} /></div>,
};

export const Low: Story = {
  args: { name: "Jules Vanetti", bgColor: "red", percentage: 35 },
  render: (args) => <div style={{ width: 480 }}><CapacityBar {...args} /></div>,
};

export const TeamWidget: Story = {
  name: "Team widget (6 members, 2 cols)",
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        background: "white",
        border: "1px solid #E3E5E8",
        borderRadius: 16,
        padding: 24,
        maxWidth: 1080,
      }}
    >
      <p style={{ fontSize: 13, color: "#707F8F", marginBottom: 16, fontFamily: "Fieldwork, Inter" }}>
        7 personnes — moyenne 85% utilisée cette semaine
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 32px" }}>
        <CapacityBar name="Alex Mercier" bgColor="purple" percentage={100} />
        <CapacityBar name="Sam Rivière" bgColor="blue" percentage={70} />
        <CapacityBar name="Jules Vanetti" bgColor="red" percentage={60} />
        <CapacityBar name="Iris Lambert" bgColor="red" percentage={90} />
        <CapacityBar name="Théo Gallet" bgColor="yellow" percentage={85} />
        <CapacityBar name="Maya Roussel" bgColor="yellow" percentage={75} />
      </div>
    </div>
  ),
};
