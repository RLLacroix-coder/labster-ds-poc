import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "../components/AppShell";
import { Sidebar, SidebarNavItem } from "../components/Sidebar";
import { PageHeader } from "../components/PageHeader";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { KpiCard } from "../components/KpiCard";
import { FilterTabs } from "../components/FilterTabs";
import { AgentCard, type AgentCardTone } from "../components/AgentCard";
import { LabsterLogo } from "../components/LabsterLogo";
import { Icon } from "../components/Icon";
import type { AgentStatus } from "../components/StatusBadge";

/**
 * Pattern : Labsterse Dashboard (My Agents)
 *
 * Reproduction de la vue "My agents" inspirée de l'écran Atlas, adaptée pour
 * Labsterse (écosystème AI interne Le Labster — pas de plan free/upgrade).
 *
 * Composants utilisés :
 * - AppShell (layout 2-col)
 * - Sidebar + SidebarNavItem + LabsterLogo
 * - PageHeader + Avatar + Button
 * - KpiCard × 3 (Active / Paused / Total runs)
 * - FilterTabs + Input (search) — barre de filtre
 * - AgentCard × N (grid responsive)
 */

const meta: Meta = {
  title: "Patterns/Labsterse Dashboard",
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, iframeHeight: 1024 },
      description: {
        component:
          "Vue dashboard 'My agents' de l'écosystème Labsterse (AI agents internes Le Labster). " +
          "Composé à partir de 8 composants App UI (Avatar, Sidebar, PageHeader, AppShell, KpiCard, FilterTabs, StatusBadge, AgentCard) " +
          "+ composants existants (Button, Input, Icon, LabsterLogo). " +
          "💡 Passe en mode Canvas (icône haut droite) pour voir pleine page.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// Mock data
// =============================================================================

type Category = "all" | "sales" | "marketing" | "support" | "operations" | "productivity";

interface Agent {
  id: string;
  name: string;
  description: string;
  category: Category;
  createdAt: string;
  totalRuns: number;
  status: AgentStatus;
  tone: AgentCardTone;
}

const AGENTS: Agent[] = [
  {
    id: "lead-qual",
    name: "Lead Qualification Bot",
    description: "Qualifies incoming leads from Intercom and routes them to the right sales rep.",
    category: "sales",
    createdAt: "May 5, 2026",
    totalRuns: 23500,
    status: "running",
    tone: "red-purple",
  },
  {
    id: "content-summ",
    name: "Content Summarizer",
    description: "Summarizes long documents and articles for quick review across the team.",
    category: "productivity",
    createdAt: "May 5, 2026",
    totalRuns: 23500,
    status: "running",
    tone: "purple-pink",
  },
  {
    id: "support-triage",
    name: "Support Ticket Triage",
    description: "Categorises and prioritises incoming support tickets using AI.",
    category: "support",
    createdAt: "May 5, 2026",
    totalRuns: 23500,
    status: "running",
    tone: "teal-blue",
  },
  {
    id: "meeting",
    name: "Meeting Scheduler",
    description: "Books meetings with qualified prospects automatically.",
    category: "operations",
    createdAt: "May 5, 2026",
    totalRuns: 23500,
    status: "running",
    tone: "blue-purple",
  },
  {
    id: "social",
    name: "Social Media Monitor",
    description: "Tracks brand mentions and sentiment across social platforms.",
    category: "marketing",
    createdAt: "May 5, 2026",
    totalRuns: 23500,
    status: "running",
    tone: "red-orange",
  },
  {
    id: "email",
    name: "Email Outreach Agent",
    description: "Sends personalised follow-up emails based on prospect behaviour.",
    category: "sales",
    createdAt: "May 5, 2026",
    totalRuns: 23500,
    status: "running",
    tone: "yellow-orange",
  },
  {
    id: "invoice",
    name: "Invoice Processor",
    description: "Extracts data from invoices and syncs to accounting software.",
    category: "operations",
    createdAt: "May 5, 2026",
    totalRuns: 23500,
    status: "running",
    tone: "blue-cyan",
  },
  {
    id: "crm-sync",
    name: "CRM Sync Agent",
    description: "Keeps your CRM updated with the latest prospect interactions.",
    category: "sales",
    createdAt: "May 5, 2026",
    totalRuns: 23500,
    status: "running",
    tone: "green-teal",
  },
];

const FILTER_ITEMS = [
  { value: "all", label: "All" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "support", label: "Support" },
  { value: "operations", label: "Operations" },
  { value: "productivity", label: "Productivity" },
];

// =============================================================================
// Dashboard
// =============================================================================

function LabsterseDashboard() {
  const [active, setActive] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = AGENTS.filter((a) => {
    const matchCategory = active === "all" || a.category === active;
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <AppShell
      sidebar={
        <Sidebar
          header={
            <div className="flex items-center gap-2">
              <LabsterLogo type="symbol" colorVariant="3-colors" width={32} />
              <span className="font-labster text-[18px] font-bold text-neutral-grey-6">
                Labsterse
              </span>
            </div>
          }
          footer={
            <SidebarNavItem
              icon={<Icon name="arrow-right" size={16} />}
              label="Log out"
              as="button"
            />
          }
        >
          <SidebarNavItem icon={<Icon name="menu" size={16} />} label="Overview" href="#" />
          <SidebarNavItem icon={<Icon name="edit" size={16} />} label="Agents" href="#" active />
          <SidebarNavItem icon={<Icon name="search" size={16} />} label="Analytics" href="#" />
          <SidebarNavItem icon={<Icon name="mail" size={16} />} label="Team" href="#" />
          <SidebarNavItem icon={<Icon name="attach" size={16} />} label="Settings" href="#" />
        </Sidebar>
      }
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
        <PageHeader
          title="My agents"
          actions={<Avatar name="Rachel Lacroix" size={40} bgColor="purple" />}
        />

        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-labster text-[24px] font-bold text-neutral-grey-6">AI Agents</h2>
            <Button variant="primary">Create new agent</Button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <KpiCard value={5} label="Active" />
            <KpiCard value={3} label="Paused" />
            <KpiCard value="7,534" label="Total runs" trend="+12%" />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <FilterTabs items={FILTER_ITEMS} value={active} onChange={setActive} />
            <div style={{ width: 280 }}>
              <Input
                variant="search"
                placeholder="search agents..."
                value={search}
                onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-neutral-grey-1 p-12 text-center font-labster text-neutral-grey-3">
              No agents match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {filtered.map((agent) => (
                <AgentCard
                  key={agent.id}
                  name={agent.name}
                  description={agent.description}
                  tone={agent.tone}
                  status={agent.status}
                  meta={[
                    { label: "Created", value: agent.createdAt },
                    { label: "Total runs", value: agent.totalRuns.toLocaleString() },
                  ]}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

export const MyAgents: Story = {
  name: "My agents (full dashboard)",
  render: () => <LabsterseDashboard />,
};
