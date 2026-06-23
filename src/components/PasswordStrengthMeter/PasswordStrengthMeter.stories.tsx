import type { Meta, StoryObj } from "@storybook/react";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const meta: Meta<typeof PasswordStrengthMeter> = {
  title: "Atoms/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  parameters: { layout: "padded" },
  argTypes: {
    score: { control: { type: "range", min: 0, max: 4, step: 1 } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PasswordStrengthMeter>;

const REQS = "12 caractères, 1 majuscule, 1 chiffre, 1 spécial";

export const Strong: Story = {
  args: { score: 4, requirementsText: REQS },
  render: (args) => (
    <div style={{ width: 380 }}>
      <PasswordStrengthMeter {...args} />
    </div>
  ),
};

export const Medium: Story = {
  args: { score: 2, requirementsText: REQS },
  render: (args) => (
    <div style={{ width: 380 }}>
      <PasswordStrengthMeter {...args} />
    </div>
  ),
};

export const Weak: Story = {
  args: { score: 1, requirementsText: REQS },
  render: (args) => (
    <div style={{ width: 380 }}>
      <PasswordStrengthMeter {...args} />
    </div>
  ),
};
