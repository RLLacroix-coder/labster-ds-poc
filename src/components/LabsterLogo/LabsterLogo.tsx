import { forwardRef, type SVGAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — LabsterLogo
 *
 * Reproduction SVG inline du logo Labster observé dans le brand kit
 * (https://www.figma.com/design/PVYjz7w3CG5Lh0GU2iAoG3, page Logo Labster nodeId 705:2220).
 *
 * Logo composé de :
 * - Symbol (3 shapes) : red L-bracket (bottom-left) + blue ┌┐ corners + yellow plus
 * - Wordmark "LABSTER.io" en Geo Bold (fallback Inter)
 * - Tagline "Making ideas happen" (variant tagline only)
 *
 * Variants :
 * - type : tagline | normal | symbol
 * - mode : light | dark
 * - colorVariant : 3-colors | monochrome | red | blue | yellow
 *
 * ⚠ Version POC. Pour le rendu pixel-perfect, exporter le SVG depuis Figma
 * et le sauvegarder dans public/assets/labster-logo-*.svg.
 */

export type LogoType = "tagline" | "normal" | "symbol";
export type LogoMode = "light" | "dark";
export type LogoColorVariant = "3-colors" | "monochrome" | "red" | "blue" | "yellow";

export interface LabsterLogoProps extends Omit<SVGAttributes<SVGSVGElement>, "type"> {
  type?: LogoType;
  mode?: LogoMode;
  colorVariant?: LogoColorVariant;
  /** Width in pixels. Height is computed to preserve aspect ratio. */
  width?: number;
  ariaLabel?: string;
  className?: string;
}

// =============================================================================
// COLORS — based on Labster brand tokens
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
      : COLORS.dark;
  return { shape1: monochromeColor, shape2: monochromeColor, shape3: monochromeColor };
}

function getTextColor(mode: LogoMode) {
  return mode === "dark" ? COLORS.light : COLORS.dark;
}

// =============================================================================
// SYMBOL SVG — 3 shapes (54x54 viewBox)
// =============================================================================

function Symbol({
  shape1,
  shape2,
  shape3,
}: {
  shape1: string;
  shape2: string;
  shape3: string;
}) {
  return (
    <g transform="translate(0, 0)">
      {/* Red L-bracket (bottom-left) — 2 rectangles forming an L */}
      <rect x="4" y="32" width="14" height="14" fill={shape1} />
      <rect x="4" y="46" width="6" height="6" fill={shape1} />

      {/* Blue ┌┐ corners — top-left + bottom-right brackets */}
      {/* Top-left corner */}
      <rect x="4" y="4" width="14" height="6" fill={shape2} />
      <rect x="4" y="4" width="6" height="14" fill={shape2} />
      {/* Bottom-right corner */}
      <rect x="36" y="46" width="14" height="6" fill={shape2} />
      <rect x="44" y="32" width="6" height="20" fill={shape2} />

      {/* Yellow plus (top-right) */}
      <rect x="38" y="14" width="14" height="6" fill={shape3} />
      <rect x="42" y="6" width="6" height="22" fill={shape3} />
    </g>
  );
}

// =============================================================================
// COMPONENT
// =============================================================================

export const LabsterLogo = forwardRef<SVGSVGElement, LabsterLogoProps>(
  (
    {
      type = "normal",
      mode = "light",
      colorVariant = "3-colors",
      width,
      ariaLabel = "Labster",
      className,
      ...rest
    },
    ref
  ) => {
    const { shape1, shape2, shape3 } = getShapeColors(colorVariant, mode);
    const textColor = getTextColor(mode);

    // SYMBOL ONLY — square aspect ratio
    if (type === "symbol") {
      const w = width ?? 54;
      return (
        <svg
          ref={ref}
          width={w}
          height={w}
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={ariaLabel}
          className={clsx("inline-block", className)}
          {...rest}
        >
          <Symbol shape1={shape1} shape2={shape2} shape3={shape3} />
        </svg>
      );
    }

    // NORMAL — symbol + wordmark
    if (type === "normal") {
      const w = width ?? 288;
      const h = (w / 288) * 54;
      return (
        <svg
          ref={ref}
          width={w}
          height={h}
          viewBox="0 0 288 54"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={ariaLabel}
          className={clsx("inline-block", className)}
          {...rest}
        >
          <Symbol shape1={shape1} shape2={shape2} shape3={shape3} />
          <text
            x="68"
            y="38"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
            fontSize="32"
            letterSpacing="0.5"
            fill={textColor}
          >
            LABSTER
          </text>
          <text
            x="225"
            y="38"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="400"
            fontSize="22"
            fill={COLORS.grey}
          >
            .io
          </text>
        </svg>
      );
    }

    // TAGLINE — symbol + wordmark + tagline
    const w = width ?? 287;
    const h = (w / 287) * 72;
    return (
      <svg
        ref={ref}
        width={w}
        height={h}
        viewBox="0 0 287 72"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={ariaLabel}
        className={clsx("inline-block", className)}
        {...rest}
      >
        <Symbol shape1={shape1} shape2={shape2} shape3={shape3} />
        <text
          x="68"
          y="34"
          fontFamily="Inter, system-ui, sans-serif"
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
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="400"
          fontSize="20"
          fill={COLORS.grey}
        >
          .io
        </text>
        <text
          x="68"
          y="56"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="400"
          fontSize="14"
          fill={textColor}
        >
          Making ideas happen
        </text>
      </svg>
    );
  }
);

LabsterLogo.displayName = "LabsterLogo";
