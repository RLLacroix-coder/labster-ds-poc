import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./PageHeader";
import { Avatar } from "../Avatar";
import { Button } from "../Button";

const meta: Meta<typeof PageHeader> = {
  title: "App UI/PageHeader",
  component: PageHeader,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: "My agents",
    actions: <Avatar name="Rachel Lacroix" size={40} bgColor="purple" />,
  },
};

export const WithSubtitleAndCTA: Story = {
  args: {
    title: "AI Agents",
    subtitle: "Manage your team's AI agents and their workflows",
    actions: (
      <>
        <Button variant="primary">Create new agent</Button>
        <Avatar name="Rachel Lacroix" size={40} bgColor="purple" />
      </>
    ),
  },
};
