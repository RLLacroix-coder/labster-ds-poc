import { useState, type ImgHTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — LabsterShape
 *
 * Les 3 shapes constitutives du logo Labster, représentant les 3 piliers métier :
 * - Design (rouge `#EF4C59`)
 * - Dev (bleu `#476AE3`)
 * - Talents (jaune `#FFC31D`)
 *
 * Utilisables seules comme gros accents brand (hero backgrounds, slides
 * d'ouverture, divider décoratif).
 *
 * Source Figma :
 * - Fichier `00-Labster-Tokens` (fileKey PVYjz7w3CG5Lh0GU2iAoG3)
 * - Page `LABSTER LOGO`, section LOGO SHAPES (nodeId 705:2222)
 *
 * Comportement :
 * 1. Cherche le SVG dans `/assets/shapes/labster-shape-<variant>.svg`
 * 2. Fallback automatique sur un placeholder coloré (rare — seulement si le
 *    fichier est absent et la prod tourne en mode dégradé)
 */

export type LabsterShapeVariant = "design" | "dev" | "talents";

const SHAPE_COLORS: Record<LabsterShapeVariant, string> = {
  design: "#EF4C59",
  dev: "#476AE3",
  talents: "#FFC31D",
};

const SHAPE_LABELS: Record<LabsterShapeVariant, string> = {
  design: "Labster shape Design",
  dev: "Labster shape Dev",
  talents: "Labster shape Talents",
};

export interface LabsterShapeProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  variant: LabsterShapeVariant;
  /** Width en px. Aspect ratio 1:1 (viewBox 120×120). */
  width?: number;
  ariaLabel?: string;
  className?: string;
}

export function LabsterShape({
  variant,
  width = 120,
  ariaLabel,
  className,
  ...rest
}: LabsterShapeProps) {
  const [failed, setFailed] = useState(false);
  const label = ariaLabel ?? SHAPE_LABELS[variant];

  if (!failed) {
    return (
      <img
        src={`/assets/shapes/labster-shape-${variant}.svg`}
        alt={label}
        width={width}
        height={width}
        onError={() => setFailed(true)}
        className={clsx("inline-block", className)}
        {...rest}
      />
    );
  }

  // Fallback : carré coloré minimal pour signaler asset manquant
  return (
    <div
      role="img"
      aria-label={`${label} (placeholder — fichier absent dans /assets/shapes/)`}
      className={clsx("inline-block rounded-sm", className)}
      style={{ width, height: width, backgroundColor: SHAPE_COLORS[variant] }}
    />
  );
}
