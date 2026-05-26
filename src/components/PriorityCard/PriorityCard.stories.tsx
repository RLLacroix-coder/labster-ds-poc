import type { Meta, StoryObj } from "@storybook/react";
import { PriorityCard } from "./PriorityCard";

const meta: Meta<typeof PriorityCard> = {
  title: "App UI/PriorityCard",
  component: PriorityCard,
  parameters: { layout: "padded" },
  argTypes: {
    tone: { control: "select", options: ["red", "blue", "yellow"] },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PriorityCard>;

export const DecisionUrgente: Story = {
  args: {
    category: "DÉCISION URGENTE",
    title: "Aurora Cosmetics — Mirror Configurator",
    reason: "Deadline UNESCO dans 2 semaines. Budget en attente de validation client.",
    deadline: "→ 2 semaines",
    tone: "red",
  },
  render: (args) => <div style={{ width: 540 }}><PriorityCard {...args} /></div>,
};

export const Renouvellement: Story = {
  args: {
    category: "RENOUVELLEMENT",
    title: "PixelForge Studios — Galaxy DS",
    reason: "Échéance contrat dans 3 semaines. Réunion de cadrage à planifier.",
    deadline: "→ 3 semaines",
    tone: "blue",
  },
  render: (args) => <div style={{ width: 540 }}><PriorityCard {...args} /></div>,
};

export const DealAPousser: Story = {
  args: {
    category: "DEAL À POUSSER",
    title: "GreenLeap Energy — Pulse Dashboard",
    reason: "Devis signé en attente. Relancer cette semaine pour kickoff.",
    deadline: "→ Cette semaine",
    tone: "yellow",
  },
  render: (args) => <div style={{ width: 540 }}><PriorityCard {...args} /></div>,
};

export const Row: Story = {
  name: "Row (2 cards as in Portefeuille)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 1100 }}>
      <PriorityCard
        category="DÉCISION URGENTE"
        title="Aurora Cosmetics — Mirror Configurator"
        reason="Deadline UNESCO dans 2 semaines. Budget en attente de validation client."
        deadline="→ 2 semaines"
        tone="red"
      />
      <PriorityCard
        category="RENOUVELLEMENT"
        title="PixelForge Studios — Galaxy DS"
        reason="Échéance contrat dans 3 semaines. Réunion de cadrage à planifier."
        deadline="→ 3 semaines"
        tone="blue"
      />
    </div>
  ),
};
