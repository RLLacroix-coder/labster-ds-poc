import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — InsightCard
 *
 * Card "Proof points / Insight" : icon trust + titre + corps texte.
 * 2 layouts observés dans le deck RFP `0akzw8mYzFByJcrrRgJbQp` :
 * - `bullets` (node 1:1466) : "Proof points" → titre grey-6 + bullets list (dot color)
 * - `quote` (node 1:3036)   : "Insight" → titre grey-3 + single text entouré de quote marks
 *
 * Composition commune :
 * - Background blanc, rounded-[10px], shadow 0 8px 12px rgba(0,46,70,0.1)
 * - Padding 30-32px, gap 16-24px
 * - Header : icon trust 40×40 (slot, ex: `<Icon name="verified" />`) + titre
 *
 * Le slot `icon` permet de varier la couleur — typiquement blue pour proof points,
 * red pour insight (ton brand red).
 */

export interface InsightItem {
  /** Texte (ReactNode pour permettre <strong> inline). */
  content: ReactNode;
}

export type InsightLayout = "bullets" | "quote";
export type InsightTitleColor = "grey-6" | "grey-3" | "grey-4";
export type InsightAccentColor = "blue" | "red" | "yellow";

const TITLE_COLOR: Record<InsightTitleColor, string> = {
  "grey-6": "text-neutral-grey-6",
  "grey-3": "text-neutral-grey-3",
  "grey-4": "text-neutral-grey-4",
};

const ACCENT_COLOR_BG: Record<InsightAccentColor, string> = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
};

const ACCENT_COLOR_HEX: Record<InsightAccentColor, string> = {
  blue: "#476AE3",
  red: "#EF4C59",
  yellow: "#FFC31D",
};

export interface InsightCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon top-left (40×40, ex: `<Icon name="verified" />`). */
  icon?: ReactNode;
  /** Titre principal (ex: "Proof points", "Insight"). */
  title: string;
  /** Couleur du titre. Défaut "grey-6" (dark). "grey-3" pour variant Insight. */
  titleColor?: InsightTitleColor;
  /** Layout du corps de la card. Défaut "bullets". */
  layout?: InsightLayout;
  /** Items. Si layout=quote, seul items[0] est rendu en quote. */
  items: InsightItem[];
  /** Couleur des bullet dots (layout=bullets). Défaut "blue". */
  dotColor?: InsightAccentColor;
  /** Couleur des quote marks (layout=quote). Défaut "red". */
  quoteColor?: InsightAccentColor;
}

function QuoteMark({ color, flipped }: { color: string; flipped?: boolean }) {
  // Quote mark inspiré du Figma "Picto-quote-down" (Divers picto).
  // Forme : 2 virgules typographiques (curve descendante). 16×12.4 viewBox.
  return (
    <svg
      width={16}
      height={12}
      viewBox="0 0 16 12"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ transform: flipped ? "rotate(180deg)" : undefined, flexShrink: 0 }}
    >
      <path
        d="M0 12V8c0-2.2 0.8-4.1 2.4-5.6C4 0.9 6 0.2 8 0v2.5c-2.3 0.5-3.5 1.7-3.6 3.7H7V12H0zm9 0V8c0-2.2 0.8-4.1 2.4-5.6C13 0.9 15 0.2 17 0v2.5c-2.3 0.5-3.5 1.7-3.6 3.7H16V12H9z"
        fill={color}
      />
    </svg>
  );
}

export function InsightCard({
  icon,
  title,
  titleColor = "grey-6",
  layout = "bullets",
  items,
  dotColor = "blue",
  quoteColor = "red",
  className,
  ...rest
}: InsightCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-start gap-6 rounded-[10px] bg-neutral-white p-[30px] font-labster",
        "shadow-[0_8px_12px_0_rgba(0,46,70,0.1)]",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-6">
        {icon ? <div className="size-10 shrink-0">{icon}</div> : null}
        <p
          className={clsx(
            "font-bold leading-[1.3] tracking-[0.1px]",
            layout === "quote" ? "text-[32px]" : "text-[30px]",
            TITLE_COLOR[titleColor],
          )}
        >
          {title}
        </p>
      </div>

      {layout === "bullets" ? (
        <ul className="flex w-full flex-col gap-4">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-4">
              <span
                aria-hidden
                className={clsx(
                  "mt-3 inline-block size-2 shrink-0 rounded-full",
                  ACCENT_COLOR_BG[dotColor],
                )}
              />
              <p className="text-[24px] font-normal leading-[1.3] tracking-[-0.1px] text-neutral-grey-6">
                {it.content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex w-full items-start gap-4 py-10">
          <QuoteMark color={ACCENT_COLOR_HEX[quoteColor]} />
          <p className="flex-1 text-[32px] font-bold leading-tight text-neutral-grey-6">
            {items[0]?.content}
          </p>
          <div className="self-end">
            <QuoteMark color={ACCENT_COLOR_HEX[quoteColor]} flipped />
          </div>
        </div>
      )}
    </div>
  );
}
