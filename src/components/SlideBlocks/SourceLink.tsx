import type { AnchorHTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — SourceLink
 *
 * Bouton-pill jaune avec icon chain-link + texte souligné. Lien vers une source
 * externe (Notion, Drive, doc, étude, etc.) en bas de slide.
 *
 * Pattern observé sur 0akzw8mYzFByJcrrRgJbQp node 7:1917 ("Lien vers le document source").
 *
 * Composition :
 * - Background brand-yellow #FFC31D, rounded-pill, padding 12/16, gap 8
 * - Chain icon 16×16 grey-5
 * - Texte 16px Bold underlined grey-5
 *
 * Usage : footer de slide pour pointer la source d'un chiffre, d'une étude,
 * d'un document de référence. Rendu en tant que `<a>` accessible.
 */

export interface SourceLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Texte du lien. */
  label?: string;
  /** Couleur du fond. Défaut "yellow" (brand). */
  bgColor?: "yellow" | "blue-light" | "red-light";
}

const BG: Record<NonNullable<SourceLinkProps["bgColor"]>, string> = {
  yellow: "bg-brand-yellow",
  "blue-light": "bg-brand-blue-light",
  "red-light": "bg-brand-red-light",
};

function ChainIcon() {
  // Material Design `link` icon — chain link suggérant un hyperlien externe
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SourceLink({
  label,
  bgColor = "yellow",
  className,
  children,
  href,
  target = "_blank",
  rel,
  ...rest
}: SourceLinkProps) {
  const computedRel = target === "_blank" ? rel ?? "noopener noreferrer" : rel;

  return (
    <a
      href={href}
      target={target}
      rel={computedRel}
      className={clsx(
        "inline-flex w-fit items-center justify-center gap-2 self-start rounded-pill px-4 py-3 font-labster",
        "text-[16px] font-bold leading-[1.4] tracking-[-0.16px] text-neutral-grey-5 underline",
        "transition-opacity hover:opacity-90",
        BG[bgColor],
        className,
      )}
      {...rest}
    >
      <span className="grid size-4 place-items-center text-neutral-grey-5">
        <ChainIcon />
      </span>
      <span>{label ?? children ?? "Lien vers le document source"}</span>
    </a>
  );
}
