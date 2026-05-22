import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster DS Checkbox — 24×24 square, border 1px, radius 4. " +
          "Border default `neutral.grey-2`, border+check `semantic.action-primary` (Blue brand). " +
          "Optional label à droite avec gap 12px (Paragraph Small Fieldwork). " +
          "Source Figma : 01-Labster-Web-components nodeId 310:660 + 329:549.",
      },
    },
  },
  argTypes: {
    checked: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    error: { control: { type: "boolean" } },
    label: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  args: { checked: false, label: "Accept terms and conditions" },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

export const Unchecked: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Locked option" },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, label: "Locked + checked" },
};

export const ErrorState: Story = {
  args: {
    error: true,
    checked: false,
    label: "Required field — please check to continue",
  },
};

// =============================================================================
// WITH LABEL
// =============================================================================

export const WithLabel: Story = {
  args: { label: "I agree to the privacy policy" },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const WithoutLabel: Story = {
  args: {},
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

// =============================================================================
// USE CASE — Newsletter consent
// =============================================================================

export const NewsletterConsent: Story = {
  name: "Use case : newsletter consent",
  render: () => {
    const [newsletter, setNewsletter] = useState(false);
    const [terms, setTerms] = useState(false);
    return (
      <div className="flex flex-col gap-4 p-8 max-w-md font-labster">
        <Checkbox
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          label="Je souhaite recevoir la newsletter Labster (max 1 / mois)"
        />
        <Checkbox
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          label="J'accepte les conditions générales d'utilisation et la politique de confidentialité Labster"
          error={!terms && false}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pattern d'usage typique : checkboxes de consentement dans un formulaire d'inscription.",
      },
    },
  },
};

// =============================================================================
// ALL STATES
// =============================================================================

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8 font-labster">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked readOnly />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled + checked" disabled checked readOnly />
      <Checkbox label="Error state" error />
      <Checkbox label="Error + checked" error checked readOnly />
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
