import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — KpiCard
 *
 * Card KPI pour dashboards app. Format sobre : gros chiffre + label dessous.
 *
 * À distinguer de :
 * - `StatCard` (slide blocks) : pour slides/decks marketing, plus visuel (icon, ombres lourdes)
 * - `KpiCard` (ici) : pour dashboards app, plus dense, design system "data"
 *
 * Composition :
 * - Background blanc, border grey-1 fine, rounded-lg
 * - Padding 24px
 * - Gros chiffre 40px Bold grey-6
 * - Label 14px Regular grey-3 en-dessous
 * - Optionnel : icon top-right (compact)
 */

export interface KpiCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Valeur (chiffre/string ex: "5", "7,534", "12%"). */
  value: ReactNode;
  /** Libellé descriptif sous la valeur. */
  label: string;
  /** Icon à droite du titre (optionnel, taille compacte ~20px). */
  icon?: ReactNode;
  /** Indicateur de tendance optionnel (ex: "+12%"). */
  trend?: ReactNode;
}

export function KpiCard({
  value,
  label,
  icon,
  trend,
  className,
  ...rest
}: KpiCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-start gap-2 rounded-lg border border-neutral-grey-1 bg-neutral-white p-6 font-labster",
        className,
      )}
      {...rest}
    >
      <div className="flex w-full items-start justify-between">
        <p
          className="font-bold text-neutral-grey-6"
          style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: "-0.02em" }}
        >
          {value}
        </p>
        {icon ? <span className="mt-2 text-neutral-grey-3">{icon}</span> : null}
      </div>
      <div className="flex w-full items-center justify-between gap-3">
        <p
          className="font-normal text-neutral-grey-3"
          style={{ fontSize: 15, lineHeight: 1.2 }}
        >
          {label}
        </p>
        {trend ? (
          <span
            className="font-semibold text-neutral-grey-4"
            style={{ fontSize: 13, lineHeight: 1 }}
          >
            {trend}
          </span>
        ) : null}
      </div>
    </div>
  );
}
