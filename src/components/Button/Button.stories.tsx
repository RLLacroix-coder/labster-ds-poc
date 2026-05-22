import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster DS Button. Source : components/Button.design.md + components/Button.metadata.ts. " +
          "6 variants (primary, secondary, ghost, danger, accent-cta, link), 5 sizes (Giant/Large/Medium/Small/Tiny), " +
          "5 states (default/hover/focus/press/disabled), icon-only boolean.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "ghost", "danger", "accent-cta", "link"],
      description: "Visual variant. accent-cta is brand red as POSITIVE CTA on dark bg (pill); danger is brand red as NEGATIVE state.",
    },
    size: {
      control: { type: "select" },
      options: ["Giant", "Large", "Medium", "Small", "Tiny"],
    },
    iconOnly: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    children: {
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

// =============================================================================
// MATRIX STORIES — playground + variant per variant
// =============================================================================

export const Playground: Story = {
  args: {
    variant: "primary",
    size: "Medium",
    children: "Button",
  },
};

export const Primary: Story = {
  args: { variant: "primary", children: "Save changes" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Cancel" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Edit" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Delete account" },
};

export const AccentCta: Story = {
  args: { variant: "accent-cta", children: "Envoyer" },
  parameters: {
    backgrounds: { default: "Dark (neutral.grey-6)" },
    docs: {
      description: {
        story:
          "Brand red as POSITIVE CTA on dark backgrounds. Pattern Labster.io contact form 'Envoyer'. Pill radius, generous padding.",
      },
    },
  },
};

export const Link: Story = {
  args: { variant: "link", children: "Forgot password?" },
};

// =============================================================================
// MATRIX — all variants × sizes (visual reference)
// =============================================================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex gap-3 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="bg-neutral-grey-6 p-6 rounded-md">
        <Button variant="accent-cta">Envoyer (accent-cta on dark)</Button>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-start p-8">
      <Button size="Giant" variant="primary">Giant button</Button>
      <Button size="Large" variant="primary">Large button</Button>
      <Button size="Medium" variant="primary">Medium button</Button>
      <Button size="Small" variant="primary">Small button</Button>
      <Button size="Tiny" variant="primary">Tiny button</Button>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex gap-3 p-8">
      <Button variant="primary">Default</Button>
      <Button variant="primary" className="hover:bg-semantic-action-primary-hover bg-semantic-action-primary-hover">Hover (forced)</Button>
      <Button variant="primary" disabled>Disabled</Button>
      <Button variant="primary" loading>Loading</Button>
    </div>
  ),
};
