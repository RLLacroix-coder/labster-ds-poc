import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — DeliverableCard
 *
 * Card pour livrables / sortie phase : picto + titre highlighté + bullets.
 * Pattern observé sur 0akzw8mYzFByJcrrRgJbQp node 1:3132 (RFP — Deliverables Phase 1).
 *
 * Composition :
 * - Background blanc, rounded-[10px], shadow elevation-large
 * - Padding 32px, gap 16px
 * - Header : picto 60×60 + titre 32px Bold avec surlignage red-light derrière le texte
 * - Bullets : dot bullet + texte 20px Regular grey-4
 *
 * Le highlight est un rectangle de fond positionné derrière le titre (h~24px,
 * couleur red-light par défaut, configurable).
 */

export interface DeliverableItem {
  content: ReactNode;
}

export type DeliverableHighlightColor = "red-light" | "blue-light" | "yellow-light" | "none";

const HIGHLIGHT_BG: Record<DeliverableHighlightColor, string> = {
  "red-light": "bg-brand-red-light",
  "blue-light": "bg-brand-blue-light",
  "yellow-light": "bg-brand-yellow-light",
  none: "bg-transparent",
};

const DOT_COLOR_CLS = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow",
} as const;

export interface DeliverableCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Picto/icon 60×60 à gauche du titre. */
  icon?: ReactNode;
  /** Titre de la card (ex: "Deliverables", "Output"). */
  title: string;
  /** Couleur de highlight derrière le titre. Défaut "red-light". */
  highlightColor?: DeliverableHighlightColor;
  /** Couleur des dots bullets. Défaut "red". */
  dotColor?: keyof typeof DOT_COLOR_CLS;
  items: DeliverableItem[];
}

export function DeliverableCard({
  icon,
  title,
  highlightColor = "red-light",
  dotColor = "red",
  items,
  className,
  ...rest
}: DeliverableCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-start gap-4 rounded-[10px] bg-neutral-white p-8 font-labster",
        "shadow-[0_8px_12px_0_rgba(0,46,70,0.1)]",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-4">
        {icon ? <div className="size-[60px] shrink-0">{icon}</div> : null}
        <span className="relative inline-flex items-center">
          {highlightColor !== "none" && (
            <span
              aria-hidden
              className={clsx(
                "absolute inset-x-0 -bottom-1 top-3 -z-0",
                HIGHLIGHT_BG[highlightColor],
              )}
            />
          )}
          <p className="relative z-10 text-[32px] font-bold leading-none text-neutral-grey-6">
            {title}
          </p>
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              aria-hidden
              className={clsx(
                "mt-2 inline-block size-2 shrink-0 rounded-full",
                DOT_COLOR_CLS[dotColor],
              )}
            />
            <p className="text-[20px] font-normal leading-[1.4] tracking-[-0.2px] text-neutral-grey-4">
              {it.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
