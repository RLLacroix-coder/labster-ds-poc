import type { Meta, StoryObj } from "@storybook/react";
import { AgentCard } from "./AgentCard";
import { FloatingShape, type FloatingShapeColor } from "../Icon/FloatingShape";

const meta: Meta<typeof AgentCard> = {
  title: "App UI/AgentCard",
  component: AgentCard,
  parameters: { layout: "padded" },
  argTypes: {
    tone: { control: "select", options: ["red", "blue", "yellow"] },
    status: { control: "select", options: ["running", "paused", "failed", "draft", "completed", "queued"] },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AgentCard>;

const PictoSlot = ({ color }: { color: FloatingShapeColor }) => (
  <div
    className="grid size-12 place-items-center rounded-xl"
    style={{ backgroundColor: { red: "#FCD9D9", blue: "#D6DFFF", yellow: "#FFECB8" }[color] }}
  >
    <FloatingShape shape="plus" color={color} size={24} />
  </div>
);

export const LeadQualificationBot: Story = {
  args: {
    name: "Lead Qualification Bot",
    description: "Automatically qualifies incoming leads from Intercom and routes them to the right sales rep.",
    tone: "red",
    icon: <PictoSlot color="red" />,
    meta: [
      { label: "Created", value: "May 5, 2026" },
      { label: "Total runs", value: "23,500" },
    ],
    status: "running",
  },
  render: (args) => <div style={{ width: 320 }}><AgentCard {...args} /></div>,
};

export const Paused: Story = {
  args: {
    name: "CRM Sync Agent",
    description: "Keeps your CRM updated with the latest prospect interactions.",
    tone: "blue",
    icon: <PictoSlot color="blue" />,
    meta: [
      { label: "Created", value: "May 5, 2026" },
      { label: "Total runs", value: "12,300" },
    ],
    status: "paused",
  },
  render: (args) => <div style={{ width: 320 }}><AgentCard {...args} /></div>,
};

export const Yellow: Story = {
  args: {
    name: "Email Outreach Agent",
    description: "Sends personalised follow-up emails based on prospect behaviour.",
    tone: "yellow",
    icon: <PictoSlot color="yellow" />,
    meta: [
      { label: "Created", value: "May 5, 2026" },
      { label: "Total runs", value: "8,200" },
    ],
    status: "queued",
  },
  render: (args) => <div style={{ width: 320 }}><AgentCard {...args} /></div>,
};

export const AllTones: Story = {
  name: "All 3 brand tones",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1200 }}>
      <AgentCard
        name="Lead Qualification Bot"
        description="Qualifies leads from Intercom."
        tone="red"
        icon={<PictoSlot color="red" />}
        meta={[{ label: "Created", value: "May 5" }, { label: "Runs", value: "23,500" }]}
        status="running"
      />
      <AgentCard
        name="CRM Sync Agent"
        description="Syncs prospect data with the CRM."
        tone="blue"
        icon={<PictoSlot color="blue" />}
        meta={[{ label: "Created", value: "May 5" }, { label: "Runs", value: "12,300" }]}
        status="running"
      />
      <AgentCard
        name="Email Outreach Agent"
        description="Sends personalised follow-up emails."
        tone="yellow"
        icon={<PictoSlot color="yellow" />}
        meta={[{ label: "Created", value: "May 5" }, { label: "Runs", value: "8,200" }]}
        status="queued"
      />
    </div>
  ),
};
