import type { Meta, StoryObj } from "@storybook/react";
import { Picto, PICTO_NAMES } from "./Picto";

const meta: Meta<typeof Picto> = {
  title: "Brand/Picto",
  component: Picto,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Pictos brand Labster — illustrations multi-couleurs observées sur le brand kit " +
          "(00-Labster-Tokens, page Pictos nodeId 705:3239). " +
          "4 tailles disponibles : 64, 80, 150, 180 px. " +
          "⚠ Pour le POC actuel : composant placeholder (encadré pointillé avec le nom). " +
          "Process d'activation : exporter les .svg depuis Figma et les sauvegarder dans /public/assets/pictos/. " +
          "Voir le code source du composant pour les instructions détaillées.",
      },
    },
  },
  argTypes: {
    name: { control: { type: "select" }, options: PICTO_NAMES },
    size: { control: { type: "select" }, options: [64, 80, 150, 180] },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Picto>;

export const Playground: Story = {
  args: { name: "rocket", size: 80 },
};

export const AllPictosSize80: Story = {
  name: "All pictos · 80px",
  render: () => (
    <div className="p-8 font-labster">
      <h2 className="text-h5 text-neutral-grey-6 mb-2">All pictos · 80px (placeholders)</h2>
      <p className="text-p-sm text-neutral-grey-3 mb-6">
        ⚠ Ces pictos sont des placeholders. Pour le rendu pixel-perfect Labster, exporter
        les .svg depuis le brand kit Figma et les sauvegarder dans /public/assets/pictos/.
      </p>
      <div className="grid grid-cols-5 gap-4">
        {PICTO_NAMES.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Picto name={name} size={80} />
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

export const SizesShowcase: Story = {
  name: "Size variants (64 / 80 / 150 / 180)",
  render: () => (
    <div className="p-8 font-labster flex gap-8 items-end">
      <div className="flex flex-col items-center gap-2">
        <Picto name="rocket" size={64} />
        <span className="text-p-sm text-neutral-grey-3">64px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Picto name="rocket" size={80} />
        <span className="text-p-sm text-neutral-grey-3">80px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Picto name="rocket" size={150} />
        <span className="text-p-sm text-neutral-grey-3">150px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Picto name="rocket" size={180} />
        <span className="text-p-sm text-neutral-grey-3">180px</span>
      </div>
    </div>
  ),
};

export const ExportProcessDoc: Story = {
  name: "📋 Process d'export depuis Figma",
  render: () => (
    <div className="p-8 font-labster max-w-3xl">
      <h2 className="text-h4 text-neutral-grey-6 mb-4">
        Process d'export des pictos depuis Figma
      </h2>
      <p className="text-p-md text-neutral-grey-4 mb-6">
        Les pictos Labster sont des illustrations multi-couleurs complexes — trop pour
        être recodés en SVG inline à la main. Voici le process pour activer le rendu réel :
      </p>

      <ol className="space-y-4 text-p-sm text-neutral-grey-4 list-decimal list-inside mb-8">
        <li>
          <strong className="text-neutral-grey-6">Ouvrir Figma</strong> — fichier brand kit
          Labster :{" "}
          <code className="text-link bg-neutral-smoke px-2 py-1 rounded">
            00-Labster-Tokens
          </code>{" "}
          (nodeId 705:3239 = page Pictos).
        </li>
        <li>
          <strong className="text-neutral-grey-6">Sélectionner le picto</strong> à exporter
          (ex : "rocket" dans la section Pictos 80px).
        </li>
        <li>
          <strong className="text-neutral-grey-6">Configurer l'export</strong> — panneau
          droit Figma → section "Export" → ajouter avec le bouton "+" → format{" "}
          <code>SVG</code>.
        </li>
        <li>
          <strong className="text-neutral-grey-6">Exporter le fichier</strong> →
          bouton "Export Picto-name" → sauvegarder dans{" "}
          <code className="text-link bg-neutral-smoke px-2 py-1 rounded">
            /public/assets/pictos/&lt;name&gt;-&lt;size&gt;.svg
          </code>
          .
          <br />
          Exemples : <code>rocket-80.svg</code>, <code>brain-ai-150.svg</code>,{" "}
          <code>target-180.svg</code>.
        </li>
        <li>
          <strong className="text-neutral-grey-6">Activer dans le code</strong> — ouvrir{" "}
          <code className="text-link bg-neutral-smoke px-2 py-1 rounded">
            src/components/Picto/Picto.tsx
          </code>{" "}
          → trouver l'entrée du picto dans le registry → changer{" "}
          <code>available: false</code> en <code>available: true</code>.
        </li>
        <li>
          <strong className="text-neutral-grey-6">Vérifier dans Storybook</strong> — le
          placeholder est automatiquement remplacé par le SVG exporté.
        </li>
      </ol>

      <div className="bg-brand-yellow-light border-l-4 border-brand-yellow p-4 rounded-md">
        <p className="text-p-sm text-neutral-grey-6">
          <strong>💡 À automatiser (Phase C)</strong> — un skill{" "}
          <code>labster-ds:export-pictos</code> pourra à terme exporter automatiquement
          tous les pictos depuis Figma via MCP + sauvegarder en .svg + activer dans le
          registry.
        </p>
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
