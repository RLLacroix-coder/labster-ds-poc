import type { Meta, StoryObj } from "@storybook/react";
import { DeliverableCard } from "./DeliverableCard";
import { FloatingShape, type FloatingShapeColor, type FloatingShapeType } from "../Icon/FloatingShape";

const PictoSlot = ({ shape, color }: { shape: FloatingShapeType; color: FloatingShapeColor }) => (
  <div
    className="grid size-[60px] place-items-center rounded-[12px]"
    style={{ backgroundColor: { red: "#FCD9D9", blue: "#D6DFFF", yellow: "#FFECB8" }[color] }}
  >
    <FloatingShape shape={shape} color={color} size={32} />
  </div>
);

const meta: Meta<typeof DeliverableCard> = {
  title: "Slide Blocks/DeliverableCard",
  component: DeliverableCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card pour livrables / output phase : picto + titre highlighté + bullets. " +
          "Highlight rectangle (red-light/blue-light/yellow-light) derrière le titre. " +
          "Source : Figma deck RFP fileKey 0akzw8mYzFByJcrrRgJbQp, nodeId 1:3132.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeliverableCard>;

export const Deliverables: Story = {
  args: {
    icon: <PictoSlot shape="square" color="red" />,
    title: "Deliverables",
    highlightColor: "red-light",
    dotColor: "red",
    items: [
      { content: "Structured audit report covering tokens, components, D2D alignment, governance" },
      { content: "Prioritised remediation and enhancement plan, validated by Richemont before build begins" },
    ],
  },
  render: (args) => (
    <div style={{ width: 540 }}>
      <DeliverableCard {...args} />
    </div>
  ),
};

export const Output: Story = {
  args: {
    icon: <PictoSlot shape="diamond" color="blue" />,
    title: "Output",
    highlightColor: "blue-light",
    dotColor: "blue",
    items: [
      { content: "Multi-brand consolidation roadmap with prioritised milestones." },
      { content: "Foundation library aligned across all Maisons." },
    ],
  },
  render: (args) => (
    <div style={{ width: 540 }}>
      <DeliverableCard {...args} />
    </div>
  ),
};

export const NoHighlight: Story = {
  args: {
    icon: <PictoSlot shape="circle" color="yellow" />,
    title: "Outcome",
    highlightColor: "none",
    dotColor: "yellow",
    items: [
      { content: "Stakeholder alignment on metrics and definition of success." },
    ],
  },
  render: (args) => (
    <div style={{ width: 540 }}>
      <DeliverableCard {...args} />
    </div>
  ),
};
