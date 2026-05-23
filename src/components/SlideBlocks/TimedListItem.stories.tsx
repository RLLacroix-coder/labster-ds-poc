import type { Meta, StoryObj } from "@storybook/react";
import { TimedListItem } from "./TimedListItem";

const meta: Meta<typeof TimedListItem> = {
  title: "Slide Blocks/TimedListItem",
  component: TimedListItem,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Ligne d'agenda time-boxed : bullet numérique + titre + description + Timer compact à droite. " +
          "Pattern workshop/sprint ceremony pacing. " +
          "Source : Figma deck RFP fileKey 0akzw8mYzFByJcrrRgJbQp, nodeId 7:1810.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TimedListItem>;

export const Default: Story = {
  args: {
    number: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    durationValue: 10,
    durationUnit: "min.",
  },
  render: (args) => <div style={{ width: 1019 }}><TimedListItem {...args} /></div>,
};

export const ShortItem: Story = {
  args: {
    number: 2,
    title: "Brise-glace : présentations rapides",
    durationValue: 5,
    durationUnit: "min.",
  },
  render: (args) => <div style={{ width: 1019 }}><TimedListItem {...args} /></div>,
};

export const NoTimer: Story = {
  args: {
    number: 3,
    title: "Q&A ouvert avec les participants",
    description: "Les participants posent leurs questions sur la méthodologie présentée.",
  },
  render: (args) => <div style={{ width: 1019 }}><TimedListItem {...args} /></div>,
};

export const WorkshopAgenda: Story = {
  name: "Workshop agenda (4 steps)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, width: 1019 }}>
      <TimedListItem
        number={1}
        title="Présentation du contexte projet"
        description="Rappel des objectifs, du périmètre et des contraintes identifiées en phase d'audit."
        durationValue={15}
        durationUnit="min."
      />
      <TimedListItem
        number={2}
        title="Atelier collaboratif : cartographie des composants"
        description="Travail en sous-groupes pour identifier les composants critiques à prioriser."
        durationValue={45}
        durationUnit="min."
        bulletColor="blue"
        timerColor="blue"
      />
      <TimedListItem
        number={3}
        title="Restitution et discussion plénière"
        description="Chaque groupe présente ses conclusions, débat sur les priorisations divergentes."
        durationValue={30}
        durationUnit="min."
        bulletColor="yellow"
        timerColor="yellow"
      />
      <TimedListItem
        number={4}
        title="Prochaines étapes & engagements"
        description="Définition des actions, propriétaires et deadlines pour la phase suivante."
        durationValue={10}
        durationUnit="min."
        bulletColor="green"
        timerColor="green"
      />
    </div>
  ),
};
