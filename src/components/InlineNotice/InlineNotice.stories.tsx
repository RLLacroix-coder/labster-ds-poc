import type { Meta, StoryObj } from "@storybook/react";
import { InlineNotice } from "./InlineNotice";

const meta: Meta<typeof InlineNotice> = {
  title: "Molecules/InlineNotice",
  component: InlineNotice,
  parameters: { layout: "padded" },
  argTypes: {
    tone: { control: "select", options: ["info", "warning", "danger", "success"] },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InlineNotice>;

export const DraftResume: Story = {
  name: "Reprise de brouillon (info)",
  args: {
    tone: "info",
    title: "Reprise d'inscription",
    children: "Vos informations précédentes ont été restaurées (sauf le mot de passe).",
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <InlineNotice {...args} />
    </div>
  ),
};

export const NlpdConsent: Story = {
  name: "Note nLPD (warning)",
  args: {
    tone: "warning",
    children:
      "Cases non pré-cochées — consentement explicite et granulaire (art. 6 nLPD).",
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <InlineNotice {...args} />
    </div>
  ),
};

export const OtpExpired: Story = {
  name: "Code expiré (danger)",
  args: {
    tone: "danger",
    title: "Code expiré",
    children: "Le code de vérification a expiré. Demandez-en un nouveau.",
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <InlineNotice {...args} />
    </div>
  ),
};
