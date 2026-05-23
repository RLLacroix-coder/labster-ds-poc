import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { StatusBadge, type AgentStatus } from "../StatusBadge";

/**
 * Labster DS — AgentCard
 *
 * Card pour représenter un agent IA dans une liste app (Labsterse dashboard).
 *
 * Design brand Labster (refait depuis le mockup Atlas en respectant le DS) :
 * - White card, rounded-2xl, border grey-1 + shadow subtle
 * - Bandeau couleur 8px en haut (brand color = catégorie)
 * - Picto/icon top-left (40-48px, brand color matching tone)
 * - Titre Bold grey-6 avec surlignage light (red-light/blue-light/yellow-light)
 *   — cf. pattern DeliverableCard
 * - Description grey-4
 * - Footer : meta items (Created, Total runs) + StatusBadge à droite
 *
 * Tones :
 * - "red"    → bande red,    Picto rouge,   highlight red-light
 * - "blue"   → bande blue,   Picto bleu,    highlight blue-light
 * - "yellow" → bande yellow, Picto jaune,   highlight yellow-light
 *
 * Cohérent avec : StatCard (variant minimal accent bar), DeliverableCard (highlight pattern),
 * RoleCard (header structure), InsightCard (icon + content layout).
 */

export type AgentCardTone = "red" | "blue" | "yellow";

const TONE_STRIP_BG: Record<AgentCardTone, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow",
};

const TONE_HIGHLIGHT_BG: Record<AgentCardTone, string> = {
  red: "bg-brand-red-light",
  blue: "bg-brand-blue-light",
  yellow: "bg-brand-yellow-light",
};

export interface AgentCardMeta {
  label: string;
  value: ReactNode;
}

export interface AgentCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Nom de l'agent (titre, avec highlight derrière). */
  name: string;
  /** Description courte (2-3 phrases, grey-4). */
  description?: string;
  /** Items metadata (ex: Created date, Total runs). */
  meta?: AgentCardMeta[];
  /** Statut affiché en bottom-right via StatusBadge. */
  status?: AgentStatus;
  /** Override le label par défaut du status. */
  statusLabel?: string;
  /** Tone brand. Défaut "blue". Définit la couleur du strip top + Picto + highlight. */
  tone?: AgentCardTone;
  /** Slot icon top-left (Picto, FloatingShape, ou custom). Taille 48×48 recommandée. */
  icon?: ReactNode;
  /** Si fourni, rend la card cliquable (a href). */
  href?: string;
  /** Hauteur minimum (px). Défaut auto (≈ 240). */
  minHeight?: number;
}

export function AgentCard({
  name,
  description,
  meta,
  status,
  statusLabel,
  tone = "blue",
  icon,
  href,
  minHeight = 240,
  className,
  onClick,
  ...rest
}: AgentCardProps) {
  const isInteractive = Boolean(href || onClick);
  const Component = (href ? "a" : isInteractive ? "button" : "div") as any;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={clsx(
        "relative block w-full overflow-hidden rounded-2xl border border-neutral-grey-1 bg-neutral-white text-left font-labster",
        "shadow-[0_2px_8px_0_rgba(14,41,70,0.06)]",
        isInteractive &&
          "cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_0_rgba(14,41,70,0.10)]",
        className,
      )}
      style={{ minHeight }}
      {...rest}
    >
      {/* Top color band */}
      <span aria-hidden className={clsx("block h-2 w-full", TONE_STRIP_BG[tone])} />

      <div className="flex h-full flex-col gap-4 p-6" style={{ minHeight: minHeight - 8 }}>
        {/* Header : Picto */}
        {icon ? <div className="size-12 shrink-0">{icon}</div> : null}

        {/* Title with highlight (rectangle net, largeur du texte uniquement) */}
        <h3 className="relative inline-block self-start">
          <span
            aria-hidden
            className={clsx(
              "absolute inset-x-0 bottom-0 top-1/2 -z-0",
              TONE_HIGHLIGHT_BG[tone],
            )}
          />
          <span className="relative z-10 text-[20px] font-bold leading-tight text-neutral-grey-6">
            {name}
          </span>
        </h3>

        {/* Description */}
        {description ? (
          <p
            className="text-[14px] font-normal leading-snug text-neutral-grey-4"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
        ) : null}

        {/* Footer : meta + status */}
        <div className="mt-auto flex items-end justify-between gap-2 border-t border-neutral-grey-1 pt-4">
          <dl className="flex flex-col gap-0.5 text-[12px] leading-tight text-neutral-grey-3">
            {meta?.map((m, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <dt className="font-semibold">{m.label}:</dt>
                <dd className="font-normal text-neutral-grey-5">{m.value}</dd>
              </div>
            ))}
          </dl>
          {status ? <StatusBadge status={status} label={statusLabel} /> : null}
        </div>
      </div>
    </Component>
  );
}

export const AGENT_CARD_TONES: AgentCardTone[] = ["red", "blue", "yellow"];
