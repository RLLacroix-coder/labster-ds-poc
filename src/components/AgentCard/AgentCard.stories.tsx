import type { Meta, StoryObj } from "@storybook/react";
import { AgentCard, AGENT_CARD_TONES } from "./AgentCard";

const meta: Meta<typeof AgentCard> = {
  title: "App UI/AgentCard",
  component: AgentCard,
  parameters: { layout: "padded" },
  argTypes: {
    tone: { control: "select", options: AGENT_CARD_TONES },
    status: { control: "select", options: ["running", "paused", "failed", "draft", "completed", "queued"] },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AgentCard>;

export const LeadQualificationBot: Story = {
  args: {
    name: "Lead Qualification Bot",
    description: "Automatically qualifies incoming leads from Intercom and routes to sales.",
    meta: [
      { label: "Created", value: "May 5, 2026" },
      { label: "Total runs", value: "23,500" },
    ],
    status: "running",
    tone: "red-purple",
  },
  render: (args) => <div style={{ width: 320 }}><AgentCard {...args} /></div>,
};

export const Paused: Story = {
  args: {
    name: "CRM Sync Agent",
    description: "Keeps your CRM updated with the latest prospect interactions.",
    meta: [
      { label: "Created", value: "May 5, 2026" },
      { label: "Total runs", value: "12,300" },
    ],
    status: "paused",
    tone: "blue-cyan",
  },
  render: (args) => <div style={{ width: 320 }}><AgentCard {...args} /></div>,
};

export const AllTones: Story = {
  name: "All gradient tones",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 1400 }}>
      {AGENT_CARD_TONES.map((tone) => (
        <AgentCard
          key={tone}
          tone={tone}
          name={tone}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          meta={[
            { label: "Created", value: "May 5, 2026" },
            { label: "Total runs", value: "23,500" },
          ]}
          status="running"
        />
      ))}
    </div>
  ),
};
