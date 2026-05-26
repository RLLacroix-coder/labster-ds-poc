import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { StatusBadge, type AgentStatus } from "../StatusBadge";
import { TeamStack, type TeamMember } from "../TeamStack";
import { Icon } from "../Icon";

/**
 * Labster DS — EngagementRow
 *
 * Ligne compacte d'engagement client — alternative scannable à l'AgentCard
 * verbose pour les listes denses (portfolio, pipeline, dashboard ops).
 *
 * Composé depuis Figma frame node 45:2 (section TOUS LES ENGAGEMENTS).
 *
 * Layout :
 * [strip 4px] [picto 32px] [client/projet] · · · [StatusBadge] [TeamStack] [metric] [chevron]
 *
 * - bg white, rounded-md (10px), border grey-1
 * - Hauteur fixe 72px
 * - Phase strip 4px gauche (tone brand red/blue/yellow)
 * - Picto 32×32 rounded-lg, bg light du tone
 * - Client 15px Bold grey-6, projet 13px regular grey-4
 * - Hover : subtle shadow, transition
 *
 * Distinct de AgentCard par : densité (72px vs 240+), 1 ligne vs verbose card.
 */

export type EngagementTone = "red" | "blue" | "yellow";

const TONE_STRIP: Record<EngagementTone, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow",
};

const TONE_PICTO_BG: Record<EngagementTone, string> = {
  red: "bg-brand-red-light",
  blue: "bg-brand-blue-light",
  yellow: "bg-brand-yellow-light",
};

export interface EngagementRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Nom du client (1ère ligne, Bold). */
  client: string;
  /** Nom du projet (2ème ligne, regular). */
  project: string;
  /** Tone brand selon la phase. */
  tone: EngagementTone;
  /** Slot icon dans le picto box (FloatingShape recommandé, 24×24). */
  icon?: ReactNode;
  /** Statut affiché via StatusBadge. */
  status?: AgentStatus;
  /** Override le label par défaut du status. */
  statusLabel?: string;
  /** Membres équipe (rendus via TeamStack, max 3 visibles + overflow). */
  team?: TeamMember[];
  /** Métrique clé (ex. "180 / 240h", "Kickoff 12 juin", "2 sem deadline"). */
  metric?: string;
  /** Si fourni, rend la row cliquable. */
  href?: string;
}

export function EngagementRow({
  client,
  project,
  tone,
  icon,
  status,
  statusLabel,
  team,
  metric,
  href,
  className,
  onClick,
  ...rest
}: EngagementRowProps) {
  const isInteractive = Boolean(href || onClick);
  const Component = (href ? "a" : isInteractive ? "button" : "div") as any;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={clsx(
        "relative flex w-full items-center overflow-hidden rounded-[10px] border border-neutral-grey-1 bg-neutral-white text-left font-labster",
        isInteractive &&
          "cursor-pointer transition-shadow hover:shadow-[0_2px_8px_0_rgba(14,41,70,0.06)]",
        className,
      )}
      style={{ height: 72 }}
      {...rest}
    >
      {/* Phase strip 4px */}
      <span aria-hidden className={clsx("absolute left-0 top-0 h-full w-1", TONE_STRIP[tone])} />

      {/* Picto */}
      <div className="ml-5 flex shrink-0 items-center">
        <div
          className={clsx(
            "grid size-8 place-items-center rounded-lg",
            TONE_PICTO_BG[tone],
          )}
        >
          {icon}
        </div>
      </div>

      {/* Client / project */}
      <div className="ml-3 flex min-w-0 flex-1 flex-col">
        <p className="truncate text-[15px] font-bold leading-tight text-neutral-grey-6">{client}</p>
        <p className="truncate text-[13px] font-normal leading-tight text-neutral-grey-4">{project}</p>
      </div>

      {/* Right zone : status + team + metric + chevron */}
      <div className="flex shrink-0 items-center gap-4 pr-4">
        {status ? <StatusBadge status={status} label={statusLabel} /> : null}
        {team && team.length > 0 ? <TeamStack members={team} maxVisible={3} size={32} /> : null}
        {metric ? (
          <span className="min-w-[140px] text-right text-[13px] font-semibold text-neutral-grey-5">
            {metric}
          </span>
        ) : null}
        <Icon name="chevron-right" size={18} className="text-neutral-grey-3" />
      </div>
    </Component>
  );
}
