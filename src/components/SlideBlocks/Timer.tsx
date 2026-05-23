import type { HTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — Timer
 *
 * Indicateur de durée circulaire (cercle blanc + icon clock + valeur + unité).
 * Pattern observé sur 0akzw8mYzFByJcrrRgJbQp node 7:1833 (lg avec icon)
 * et node 7:1816 (sm sans icon, intégré dans TimedListItem).
 *
 * Composition :
 * - Cercle blanc rounded-full + drop-shadow
 * - Optionnel : icon clock (Material `timelapse`) en haut
 * - Valeur (gros chiffre) + unité (petit suffixe), couleur configurable
 *
 * Usage : ateliers, agendas timeboxed, retro time-boxing, sprint pacing.
 */

export type TimerColor = "red" | "blue" | "yellow" | "green";

const TIMER_COLOR_HEX: Record<TimerColor, string> = {
  red: "#EF4C59",
  blue: "#476AE3",
  yellow: "#FFC31D",
  green: "#4ECCA3",
};

export interface TimerProps extends HTMLAttributes<HTMLDivElement> {
  /** Valeur (nombre ou string ex: "15", "1h30"). */
  value: string | number;
  /** Unité (ex: "min.", "h", "sec."). Défaut "min.". */
  unit?: string;
  /** Taille du cercle en px. Défaut 193 (large variant). */
  size?: number;
  /** Affiche l'icon clock. Défaut true. */
  showIcon?: boolean;
  /** Couleur du texte et de l'icon. Défaut "red". */
  color?: TimerColor;
}

function ClockIcon({ color, size }: { color: string; size: number }) {
  // Material Design `timelapse` icon : cercle + portion remplie évoquant un timer
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16.24 7.76C15.07 6.58 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        fill={color}
      />
    </svg>
  );
}

export function Timer({
  value,
  unit = "min.",
  size = 193,
  showIcon = true,
  color = "red",
  className,
  style,
  ...rest
}: TimerProps) {
  const colorHex = TIMER_COLOR_HEX[color];
  // Dimensions proportionnelles : référence Figma 193px.
  // Note : valeurs Figma natives (66/40 px) supposent Fieldwork Geo Bold.
  // Avec fallback Inter (plus large), on réduit pour éviter overflow du disque.
  const ratio = size / 193;
  const iconSize = Math.round(60 * ratio);
  const valueFontSize = Math.round(52 * ratio);
  const unitFontSize = Math.round(28 * ratio);
  const gap = Math.max(2, Math.round(6 * ratio));
  const shadowBlur = Math.round(18 * ratio);
  const shadowOffsetY = Math.round(12 * ratio);

  return (
    <div
      className={clsx(
        "grid place-items-center rounded-full bg-neutral-white font-labster",
        className,
      )}
      style={{
        width: size,
        height: size,
        boxShadow: `0 ${shadowOffsetY}px ${shadowBlur}px 0 rgba(0,46,70,0.1)`,
        ...style,
      }}
      {...rest}
    >
      <div
        className="flex flex-col items-center justify-center"
        style={{ gap, maxWidth: size * 0.9 }}
      >
        {showIcon ? <ClockIcon color={colorHex} size={iconSize} /> : null}
        <p
          className="whitespace-nowrap text-center font-bold leading-none"
          style={{ color: colorHex }}
        >
          <span style={{ fontSize: valueFontSize }}>{value}</span>
          {unit ? (
            <span style={{ fontSize: unitFontSize, marginLeft: Math.round(2 * ratio) }}>{unit}</span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
