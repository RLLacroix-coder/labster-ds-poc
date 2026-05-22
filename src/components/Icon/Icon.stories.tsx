import type { Meta, StoryObj } from "@storybook/react";
import { Icon, UI_ICON_NAMES, FloatingShape, FLOATING_SHAPE_TYPES } from "./index";

const meta: Meta<typeof Icon> = {
  title: "Brand/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Labster UI Icons — recodés en SVG inline depuis le brand kit Labster (page Icons nodeId 705:3186). " +
          "16 icons monochromes pour les actions et navigation. " +
          "Standard : viewBox 0 0 24 24, stroke currentColor, default size 24px.",
      },
    },
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: UI_ICON_NAMES,
    },
    size: {
      control: { type: "number", min: 12, max: 96, step: 4 },
    },
    ariaLabel: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: {
    name: "mail",
    size: 24,
    ariaLabel: "Send email",
  },
};

export const AllUiIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-6 p-8 max-w-3xl font-labster">
      {UI_ICON_NAMES.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-16 h-16 bg-neutral-white rounded-md border border-neutral-grey-1 text-neutral-grey-6">
            <Icon name={name} size={32} ariaLabel={name} />
          </div>
          <span className="text-[10px] text-neutral-grey-3">{name}</span>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "fullscreen" },
};

export const Colors: Story = {
  render: () => (
    <div className="flex gap-6 items-center p-8 font-labster">
      <Icon name="mail" size={32} className="text-neutral-grey-6" />
      <Icon name="mail" size={32} className="text-semantic-action-primary" />
      <Icon name="mail" size={32} className="text-semantic-danger" />
      <Icon name="mail" size={32} className="text-brand-yellow" />
      <Icon name="mail" size={32} className="text-neutral-grey-3" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6 items-end p-8 font-labster">
      <Icon name="check" size={16} className="text-semantic-action-primary" />
      <Icon name="check" size={24} className="text-semantic-action-primary" />
      <Icon name="check" size={32} className="text-semantic-action-primary" />
      <Icon name="check" size={48} className="text-semantic-action-primary" />
      <Icon name="check" size={64} className="text-semantic-action-primary" />
    </div>
  ),
};

// =============================================================================
// FLOATING SHAPES
// =============================================================================

export const FloatingShapesAll: Story = {
  name: "Floating Shapes — all variants",
  render: () => (
    <div className="p-8 font-labster">
      <h2 className="text-h5 text-neutral-grey-6 mb-6">
        Floating Shapes — décoratifs brand Labster
      </h2>
      <div className="space-y-6">
        {(["red", "blue", "yellow"] as const).map((color) => (
          <div key={color}>
            <p className="text-p-sm text-neutral-grey-4 mb-2 capitalize">{color}</p>
            <div className="flex gap-4 items-center">
              {FLOATING_SHAPE_TYPES.map((shape) => (
                <div key={shape} className="flex flex-col items-center gap-1">
                  <FloatingShape shape={shape} color={color} size={32} />
                  <span className="text-[10px] text-neutral-grey-3">{shape}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
};
