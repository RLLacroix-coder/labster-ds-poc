import type { Meta, StoryObj } from "@storybook/react";
import { SlideParagraph } from "./SlideParagraph";

const meta: Meta<typeof SlideParagraph> = {
  title: "Slide Blocks/SlideParagraph",
  component: SlideParagraph,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Paragraphe formaté pour slides : lead bold + body regular, typographie 24px grey-5. " +
          "Source : Figma deck RFP fileKey 0akzw8mYzFByJcrrRgJbQp, nodeId 7:1917.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SlideParagraph>;

export const LeadAndBody: Story = {
  args: {
    lead: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    body: "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    size: "md",
  },
  render: (args) => <div style={{ maxWidth: 700 }}><SlideParagraph {...args} /></div>,
};

export const BodyOnly: Story = {
  args: {
    body: "Cette session vise à aligner l'équipe sur la roadmap design system des 3 prochains trimestres. Apporter ses inputs préalables aide à structurer la discussion.",
    size: "md",
  },
  render: (args) => <div style={{ maxWidth: 700 }}><SlideParagraph {...args} /></div>,
};

export const Small: Story = {
  args: {
    lead: "Note méthodologique :",
    body: "les chiffres ci-dessus proviennent d'un audit interne mené en mai 2026 sur l'ensemble des Maisons.",
    size: "sm",
  },
  render: (args) => <div style={{ maxWidth: 700 }}><SlideParagraph {...args} /></div>,
};

export const Large: Story = {
  args: {
    lead: "Un design system est avant tout un produit",
    body: "— il faut le mesurer, l'évolutionner et le supporter comme tel.",
    size: "lg",
  },
  render: (args) => <div style={{ maxWidth: 900 }}><SlideParagraph {...args} /></div>,
};

export const Stacked: Story = {
  name: "2 paragraphes empilés (gap 32)",
  render: () => (
    <div style={{ maxWidth: 700, display: "flex", flexDirection: "column", gap: 32 }}>
      <SlideParagraph
        lead="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
        body="tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <SlideParagraph
        lead="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        body=", sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </div>
  ),
};
