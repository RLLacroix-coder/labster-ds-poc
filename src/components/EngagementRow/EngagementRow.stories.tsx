import type { Meta, StoryObj } from "@storybook/react";
import { EngagementRow } from "./EngagementRow";
import { FloatingShape } from "../Icon/FloatingShape";

const meta: Meta<typeof EngagementRow> = {
  title: "App UI/EngagementRow",
  component: EngagementRow,
  parameters: { layout: "padded" },
  argTypes: {
    tone: { control: "select", options: ["red", "blue", "yellow"] },
    status: {
      control: "select",
      options: ["running", "paused", "failed", "draft", "completed", "queued"],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EngagementRow>;

const TEAM_3 = [
  { name: "Alex Mercier", bgColor: "blue" as const },
  { name: "Sam Rivière", bgColor: "red" as const },
  { name: "Jules Vanetti", bgColor: "yellow" as const },
];

const TEAM_4 = [
  ...TEAM_3,
  { name: "Iris Lambert", bgColor: "purple" as const },
];

export const Discovery: Story = {
  args: {
    client: "Crystal Pharma SA",
    project: "Genesis Portal",
    tone: "blue",
    icon: <FloatingShape shape="triangle-up" color="blue" size={20} />,
    status: "running",
    statusLabel: "En cours",
    team: TEAM_3,
    metric: "Kickoff 12 juin",
  },
  render: (args) => <div style={{ width: 1080 }}><EngagementRow {...args} /></div>,
};

export const Delivery: Story = {
  args: {
    client: "NovaTrust Insurance",
    project: "Atlas Claims",
    tone: "red",
    icon: <FloatingShape shape="diamond" color="red" size={20} />,
    status: "running",
    statusLabel: "En cours",
    team: TEAM_4,
    metric: "180 / 240h",
  },
  render: (args) => <div style={{ width: 1080 }}><EngagementRow {...args} /></div>,
};

export const AtRisk: Story = {
  args: {
    client: "Aurora Cosmetics",
    project: "Mirror Configurator",
    tone: "yellow",
    icon: <FloatingShape shape="circle" color="yellow" size={20} />,
    status: "failed",
    statusLabel: "À risque",
    team: [{ name: "Léa Kaufmann", bgColor: "blue" }],
    metric: "2 sem deadline",
  },
  render: (args) => <div style={{ width: 1080 }}><EngagementRow {...args} /></div>,
};

export const List: Story = {
  name: "List (4 rows as in Portefeuille)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 1080 }}>
      <EngagementRow
        client="Crystal Pharma SA"
        project="Genesis Portal"
        tone="blue"
        icon={<FloatingShape shape="triangle-up" color="blue" size={20} />}
        status="running"
        statusLabel="En cours"
        team={TEAM_3}
        metric="Kickoff 12 juin"
      />
      <EngagementRow
        client="NovaTrust Insurance"
        project="Atlas Claims"
        tone="red"
        icon={<FloatingShape shape="diamond" color="red" size={20} />}
        status="running"
        statusLabel="En cours"
        team={TEAM_4}
        metric="180 / 240h"
      />
      <EngagementRow
        client="Aurora Cosmetics"
        project="Mirror Configurator"
        tone="yellow"
        icon={<FloatingShape shape="circle" color="yellow" size={20} />}
        status="failed"
        statusLabel="À risque"
        team={[{ name: "Léa Kaufmann", bgColor: "blue" }]}
        metric="2 sem deadline"
      />
      <EngagementRow
        client="PixelForge Studios"
        project="Galaxy DS"
        tone="yellow"
        icon={<FloatingShape shape="square-outline" color="yellow" size={20} />}
        status="queued"
        statusLabel="Renouvellement"
        team={[{ name: "Alex Mercier", bgColor: "blue" }]}
        metric="3 sem échéance"
      />
    </div>
  ),
};
