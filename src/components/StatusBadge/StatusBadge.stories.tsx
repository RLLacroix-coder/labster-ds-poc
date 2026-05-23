import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "App UI/StatusBadge",
  component: StatusBadge,
  parameters: { layout: "centered" },
  argTypes: {
    status: { control: "select", options: ["running", "paused", "failed", "draft", "completed", "queued"] },
    appearance: { control: "radio", options: ["solid", "translucent"] },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Running: Story = { args: { status: "running" } };
export const Paused: Story = { args: { status: "paused" } };
export const Failed: Story = { args: { status: "failed" } };
export const Draft: Story = { args: { status: "draft" } };

export const AllStatuses: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <StatusBadge status="running" />
      <StatusBadge status="completed" />
      <StatusBadge status="paused" />
      <StatusBadge status="queued" />
      <StatusBadge status="draft" />
      <StatusBadge status="failed" />
    </div>
  ),
};

export const TranslucentOnGradient: Story = {
  name: "Translucent (overlay sur fond coloré)",
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        padding: 40,
        borderRadius: 16,
        background: "linear-gradient(135deg, #EF4C59, #AF52DE, #476AE3)",
        display: "flex",
        gap: 12,
      }}
    >
      <StatusBadge status="running" appearance="translucent" />
      <StatusBadge status="paused" appearance="translucent" />
      <StatusBadge status="failed" appearance="translucent" />
    </div>
  ),
};
