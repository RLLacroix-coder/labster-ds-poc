import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — PriorityCard
 *
 * Card "Priorité de la semaine" — décision urgente, renouvellement, deal à pousser, etc.
 * Composé depuis Figma frame node 45:2 (section PRIORITÉS DE LA SEMAINE).
 *
 * Composition :
 * - White card, rounded-2xl (16px), border grey-1 + shadow subtle
 * - Strip top 6px = tone brand (red urgent / blue renouvellement / yellow opportunité)
 * - Category label uppercase 11px Bold ls 1.5 = tone color
 * - Title 20px Bold grey-6
 * - Reason 14px Regular grey-4 (line-height 20)
 * - Footer : deadline (tone color, Bold) + CTA "Voir →" (grey-6, Bold)
 *
 * Cohérent avec : AgentCard (strip top + structure card), DeliverableCard (highlight pattern).
 * Distinct de AgentCard par : pas de Picto top-left, pas de TeamStack, focus sur l'action.
 */

export type PriorityTone = "red" | "blue" | "yellow";

const TONE_STRIP_BG: Record<PriorityTone, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow",
};

const TONE_TEXT: Record<PriorityTone, string> = {
  red: "text-brand-red",
  blue: "text-brand-blue",
  yellow: "text-brand-yellow",
};

export interface PriorityCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Catégorie uppercase ex. "DÉCISION URGENTE", "RENOUVELLEMENT", "DEAL À POUSSER". */
  category: string;
  /** Titre principal (client + projet). */
  title: string;
  /** Raison / context — 1-2 phrases. */
  reason: string;
  /** Deadline ou échéance ex. "→ 2 semaines". */
  deadline?: string;
  /** Label du CTA. Défaut "Voir →". */
  ctaLabel?: string;
  /** Slot optionnel pour le CTA (override le simple text si tu veux un Button). */
  ctaSlot?: ReactNode;
  /** Tone brand. Défaut "red". */
  tone?: PriorityTone;
  /** Si fourni, rend la card cliquable. */
  href?: string;
}

export function PriorityCard({
  category,
  title,
  reason,
  deadline,
  ctaLabel = "Voir →",
  ctaSlot,
  tone = "red",
  href,
  className,
  onClick,
  ...rest
}: PriorityCardProps) {
  const isInteractive = Boolean(href || onClick);
  const Component = (href ? "a" : isInteractive ? "button" : "div") as any;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={clsx(
        "relative block w-full overflow-hidden rounded-2xl border border-neutral-grey-1 bg-neutral-white text-left font-labster",
        "shadow-[0_4px_12px_0_rgba(14,41,70,0.06)]",
        isInteractive &&
          "cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_0_rgba(14,41,70,0.10)]",
        className,
      )}
      {...rest}
    >
      <span aria-hidden className={clsx("block h-[6px] w-full", TONE_STRIP_BG[tone])} />
      <div className="flex flex-col gap-3 p-6">
        <span
          className={clsx(
            "text-[11px] font-bold uppercase",
            TONE_TEXT[tone],
          )}
          style={{ letterSpacing: 1.5 }}
        >
          {category}
        </span>
        <h3 className="text-[20px] font-bold leading-tight text-neutral-grey-6">{title}</h3>
        <p className="text-[14px] font-normal leading-[20px] text-neutral-grey-4">{reason}</p>
        <div className="mt-2 flex items-baseline justify-between gap-3">
          {deadline ? (
            <span className={clsx("text-[14px] font-bold", TONE_TEXT[tone])}>{deadline}</span>
          ) : (
            <span />
          )}
          {ctaSlot ?? (
            <span className="text-[14px] font-bold text-neutral-grey-6">{ctaLabel}</span>
          )}
        </div>
      </div>
    </Component>
  );
}
