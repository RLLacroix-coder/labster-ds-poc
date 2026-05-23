import type { Meta, StoryObj } from "@storybook/react";
import { Elevator } from "./Elevator";
import { ElevatorAnchorLink } from "./ElevatorAnchorLink";
import { useState } from "react";

const meta: Meta<typeof Elevator> = {
  title: "Molecules/Elevator",
  component: Elevator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster DS Elevator — navigation latérale 'ascenseur de page' (scroll-spy / table of contents). " +
          "Source Figma : 01-Labster-Web-components nodeId 308:584. " +
          "Pattern : liste verticale d'ancres avec ligne pointillée qui traverse les cercles. " +
          "Item actif = cercle plein rouge accent-cta. Default = cercle creux grey-3.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Elevator>;

// =============================================================================
// PLAYGROUND
// =============================================================================

const defaultItems = [
  { id: "context", label: "Context" },
  { id: "approach", label: "Approach" },
  { id: "deliverables", label: "Deliverables" },
  { id: "team", label: "Team" },
];

export const Playground: Story = {
  args: {
    items: defaultItems,
    activeId: "context",
  },
};

// =============================================================================
// FIGMA REFERENCE — 4 items with 1st active (matches the Figma master)
// =============================================================================

export const FigmaReference: Story = {
  name: "📐 Figma reference (4 stage items, first active)",
  args: {
    items: [
      { id: "stage-1", label: "Stage item" },
      { id: "stage-2", label: "Stage item" },
      { id: "stage-3", label: "Stage item" },
      { id: "stage-4", label: "Stage item" },
    ],
    activeId: "stage-1",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Reproduction directe du Figma master Elevator (nodeId 308:584) : " +
          "4 items 'Stage item' avec le premier en active state (gros cercle plein rouge).",
      },
    },
  },
};

// =============================================================================
// USE CASE — interactive scroll-spy
// =============================================================================

export const InteractiveScrollSpy: Story = {
  name: "Interactive (click to switch active)",
  render: () => {
    const [activeId, setActiveId] = useState("intro");
    return (
      <div className="flex gap-12 p-8 font-labster">
        <Elevator
          items={[
            { id: "intro", label: "Introduction" },
            { id: "context", label: "Context" },
            { id: "approach", label: "Approach" },
            { id: "deliverables", label: "Deliverables" },
            { id: "team", label: "Team" },
            { id: "next", label: "Next steps" },
          ]}
          activeId={activeId}
          onItemClick={setActiveId}
        />
        <div className="text-p-md text-neutral-grey-4 max-w-md">
          <p className="mb-4">
            💡 Clique sur un item de l'Elevator pour le rendre actif (cercle
            plein rouge). En usage réel : l'item actif est synchronisé via
            scroll-spy (IntersectionObserver) sur les sections de la page.
          </p>
          <p className="mb-4">
            <strong className="text-neutral-grey-6">Active actuel :</strong>{" "}
            <code>{activeId}</code>
          </p>
        </div>
      </div>
    );
  },
  parameters: { layout: "fullscreen" },
};

// =============================================================================
// ANCHOR LINK INDIVIDUAL STATES
// =============================================================================

export const AnchorLinkStates: Story = {
  name: "ElevatorAnchorLink — 4 states",
  render: () => (
    <div className="flex flex-col gap-6 p-8 font-labster">
      <p className="text-p-sm text-neutral-grey-3 mb-2">
        Les 4 états du Component Set ElevatorAnchorLink (Figma nodeId 2:2294).
      </p>

      <div>
        <p className="text-p-sm font-semibold text-neutral-grey-6 mb-2">Default</p>
        <ElevatorAnchorLink href="#">Stage item</ElevatorAnchorLink>
      </div>

      <div>
        <p className="text-p-sm font-semibold text-neutral-grey-6 mb-2">Active</p>
        <ElevatorAnchorLink href="#" active>
          Stage item
        </ElevatorAnchorLink>
      </div>

      <div>
        <p className="text-p-sm font-semibold text-neutral-grey-6 mb-2">
          Default Hover (survole l'item ci-dessous)
        </p>
        <ElevatorAnchorLink href="#">Stage item</ElevatorAnchorLink>
      </div>

      <div>
        <p className="text-p-sm font-semibold text-neutral-grey-6 mb-2">
          Active Hover (survole l'item ci-dessous)
        </p>
        <ElevatorAnchorLink href="#" active>
          Stage item
        </ElevatorAnchorLink>
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

// =============================================================================
// USE CASE — sticky sidebar on long page
// =============================================================================

export const StickyOnLongPage: Story = {
  name: "Use case : sticky sidebar on long page",
  render: () => {
    const sections = [
      { id: "intro", label: "Introduction" },
      { id: "context", label: "Context" },
      { id: "approach", label: "Approach" },
      { id: "deliverables", label: "Deliverables" },
      { id: "team", label: "Team" },
    ];
    const [activeId, setActiveId] = useState("intro");
    return (
      <div className="bg-neutral-smoke min-h-screen font-labster">
        <div className="max-w-6xl mx-auto px-12 py-16 flex gap-12">
          {/* Sticky elevator */}
          <aside className="sticky top-16 self-start">
            <Elevator items={sections} activeId={activeId} onItemClick={setActiveId} />
          </aside>

          {/* Mock content — long page */}
          <main className="flex-1 max-w-2xl space-y-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2 className="text-h3 text-neutral-grey-6 mb-4">{s.label}</h2>
                <p className="text-p-md text-neutral-grey-4 mb-4">
                  Section content here. In a real implementation, an
                  IntersectionObserver would update <code>activeId</code> as
                  the user scrolls.
                </p>
                <p className="text-p-sm text-neutral-grey-3">
                  Click an Elevator item on the left to jump to a section.
                </p>
              </section>
            ))}
          </main>
        </div>
      </div>
    );
  },
  parameters: { layout: "fullscreen" },
};
