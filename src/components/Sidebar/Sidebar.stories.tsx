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
          <SidebarNavItem icon={<Icon name="log-out" size={18} />} label="Log out" as="button" />
        }
      >
        <SidebarNavItem icon={<Icon name="home" size={18} />} label="Overview" href="#" />
        <SidebarNavItem icon={<Icon name="sparkles" size={18} />} label="Agents" href="#" active />
        <SidebarNavItem icon={<Icon name="bar-chart" size={18} />} label="Analytics" href="#" />
        <SidebarNavItem icon={<Icon name="users" size={18} />} label="Team" href="#" />
        <SidebarNavItem icon={<Icon name="settings" size={18} />} label="Settings" href="#" />
      </Sidebar>
      <div className="flex-1 bg-neutral-smoke" />
    </div>
  ),
};
