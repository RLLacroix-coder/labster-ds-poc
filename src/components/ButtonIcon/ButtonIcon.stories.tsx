import type { Meta, StoryObj } from "@storybook/react";
import { ButtonIcon } from "./ButtonIcon";
import { Icon } from "../Icon";

const meta: Meta<typeof ButtonIcon> = {
  title: "Atoms/ButtonIcon",
  component: ButtonIcon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster DS ButtonIcon — bouton circulaire icon-only 44×44 (pill radius 100px). " +
          "Source Figma : 01-Labster-Web-components nodeId 306:1566 (Component Set 6 variants). " +
          "2 variants (primary/secondary) × 2 colorModes (light/dark) — Primary fonctionne sur les 2 modes (rouge accent-cta visible partout). " +
          "Pattern d'usage : Floating Action Button, scroll buttons, actions secondaires icon-only. " +
          "⚠ ariaLabel est REQUIRED (pas de texte visible).",
      },
    },
  },
  argTypes: {
    variant: { control: { type: "select" }, options: ["primary", "secondary"] },
    colorMode: { control: { type: "select" }, options: ["light", "dark"] },
    ariaLabel: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

// =============================================================================
// PLAYGROUND
// =============================================================================

export const Playground: Story = {
  args: {
    variant: "primary",
    colorMode: "light",
    ariaLabel: "Add new item",
    children: <Icon name="plus" size={20} />,
  },
};

// =============================================================================
// FIGMA REFERENCE — 6 variants of the Component Set
// =============================================================================

export const PrimaryLight: Story = {
  name: "Primary · Light · Default",
  args: {
    variant: "primary",
    colorMode: "light",
    ariaLabel: "Add",
    children: <Icon name="plus" size={20} />,
  },
};

export const SecondaryLight: Story = {
  name: "Secondary · Light · Default",
  args: {
    variant: "secondary",
    colorMode: "light",
    ariaLabel: "Search",
    children: <Icon name="search" size={20} />,
  },
};

export const SecondaryDark: Story = {
  name: "Secondary · Dark · Default",
  args: {
    variant: "secondary",
    colorMode: "dark",
    ariaLabel: "Close",
    children: <Icon name="close" size={20} />,
  },
  parameters: {
    backgrounds: { default: "Dark (neutral.grey-6)" },
  },
};

// =============================================================================
// FIGMA MATRIX
// =============================================================================

export const FigmaMatrix: Story = {
  name: "📐 Figma matrix (6 variants)",
  render: () => (
    <div className="p-8 font-labster space-y-8">
      <section>
        <h3 className="text-h5 text-neutral-grey-6 mb-4">Primary (works on both backgrounds)</h3>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ButtonIcon variant="primary" colorMode="light" ariaLabel="Plus">
              <Icon name="plus" size={20} />
            </ButtonIcon>
            <span className="text-[10px] text-neutral-grey-3">primary default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ButtonIcon
              variant="primary"
              colorMode="light"
              ariaLabel="Plus"
              className="!bg-semantic-accent-cta-hover"
            >
              <Icon name="plus" size={20} />
            </ButtonIcon>
            <span className="text-[10px] text-neutral-grey-3">primary hover (forced)</span>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-h5 text-neutral-grey-6 mb-4">Secondary · Light</h3>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ButtonIcon variant="secondary" colorMode="light" ariaLabel="Plus">
              <Icon name="plus" size={20} />
            </ButtonIcon>
            <span className="text-[10px] text-neutral-grey-3">secondary light default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ButtonIcon
              variant="secondary"
              colorMode="light"
              ariaLabel="Plus"
              className="!bg-neutral-smoke !border-neutral-grey-2"
            >
              <Icon name="plus" size={20} />
            </ButtonIcon>
            <span className="text-[10px] text-neutral-grey-3">secondary light hover</span>
          </div>
        </div>
      </section>

      <section className="bg-neutral-grey-6 p-6 rounded-md">
        <h3 className="text-h5 text-white mb-4">Secondary · Dark</h3>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ButtonIcon variant="secondary" colorMode="dark" ariaLabel="Plus">
              <Icon name="plus" size={20} />
            </ButtonIcon>
            <span className="text-[10px] text-neutral-grey-2">secondary dark default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ButtonIcon
              variant="secondary"
              colorMode="dark"
              ariaLabel="Plus"
              className="!bg-white/10 !border-white/50 !text-white"
            >
              <Icon name="plus" size={20} />
            </ButtonIcon>
            <span className="text-[10px] text-neutral-grey-2">secondary dark hover</span>
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

// =============================================================================
// USE CASES
// =============================================================================

export const FloatingActionButton: Story = {
  name: "Use case : Floating Action Button",
  render: () => (
    <div className="relative w-[400px] h-[300px] bg-neutral-smoke rounded-md flex items-end justify-end p-6 font-labster">
      <ButtonIcon variant="primary" ariaLabel="Create new item">
        <Icon name="plus" size={20} />
      </ButtonIcon>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pattern Floating Action Button (FAB) : ButtonIcon variant=primary en bottom-right d'une zone.",
      },
    },
  },
};

export const IconChoiceShowcase: Story = {
  name: "Different icons (plus, search, mail, edit, close, attach…)",
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-8 font-labster">
      <ButtonIcon variant="primary" ariaLabel="Add">
        <Icon name="plus" size={20} />
      </ButtonIcon>
      <ButtonIcon variant="primary" ariaLabel="Send">
        <Icon name="arrow-right" size={20} />
      </ButtonIcon>
      <ButtonIcon variant="secondary" ariaLabel="Search">
        <Icon name="search" size={20} />
      </ButtonIcon>
      <ButtonIcon variant="secondary" ariaLabel="Mail">
        <Icon name="mail" size={20} />
      </ButtonIcon>
      <ButtonIcon variant="secondary" ariaLabel="Edit">
        <Icon name="edit" size={20} />
      </ButtonIcon>
      <ButtonIcon variant="secondary" ariaLabel="Close">
        <Icon name="close" size={20} />
      </ButtonIcon>
      <ButtonIcon variant="secondary" ariaLabel="Attach">
        <Icon name="attach" size={20} />
      </ButtonIcon>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    ariaLabel: "Add (disabled)",
    disabled: true,
    children: <Icon name="plus" size={20} />,
  },
};
