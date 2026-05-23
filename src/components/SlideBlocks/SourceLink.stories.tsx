import type { Meta, StoryObj } from "@storybook/react";
import { SourceLink } from "./SourceLink";

const meta: Meta<typeof SourceLink> = {
  title: "Slide Blocks/SourceLink",
  component: SourceLink,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Bouton-pill jaune avec icon chain-link + texte souligné. Lien vers une source externe " +
          "(Notion, Drive, doc, étude). À placer en bas de slide pour citer une source. " +
          "Source : Figma deck RFP fileKey 0akzw8mYzFByJcrrRgJbQp, nodeId 7:1917.",
      },
    },
  },
  argTypes: {
    bgColor: { control: "select", options: ["yellow", "blue-light", "red-light"] },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SourceLink>;

export const Default: Story = {
  args: {
    label: "Lien vers le document source",
    href: "https://example.com",
  },
};

export const NotionDoc: Story = {
  args: {
    label: "Voir la doc Notion complète",
    href: "https://www.notion.so/example",
  },
};

export const BlueVariant: Story = {
  args: {
    label: "Source : étude Forrester 2026",
    href: "https://www.forrester.com",
    bgColor: "blue-light",
  },
};

export const RedVariant: Story = {
  args: {
    label: "Référence interne (accès restreint)",
    href: "https://internal.example.com",
    bgColor: "red-light",
  },
};

export const ParagraphWithSource: Story = {
  name: "Pattern complet (paragraphe + source link)",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ maxWidth: 700, display: "flex", flexDirection: "column", gap: 32 }}>
      <p className="font-labster text-[24px] leading-[1.35] tracking-[-0.24px] text-neutral-grey-5">
        <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</strong> tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </p>
      <p className="font-labster text-[24px] leading-[1.35] tracking-[-0.24px] text-neutral-grey-5">
        <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit</strong>, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam.
      </p>
      <SourceLink label="Lien vers le document source" href="https://example.com" />
    </div>
  ),
};
