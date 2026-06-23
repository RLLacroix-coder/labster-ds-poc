import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AppShell,
  Sidebar,
  SidebarNavItem,
  PageHeader,
  Avatar,
  Button,
  KpiCard,
  FilterTabs,
  Icon,
  LabsterLogo,
  FloatingShape,
  PriorityCard,
  EngagementRow,
  CapacityBar,
  type FloatingShapeType,
  type FloatingShapeColor,
  type TeamMember,
  type AgentStatus,
} from "@labster-ds-poc";

/**
 * Pattern : Portefeuille clients Le Labster (vue Remy Meyer COO/BDM)
 *
 * Test V1.1 du Workflow 2 USAGE — méthodologie design-first :
 * 1. Brief produit (test-usage/brief.md)
 * 2. Design intent textuel (validé)
 * 3. Figma frame design intent (validé node 45:2 du fichier 02-Labster-DS-V0.1)
 * 4. Vibe-code fidèle au Figma (ce fichier)
 *
 * Composition (zéro invention paresseuse) :
 * - DS existant : AppShell, Sidebar+SidebarNavItem, PageHeader, Avatar, Button,
 *   Icon, LabsterLogo, FilterTabs, KpiCard, StatusBadge, FloatingShape
 * - DS nouveau (créés alignés) : PriorityCard, EngagementRow, TeamStack, CapacityBar
 *
 * Noms fictifs réalistes — pas de vrais clients Labster.
 */

const meta: Meta = {
  title: "Patterns/Test Usage DS/Portefeuille clients",
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, iframeHeight: 1300 },
      description: {
        component:
          "Dashboard portefeuille clients pour Remy Meyer (COO/BDM Le Labster). " +
          "Produit via Workflow 2 USAGE V1.1 (design-first) : brief → design intent → Figma frame validée → vibe-code fidèle. " +
          "4 nouveaux composants créés alignés au DS (PriorityCard, EngagementRow, TeamStack, CapacityBar). " +
          "💡 Passe en mode Canvas pour voir pleine page.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// Mock data — noms fictifs
// =============================================================================

type Phase = "discovery" | "delivery" | "maintenance";
type BusinessStatus = "running" | "at-risk" | "renewal-due" | "won" | "completed";

// Business status → AgentStatus mapping (gap connu : statuts SaaS génériques)
const STATUS_MAP: Record<BusinessStatus, { status: AgentStatus; label: string }> = {
  running: { status: "running", label: "En cours" },
  "at-risk": { status: "failed", label: "À risque" },
  "renewal-due": { status: "queued", label: "Renouvellement" },
  won: { status: "completed", label: "Gagné" },
  completed: { status: "completed", label: "Terminé" },
};

const PHASE_TONE: Record<Phase, "blue" | "red" | "yellow"> = {
  discovery: "blue",
  delivery: "red",
  maintenance: "yellow",
};

const PHASE_SHAPE: Record<Phase, FloatingShapeType> = {
  discovery: "triangle-up",
  delivery: "diamond",
  maintenance: "circle",
};

// Team members fictifs
const TM = {
  alex: { name: "Alex Mercier", bgColor: "blue" } as TeamMember,
  sam: { name: "Sam Rivière", bgColor: "red" } as TeamMember,
  jules: { name: "Jules Vanetti", bgColor: "yellow" } as TeamMember,
  iris: { name: "Iris Lambert", bgColor: "purple" } as TeamMember,
  theo: { name: "Théo Gallet", bgColor: "red" } as TeamMember,
  maya: { name: "Maya Roussel", bgColor: "yellow" } as TeamMember,
  nora: { name: "Nora Aebersold", bgColor: "purple" } as TeamMember,
  lea: { name: "Léa Kaufmann", bgColor: "blue" } as TeamMember,
};

interface Engagement {
  id: string;
  client: string;
  project: string;
  phase: Phase;
  status: BusinessStatus;
  team: TeamMember[];
  metric: string;
}

const ENGAGEMENTS: Engagement[] = [
  { id: "crystal", client: "Crystal Pharma SA", project: "Genesis Portal", phase: "discovery", status: "running", team: [TM.alex, TM.sam, TM.jules], metric: "Kickoff 12 juin" },
  { id: "novatrust", client: "NovaTrust Insurance", project: "Atlas Claims", phase: "delivery", status: "running", team: [TM.iris, TM.theo, TM.maya, TM.nora], metric: "180 / 240h" },
  { id: "helvetia", client: "Helvetia Banking", project: "Wealth Studio", phase: "delivery", status: "running", team: [TM.alex, TM.lea], metric: "45% milestone 2" },
  { id: "greenleap", client: "GreenLeap Energy", project: "Pulse Dashboard", phase: "discovery", status: "won", team: [TM.sam, TM.iris], metric: "Devis signé" },
  { id: "aurora", client: "Aurora Cosmetics", project: "Mirror Configurator", phase: "maintenance", status: "at-risk", team: [TM.lea], metric: "2 sem deadline" },
  { id: "pixelforge", client: "PixelForge Studios", project: "Galaxy DS", phase: "maintenance", status: "renewal-due", team: [TM.alex], metric: "3 sem échéance" },
  { id: "meridian", client: "Meridian Foundation", project: "Collaboration Hub", phase: "discovery", status: "running", team: [TM.theo, TM.maya], metric: "Atelier 5 juin" },
  { id: "labsterse", client: "Le Labster", project: "Internal Agents", phase: "delivery", status: "running", team: [TM.alex, TM.sam, TM.jules, TM.iris, TM.theo], metric: "Sprint 4 / 6" },
  { id: "phoenix", client: "Phoenix Labs", project: "R&D Sandbox", phase: "discovery", status: "running", team: [TM.nora], metric: "Discovery J+8" },
  { id: "vertex", client: "Vertex AI Solutions", project: "Lean Verification", phase: "discovery", status: "running", team: [TM.alex, TM.theo], metric: "POC en cours" },
  { id: "lumen", client: "Lumen Healthcare", project: "Diagnostic AI", phase: "delivery", status: "running", team: [TM.iris, TM.maya], metric: "60% milestone 3" },
  { id: "cantonal", client: "Cantonal Hospital", project: "Patient Portal", phase: "maintenance", status: "completed", team: [TM.sam], metric: "Support actif" },
];

const FILTER_ITEMS = [
  { value: "all", label: `Tous · ${ENGAGEMENTS.length}` },
  { value: "discovery", label: `Discovery · ${ENGAGEMENTS.filter((e) => e.phase === "discovery").length}` },
  { value: "delivery", label: `Delivery · ${ENGAGEMENTS.filter((e) => e.phase === "delivery").length}` },
  { value: "maintenance", label: `Maintenance · ${ENGAGEMENTS.filter((e) => e.phase === "maintenance").length}` },
];

const TEAM_CAPACITY = [
  { name: "Alex Mercier", bgColor: "purple" as const, percentage: 100 },
  { name: "Sam Rivière", bgColor: "blue" as const, percentage: 70 },
  { name: "Jules Vanetti", bgColor: "red" as const, percentage: 60 },
  { name: "Iris Lambert", bgColor: "red" as const, percentage: 90 },
  { name: "Théo Gallet", bgColor: "yellow" as const, percentage: 85 },
  { name: "Maya Roussel", bgColor: "yellow" as const, percentage: 75 },
];

// =============================================================================
// Pattern composant
// =============================================================================

function PortefeuilleClients() {
  const [activePhase, setActivePhase] = useState<string>("all");

  const filtered = ENGAGEMENTS.filter(
    (e) => activePhase === "all" || e.phase === activePhase,
  );

  return (
    <AppShell
      sidebar={
        <Sidebar
          header={
            <div className="flex items-center gap-3">
              <LabsterLogo type="symbol" colorVariant="3-colors" width={32} />
              <span className="font-labster text-[18px] font-bold text-neutral-grey-6">
                Labsterse
              </span>
            </div>
          }
          footer={
            <SidebarNavItem
              icon={<Icon name="log-out" size={18} />}
              label="Log out"
              as="button"
            />
          }
        >
          <SidebarNavItem icon={<Icon name="home" size={18} />} label="Overview" href="#" />
          <SidebarNavItem icon={<Icon name="bar-chart" size={18} />} label="Portefeuille" href="#" active />
          <SidebarNavItem icon={<Icon name="sparkles" size={18} />} label="Pipeline" href="#" />
          <SidebarNavItem icon={<Icon name="users" size={18} />} label="Team" href="#" />
          <SidebarNavItem icon={<Icon name="settings" size={18} />} label="Settings" href="#" />
        </Sidebar>
      }
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <PageHeader
          title="Portefeuille clients"
          subtitle="Vue d'ensemble — semaine du 24 mai 2026"
          actions={
            <>
              <Button variant="primary">Nouveau deal</Button>
              <Avatar name="Remy Meyer" size={40} bgColor="red" />
            </>
          }
        />

        {/* SECTION 1 — PRIORITÉS */}
        <section className="flex flex-col gap-4">
          <SectionTitle>Priorités de la semaine</SectionTitle>
          <div className="grid grid-cols-2 gap-5">
            <PriorityCard
              category="DÉCISION URGENTE"
              title="Aurora Cosmetics — Mirror Configurator"
              reason="Deadline UNESCO dans 2 semaines. Budget en attente de validation client."
              deadline="→ 2 semaines"
              tone="red"
            />
            <PriorityCard
              category="RENOUVELLEMENT"
              title="PixelForge Studios — Galaxy DS"
              reason="Échéance contrat dans 3 semaines. Réunion de cadrage à planifier."
              deadline="→ 3 semaines"
              tone="blue"
            />
          </div>
        </section>

        {/* SECTION 2 — KPIs */}
        <section className="flex flex-col gap-4">
          <SectionTitle>Pipeline & capacité</SectionTitle>
          <div className="grid grid-cols-4 gap-4">
            <KpiCard value="9" label="Engagements actifs" />
            <KpiCard value="CHF 145k" label="Revenu mensuel récurrent" trend="+8% vs avril" />
            <KpiCard value="3" label="Deals en cours" trend="CHF 280k pipeline" />
            <KpiCard value="85%" label="Capacité équipe" trend="Alerte sur-staffing" alert />
          </div>
        </section>

        {/* SECTION 3 — ENGAGEMENTS */}
        <section className="flex flex-col gap-4">
          <SectionTitle>Tous les engagements</SectionTitle>
          <FilterTabs items={FILTER_ITEMS} value={activePhase} onChange={setActivePhase} />
          <div className="flex flex-col gap-2">
            {filtered.map((e) => {
              const sm = STATUS_MAP[e.status];
              const tone = PHASE_TONE[e.phase];
              const color = tone as FloatingShapeColor;
              return (
                <EngagementRow
                  key={e.id}
                  client={e.client}
                  project={e.project}
                  tone={tone}
                  icon={<FloatingShape shape={PHASE_SHAPE[e.phase]} color={color} size={20} />}
                  status={sm.status}
                  statusLabel={sm.label}
                  team={e.team}
                  metric={e.metric}
                  href="#"
                />
              );
            })}
          </div>
        </section>

        {/* SECTION 4 — CAPACITÉ */}
        <section className="flex flex-col gap-4">
          <SectionTitle>Capacité équipe</SectionTitle>
          <div className="rounded-2xl border border-neutral-grey-1 bg-neutral-white p-6">
            <p className="mb-4 font-labster text-[13px] text-neutral-grey-3">
              7 personnes — moyenne 85% utilisée cette semaine
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {TEAM_CAPACITY.map((m) => (
                <CapacityBar
                  key={m.name}
                  name={m.name}
                  bgColor={m.bgColor}
                  percentage={m.percentage}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-labster text-[12px] font-bold uppercase text-neutral-grey-3"
      style={{ letterSpacing: 1.5 }}
    >
      {children}
    </h2>
  );
}

export const Default: Story = {
  name: "Portefeuille — vue Remy Meyer (COO/BDM)",
  render: () => <PortefeuilleClients />,
};
