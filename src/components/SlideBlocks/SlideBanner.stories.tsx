import type { Meta, StoryObj } from "@storybook/react";
import { SlideBanner } from "./SlideBanner";

const meta: Meta<typeof SlideBanner> = {
  title: "Slide Blocks/SlideBanner",
  component: SlideBanner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Bandeau top de slide : chapter title uppercase à gauche (avec barre jaune accent) + Labster logo à droite. " +
          "À placer en haut d'une slide content (sauf cover et section divider). " +
          "Source : Figma deck RFP fileKey 0akzw8mYzFByJcrrRgJbQp, nodeId 1:1410.",
      },
    },
  },
  argTypes: {
    chapterTitle: { control: "text" },
    showLogo: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SlideBanner>;

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 1200, border: "1px dashed #E3E5E8" }}>{children}</div>
);

export const Default: Story = {
  args: { chapterTitle: "introduction", showLogo: true },
  render: (args) => (
    <Wrap>
      <SlideBanner {...args} />
    </Wrap>
  ),
};

export const ApproachMethodology: Story = {
  args: { chapterTitle: "approach & methodology", showLogo: true },
  render: (args) => (
    <Wrap>
      <SlideBanner {...args} />
    </Wrap>
  ),
};

export const NoLogo: Story = {
  args: { chapterTitle: "agenda", showLogo: false },
  render: (args) => (
    <Wrap>
      <SlideBanner {...args} />
    </Wrap>
  ),
};

export const NoChapterTitle: Story = {
  args: { showLogo: true },
  render: (args) => (
    <Wrap>
      <SlideBanner {...args} />
    </Wrap>
  ),
};
