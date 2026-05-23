import type { Meta, StoryObj } from "@storybook/react";
import { InsightCard } from "./InsightCard";
import { Icon } from "../Icon";

const meta: Meta<typeof InsightCard> = {
  title: "Slide Blocks/InsightCard",
  component: InsightCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card \"Proof points / Insight\" : icon trust + titre + corps texte. " +
          "2 layouts : `bullets` (proof points, blue dot) ou `quote` (insight, quoted text rouge). " +
          "Padding 30px, rounded-[10px], shadow 0 8px 12px rgba(0,46,70,0.1). " +
          "Sources Figma : `bullets` node 1:1466, `quote` node 1:3036.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InsightCard>;

export const ProofPoints: Story = {
  args: {
    icon: <Icon name="verified" width={40} height={40} style={{ color: "#476AE3" }} />,
    title: "Proof points",
    dotColor: "blue",
    items: [
      {
        content: (
          <>
            We have worked with the HUG for over seven years, with 4 consultants full-time, contributing to the{" "}
            <strong>redesign of more than 35+ modules of their clinical information system</strong>, with a design system
            now actively used across the organisation.
          </>
        ),
      },
      {
        content:
          "We are referenced by more than 5 large accounts in Romandy for UX/UI expertise won through public tenders.",
      },
    ],
  },
  render: (args) => (
    <div style={{ width: 900 }}>
      <InsightCard {...args} />
    </div>
  ),
};

export const Insight: Story = {
  args: {
    icon: <Icon name="verified" width={40} height={40} style={{ color: "#EF4C59" }} />,
    title: "Insight",
    titleColor: "grey-3",
    layout: "quote",
    quoteColor: "red",
    items: [
      { content: "This audit reveals where the system breaks and what prevents it from scaling" },
    ],
  },
  render: (args) => (
    <div style={{ width: 580 }}>
      <InsightCard {...args} />
    </div>
  ),
};

export const InsightBlue: Story = {
  name: "Insight (blue accent)",
  args: {
    icon: <Icon name="verified" width={40} height={40} style={{ color: "#476AE3" }} />,
    title: "Insight",
    titleColor: "grey-3",
    layout: "quote",
    quoteColor: "blue",
    items: [
      { content: "A scalable DS is one that survives a team rotation without losing its alignment." },
    ],
  },
  render: (args) => (
    <div style={{ width: 580 }}>
      <InsightCard {...args} />
    </div>
  ),
};
