import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — SlideParagraph
 *
 * Paragraphe formaté pour slides : lead bold + body regular, typographie 24px grey-5.
 * Pattern observé sur 0akzw8mYzFByJcrrRgJbQp node 7:1917 (workshop content).
 *
 * Typo Figma :
 * - Family : Fieldwork Geo Bold (lead) / Regular (body), fallback labster
 * - Size : 24px, line-height 1.35, letter-spacing -0.24, color #273C53 (grey-5)
 *
 * Usage : blocs de texte longs sur slides (descriptions, copy d'introduction,
 * narration de workshop). Pour les bullets, préférer InsightCard.
 */

export type SlideParagraphSize = "sm" | "md" | "lg";

const SIZE_CLASS: Record<SlideParagraphSize, string> = {
  sm: "text-[18px] leading-[1.4]",
  md: "text-[24px] leading-[1.35] tracking-[-0.24px]",
  lg: "text-[32px] leading-[1.35] tracking-[-0.32px]",
};

export interface SlideParagraphProps extends Omit<HTMLAttributes<HTMLParagraphElement>, "children"> {
  /** Phrase d'amorce en gras (généralement le début du paragraphe). */
  lead?: string;
  /** Reste du paragraphe en regular. */
  body?: ReactNode;
  /** Contenu libre (alternative à lead+body). */
  children?: ReactNode;
  /** Taille typographique. Défaut "md" (24px, valeur Figma RFP). */
  size?: SlideParagraphSize;
}

export function SlideParagraph({
  lead,
  body,
  children,
  size = "md",
  className,
  ...rest
}: SlideParagraphProps) {
  return (
    <p
      className={clsx(
        "font-labster font-normal text-neutral-grey-5",
        SIZE_CLASS[size],
        className,
      )}
      {...rest}
    >
      {lead ? <span className="font-bold">{lead}</span> : null}
      {lead && body ? " " : null}
      {body}
      {children}
    </p>
  );
}
