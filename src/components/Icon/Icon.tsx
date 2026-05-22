import { forwardRef, type SVGAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — Icon
 *
 * UI icons recodés en SVG inline depuis le brand kit Labster
 * (https://www.figma.com/design/PVYjz7w3CG5Lh0GU2iAoG3, page Icons nodeId 705:3186).
 *
 * 2 catégories :
 * - UI Icons (monochromes, 16 icons) — actions, navigation, sociaux
 * - Floating shapes — formes décoratives géométriques (triangles, diamonds, squares, circles)
 *
 * Pour étendre : ajouter le SVG path dans le registry `ICONS` ci-dessous.
 * Standard : viewBox 0 0 24 24, stroke currentColor, strokeWidth 1.5.
 */

export type UiIconName =
  | "mail"
  | "mail-filled"
  | "menu"
  | "attach"
  | "edit"
  | "check"
  | "chevron-up"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "arrow-left"
  | "arrow-right"
  | "search"
  | "close"
  | "plus"
  | "linkedin"
  | "twitter"
  | "alert-circle";

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "name"> {
  /** Icon name from the Labster UI icons registry */
  name: UiIconName;
  /** Size in pixels (square). Default 24px. */
  size?: number;
  /** ARIA label (recommended unless decorative). When omitted, sets aria-hidden=true. */
  ariaLabel?: string;
  className?: string;
}

// =============================================================================
// SVG PATHS REGISTRY
// =============================================================================

const ICONS: Record<UiIconName, JSX.Element> = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "mail-filled": (
    <path
      d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm1 3.5L12 13l8-4.5"
      fill="currentColor"
    />
  ),
  menu: (
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </g>
  ),
  attach: (
    <path
      d="M21 11.5l-8.49 8.49a5 5 0 0 1-7.07-7.07l8.49-8.49a3.5 3.5 0 0 1 4.95 4.95L10.4 17.85a2 2 0 0 1-2.83-2.83l7.07-7.07"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  edit: (
    <>
      <path
        d="M16.5 3.5l4 4L8 20H4v-4L16.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M14 6l4 4" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  check: (
    <polyline
      points="4 12 10 18 20 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "chevron-up": (
    <polyline
      points="6 15 12 9 18 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "chevron-down": (
    <polyline
      points="6 9 12 15 18 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "chevron-left": (
    <polyline
      points="15 6 9 12 15 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "chevron-right": (
    <polyline
      points="9 6 15 12 9 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "arrow-left": (
    <>
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polyline
        points="10 7 5 12 10 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  "arrow-right": (
    <>
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <polyline
        points="14 7 19 12 14 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  close: (
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </g>
  ),
  plus: (
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </g>
  ),
  linkedin: (
    <path
      d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.5 17H6V10h2.5v7zM7.25 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM18 17h-2.5v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V17H10V10h2.5v1.04c.5-.85 1.51-1.29 2.5-1.04 1.5.37 2.5 1.83 2.5 3.46V17z"
      fill="currentColor"
    />
  ),
  twitter: (
    <path
      d="M22 5.8a8.5 8.5 0 0 1-2.36.65 4.07 4.07 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1A4.1 4.1 0 0 0 11.7 9a11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.47 4 4 0 0 1-1.85-.51v.05a4.1 4.1 0 0 0 3.3 4 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.24 8.24 0 0 1 2 18.4 11.62 11.62 0 0 0 8.29 20.25c7.55 0 11.68-6.25 11.68-11.67 0-.18-.01-.36-.02-.53A8.36 8.36 0 0 0 22 5.8z"
      fill="currentColor"
    />
  ),
  "alert-circle": (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="12" y1="8" x2="12" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.75" fill="currentColor" />
    </>
  ),
};

// =============================================================================
// COMPONENT
// =============================================================================

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 24, ariaLabel, className, ...rest }, ref) => {
    const svgContent = ICONS[name];
    if (!svgContent) {
      console.warn(`[Labster DS] Icon "${name}" not found.`);
      return null;
    }
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        className={clsx("inline-block", className)}
        {...rest}
      >
        {svgContent}
      </svg>
    );
  }
);

Icon.displayName = "Icon";

// =============================================================================
// LIST EXPORT (for stories and pickers)
// =============================================================================

export const UI_ICON_NAMES: UiIconName[] = Object.keys(ICONS) as UiIconName[];
