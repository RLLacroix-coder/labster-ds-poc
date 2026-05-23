import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "App UI/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: { type: "select" }, options: [24, 32, 40, 48, 64, 80] },
    bgColor: { control: "select", options: ["blue", "red", "yellow", "purple", "grey", "smoke"] },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithPhoto: Story = {
  args: { src: "/assets/managers/christophe-gras.png", name: "Christophe Gras", size: 48 },
};

export const Initials: Story = {
  args: { name: "Rachel Lacroix", size: 48, bgColor: "purple" },
};

export const Sizes: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {[24, 32, 40, 48, 64, 80].map((s) => (
        <Avatar key={s} name="Rachel Lacroix" size={s as any} bgColor="blue" />
      ))}
    </div>
  ),
};

export const Colors: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Avatar name="Rachel Lacroix" bgColor="blue" />
      <Avatar name="Hélène Kosmalski" bgColor="red" />
      <Avatar name="Olivier Devillers" bgColor="yellow" />
      <Avatar name="Mickaël Deschodt" bgColor="purple" />
      <Avatar name="Yann Auxenfans" bgColor="grey" />
      <Avatar name="Alain Priser" bgColor="smoke" />
    </div>
  ),
};
