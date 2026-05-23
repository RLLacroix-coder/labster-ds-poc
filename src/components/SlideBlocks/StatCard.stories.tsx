import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "./StatCard";
import { FloatingShape, type FloatingShapeColor, type FloatingShapeType } from "../Icon/FloatingShape";

const PictoSlot = ({ shape, color }: { shape: FloatingShapeType; color: FloatingShapeColor }) => (
  <div
    className="grid size-[60px] place-items-center rounded-[12px]"
    style={{ backgroundColor: { red: "#FCD9D9", blue: "#D6DFFF", yellow: "#FFECB8" }[color] }}
  >
    <FloatingShape shape={shape} color={color} size={32} />
  </div>
);

const meta: Meta<typeof StatCard> = {
  title: "Slide Blocks/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card KPI compacte : picto + chiffre + label + texte d'appoint. " +
          "Background blanc rounded-[10px] shadow elevation-large. " +
          "Source : Figma deck RFP fileKey 0akzw8mYzFByJcrrRgJbQp, nodeId 1:1420.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const TeamMembers: Story = {
  args: {
    stat: "20+",
    label: "Team Members",
    supportingText: "Designers, Business Analysts, Developers,...",
    icon: <PictoSlot shape="dot" color="blue" />,
  },
  render: (args) => <div style={{ width: 286 }}><StatCard {...args} /></div>,
};

export const Years: Story = {
  args: {
    stat: "8+",
    label: "Years",
    supportingText: "of UX/UI design expertise in Switzerland.",
    icon: <PictoSlot shape="circle" color="red" />,
  },
  render: (args) => <div style={{ width: 286 }}><StatCard {...args} /></div>,
};

export const Projects: Story = {
  args: {
    stat: "35+",
    label: "Modules redesigned",
    supportingText: "for HUG over 7 years of partnership.",
    icon: <PictoSlot shape="diamond" color="yellow" />,
  },
  render: (args) => <div style={{ width: 286 }}><StatCard {...args} /></div>,
};

export const MinimalRed: Story = {
  name: "Minimal · red accent",
  args: {
    variant: "minimal",
    accentColor: "red",
    stat: "150+",
    supportingText: "Reusable components in production",
  },
  render: (args) => <div style={{ width: 260 }}><StatCard {...args} /></div>,
};

export const MinimalBlue: Story = {
  name: "Minimal · blue accent",
  args: {
    variant: "minimal",
    accentColor: "blue",
    stat: "95%",
    supportingText: "Token adoption across all Maisons",
  },
  render: (args) => <div style={{ width: 260 }}><StatCard {...args} /></div>,
};

export const MinimalYellow: Story = {
  name: "Minimal · yellow accent",
  args: {
    variant: "minimal",
    accentColor: "yellow",
    stat: "200+",
    supportingText: "Design-to-dev handoffs per quarter",
  },
  render: (args) => <div style={{ width: 260 }}><StatCard {...args} /></div>,
};

export const MinimalRow: Story = {
  name: "Minimal · grid of 4",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ width: 260 }}>
        <StatCard variant="minimal" accentColor="red" stat="150+" supportingText="Reusable components in production" />
      </div>
      <div style={{ width: 260 }}>
        <StatCard variant="minimal" accentColor="blue" stat="95%" supportingText="Token adoption across all Maisons" />
      </div>
      <div style={{ width: 260 }}>
        <StatCard variant="minimal" accentColor="yellow" stat="200+" supportingText="Design-to-dev handoffs per quarter" />
      </div>
      <div style={{ width: 260 }}>
        <StatCard variant="minimal" accentColor="green" stat="3" supportingText="Phases delivered on time" />
      </div>
    </div>
  ),
};

export const Row: Story = {
  name: "Default · grid of 3 (as seen in slide)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ width: 286 }}>
        <StatCard
          stat="20+"
          label="Team Members"
          supportingText="Designers, Business Analysts, Developers,..."
          icon={<PictoSlot shape="dot" color="blue" />}
        />
      </div>
      <div style={{ width: 286 }}>
        <StatCard
          stat="8+"
          label="Years"
          supportingText="of UX/UI design expertise in Switzerland."
          icon={<PictoSlot shape="circle" color="red" />}
        />
      </div>
      <div style={{ width: 286 }}>
        <StatCard
          stat="35+"
          label="Modules redesigned"
          supportingText="for HUG over 7 years of partnership."
          icon={<PictoSlot shape="diamond" color="yellow" />}
        />
      </div>
    </div>
  ),
};
