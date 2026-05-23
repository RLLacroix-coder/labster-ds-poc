import type { HTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — RoleCard
 *
 * Card descriptive d'un rôle projet : titre uppercase + phases impliquées (dots colorés) + description.
 * Pattern observé sur 0akzw8mYzFByJcrrRgJbQp node 1:5154 (RFP — "LEAD DS DESIGNER").
 *
 * Composition :
 * - Background blanc, rounded-[10px], shadow 0 8px 12px rgba(0,46,70,0.1)
 * - Padding 24px, gap 24px
 * - Header :
 *   - Titre 24px Bold uppercase tracking 0.5px #0E2946
 *   - Ligne "Phases :" : label 24px Regular grey-3 + dots colorés (24×24 chacun, gap 16px)
 * - Body : description 18px Regular grey-4
 *
 * Convention couleurs phases : red = P1, blue = P2, yellow = P3 (alignée sur EffortGanttCard).
 */

export type PhaseColor = "red" | "blue" | "yellow" | "green";

const PHASE_COLOR_BG: Record<PhaseColor, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow",
  green: "bg-semantic-success",
};

export interface RoleCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Titre du rôle (sera rendu en uppercase). */
  title: string;
  /** Description longue (1-3 phrases). */
  description: string;
  /** Phases impliquées : array de couleurs de dots. Si absent, ligne Phases non rendue. */
  phases?: PhaseColor[];
  /** Libellé du marqueur de phases. Défaut "Phases :". */
  phasesLabel?: string;
}

export function RoleCard({
  title,
  description,
  phases,
  phasesLabel = "Phases :",
  className,
  ...rest
}: RoleCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-start gap-6 rounded-[10px] bg-neutral-white p-6 font-labster",
        "shadow-[0_8px_12px_0_rgba(0,46,70,0.1)]",
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col items-start gap-2">
        <h3 className="text-[24px] font-bold uppercase leading-tight tracking-[0.5px] text-neutral-grey-6">
          {title}
        </h3>
        {phases && phases.length > 0 ? (
          <div className="flex items-center gap-4">
            <span className="text-[24px] font-normal leading-[1.35] tracking-[-0.24px] text-neutral-grey-3">
              {phasesLabel}
            </span>
            <div className="flex items-center gap-2">
              {phases.map((color, i) => (
                <span
                  key={i}
                  aria-hidden
                  className={clsx("inline-block size-6 rounded-full", PHASE_COLOR_BG[color])}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <p className="text-[18px] font-normal leading-[1.4] text-neutral-grey-4">{description}</p>
    </div>
  );
}
