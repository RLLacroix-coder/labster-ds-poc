import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileChip } from "./UserProfileChip";

const meta: Meta<typeof UserProfileChip> = {
  title: "Slide Blocks/UserProfileChip",
  component: UserProfileChip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Chip horizontal compact pour identifier un membre d'équipe : avatar circle (initiales ou photo) + nom + rôle. " +
          "Pour usage dans listes de team, tableaux de staffing, références. " +
          "Source : Figma deck RFP fileKey 0akzw8mYzFByJcrrRgJbQp, nodeId 1:5842.",
      },
    },
  },
  argTypes: {
    avatarColor: { control: "select", options: ["red", "blue", "yellow", "purple", "grey"] },
  },
};

export default meta;
type Story = StoryObj<typeof UserProfileChip>;

export const Default: Story = {
  args: {
    name: "Mickaël Deschodt",
    role: "Front-end DS Developer / Pipeline, Lausanne",
    avatarColor: "red",
  },
};

export const Blue: Story = {
  args: {
    name: "Rachel Lacroix",
    role: "Lead AI PM / Senior Business Analyst",
    avatarColor: "blue",
  },
};

export const Purple: Story = {
  args: {
    name: "Hélène Kosmalski",
    role: "Design System Designer",
    avatarColor: "purple",
  },
};

export const NoRole: Story = {
  args: {
    name: "Olivier Devillers",
    avatarColor: "yellow",
  },
};

export const List: Story = {
  name: "List (team members)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}>
      <UserProfileChip name="Rachel Lacroix" role="(AI) PM / Business Analyst" avatarColor="purple" />
      <UserProfileChip name="Olivier Devillers" role="Lead Design System Expert" avatarColor="blue" />
      <UserProfileChip name="Hélène Kosmalski" role="Design System Designer" avatarColor="red" />
      <UserProfileChip name="Mickaël Deschodt" role="Front-end DS Developer / Pipeline, Lausanne" avatarColor="yellow" />
    </div>
  ),
};
