import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Timer, type TimerColor } from "./Timer";

/**
 * Labster DS — TimedListItem
 *
 * Ligne d'agenda time-boxed : bullet numérique + titre/description + Timer compact à droite.
 * Pattern observé sur 0akzw8mYzFByJcrrRgJbQp node 7:1810 (workshop agenda format).
 *
 * Composition (gap 32px entre colonnes) :
 * - Bullet num : cercle 60×60 rouge avec chiffre blanc 38px Demibold
 * - Contenu : titre 38px Regular grey-5 + description 30px Regular grey-5
 * - Timer compact : 110×110 sans icon (cf. Timer composant)
 *
 * Usage : workshop agendas, sprint ceremonies time-boxing, training modules.
 */

export interface TimedListItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Numéro affiché dans le bullet (1, 2, 3...). */
  number: number | string;
  /** Couleur du bullet num. Défaut "red". */
  bulletColor?: TimerColor;
  /** Titre de l'item (1 phrase, 38px Regular). */
  title: ReactNode;
  /** Description longue (1-2 phrases, 30px Regular). */
  description?: ReactNode;
  /** Durée pour le Timer compact à droite. Si absent, pas de Timer. */
  durationValue?: string | number;
  /** Unité du Timer. Défaut "min.". */
  durationUnit?: string;
  /** Couleur du Timer. Défaut "red". */
  timerColor?: TimerColor;
}

const BULLET_BG: Record<TimerColor, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow",
  green: "bg-semantic-success",
};

export function TimedListItem({
  number,
  bulletColor = "red",
  title,
  description,
  durationValue,
  durationUnit = "min.",
  timerColor = "red",
  className,
  ...rest
}: TimedListItemProps) {
  return (
    <div
      className={clsx("flex items-start gap-8 font-labster", className)}
      {...rest}
    >
      <div className="flex items-center pt-2">
        <div
          className={clsx(
            "grid size-[60px] place-items-center rounded-full",
            BULLET_BG[bulletColor],
          )}
        >
          <span className="text-center text-[38px] font-semibold leading-[1.45] text-neutral-white">
            {number}
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start justify-center">
        <p className="text-[38px] font-normal leading-[1.45] text-neutral-grey-5">{title}</p>
        {description ? (
          <p className="mt-4 text-[30px] font-normal leading-[1.4] tracking-[-0.3px] text-neutral-grey-5">
            {description}
          </p>
        ) : null}
      </div>

      {durationValue !== undefined ? (
        <Timer
          value={durationValue}
          unit={durationUnit}
          size={110}
          showIcon={false}
          color={timerColor}
        />
      ) : null}
    </div>
  );
}
