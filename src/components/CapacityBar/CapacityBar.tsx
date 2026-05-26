import type { HTMLAttributes } from "react";
import clsx from "clsx";
import { Avatar, type AvatarBgColor } from "../Avatar";

/**
 * Labster DS — CapacityBar
 *
 * Row de capacité utilisateur : avatar + nom + progress bar + valeur + alert.
 * Composé depuis Figma frame node 45:2 (section CAPACITÉ ÉQUIPE).
 *
 * Layout :
 * [Avatar 32] [Nom + bar progress] [Valeur %]
 *
 * - Avatar via composant DS, taille 32
 * - Nom 13px Semi Bold grey-6
 * - Progress bar h-1.5 (6px) rounded-3px, track bg-smoke, fill bg-brand-blue
 *   (ou bg-brand-red si alert au-dessus du threshold)
 * - Valeur en gros à droite, alert color si dépassement
 *
 * Note DS : la progress bar est inline ici car pas de composant `ProgressBar`
 * standalone dans le DS. [GAP DS] — à extraire en composant à part dès qu'un
 * 2ème usage apparaît.
 */

export interface CapacityBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Nom complet (utilisé pour initiales + alt avatar). */
  name: string;
  /** Photo URL optionnelle. Sinon avatar avec initiales. */
  photo?: string;
  /** Couleur fond avatar (initiales). Défaut "blue". */
  bgColor?: AvatarBgColor;
  /** Pourcentage 0-100. */
  percentage: number;
  /** Seuil d'alerte (au-dessus = couleur rouge). Défaut 90. */
  alertThreshold?: number;
  /** Affiche la valeur % à droite. Défaut true. */
  showPercentage?: boolean;
}

export function CapacityBar({
  name,
  photo,
  bgColor = "blue",
  percentage,
  alertThreshold = 90,
  showPercentage = true,
  className,
  ...rest
}: CapacityBarProps) {
  const pct = Math.max(0, Math.min(100, percentage));
  const isAlert = pct >= alertThreshold;

  return (
    <div className={clsx("flex w-full items-center gap-3 font-labster", className)} {...rest}>
      <Avatar name={name} src={photo} bgColor={bgColor} size={32} />
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] font-semibold leading-tight text-neutral-grey-6">{name}</span>
          {showPercentage ? (
            <span
              className={clsx(
                "text-[12px] font-bold leading-none",
                isAlert ? "text-brand-red" : "text-neutral-grey-3",
              )}
            >
              {pct}%
            </span>
          ) : null}
        </div>
        {/* [GAP DS] ProgressBar standalone — extraire si 2ème usage */}
        <div className="relative h-1.5 w-full overflow-hidden rounded-[3px] bg-neutral-smoke">
          <div
            className={clsx(
              "h-full rounded-[3px] transition-[width]",
              isAlert ? "bg-brand-red" : "bg-brand-blue",
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
