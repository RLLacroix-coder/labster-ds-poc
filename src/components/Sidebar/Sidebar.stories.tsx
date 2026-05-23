import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar, SidebarNavItem } from "./Sidebar";
import { Icon } from "../Icon";

const meta: Meta = {
  title: "App UI/Sidebar",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", height: 600 }}>
      <Sidebar
        header={<div className="font-labster text-[18px] font-bold text-neutral-grey-6">Labsterse</div>}
        footer={
          <SidebarNavItem icon={<Icon name="arrow-right" size={16} />} label="Log out" as="button" />
        }
      >
        <SidebarNavItem icon={<Icon name="menu" size={16} />} label="Overview" href="#" />
        <SidebarNavItem icon={<Icon name="edit" size={16} />} label="Agents" href="#" active />
        <SidebarNavItem icon={<Icon name="search" size={16} />} label="Analytics" href="#" />
        <SidebarNavItem icon={<Icon name="mail" size={16} />} label="Team" href="#" />
        <SidebarNavItem icon={<Icon name="check" size={16} />} label="Billing" href="#" />
        <SidebarNavItem icon={<Icon name="attach" size={16} />} label="Settings" href="#" />
      </Sidebar>
      <div className="flex-1 bg-neutral-smoke" />
    </div>
  ),
};
