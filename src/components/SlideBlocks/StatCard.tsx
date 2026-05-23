import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — StatCard
 *
 * Card KPI — 2 variants observés dans le deck RFP `0akzw8mYzFByJcrrRgJbQp` :
 *
 * - **`default`** (node 1:1420) : icon + chiffre + label bold + supporting text regular.
 *   Visuel : padding 30/20, rounded-[10px], shadow 0 8px 12px rgba(0,46,70,0.1), texte grey-6.
 *
 * - **`minimal`** (node 1:5818) : barre d'accent colorée + gros chiffre + description.
 *   Visuel : padding 20px, rounded-[14px], shadow subtil rgba(27,42,74,0.06), chiffre grey-5 36px, description grey-3 14px Demibold.
 *   Pas d'icon — la barre d'accent (rouge/bleu/jaune) sert de marker visuel.
 */

export type StatCardVariant = "default" | "minimal";
export type StatCardAccentColor = "red" | "blue" | "yellow" | "green";

const ACCENT_COLOR: Record<StatCardAccentColor, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow",
  green: "bg-semantic-success",
};

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant. Défaut "default". */
  variant?: StatCardVariant;
  /** Picto/illustration top-left (variant=default uniquement). */
  icon?: ReactNode;
  /** Couleur de la barre d'accent (variant=minimal uniquement). Défaut "red". */
  accentColor?: StatCardAccentColor;
  /** Chiffre/statistique principale (ex: "20+", "150+"). */
  stat: ReactNode;
  /** Libellé en gras suivant le stat (variant=default uniquement). */
  label?: string;
  /** Texte d'appoint après le label (variant=default) ou description complète (variant=minimal). */
  supportingText?: string;
}

export function StatCard({
  variant = "default",
  icon,
  accentColor = "red",
  stat,
  label,
  supportingText,
  className,
  ...rest
}: StatCardProps) {
  if (variant === "minimal") {
    return (
      <div
        className={clsx(
          "flex flex-col items-start gap-3 rounded-[14px] bg-neutral-white p-5 font-labster",
          "shadow-[0_1px_1.5px_0_rgba(27,42,74,0.06)]",
          className,
        )}
        {...rest}
      >
        <span
          aria-hidden
          className={clsx("h-1 w-8 rounded-[2px]", ACCENT_COLOR[accentColor])}
        />
        <p className="text-[36px] font-bold leading-tight text-neutral-grey-5">{stat}</p>
        {supportingText ? (
          <p className="text-[14px] font-semibold leading-[1.15] text-neutral-grey-3">
            {supportingText}
          </p>
        ) : null}
      </div>
    );
  }

  // default variant
  return (
    <div
      className={clsx(
        "flex flex-col items-start gap-3 rounded-[10px] bg-neutral-white px-[30px] py-5 font-labster",
        "shadow-[0_8px_12px_0_rgba(0,46,70,0.1)]",
        className,
      )}
      {...rest}
    >
      <div className="flex items-start gap-6">
        {icon ? <div className="size-[60px] shrink-0">{icon}</div> : null}
        <p className="whitespace-nowrap text-[24px] font-bold leading-[1.3] tracking-[-0.1px] text-neutral-grey-6">
          {stat}
        </p>
      </div>
      {(label || supportingText) && (
        <p className="text-[20px] leading-[1.4] tracking-[-0.2px] text-neutral-grey-6">
          {label ? <span className="font-bold">{label} </span> : null}
          {supportingText ? <span className="font-normal">{supportingText}</span> : null}
        </p>
      )}
    </div>
  );
}
