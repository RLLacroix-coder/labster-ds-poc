import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — EffortGanttCard
 *
 * Card workload / allocation : avatar + nom + role + 3 lignes bar chart (P1/P2/P3).
 * Pattern observé sur 0akzw8mYzFByJcrrRgJbQp node 1:6124 (RFP — Rachel Lacroix).
 *
 * Composition :
 * - Background blanc, rounded-[14px], drop-shadow subtil rgba(27,42,74,0.06)
 * - Padding-left 18px, padding-top 22px, gap 14px
 * - Avatar 46×46 rounded-full color custom + initiales 15px Bold white
 * - Nom 15px Bold #0E2946 + role 11px Demibold #A9B2BC ls 0.3px
 * - Bar rows : label phase 10px Bold grey-2 (w 22px right-aligned) + track 234×14 rounded-[4px] bg-smoke + fill bar color + day count 10px Bold #0E2946 (w 36px)
 *
 * Le ratio bar/track est calculé via la valeur `days` et `maxDays` (défaut auto-max).
 */

export type GanttBarColor = "red" | "blue" | "yellow" | "green";

const BAR_COLOR: Record<GanttBarColor, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow",
  green: "bg-semantic-success",
};

export interface GanttBar {
  /** Label de la phase (ex: "P1", "P2"). */
  label: string;
  /** Nombre de jours. */
  days: number;
  /** Couleur du remplissage. Défaut "blue". */
  color?: GanttBarColor;
}

export interface EffortGanttCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Nom complet (calcule initiales si avatar absent). */
  name: string;
  /** Rôle / fonction. */
  role?: string;
  /** Photo/node custom à la place des initiales. */
  avatar?: ReactNode;
  /** Couleur de l'avatar (initiales). Défaut "purple". */
  avatarColor?: "red" | "blue" | "yellow" | "purple" | "grey";
  /** Lignes de la mini-gantt (typiquement 1 à 4 phases). */
  bars: GanttBar[];
  /** Valeur max utilisée pour normaliser le ratio bar/track. Défaut : max(bars.days). */
  maxDays?: number;
  /** Suffixe d'unité affiché après la valeur. Défaut "d". */
  unit?: string;
}

const AVATAR_BG: Record<NonNullable<EffortGanttCardProps["avatarColor"]>, string> = {
  red: "bg-[#E63946]",
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow",
  purple: "bg-[#AF52DE]",
  grey: "bg-neutral-grey-3",
};

export function EffortGanttCard({
  name,
  role,
  avatar,
  avatarColor = "purple",
  bars,
  maxDays,
  unit = "d",
  className,
  ...rest
}: EffortGanttCardProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const computedMax = maxDays ?? Math.max(1, ...bars.map((b) => b.days));

  return (
    <div
      className={clsx(
        "flex flex-col items-start gap-[14px] rounded-[14px] bg-neutral-white p-[18px] font-labster",
        "shadow-[0_1px_1.5px_0_rgba(27,42,74,0.06)]",
        className,
      )}
      style={{ width: 340 }}
      {...rest}
    >
      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "grid size-[46px] shrink-0 place-items-center rounded-full",
            AVATAR_BG[avatarColor],
          )}
        >
          {avatar ?? (
            <span className="text-[15px] font-bold leading-none text-neutral-white">{initials}</span>
          )}
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[15px] font-bold leading-[18px] text-neutral-grey-6">{name}</p>
          {role ? (
            <p className="text-[11px] font-semibold leading-tight tracking-[0.3px] text-neutral-grey-2">
              {role}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex w-full flex-col gap-[6px]">
        {bars.map((bar, i) => {
          const ratio = Math.max(0, Math.min(1, bar.days / computedMax));
          const color = bar.color ?? "blue";
          return (
            <div key={i} className="flex items-center gap-2">
              <span className="w-[22px] text-right text-[10px] font-bold tracking-[0.5px] text-neutral-grey-2">
                {bar.label}
              </span>
              <div className="relative h-[14px] flex-1 overflow-hidden rounded-[4px] bg-neutral-smoke">
                <div
                  className={clsx("h-full rounded-[4px]", BAR_COLOR[color])}
                  style={{ width: `${ratio * 100}%` }}
                />
              </div>
              <span className="w-[36px] text-[10px] font-bold text-neutral-grey-6">
                {bar.days.toFixed(1)}
                {unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
