import { useState, type SVGAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — FloatingShape
 *
 * Formes géométriques décoratives observées dans le brand kit Labster
 * (Icons / Floating Elements). Utilisées pour les illustrations brand,
 * accents visuels, motifs de fond.
 *
 * Shapes : triangle (down/up), diamond, square, square-outline, circle,
 *          circle-outline, plus, dot
 * Colors : red, blue, yellow (brand)
 *
 * Comportement :
 * 1. Cherche d'abord le SVG dans `/assets/floating-elements/floating-element-<shape>-<color>.svg`
 * 2. Fallback automatique sur la reconstruction SVG inline (parfaitement
 *    acceptable — les shapes sont géométriquement simples)
 *
 * Pour usage décoratif uniquement — aria-hidden par défaut.
 */

export type FloatingShapeType =
  | "triangle-down"
  | "triangle-up"
  | "diamond"
  | "square"
  | "square-outline"
  | "circle"
  | "circle-outline"
  | "plus"
  | "dot";

export type FloatingShapeColor = "red" | "blue" | "yellow";

const COLOR_HEX: Record<FloatingShapeColor, string> = {
  red: "#EF4C59",
  blue: "#476AE3",
  yellow: "#FFC31D",
};

export interface FloatingShapeProps
  extends Omit<SVGAttributes<SVGSVGElement>, "color"> {
  shape: FloatingShapeType;
  color?: FloatingShapeColor;
  size?: number;
  className?: string;
}

const SHAPES: Record<FloatingShapeType, (color: string) => JSX.Element> = {
  "triangle-down": (color) => (
    <polygon points="2 6 22 6 12 22" fill={color} />
  ),
  "triangle-up": (color) => (
    <polygon points="12 2 22 18 2 18" fill={color} />
  ),
  diamond: (color) => (
    <polygon points="12 2 22 12 12 22 2 12" fill={color} />
  ),
  square: (color) => <rect x="3" y="3" width="18" height="18" fill={color} />,
  "square-outline": (color) => (
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
    />
  ),
  circle: (color) => <circle cx="12" cy="12" r="9" fill={color} />,
  "circle-outline": (color) => (
    <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="2.5" />
  ),
  plus: (color) => (
    <>
      <rect x="10" y="3" width="4" height="18" fill={color} />
      <rect x="3" y="10" width="18" height="4" fill={color} />
    </>
  ),
  dot: (color) => <circle cx="12" cy="12" r="4" fill={color} />,
};

export function FloatingShape({
  shape,
  color = "blue",
  size = 24,
  className,
  ...rest
}: FloatingShapeProps) {
  const [failed, setFailed] = useState(false);

  // Try external SVG first (pixel-perfect Figma export if available)
  if (!failed) {
    return (
      // Using <img> so the file 404 triggers onError and falls back to inline SVG.
      // Decorative-only: aria-hidden.
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        src={`/assets/floating-elements/floating-element-${shape}-${color}.svg`}
        alt=""
        aria-hidden
        width={size}
        height={size}
        onError={() => setFailed(true)}
        className={clsx("inline-block", className)}
      />
    );
  }

  // Inline SVG reconstruction — always works
  const shapeElement = SHAPES[shape](COLOR_HEX[color]);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={clsx("inline-block", className)}
      {...rest}
    >
      {shapeElement}
    </svg>
  );
}

export const FLOATING_SHAPE_TYPES: FloatingShapeType[] = [
  "triangle-down",
  "triangle-up",
  "diamond",
  "square",
  "square-outline",
  "circle",
  "circle-outline",
  "plus",
  "dot",
];
