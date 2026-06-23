import type { Meta, StoryObj } from "@storybook/react";
import { DateInput } from "./DateInput";

const meta: Meta<typeof DateInput> = {
  title: "Molecules/DateInput",
  component: DateInput,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  args: {
    label: "Date de naissance",
    required: true,
    helperText: "Vous devez être majeur·e (18 ans).",
    defaultValue: "31 / 12 / 1990",
  },
  render: (args) => (
    <div style={{ width: 380 }}>
      <DateInput {...args} />
    </div>
  ),
};

export const Empty: Story = {
  args: { label: "Date de naissance", required: true },
  render: (args) => (
    <div style={{ width: 380 }}>
      <DateInput {...args} />
    </div>
  ),
};

export const ErrorState: Story = {
  name: "Error",
  args: {
    label: "Date de naissance",
    required: true,
    defaultValue: "01 / 01 / 2015",
    errorMessage: "Vous devez avoir au moins 18 ans.",
  },
  render: (args) => (
    <div style={{ width: 380 }}>
      <DateInput {...args} />
    </div>
  ),
};
