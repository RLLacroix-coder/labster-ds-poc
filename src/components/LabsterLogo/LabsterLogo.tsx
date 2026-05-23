import { useState, type ImgHTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — LabsterLogo
 *
 * Logos officiels Labster exportés depuis Figma.
 *
 * Source Figma :
 * - Fichier `00-Labster-Tokens` (fileKey PVYjz7w3CG5Lh0GU2iAoG3)
 * - Page Logo Labster (nodeId 705:2220)
 *
 * Comportement :
 * 1. Cherche d'abord le SVG dans `/assets/logos/labster-logo-<type>-<mode>-<colorVariant>.svg`
 * 2. Fallback automatique sur l'inline SVG reconstruit (POC, pas pixel-perfect)
 *    si le fichier est absent (404).
 *
 * Variants (`type` × `mode` × `colorVariant`) :
 * - type : tagline | normal | symbol
 * - mode : light | dark
 * - colorVariant : 3-colors | monochrome | red | blue | yellow | grey
 *
 * Notes variants :
 * - Les variants 1-couleur (red/blue/yellow/grey) existent uniquement pour `type=symbol, mode=light`.
 *   Si demandés sur d'autres combinaisons, fallback inline.
 * - `monochrome` peut être light (texte sombre) ou dark (texte clair).
 */

export type LogoType = "tagline" | "normal" | "symbol";
export type LogoMode = "light" | "dark";
export type LogoColorVariant =
  | "3-colors"
  | "monochrome"
  | "red"
  | "blue"
  | "yellow"
  | "grey";

export interface LabsterLogoProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "type" | "src" | "alt"> {
  type?: LogoType;
  mode?: LogoMode;
  colorVariant?: LogoColorVariant;
  /** Width in pixels. Height computed depuis le ratio natif du SVG. */
  width?: number;
  ariaLabel?: string;
  className?: string;
}

// =============================================================================
// SVG natural dimensions (matches public/assets/logos/*.svg exports)
// =============================================================================

const NATURAL: Record<LogoType, { width: number; height: number }> = {
  normal: { width: 288, height: 72 },
  symbol: { width: 54, height: 54 },
  tagline: { width: 287, height: 72 },
};

/**
 * Pour `type=symbol`, seul `monochrome` a une variante `dark` (texte blanc pour fond foncé).
 * Les autres colorVariants (3-colors, red, blue, yellow, grey) sont mode-agnostic — les
 * couleurs natives sont visibles sur n'importe quel fond, donc on tape toujours le `light`.
 */
function resolveMode(type: LogoType, mode: LogoMode, colorVariant: LogoColorVariant): LogoMode {
  if (type === "symbol" && colorVariant !== "monochrome") return "light";
  return mode;
}

function buildFilename(type: LogoType, mode: LogoMode, colorVariant: LogoColorVariant): string {
  const resolvedMode = resolveMode(type, mode, colorVariant);
  return `labster-logo-${type}-${resolvedMode}-${colorVariant}.svg`;
}

// =============================================================================
// Inline fallback SVG colors
// =============================================================================

const COLORS = {
  red: "#EF4C59",
  blue: "#476AE3",
  yellow: "#FFC31D",
  dark: "#0E2946",
  light: "#FFFFFF",
  grey: "#A9B2BC",
};

function getShapeColors(colorVariant: LogoColorVariant, mode: LogoMode) {
  if (colorVariant === "3-colors") {
    return { shape1: COLORS.red, shape2: COLORS.blue, shape3: COLORS.yellow };
  }
  const monochromeColor =
    colorVariant === "monochrome"
      ? mode === "dark"
        ? COLORS.light
        : COLORS.dark
      : colorVariant === "red"
      ? COLORS.red
      : colorVariant === "blue"
      ? COLORS.blue
      : colorVariant === "yellow"
      ? COLORS.yellow
      : colorVariant === "grey"
      ? COLORS.grey
      : COLORS.dark;
  return { shape1: monochromeColor, shape2: monochromeColor, shape3: monochromeColor };
}

function getTextColor(mode: LogoMode, colorVariant: LogoColorVariant) {
  if (colorVariant === "grey") return COLORS.grey;
  return mode === "dark" ? COLORS.light : COLORS.dark;
}

function Symbol({ shape1, shape2, shape3 }: { shape1: string; shape2: string; shape3: string }) {
  return (
    <g transform="translate(0, 0)">
      <rect x="4" y="32" width="14" height="14" fill={shape1} />
      <rect x="4" y="46" width="6" height="6" fill={shape1} />
      <rect x="4" y="4" width="14" height="6" fill={shape2} />
      <rect x="4" y="4" width="6" height="14" fill={shape2} />
      <rect x="36" y="46" width="14" height="6" fill={shape2} />
      <rect x="44" y="32" width="6" height="20" fill={shape2} />
      <rect x="38" y="14" width="14" height="6" fill={shape3} />
      <rect x="42" y="6" width="6" height="22" fill={shape3} />
    </g>
  );
}

function InlineFallback({
  type,
  mode,
  colorVariant,
  width,
  ariaLabel,
  className,
}: {
  type: LogoType;
  mode: LogoMode;
  colorVariant: LogoColorVariant;
  width: number;
  ariaLabel: string;
  className?: string;
}) {
  const { shape1, shape2, shape3 } = getShapeColors(colorVariant, mode);
  const textColor = getTextColor(mode, colorVariant);
  const nat = NATURAL[type];
  const height = (width / nat.width) * nat.height;

  if (type === "symbol") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={ariaLabel}
        className={clsx("inline-block", className)}
      >
        <Symbol shape1={shape1} shape2={shape2} shape3={shape3} />
      </svg>
    );
  }

  if (type === "normal") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 288 72"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={ariaLabel}
        className={clsx("inline-block", className)}
      >
        <Symbol shape1={shape1} shape2={shape2} shape3={shape3} />
        <text
          x="68"
          y="44"
          fontFamily="Fieldwork, Inter, system-ui, sans-serif"
          fontWeight="700"
          fontSize="32"
          letterSpacing="0.5"
          fill={textColor}
        >
          LABSTER
        </text>
        <text
          x="225"
          y="44"
          fontFamily="Fieldwork, Inter, system-ui, sans-serif"
          fontWeight="400"
          fontSize="22"
          fill={colorVariant === "3-colors" ? COLORS.grey : textColor}
        >
          .io
        </text>
      </svg>
    );
  }

  // tagline
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 287 72"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={clsx("inline-block", className)}
    >
      <Symbol shape1={shape1} shape2={shape2} shape3={shape3} />
      <text
        x="68"
        y="34"
        fontFamily="Fieldwork, Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="28"
        letterSpacing="0.5"
        fill={textColor}
      >
        LABSTER
      </text>
      <text
        x="207"
        y="34"
        fontFamily="Fieldwork, Inter, system-ui, sans-serif"
        fontWeight="400"
        fontSize="20"
        fill={colorVariant === "3-colors" ? COLORS.grey : textColor}
      >
        .io
      </text>
      <text
        x="68"
        y="56"
        fontFamily="Fieldwork, Inter, system-ui, sans-serif"
        fontWeight="400"
        fontSize="14"
        fill={textColor}
      >
        Making ideas happen
      </text>
    </svg>
  );
}

// =============================================================================
// COMPONENT
// =============================================================================

export function LabsterLogo({
  type = "normal",
  mode = "light",
  colorVariant = "3-colors",
  width,
  ariaLabel = "Labster",
  className,
  ...rest
}: LabsterLogoProps) {
  const [svgFailed, setSvgFailed] = useState(false);

  const nat = NATURAL[type];
  const w = width ?? nat.width;
  const h = (w / nat.width) * nat.height;

  if (!svgFailed) {
    const filename = buildFilename(type, mode, colorVariant);
    return (
      <img
        src={`/assets/logos/${filename}`}
        alt={ariaLabel}
        width={w}
        height={h}
        onError={() => setSvgFailed(true)}
        className={clsx("inline-block", className)}
        {...rest}
      />
    );
  }

  return (
    <InlineFallback
      type={type}
      mode={mode}
      colorVariant={colorVariant}
      width={w}
      ariaLabel={ariaLabel}
      className={className}
    />
  );
}
