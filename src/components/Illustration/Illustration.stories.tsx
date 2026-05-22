import type { Meta, StoryObj } from "@storybook/react";
import {
  Illustration,
  ILLUSTRATION_NAMES,
  getIllustrationsByCategory,
} from "./Illustration";

const meta: Meta<typeof Illustration> = {
  title: "Brand/Illustration",
  component: Illustration,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster web illustrations — vrais COMPONENT Figma natifs dans le fichier dédié " +
          "01-Labster-illustrations (fileKey 9pLXmhLSqKpyObBxrytDxw). " +
          "14 illustrations 720×640px organisées en 5 catégories (Marketing, Innovation, UX Design, Team, Recruitment). " +
          "⚠ Composant placeholder — process d'export Figma documenté.",
      },
    },
  },
  argTypes: {
    name: { control: { type: "select" }, options: ILLUSTRATION_NAMES },
    width: { control: { type: "number", min: 120, max: 720, step: 60 } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Illustration>;

export const Playground: Story = {
  args: { name: "design-system", width: 360 },
};

// =============================================================================
// PAR CATÉGORIE
// =============================================================================

export const MarketingAcquisition: Story = {
  name: "Marketing & Acquisition (3 illustrations)",
  render: () => (
    <div className="p-8 font-labster">
      <h3 className="text-h5 text-neutral-grey-6 mb-6">Marketing & Acquisition</h3>
      <div className="grid grid-cols-3 gap-4">
        {getIllustrationsByCategory("marketing").map((name) => (
          <Illustration key={name} name={name} width={320} />
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

export const Innovation: Story = {
  name: "Innovation (2 illustrations)",
  render: () => (
    <div className="p-8 font-labster">
      <h3 className="text-h5 text-neutral-grey-6 mb-6">Innovation</h3>
      <div className="grid grid-cols-2 gap-4">
        {getIllustrationsByCategory("innovation").map((name) => (
          <Illustration key={name} name={name} width={400} />
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

export const UXDesign: Story = {
  name: "UX Design (3 illustrations)",
  render: () => (
    <div className="p-8 font-labster">
      <h3 className="text-h5 text-neutral-grey-6 mb-6">UX Design</h3>
      <div className="grid grid-cols-3 gap-4">
        {getIllustrationsByCategory("ux-design").map((name) => (
          <Illustration key={name} name={name} width={320} />
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

export const Recruitment: Story = {
  name: "Recruitment (5 illustrations)",
  render: () => (
    <div className="p-8 font-labster">
      <h3 className="text-h5 text-neutral-grey-6 mb-6">Recruitment</h3>
      <div className="grid grid-cols-3 gap-4">
        {getIllustrationsByCategory("recruitment").map((name) => (
          <Illustration key={name} name={name} width={320} />
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

// =============================================================================
// ALL ILLUSTRATIONS
// =============================================================================

export const AllIllustrations: Story = {
  name: "🎨 All illustrations (14 placeholders)",
  render: () => (
    <div className="p-8 font-labster">
      <h2 className="text-h4 text-neutral-grey-6 mb-2">Web illustrations Labster</h2>
      <p className="text-p-sm text-neutral-grey-3 mb-6">
        ⚠ 14 placeholders. Export depuis Figma pour activer le rendu réel.
        Source : fileKey 9pLXmhLSqKpyObBxrytDxw, page Website Illustrations.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {ILLUSTRATION_NAMES.map((name) => (
          <Illustration key={name} name={name} width={300} />
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

// =============================================================================
// EXPORT PROCESS DOC
// =============================================================================

export const ExportProcessDoc: Story = {
  name: "📋 Process d'export depuis Figma",
  render: () => (
    <div className="p-8 font-labster max-w-3xl">
      <h2 className="text-h4 text-neutral-grey-6 mb-4">
        Export des illustrations depuis Figma
      </h2>
      <p className="text-p-md text-neutral-grey-4 mb-6">
        Les illustrations web Labster sont des compositions complexes
        multi-couleurs avec personnages + shapes brand. Process pour activer
        le rendu réel :
      </p>

      <ol className="space-y-4 text-p-sm text-neutral-grey-4 list-decimal list-inside mb-8">
        <li>
          <strong className="text-neutral-grey-6">Ouvrir Figma</strong> — fichier
          dédié :{" "}
          <code className="text-link bg-neutral-smoke px-2 py-1 rounded">
            01-Labster-illustrations
          </code>
          .
        </li>
        <li>
          <strong className="text-neutral-grey-6">Sélectionner l'illustration</strong>{" "}
          (ex : <code>illustrations-conversion</code> sur la page "Website Illustrations").
        </li>
        <li>
          <strong className="text-neutral-grey-6">Configurer l'export</strong> —
          panneau droit → Export → "+ Add" → format <code>SVG</code>.
          <br />
          Pour les illustrations très détaillées, l'export <code>PNG @2x</code>{" "}
          peut être plus léger qu'un SVG (selon le nombre de paths).
        </li>
        <li>
          <strong className="text-neutral-grey-6">Sauvegarder</strong> dans{" "}
          <code className="text-link bg-neutral-smoke px-2 py-1 rounded">
            /public/assets/illustrations/&lt;name&gt;.svg
          </code>
          .
          <br />
          Utiliser le nom propre du registry (sans typo Figma original) :{" "}
          <code>conversion.svg</code>, <code>workshops.svg</code>,{" "}
          <code>design-system.svg</code>, etc.
        </li>
        <li>
          <strong className="text-neutral-grey-6">Activer dans le code</strong> —
          ouvrir{" "}
          <code className="text-link bg-neutral-smoke px-2 py-1 rounded">
            src/components/Illustration/Illustration.tsx
          </code>{" "}
          → trouver l'entrée → changer <code>available: false</code> en{" "}
          <code>available: true</code>.
        </li>
        <li>
          <strong className="text-neutral-grey-6">Vérifier dans Storybook</strong>{" "}
          — le placeholder est remplacé automatiquement.
        </li>
      </ol>

      <div className="bg-brand-yellow-light border-l-4 border-brand-yellow p-4 rounded-md mb-4">
        <p className="text-p-sm text-neutral-grey-6">
          <strong>💡 À automatiser (Phase C)</strong> — un skill{" "}
          <code>labster-ds:export-illustrations</code> pourra exporter
          automatiquement les 14 illustrations depuis Figma via MCP +
          sauvegarder en .svg + activer dans le registry.
        </p>
      </div>

      <h3 className="text-h5 text-neutral-grey-6 mb-3 mt-8">
        Traçabilité Figma — registry
      </h3>
      <p className="text-p-sm text-neutral-grey-4 mb-4">
        Le registry du composant conserve les nodeIds Figma + les noms originaux
        (typos inclus, ex : <code>illustrations-worshops</code>) pour traçabilité.
        Les noms du DS sont nettoyés (<code>workshops</code>) pour usage code.
      </p>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
