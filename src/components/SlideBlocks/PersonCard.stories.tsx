import type { Meta, StoryObj } from "@storybook/react";
import { PersonCard } from "./PersonCard";

const meta: Meta<typeof PersonCard> = {
  title: "Slide Blocks/PersonCard",
  component: PersonCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Portrait circulaire + nom + rôle, centré. Pattern slide observé sur 0akzw8mYzFByJcrrRgJbQp node 1:6446. " +
          "Générique : utilisable pour n'importe quel team member (à distinguer du `ManagerCard` brand kit qui est carré + registry des 4 co-fondateurs).",
      },
    },
  },
  argTypes: {
    size: { control: { type: "number", min: 100, max: 400, step: 12 } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PersonCard>;

export const RemyMeyer: Story = {
  args: {
    name: "Remy Meyer",
    role: "COO",
    photo: "/assets/managers/remy-meyer.png",
    size: 252,
  },
};

export const WithPhoto: Story = {
  args: {
    name: "Christophe Gras",
    role: "Founder",
    photo: "/assets/managers/christophe-gras.png",
    size: 252,
  },
};

export const Initials: Story = {
  name: "Initials fallback (no photo)",
  args: {
    name: "Rachel Lacroix",
    role: "(AI) PM / Business Analyst",
    size: 252,
  },
};

export const Small: Story = {
  args: {
    name: "Hélène Kosmalski",
    role: "DS Designer",
    size: 160,
  },
};

export const TeamRow: Story = {
  name: "Team row (5 people)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
      <PersonCard name="Rachel Lacroix" role="Lead AI PM" size={200} />
      <PersonCard
        name="Olivier Devillers"
        role="DS Lead"
        size={200}
      />
      <PersonCard
        name="Hélène Kosmalski"
        role="DS Designer"
        size={200}
      />
      <PersonCard name="Mickaël Deschodt" role="Front-end Dev" size={200} />
      <PersonCard
        name="Remy Meyer"
        role="COO"
        photo="/assets/managers/remy-meyer.png"
        size={200}
      />
    </div>
  ),
};
