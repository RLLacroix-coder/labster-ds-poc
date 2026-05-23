import type { Meta, StoryObj } from "@storybook/react";
import { KpiCard } from "./KpiCard";

const meta: Meta<typeof KpiCard> = {
  title: "App UI/KpiCard",
  component: KpiCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KpiCard>;

export const Active: Story = {
  args: { value: 5, label: "Active" },
  render: (args) => <div style={{ width: 320 }}><KpiCard {...args} /></div>,
};

export const TotalRuns: Story = {
  args: { value: "7,534", label: "Total runs", trend: "+12% vs last week" },
  render: (args) => <div style={{ width: 320 }}><KpiCard {...args} /></div>,
};

export const Row: Story = {
  name: "Dashboard KPI row",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1200 }}>
      <KpiCard value={5} label="Active" />
      <KpiCard value={3} label="Paused" />
      <KpiCard value="7,534" label="Total runs" trend="+12%" />
    </div>
  ),
};
