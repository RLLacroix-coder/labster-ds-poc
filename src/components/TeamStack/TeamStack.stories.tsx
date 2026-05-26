import type { Meta, StoryObj } from "@storybook/react";
import { TeamStack } from "./TeamStack";

const meta: Meta<typeof TeamStack> = {
  title: "App UI/TeamStack",
  component: TeamStack,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TeamStack>;

const TEAM_3 = [
  { name: "Alex Mercier", bgColor: "blue" as const },
  { name: "Sam Rivière", bgColor: "red" as const },
  { name: "Jules Vanetti", bgColor: "yellow" as const },
];

const TEAM_5 = [
  ...TEAM_3,
  { name: "Iris Lambert", bgColor: "purple" as const },
  { name: "Théo Gallet", bgColor: "grey" as const },
];

export const Default: Story = { args: { members: TEAM_3 } };
export const WithOverflow: Story = { args: { members: TEAM_5 } };
export const SinglePerson: Story = { args: { members: [TEAM_3[0]] } };
export const LargeSize: Story = { args: { members: TEAM_5, size: 48 } };
export const SmallSize: Story = { args: { members: TEAM_5, size: 24, maxVisible: 4 } };
