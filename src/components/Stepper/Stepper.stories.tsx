import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "App UI/Stepper",
  component: Stepper,
  parameters: { layout: "padded" },
  argTypes: {
    current: { control: { type: "number", min: 0, max: 3 } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const STEPS = ["Identifiants", "Coordonnées", "Consentements", "Vérification"];

export const Step1: Story = {
  args: { steps: STEPS, current: 0 },
  render: (args) => (
    <div style={{ width: 720 }}>
      <Stepper {...args} />
    </div>
  ),
};

export const Step2: Story = {
  args: { steps: STEPS, current: 1 },
  render: (args) => (
    <div style={{ width: 720 }}>
      <Stepper {...args} />
    </div>
  ),
};

export const LastStep: Story = {
  args: { steps: STEPS, current: 3 },
  render: (args) => (
    <div style={{ width: 720 }}>
      <Stepper {...args} />
    </div>
  ),
};
