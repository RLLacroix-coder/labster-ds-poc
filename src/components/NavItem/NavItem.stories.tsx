import type { Meta, StoryObj } from "@storybook/react";
import { NavItem } from "./NavItem";

const meta: Meta<typeof NavItem> = {
  title: "Atoms/NavItem",
  component: NavItem,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster DS NavItem — pattern de navigation observé dans 01-Labster-Web-components " +
          "(nodeId 2:946). Text Links style (Fieldwork Geo Regular) + highlight bar " +
          "couleur brand en dessous (0 / 2px hover / 4px active). 4 colors × 3 states = 12 variants Figma.",
      },
    },
  },
  argTypes: {
    children: { control: { type: "text" } },
    color: {
      control: { type: "select" },
      options: ["red", "blue", "yellow", "generic"],
    },
    active: { control: { type: "boolean" } },
    href: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Playground: Story = {
  args: { children: "Services", color: "red", active: false, href: "#" },
};

// =============================================================================
// STATES
// =============================================================================

export const Default: Story = {
  args: { children: "Nav link default", color: "red", href: "#" },
};

export const Active: Story = {
  args: { children: "Nav link active", color: "red", active: true, href: "#" },
};

export const HoverInstruction: Story = {
  name: "Hover (try it)",
  render: () => (
    <div className="flex flex-col gap-6 p-8 font-labster">
      <p className="text-p-sm text-neutral-grey-3">
        💡 Survole les liens — la barre 2px apparaît sous le label.
      </p>
      <NavItem href="#" color="red">
        Services
      </NavItem>
    </div>
  ),
};

// =============================================================================
// COLORS
// =============================================================================

export const Red: Story = {
  args: { children: "Services", color: "red", active: true, href: "#" },
};

export const Blue: Story = {
  args: { children: "Insights", color: "blue", active: true, href: "#" },
};

export const Yellow: Story = {
  args: { children: "Events", color: "yellow", active: true, href: "#" },
};

export const Generic: Story = {
  args: { children: "About", color: "generic", active: true, href: "#" },
};

// =============================================================================
// USE CASE — Top navigation pattern
// =============================================================================

export const TopNavigationPattern: Story = {
  name: "Use case : top nav (5 items)",
  render: () => (
    <div className="bg-neutral-white px-8 py-4 border-b border-neutral-grey-1 font-labster">
      <nav aria-label="Main navigation">
        <ul className="flex items-end gap-2">
          <li>
            <NavItem href="#services" color="red" active>
              Services
            </NavItem>
          </li>
          <li>
            <NavItem href="#insights" color="blue">
              Insights
            </NavItem>
          </li>
          <li>
            <NavItem href="#events" color="yellow">
              Events
            </NavItem>
          </li>
          <li>
            <NavItem href="#about" color="generic">
              About
            </NavItem>
          </li>
          <li>
            <NavItem href="#contact" color="red">
              Contact
            </NavItem>
          </li>
        </ul>
      </nav>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Pattern de top navigation Labster. Item actif (Services) avec bar rouge 4px. Hover sur les autres affiche bar 2px de la couleur du variant.",
      },
    },
  },
};

// =============================================================================
// ALL VARIANTS MATRIX
// =============================================================================

export const AllVariantsMatrix: Story = {
  name: "All variants (4 colors × 3 states)",
  render: () => (
    <div className="p-8 font-labster">
      <h3 className="text-h5 text-neutral-grey-6 mb-6">
        4 couleurs × 3 states = 12 variants
      </h3>
      <div className="space-y-8">
        {(["red", "blue", "yellow", "generic"] as const).map((color) => (
          <section key={color}>
            <p className="text-p-sm text-neutral-grey-3 mb-2 capitalize">
              {color}
            </p>
            <div className="flex items-end gap-6">
              <NavItem href="#" color={color}>
                Default
              </NavItem>
              <NavItem href="#" color={color} className="group">
                Hover (force via :hover class — survole-moi)
              </NavItem>
              <NavItem href="#" color={color} active>
                Active
              </NavItem>
            </div>
          </section>
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
