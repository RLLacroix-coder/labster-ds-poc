import type { Meta, StoryObj } from "@storybook/react";
import { RoleCard } from "./RoleCard";

const meta: Meta<typeof RoleCard> = {
  title: "Slide Blocks/RoleCard",
  component: RoleCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card descriptive d'un rôle projet : titre uppercase + phases impliquées (dots colorés) + description. " +
          "Convention : red=P1, blue=P2, yellow=P3 (alignée sur EffortGanttCard). " +
          "Source : Figma deck RFP fileKey 0akzw8mYzFByJcrrRgJbQp, nodeId 1:5154.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RoleCard>;

export const LeadDSDesigner: Story = {
  args: {
    title: "Lead DS Designer",
    phases: ["red", "blue", "yellow"],
    description:
      "Defines the design system strategy and architecture, leads the engagement, and acts as the main point of contact with stakeholders",
  },
  render: (args) => (
    <div style={{ width: 372 }}>
      <RoleCard {...args} />
    </div>
  ),
};

export const FrontEndDev: Story = {
  args: {
    title: "Front-end DS Dev",
    phases: ["blue", "yellow"],
    description:
      "Implements the design system components in code, ensures token alignment, and maintains the Storybook documentation",
  },
  render: (args) => (
    <div style={{ width: 372 }}>
      <RoleCard {...args} />
    </div>
  ),
};

export const PM: Story = {
  args: {
    title: "AI PM",
    phases: ["red"],
    description:
      "Frames the AI problem statement, defines success metrics, and ensures responsible AI compliance with EU AI Act",
  },
  render: (args) => (
    <div style={{ width: 372 }}>
      <RoleCard {...args} />
    </div>
  ),
};

export const NoPhases: Story = {
  args: {
    title: "Stakeholder",
    description: "Validates milestones and signs off on deliverables at each phase transition.",
  },
  render: (args) => (
    <div style={{ width: 372 }}>
      <RoleCard {...args} />
    </div>
  ),
};

export const TeamGrid: Story = {
  name: "Team grid (4 roles)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 372px)", gap: 24 }}>
      <RoleCard
        title="Lead DS Designer"
        phases={["red", "blue", "yellow"]}
        description="Defines the design system strategy and architecture, leads the engagement, and acts as the main point of contact with stakeholders"
      />
      <RoleCard
        title="DS Designer"
        phases={["blue", "yellow"]}
        description="Designs and documents components in Figma, ensures token and variant consistency across the library"
      />
      <RoleCard
        title="Front-end DS Dev"
        phases={["blue", "yellow"]}
        description="Implements the design system components in code, ensures token alignment, and maintains the Storybook documentation"
      />
      <RoleCard
        title="Tech Lead"
        phases={["red", "blue"]}
        description="Architects the code pipeline (tokens build, component packaging) and validates technical deliverables"
      />
    </div>
  ),
};
