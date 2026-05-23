import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterTabs } from "./FilterTabs";

const meta: Meta<typeof FilterTabs> = {
  title: "App UI/FilterTabs",
  component: FilterTabs,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FilterTabs>;

const ITEMS = [
  { value: "all", label: "All" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "support", label: "Support" },
  { value: "operations", label: "Operations" },
  { value: "productivity", label: "Productivity" },
];

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState("all");
    return <FilterTabs items={ITEMS} value={val} onChange={setVal} />;
  },
};

export const WithCounts: Story = {
  render: () => {
    const [val, setVal] = useState("sales");
    return (
      <FilterTabs
        items={[
          { value: "all", label: "All", count: 24 },
          { value: "sales", label: "Sales", count: 8 },
          { value: "marketing", label: "Marketing", count: 6 },
          { value: "support", label: "Support", count: 4 },
          { value: "operations", label: "Operations", count: 3 },
          { value: "productivity", label: "Productivity", count: 3 },
        ]}
        value={val}
        onChange={setVal}
      />
    );
  },
};

export const Small: Story = {
  render: () => {
    const [val, setVal] = useState("all");
    return <FilterTabs items={ITEMS} value={val} onChange={setVal} size="sm" />;
  },
};
