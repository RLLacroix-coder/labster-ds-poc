import type { Meta, StoryObj } from "@storybook/react";
import { PhoneInput } from "./PhoneInput";

const meta: Meta<typeof PhoneInput> = {
  title: "Molecules/PhoneInput",
  component: PhoneInput,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  args: { label: "Téléphone", required: true, defaultValue: "78 123 45 67" },
  render: (args) => (
    <div style={{ width: 380 }}>
      <PhoneInput {...args} />
    </div>
  ),
};

export const WithHelper: Story = {
  args: {
    label: "Téléphone",
    required: true,
    helperText: "Format suisse, 9 chiffres après l'indicatif.",
  },
  render: (args) => (
    <div style={{ width: 380 }}>
      <PhoneInput {...args} />
    </div>
  ),
};

export const ErrorState: Story = {
  name: "Error",
  args: {
    label: "Téléphone",
    required: true,
    defaultValue: "12 34",
    errorMessage: "Numéro suisse invalide (9 chiffres attendus).",
  },
  render: (args) => (
    <div style={{ width: 380 }}>
      <PhoneInput {...args} />
    </div>
  ),
};
