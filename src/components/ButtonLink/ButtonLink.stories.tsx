import type { Meta, StoryObj } from "@storybook/react";
import { ButtonLink } from "./ButtonLink";

const meta: Meta<typeof ButtonLink> = {
  title: "Atoms/ButtonLink",
  component: ButtonLink,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster DS ButtonLink — pattern Labster spécifique observé dans le brand kit. " +
          "Texte Fieldwork Geo Demibold + underline accent rouge animé (24px → 100% au hover). " +
          "Différent du Button variant=link générique. Source Figma : 01-Labster-Web-components nodeId 305:1509.",
      },
    },
  },
  argTypes: {
    children: { control: { type: "text" } },
    active: { control: { type: "boolean" } },
    href: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonLink>;

export const Playground: Story = {
  args: {
    children: "Talents Sourcing",
    href: "#talents-sourcing",
    active: false,
  },
};

// =============================================================================
// REFERENCE — replicates the Figma side-by-side master
// =============================================================================

export const BothVariants: Story = {
  name: "📐 Both variants (Figma reference)",
  render: () => (
    <div className="flex items-start gap-16 p-12 bg-neutral-grey-1/30 border-2 border-dashed border-[#9b7bff] rounded-md font-labster">
      <ButtonLink href="#" active={false}>
        Talents Sourcing
      </ButtonLink>
      <ButtonLink href="#" active>
        Talents Sourcing
      </ButtonLink>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Reproduction directe du Figma master (nodeId 305:1509) : 2 variants côte-à-côte. " +
          "Gauche = default (text grey-4, bar accent-cta 24px). " +
          "Droite = active (text grey-6, bar accent-cta 100% width).",
      },
    },
  },
};

export const Default: Story = {
  args: { children: "Talents Sourcing", href: "#" },
};

export const Active: Story = {
  args: { children: "Talents Sourcing", href: "#", active: true },
  parameters: {
    docs: {
      description: {
        story:
          "État active : l'underline est étendu à 100% width. Utilisé pour indiquer la page active dans un menu portfolio.",
      },
    },
  },
};

export const HoverInstruction: Story = {
  name: "Hover (try it)",
  render: () => (
    <div className="p-8 flex flex-col gap-6 font-labster">
      <p className="text-p-sm text-neutral-grey-3">
        💡 Survole les liens — l'underline rouge s'étend à 100% width.
      </p>
      <ButtonLink href="#">Talents Sourcing</ButtonLink>
      <ButtonLink href="#">Digital Product Design</ButtonLink>
      <ButtonLink href="#">Healthcare Consulting</ButtonLink>
    </div>
  ),
};

export const MultipleLinks: Story = {
  name: "Multiple links (portfolio menu pattern)",
  render: () => (
    <div className="p-8 flex flex-col gap-6 font-labster">
      <ButtonLink href="#" active>
        Talents Sourcing
      </ButtonLink>
      <ButtonLink href="#">Digital Product Design</ButtonLink>
      <ButtonLink href="#">Software Engineering</ButtonLink>
      <ButtonLink href="#">Healthcare Consulting</ButtonLink>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pattern : menu de portfolio avec lien actif (Talents Sourcing) + 3 autres en default.",
      },
    },
  },
};
