import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "../Button";
import { useState } from "react";

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster DS Card — molecule MVP V1.0. Source : components/Card.design.md + Card.metadata.ts. " +
          "Replaces Dialog as the primary composition molecule. " +
          "5 variants (default/interactive/with-actions/selectable/elevated), 3 sizes (Small/Medium/Large). " +
          "Pattern de référence : labster.io service cards (with-actions, Medium, Button variant=link).",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "interactive", "with-actions", "selectable", "elevated"],
    },
    size: {
      control: { type: "select" },
      options: ["Small", "Medium", "Large"],
    },
    title: { control: { type: "text" } },
    subtitle: { control: { type: "text" } },
    selected: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

// =============================================================================
// PLAYGROUND
// =============================================================================

export const Playground: Story = {
  args: {
    variant: "default",
    size: "Medium",
    subtitle: "Service",
    title: "Digital Product Design",
    children:
      "We design AI-augmented user experiences that reduce friction and reveal insights.",
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    title: "Annual report 2026",
    children:
      "A static block of content. No actions. Used for plain info display.",
  },
};

export const Interactive: Story = {
  args: {
    variant: "interactive",
    title: "Insights dashboard",
    children:
      "Clickable card. Hover applies elevation + grey-2 border. Full surface is clickable.",
    onClick: () => alert("Card clicked"),
  },
};

export const WithActions: Story = {
  args: {
    variant: "with-actions",
    subtitle: "Service",
    title: "Digital Product Design",
    children:
      "We design AI-augmented user experiences that reduce friction and reveal insights.",
    actions: (
      <Button variant="link" size="Small">
        En savoir plus →
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Labster.io service card pattern : variant=with-actions, size=Medium, Button variant=link with arrow.",
      },
    },
  },
};

export const Selectable: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return (
      <Card
        {...args}
        selected={selected}
        onClick={() => setSelected(!selected)}
      />
    );
  },
  args: {
    variant: "selectable",
    title: "Pro plan",
    subtitle: "Recommended",
    children:
      "Best for teams of 5 to 50. Click to select. Border becomes 2px Action Primary when selected.",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    title: "Featured content",
    children:
      "Permanent shadow (elevation.small). Used for hero cards, marketing, dashboard alerts.",
  },
};

// =============================================================================
// SIZES
// =============================================================================

export const SizeSmall: Story = {
  args: {
    size: "Small",
    title: "Compact",
    children: "280px max width, padding 16px. For dense grids.",
  },
};

export const SizeMedium: Story = {
  args: {
    size: "Medium",
    title: "Default",
    children: "400px max width, padding 24px. Default for service cards.",
  },
};

export const SizeLarge: Story = {
  args: {
    size: "Large",
    title: "Hero",
    subtitle: "Featured",
    children:
      "560px max width, padding 32px. Used for hero cards and featured content. " +
      "Plus de place pour développer le message principal et y ajouter des actions.",
  },
};

// =============================================================================
// PATTERN — Labster service cards (homepage)
// =============================================================================

export const LabsterServiceCards: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-8 bg-neutral-smoke min-h-[600px]">
      <Card
        variant="with-actions"
        size="Medium"
        subtitle="Service"
        title="Digital Product Design"
        actions={
          <Button variant="link" size="Small">
            En savoir plus →
          </Button>
        }
      >
        Co-concevoir des solutions digitales avec vos utilisateurs métier.
      </Card>
      <Card
        variant="with-actions"
        size="Medium"
        subtitle="Service"
        title="Software Engineering"
        actions={
          <Button variant="link" size="Small">
            En savoir plus →
          </Button>
        }
      >
        Augmenter la productivité de vos équipes de développement avec l'IA.
      </Card>
      <Card
        variant="with-actions"
        size="Medium"
        subtitle="Service"
        title="Healthcare Consulting"
        actions={
          <Button variant="link" size="Small">
            En savoir plus →
          </Button>
        }
      >
        Accompagner les projets IA sensibles en santé suisse (Lean Explainability).
      </Card>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, iframeHeight: 700 },
      description: {
        story:
          "Pattern observed on labster.io homepage : 3-4 service cards in a horizontal row. " +
          "Variant=with-actions, Size=Medium, subtitle 'Service', Button variant=link. " +
          "💡 Astuce : passe en mode Canvas pour voir le pattern en pleine page.",
      },
    },
  },
};

// =============================================================================
// ALL VARIANTS MATRIX
// =============================================================================

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-8">
      <Card title="default" subtitle="Variant">
        Static block. No interactivity.
      </Card>
      <Card variant="interactive" title="interactive" subtitle="Variant">
        Clickable. Hover applies shadow.
      </Card>
      <Card
        variant="with-actions"
        title="with-actions"
        subtitle="Variant"
        actions={
          <>
            <Button variant="secondary" size="Small">Cancel</Button>
            <Button variant="primary" size="Small">Confirm</Button>
          </>
        }
      >
        Card with 1-2 action buttons.
      </Card>
      <Card variant="selectable" title="selectable" subtitle="Variant" selected>
        Selected state shown.
      </Card>
      <Card variant="elevated" title="elevated" subtitle="Variant">
        Permanent shadow (elevation.small).
      </Card>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
