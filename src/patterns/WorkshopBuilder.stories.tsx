import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import {
  AppShell,
  Sidebar,
  SidebarNavItem,
  PageHeader,
  Avatar,
  Button,
  Badge,
  Checkbox,
  Icon,
  LabsterLogo,
  type AvatarBgColor,
} from "@labster-ds-poc";

/**
 * Pattern : Workshop Builder (vue Léa Kaufmann, UX Designer Senior)
 *
 * Workflow 2 USAGE — pipeline design-first :
 * 1. Brief produit (workshop fiche partageable client, < 15 min de prep)
 * 2. Design intent textuel + ASCII mockup + 3 décisions tranchées
 * 3. Figma frame design intent (Test Usage DS page, file 02-Labster-DS-V0.1) —
 *    blocage MCP sandbox sur build complexe, 1er render partiel validé comme intent
 * 4. Vibe-code aligné DS (ce fichier)
 *
 * Composition (zéro invention paresseuse) :
 * - DS existant : AppShell, Sidebar+SidebarNavItem, PageHeader, Avatar, Button,
 *   Badge, Checkbox, Icon, LabsterLogo
 * - Helpers inline pattern-specific : WorkshopSection (card + accent band top),
 *   AgendaItem (bullet num + title + desc + timer, app-scale — slide TimedListItem
 *   est slide-scale donc inadapté ici, gap flagé dans findings)
 *
 * Noms fictifs anonymisés — pas de vrais clients Labster.
 */

const meta: Meta = {
  title: "Patterns/Test Usage DS/Workshop Builder",
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, iframeHeight: 1100 },
      description: {
        component:
          "Fiche workshop partageable client pour Léa Kaufmann (UX Designer Senior, Labster). " +
          "Produit via Workflow 2 USAGE : brief → design intent (text + ASCII + Figma partial) → vibe-code aligné DS. " +
          "💡 Passe en mode Canvas pour voir pleine page.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// Mock data — fictifs anonymisés
// =============================================================================

type Tone = "red" | "blue" | "yellow" | "green";

interface Activity {
  n: number;
  title: string;
  desc: string;
  min: number;
  tone: Tone;
}

const ACTIVITIES: Activity[] = [
  { n: 1, title: "Icebreaker & cadrage", desc: "Présentations rapides + rappel objectifs du workshop", min: 15, tone: "blue" },
  { n: 2, title: "Partage des 3 KPIs business", desc: "Chaque participant client pitche ses KPIs prioritaires (5 min/pers)", min: 30, tone: "yellow" },
  { n: 3, title: "Cartographie des opportunités", desc: "Brainwriting individuel puis regroupement en clusters", min: 45, tone: "yellow" },
  { n: 4, title: "Discussion & priorisation", desc: "Vote dot-voting + débat sur les 3 finalistes", min: 45, tone: "blue" },
  { n: 5, title: "Production : roadmap delivery", desc: "Co-construction du planning sprint design 12 semaines", min: 30, tone: "red" },
  { n: 6, title: "Wrap-up & next steps", desc: "Récap décisions + ownership + prochains rendez-vous", min: 15, tone: "blue" },
];

const OUTCOMES = [
  "Liste partagée des 3 KPIs business prioritaires Aurora",
  "Backlog priorisé des opportunités produit (10–15 items)",
  "Choix conjoint des 3 sujets pour le prochain sprint design",
  "Validation du planning de delivery (12 semaines)",
];

type WorkshopRole = "Facilitatrice" | "Co-facilitateur" | "Décideuse client" | "Contributeur" | "Contributrice" | "Observateur";

interface Participant {
  name: string;
  role: WorkshopRole;
  bgColor: AvatarBgColor;
}

const PARTICIPANTS: Participant[] = [
  { name: "Léa Kaufmann", role: "Facilitatrice", bgColor: "red" },
  { name: "Théo Marchand", role: "Co-facilitateur", bgColor: "red" },
  { name: "Iris Lemoine", role: "Décideuse client", bgColor: "blue" },
  { name: "Karim Aït-Saïd", role: "Contributeur", bgColor: "blue" },
  { name: "Camille Vasseur", role: "Contributrice", bgColor: "yellow" },
  { name: "Eliot Wagner", role: "Observateur", bgColor: "smoke" },
];

const MATERIALS = [
  "Post-its (3 couleurs)",
  "Marqueurs noirs (1/pers)",
  "Dot-voting stickers (10/pers)",
  "Ordinateur facilitateur",
  "Vidéoprojecteur HDMI",
  "Tableau blanc + 2 paperboards",
  "Café & croissants",
];

// =============================================================================
// Helpers inline (pattern-specific, pas extraits en DS)
// =============================================================================

const ACCENT_BG: Record<Tone, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow",
  green: "bg-semantic-success",
};

const TONE_BULLET_BG: Record<Tone, string> = {
  red: "bg-brand-red text-neutral-white",
  blue: "bg-brand-blue text-neutral-white",
  yellow: "bg-brand-yellow text-neutral-grey-6",
  green: "bg-semantic-success text-neutral-white",
};

const TONE_TIMER: Record<Tone, { bg: string; border: string; text: string }> = {
  red: { bg: "bg-brand-red-light", border: "border-brand-red/30", text: "text-brand-red" },
  blue: { bg: "bg-brand-blue-light", border: "border-brand-blue/30", text: "text-brand-blue" },
  yellow: { bg: "bg-brand-yellow-light", border: "border-brand-yellow/40", text: "text-neutral-grey-6" },
  green: { bg: "bg-[#E0F5EA]", border: "border-semantic-success/30", text: "text-semantic-success" },
};

interface WorkshopSectionProps {
  title: string;
  meta?: string;
  accent: Tone;
  children: React.ReactNode;
  className?: string;
}

/**
 * Card pattern Workshop Builder : white bg + rounded-2xl + bandeau couleur 8px top.
 * Aligné AgentCard / DeliverableCard / PriorityCard (même grammaire visuelle), mais
 * sémantique propre (section workshop, pas agent ni delivery).
 */
function WorkshopSection({ title, meta, accent, children, className }: WorkshopSectionProps) {
  return (
    <section
      className={clsx(
        "overflow-hidden rounded-2xl border border-neutral-grey-1 bg-neutral-white font-labster",
        className,
      )}
    >
      <div className={clsx("h-2 w-full", ACCENT_BG[accent])} />
      <div className="px-6 pb-5 pt-4">
        <header className="mb-4 flex items-baseline gap-3">
          <h2 className="text-[18px] font-bold leading-tight text-neutral-grey-6">{title}</h2>
          {meta ? (
            <span className="text-[13px] font-normal text-neutral-grey-3">{meta}</span>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}

interface AgendaItemProps {
  activity: Activity;
}

/**
 * Ligne d'agenda app-scale (bullet 40px, title 16px). Inspiré de TimedListItem
 * mais à l'échelle de l'app, pas du slide (TimedListItem = 60px bullet / 38px title).
 */
function AgendaItem({ activity }: AgendaItemProps) {
  const timer = TONE_TIMER[activity.tone];
  return (
    <div className="flex items-center gap-4">
      <div
        className={clsx(
          "grid size-10 shrink-0 place-items-center rounded-full text-[15px] font-bold",
          TONE_BULLET_BG[activity.tone],
        )}
      >
        {activity.n}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold leading-tight text-neutral-grey-6">
          {activity.title}
        </p>
        <p className="mt-1 text-[13px] font-normal leading-snug text-neutral-grey-4">
          {activity.desc}
        </p>
      </div>
      <div
        className={clsx(
          "flex h-14 w-20 shrink-0 flex-col items-center justify-center rounded-xl border",
          timer.bg,
          timer.border,
          timer.text,
        )}
      >
        <span className="text-[20px] font-bold leading-none">{activity.min}</span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide">min</span>
      </div>
    </div>
  );
}

interface ParticipantCardProps {
  participant: Participant;
}

function ParticipantCard({ participant }: ParticipantCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Avatar name={participant.name} size={64} bgColor={participant.bgColor} />
      <p className="text-center text-[14px] font-semibold leading-tight text-neutral-grey-6">
        {participant.name}
      </p>
      <p className="text-center text-[12px] font-normal leading-tight text-neutral-grey-3">
        {participant.role}
      </p>
    </div>
  );
}

// =============================================================================
// Pattern composant
// =============================================================================

const TOTAL_MIN = ACTIVITIES.reduce((acc, a) => acc + a.min, 0);
const TOTAL_HOURS = Math.floor(TOTAL_MIN / 60);
const TOTAL_REM_MIN = TOTAL_MIN % 60;
const TOTAL_DURATION = TOTAL_REM_MIN === 0 ? `${TOTAL_HOURS}h` : `${TOTAL_HOURS}h${String(TOTAL_REM_MIN).padStart(2, "0")}`;

function WorkshopBuilder() {
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
            <div className="flex items-center gap-3 px-2">
              <Avatar name="Léa Kaufmann" size={32} bgColor="red" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold leading-tight text-neutral-grey-6">
                  Léa Kaufmann
                </p>
                <p className="truncate text-[11px] font-normal leading-tight text-neutral-grey-3">
                  UX Designer Senior
                </p>
              </div>
            </div>
          }
        >
          <SidebarNavItem icon={<Icon name="home" size={18} />} label="Overview" href="#" />
          <SidebarNavItem icon={<Icon name="sparkles" size={18} />} label="Workshops" href="#" active />
          <SidebarNavItem icon={<Icon name="bar-chart" size={18} />} label="Templates" href="#" />
          <SidebarNavItem icon={<Icon name="users" size={18} />} label="Clients" href="#" />
          <SidebarNavItem icon={<Icon name="settings" size={18} />} label="Settings" href="#" />
        </Sidebar>
      }
    >
      <div className="mx-auto flex max-w-[1080px] flex-col gap-6">
        <PageHeader
          title="Discovery sprint — Aurora Cosmetics"
          subtitle={`12 juin 2026  ·  ${TOTAL_DURATION}  ·  Présentiel Paris`}
          actions={
            <>
              <Badge variant="info" size="Medium">
                Discovery
              </Badge>
              <Button variant="accent-cta">Envoyer au client</Button>
            </>
          }
        />

        {/* Objectif */}
        <WorkshopSection title="Objectif" accent="blue">
          <p className="text-[15px] leading-[1.55] text-neutral-grey-5">
            Aligner les équipes Aurora Cosmetics et Labster sur les enjeux business prioritaires
            et identifier les 3 opportunités produit à explorer en sprint design.
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {OUTCOMES.map((o) => (
              <li key={o} className="flex items-start gap-3">
                <span className="mt-2 inline-block size-2 shrink-0 rounded-full bg-brand-blue" />
                <span className="text-[14px] leading-[1.5] text-neutral-grey-5">{o}</span>
              </li>
            ))}
          </ul>
        </WorkshopSection>

        {/* Agenda */}
        <WorkshopSection
          title="Agenda"
          meta={`${TOTAL_DURATION}  ·  ${ACTIVITIES.length} activités`}
          accent="red"
        >
          <ol className="flex flex-col gap-4">
            {ACTIVITIES.map((a) => (
              <li key={a.n}>
                <AgendaItem activity={a} />
              </li>
            ))}
          </ol>
        </WorkshopSection>

        {/* Bottom row: Participants + Matériel */}
        <div className="grid grid-cols-[1fr_400px] gap-6">
          <WorkshopSection
            title="Participants"
            meta={`${PARTICIPANTS.length} personnes`}
            accent="yellow"
          >
            <div className="grid grid-cols-3 gap-x-4 gap-y-6">
              {PARTICIPANTS.map((p) => (
                <ParticipantCard key={p.name} participant={p} />
              ))}
            </div>
          </WorkshopSection>

          <WorkshopSection
            title="Matériel"
            meta={`${MATERIALS.length} items`}
            accent="green"
          >
            <ul className="flex flex-col gap-2.5">
              {MATERIALS.map((m) => (
                <li key={m}>
                  <Checkbox label={m} />
                </li>
              ))}
            </ul>
          </WorkshopSection>
        </div>
      </div>
    </AppShell>
  );
}

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  render: () => <WorkshopBuilder />,
};
