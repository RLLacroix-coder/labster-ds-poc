import type { Meta, StoryObj } from "@storybook/react";
import { Picto, PICTO_CATEGORIES, ALL_PICTO_NAMES } from "./Picto";

const meta: Meta<typeof Picto> = {
  title: "Brand/Picto",
  component: Picto,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Pictos brand Labster — illustrations multi-couleurs observées dans le brand kit " +
          "(00-Labster-Tokens, page Pictos nodeId 705:3239). " +
          "Plus de 70 pictos disponibles, organisés en catégories : Ateliers, Concepts business (× 3 colors), CTA, Profils, Divers. " +
          "🚀 V1.0 : accepte n'importe quel name string + auto-fallback si SVG manquant.",
      },
    },
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: ALL_PICTO_NAMES,
    },
    size: { control: { type: "select" }, options: [64, 80, 150, 180] },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Picto>;

export const Playground: Story = {
  args: { name: "Picto-coding-blue", size: 80 },
};

// =============================================================================
// CATÉGORIES
// =============================================================================

export const Ateliers: Story = {
  name: "Ateliers (Contexte, Déroulé, Lieu, etc.)",
  render: () => (
    <div className="p-8 font-labster">
      <h3 className="text-h5 text-neutral-grey-6 mb-6">Pictos Ateliers</h3>
      <div className="grid grid-cols-6 gap-6">
        {PICTO_CATEGORIES.Ateliers.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Picto name={name} size={80} />
            <span className="text-[10px] text-neutral-grey-3 text-center">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

export const ConceptsBusiness: Story = {
  name: "Concepts business (× 3 colors)",
  render: () => (
    <div className="p-8 font-labster">
      <h3 className="text-h5 text-neutral-grey-6 mb-6">Pictos Concepts business</h3>
      <p className="text-p-sm text-neutral-grey-3 mb-6">
        Chaque concept existe en 1 à 3 variants couleur (blue / red / yellow).
      </p>
      <div className="grid grid-cols-6 gap-6">
        {PICTO_CATEGORIES["Concepts business (× 3 colors)"].map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Picto name={name} size={80} />
            <span className="text-[10px] text-neutral-grey-3 text-center">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

export const CTAs: Story = {
  name: "CTA (delegation, design, dev, marketing, tryandhire, workforce)",
  render: () => (
    <div className="p-8 font-labster">
      <h3 className="text-h5 text-neutral-grey-6 mb-6">Pictos CTA</h3>
      <p className="text-p-sm text-neutral-grey-3 mb-6">
        Pictos pour les call-to-actions sur les pages services Labster.
      </p>
      <div className="grid grid-cols-6 gap-6">
        {PICTO_CATEGORIES.CTA.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Picto name={name} size={80} />
            <span className="text-[10px] text-neutral-grey-3 text-center">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

export const Profils: Story = {
  name: "Profils (data-scientist, designer, developer, marketer, PM)",
  render: () => (
    <div className="p-8 font-labster">
      <h3 className="text-h5 text-neutral-grey-6 mb-6">Pictos Profils</h3>
      <p className="text-p-sm text-neutral-grey-3 mb-6">
        Pictos pour représenter les rôles dans l'équipe Labster.
      </p>
      <div className="grid grid-cols-5 gap-6">
        {PICTO_CATEGORIES.Profils.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Picto name={name} size={80} />
            <span className="text-[10px] text-neutral-grey-3 text-center">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

// =============================================================================
// ALL PICTOS
// =============================================================================

export const AllPictos: Story = {
  name: "🎨 All pictos (70+)",
  render: () => (
    <div className="p-8 font-labster">
      <h2 className="text-h4 text-neutral-grey-6 mb-2">All Labster pictos</h2>
      <p className="text-p-sm text-neutral-grey-3 mb-8">
        Plus de 70 pictos catégorisés. Format SVG, multi-couleurs (line work
        + accent shapes brand). Sizes : 64 / 80 / 150 / 180 px.
      </p>

      {Object.entries(PICTO_CATEGORIES).map(([category, names]) => (
        <section key={category} className="mb-12">
          <h3 className="text-h5 text-neutral-grey-6 mb-4">{category}</h3>
          <div className="grid grid-cols-6 gap-4">
            {names.map((name) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <Picto name={name} size={80} />
                <span className="text-[9px] text-neutral-grey-3 text-center leading-tight">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

// =============================================================================
// SIZES
// =============================================================================

export const SizesShowcase: Story = {
  name: "Size variants (64 / 80 / 150 / 180)",
  render: () => (
    <div className="p-8 font-labster flex gap-8 items-end">
      <div className="flex flex-col items-center gap-2">
        <Picto name="Picto-coding-blue" size={64} />
        <span className="text-p-sm text-neutral-grey-3">64px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Picto name="Picto-coding-blue" size={80} />
        <span className="text-p-sm text-neutral-grey-3">80px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Picto name="Picto-coding-blue" size={150} />
        <span className="text-p-sm text-neutral-grey-3">150px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Picto name="Picto-coding-blue" size={180} />
        <span className="text-p-sm text-neutral-grey-3">180px</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Le SVG s'affiche à la taille demandée (CSS scale). " +
          "Si tu as exporté le picto en plusieurs résolutions Figma, utilise " +
          "le nom du fichier que tu as choisi.",
      },
    },
  },
};
