import type { Meta, StoryObj } from "@storybook/react";
import { EffortGanttCard } from "./EffortGanttCard";

const meta: Meta<typeof EffortGanttCard> = {
  title: "Slide Blocks/EffortGanttCard",
  component: EffortGanttCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card workload / allocation : avatar + nom + rôle + N lignes bar chart (par phase). " +
          "Utile pour staffing slides, prévision d'effort, suivi de capacity. " +
          "Source : Figma deck RFP fileKey 0akzw8mYzFByJcrrRgJbQp, nodeId 1:6124.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EffortGanttCard>;

export const Default: Story = {
  args: {
    name: "Rachel Lacroix",
    role: "(AI) PM / Business Analyst",
    avatarColor: "purple",
    bars: [
      { label: "P1", days: 10, color: "red" },
      { label: "P2", days: 10, color: "blue" },
      { label: "P3", days: 5, color: "yellow" },
    ],
  },
};

export const FrontEnd: Story = {
  args: {
    name: "Mickaël Deschodt",
    role: "Front-end DS Developer",
    avatarColor: "red",
    bars: [
      { label: "P1", days: 4, color: "red" },
      { label: "P2", days: 15, color: "blue" },
      { label: "P3", days: 12, color: "yellow" },
    ],
  },
};

export const TwoPhases: Story = {
  args: {
    name: "Olivier Devillers",
    role: "DS Lead",
    avatarColor: "blue",
    bars: [
      { label: "P1", days: 12, color: "red" },
      { label: "P2", days: 8, color: "blue" },
    ],
  },
};

export const TeamView: Story = {
  name: "Team view (4 members)",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
      <EffortGanttCard
        name="Rachel Lacroix"
        role="(AI) PM / Business Analyst"
        avatarColor="purple"
        bars={[
          { label: "P1", days: 10, color: "red" },
          { label: "P2", days: 10, color: "blue" },
          { label: "P3", days: 5, color: "yellow" },
        ]}
      />
      <EffortGanttCard
        name="Olivier Devillers"
        role="DS Lead"
        avatarColor="blue"
        bars={[
          { label: "P1", days: 12, color: "red" },
          { label: "P2", days: 15, color: "blue" },
          { label: "P3", days: 8, color: "yellow" },
        ]}
      />
      <EffortGanttCard
        name="Hélène Kosmalski"
        role="DS Designer"
        avatarColor="red"
        bars={[
          { label: "P1", days: 6, color: "red" },
          { label: "P2", days: 14, color: "blue" },
          { label: "P3", days: 10, color: "yellow" },
        ]}
      />
      <EffortGanttCard
        name="Mickaël Deschodt"
        role="Front-end DS Dev"
        avatarColor="yellow"
        bars={[
          { label: "P1", days: 4, color: "red" },
          { label: "P2", days: 18, color: "blue" },
          { label: "P3", days: 12, color: "yellow" },
        ]}
      />
    </div>
  ),
};
