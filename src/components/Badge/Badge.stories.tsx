import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { Icon } from "../Icon";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster DS Badge — pill-shaped status indicator. Pattern observé dans le brand kit pour les statuts de validation (En cours, En attente, Validé, Terminé). " +
          "6 variants sémantiques (info, success, warning, pending, danger, neutral), 3 sizes (Small / Medium / Large). " +
          "⚠ semantic.success (#4ECCA3) est une valeur estimée — à confirmer avec brand kit Labster.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "pending", "danger", "neutral"],
    },
    size: {
      control: { type: "select" },
      options: ["Small", "Medium", "Large"],
    },
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: { variant: "info", size: "Medium", children: "Terminé" },
};

// =============================================================================
// LABSTER STATUS BADGES (pattern observed on the brand kit)
// =============================================================================

export const LabsterStatuses: Story = {
  name: "🏷 Labster status badges (pattern observed)",
  render: () => (
    <div className="flex flex-col items-start gap-4 p-8 font-labster bg-neutral-smoke">
      <Badge variant="warning" size="Large">
        En cours
      </Badge>
      <Badge variant="pending" size="Large">
        En attente de validation
      </Badge>
      <Badge variant="success" size="Large">
        Validé
      </Badge>
      <Badge variant="info" size="Large">
        Terminé
      </Badge>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Pattern observé dans le brand kit Labster pour les statuts de validation. " +
          "Reproduction directe : variants pill, sizes Large, libellés français.",
      },
    },
  },
};

// =============================================================================
// VARIANTS INDIVIDUELS
// =============================================================================

export const Info: Story = {
  args: { variant: "info", children: "Terminé" },
};

export const Success: Story = {
  args: { variant: "success", children: "Validé" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "En cours" },
};

export const Pending: Story = {
  args: { variant: "pending", children: "En attente" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Échec" },
};

export const Neutral: Story = {
  args: { variant: "neutral", children: "Inconnu" },
};

// =============================================================================
// SIZES
// =============================================================================

export const SizesShowcase: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-8 font-labster">
      <Badge variant="info" size="Small">
        Small
      </Badge>
      <Badge variant="info" size="Medium">
        Medium (default)
      </Badge>
      <Badge variant="info" size="Large">
        Large
      </Badge>
    </div>
  ),
};

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3 p-8 font-labster">
      <Badge variant="success" size="Medium" icon={<Icon name="check" size={16} />}>
        Validé
      </Badge>
      <Badge
        variant="warning"
        size="Medium"
        icon={<Icon name="alert-circle" size={16} />}
      >
        Attention requise
      </Badge>
      <Badge
        variant="danger"
        size="Medium"
        icon={<Icon name="close" size={16} />}
      >
        Échec
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Composition Badge + Icon (Labster Icon component).",
      },
    },
  },
};

// =============================================================================
// ALL VARIANTS MATRIX
// =============================================================================

export const AllVariantsMatrix: Story = {
  render: () => (
    <div className="p-8 font-labster space-y-6">
      <h3 className="text-h5 text-neutral-grey-6 mb-4">All variants × sizes</h3>
      {(["Small", "Medium", "Large"] as const).map((size) => (
        <div key={size} className="space-y-2">
          <p className="text-p-sm text-neutral-grey-3">{size}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="info" size={size}>
              Info
            </Badge>
            <Badge variant="success" size={size}>
              Success
            </Badge>
            <Badge variant="warning" size={size}>
              Warning
            </Badge>
            <Badge variant="pending" size={size}>
              Pending
            </Badge>
            <Badge variant="danger" size={size}>
              Danger
            </Badge>
            <Badge variant="neutral" size={size}>
              Neutral
            </Badge>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
