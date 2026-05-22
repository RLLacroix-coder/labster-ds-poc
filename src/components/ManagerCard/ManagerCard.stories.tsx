import type { Meta, StoryObj } from "@storybook/react";
import { ManagerCard, MANAGER_SLUGS } from "./ManagerCard";

const meta: Meta<typeof ManagerCard> = {
  title: "Molecules/ManagerCard",
  component: ManagerCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster DS ManagerCard — portrait + nom (+ rôle) des 4 managers Labster. " +
          "Source Figma : 01-Labster-Web-components page Web components — " +
          "Managers/Christophe Gras (2:2247), Alain Priser (2:2249), Remy Meyer (2:2251), Yann Auxenfans (2:2253). " +
          "Dimensions Figma : 260×259 px (portrait quasi-carré). " +
          "Auto-fallback initiales si la photo n'est pas dans /public/assets/managers/.",
      },
    },
  },
  argTypes: {
    manager: {
      control: { type: "select" },
      options: ["", ...MANAGER_SLUGS],
    },
    width: { control: { type: "number", min: 120, max: 400, step: 20 } },
    name: { control: { type: "text" } },
    role: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ManagerCard>;

export const Playground: Story = {
  args: { manager: "christophe-gras", width: 260 },
};

// =============================================================================
// 4 MANAGERS LABSTER
// =============================================================================

export const ChristopheGras: Story = {
  args: { manager: "christophe-gras" },
};

export const AlainPriser: Story = {
  args: { manager: "alain-priser" },
};

export const RemyMeyer: Story = {
  args: { manager: "remy-meyer" },
};

export const YannAuxenfans: Story = {
  args: { manager: "yann-auxenfans" },
};

// =============================================================================
// CUSTOM (non-Labster manager)
// =============================================================================

export const CustomManager: Story = {
  name: "Custom (without registry)",
  args: {
    name: "Jane Smith",
    role: "Senior UX Designer",
    width: 260,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Le composant accepte aussi des props directs (name, role, photo) sans utiliser le registry. " +
          "Utile pour des cards manager non-Labster (clients, partenaires). Pas de photo → fallback initiales.",
      },
    },
  },
};

// =============================================================================
// TEAM PATTERN — 4 managers in a row
// =============================================================================

export const LabsterTeamRow: Story = {
  name: "👥 Labster team row (4 managers)",
  render: () => (
    <div className="p-12 bg-neutral-smoke font-labster">
      <h2 className="text-h4 text-neutral-grey-6 mb-2">L'équipe Labster</h2>
      <p className="text-p-md text-neutral-grey-4 mb-8">
        Une équipe pluridisciplinaire à votre écoute.
      </p>
      <div className="flex gap-8 flex-wrap">
        {MANAGER_SLUGS.map((slug) => (
          <ManagerCard key={slug} manager={slug} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Pattern observé sur labster.io page Team : 4 managers Labster en ligne avec leur portrait + nom + rôle.",
      },
    },
  },
};

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const SizesShowcase: Story = {
  name: "Size variants (160 / 200 / 260)",
  render: () => (
    <div className="flex gap-8 items-start p-8 font-labster">
      <ManagerCard manager="christophe-gras" width={160} />
      <ManagerCard manager="christophe-gras" width={200} />
      <ManagerCard manager="christophe-gras" width={260} />
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

// =============================================================================
// EXPORT PROCESS DOC
// =============================================================================

export const ExportProcessDoc: Story = {
  name: "📋 Process d'export des photos depuis Figma",
  render: () => (
    <div className="p-8 font-labster max-w-3xl">
      <h2 className="text-h4 text-neutral-grey-6 mb-4">
        Export des portraits managers depuis Figma
      </h2>
      <p className="text-p-md text-neutral-grey-4 mb-6">
        Les photos des managers Labster sont dans les masters Figma comme
        images embarquées. Process pour activer le rendu réel :
      </p>

      <ol className="space-y-4 text-p-sm text-neutral-grey-4 list-decimal list-inside mb-8">
        <li>
          <strong className="text-neutral-grey-6">Ouvrir Figma</strong> — fichier{" "}
          <code className="text-link bg-neutral-smoke px-2 py-1 rounded">
            01-Labster-Web-components
          </code>
          .
        </li>
        <li>
          <strong className="text-neutral-grey-6">Sélectionner</strong> le master
          manager (ex : <code>Managers/Christophe Gras</code>, nodeId 2:2247).
        </li>
        <li>
          <strong className="text-neutral-grey-6">Export</strong> — panneau droit
          → Export → format <code>PNG @2x</code> (recommandé pour photos
          haute-déf) ou <code>SVG</code> si possible.
        </li>
        <li>
          <strong className="text-neutral-grey-6">Renommer</strong> en{" "}
          <code>&lt;slug&gt;.png</code> :
          <ul className="ml-6 mt-2 space-y-1 list-disc">
            <li>
              <code>christophe-gras.png</code>
            </li>
            <li>
              <code>alain-priser.png</code>
            </li>
            <li>
              <code>remy-meyer.png</code>
            </li>
            <li>
              <code>yann-auxenfans.png</code>
            </li>
          </ul>
        </li>
        <li>
          <strong className="text-neutral-grey-6">Sauvegarder</strong> dans{" "}
          <code className="text-link bg-neutral-smoke px-2 py-1 rounded">
            /public/assets/managers/
          </code>
          .
        </li>
        <li>
          <strong className="text-neutral-grey-6">Recharger Storybook</strong> —
          les initiales placeholder sont remplacées par les vrais portraits
          automatiquement.
        </li>
      </ol>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
