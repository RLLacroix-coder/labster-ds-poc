/**
 * Labster Design System — Tokens TypeScript
 *
 * Source de vérité côté code. Cohérent avec :
 * - tokens/labster-styles-raw.md (extraction MCP brand kit)
 * - .ai/design-tokens.json (token catalog)
 * - tailwind.config.ts (consommation Tailwind)
 *
 * Quand un token change, il doit être mis à jour ici, dans tailwind.config.ts,
 * et dans .ai/design-tokens.json en parallèle (cohérence garantie par skill
 * labster-ds:extract-tokens en Phase C).
 *
 * Famille typo : Fieldwork (commercial, fallback Inter dans Figma/Storybook).
 */

// =============================================================================
// COLORS
// =============================================================================

export const colors = {
  brand: {
    blue: "#476AE3",
    red: "#EF4C59",
    yellow: "#FFC31D",
    "blue-light": "#D6DFFF",
    "red-light": "#FCD9D9",
    "yellow-light": "#FFECB8",
  },
  semantic: {
    "action-primary": "#476AE3",
    "action-primary-hover": "#3A57BC",
    /** Brand red used as POSITIVE CTA (dark bg, pill radius). Cf. labster.io contact form. */
    "accent-cta": "#EF4C59",
    "accent-cta-hover": "#E04854",
    /** Brand red used as NEGATIVE state (error, destructive). Standard radius. */
    danger: "#EF4C59",
    "danger-hover": "#E04854",
    /** Brand red used as PENDING / awaiting validation status. Cf. Labster badge 'En attente de validation'. */
    pending: "#EF4C59",
    warning: "#FFC31D",
    /** Validated / success state. Observed in Labster status badges ('Validé').
     *  Hex estimated — NOT extracted from brand kit Color palette frame.
     *  [À CONFIRMER avec l'équipe Labster — pourrait être plus mint/jade/emerald]. */
    success: "#4ECCA3",
    "success-hover": "#3FB893",
  },
  neutral: {
    white: "#FFFFFF",
    smoke: "#F5F6F8",
    "grey-1": "#E3E5E8",
    "grey-2": "#A9B2BC",
    "grey-3": "#707F8F",
    "grey-4": "#465B72",
    "grey-5": "#273C53",
    "grey-6": "#0E2946",
  },
} as const;

// =============================================================================
// TYPOGRAPHY — Labster scale (UI Design Labster / Headings + Paragraphs + Text Styles)
// =============================================================================

export const typography = {
  family: {
    /** Labster brand font (commercial). Fallback to Inter when unavailable. */
    primary: ["Fieldwork", "Inter", "system-ui", "-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
  },
  /** Each style maps to a Figma Text Style in the Labster styleguide. */
  styles: {
    "h1": { fontSize: "64px", lineHeight: "72px", fontWeight: 700, letterSpacing: "0" },
    "h2": { fontSize: "56px", lineHeight: "62px", fontWeight: 700, letterSpacing: "0" },
    "h3": { fontSize: "40px", lineHeight: "44px", fontWeight: 700, letterSpacing: "0" },
    "h4": { fontSize: "32px", lineHeight: "32px", fontWeight: 700, letterSpacing: "0.5px" },
    "h5": { fontSize: "24px", lineHeight: "1", fontWeight: 700, letterSpacing: "0" },
    "h6": { fontSize: "18px", lineHeight: "1", fontWeight: 700, letterSpacing: "0" },
    "paragraph-small": { fontSize: "14px", lineHeight: "18px", fontWeight: 400, letterSpacing: "0" },
    "paragraph-small-semibold": { fontSize: "14px", lineHeight: "18px", fontWeight: 700, letterSpacing: "0" },
    "paragraph-medium": { fontSize: "20px", lineHeight: "24px", fontWeight: 300, letterSpacing: "0" },
    "paragraph-medium-semibold": { fontSize: "20px", lineHeight: "24px", fontWeight: 700, letterSpacing: "0" },
    "paragraph-large": { fontSize: "32px", lineHeight: "44px", fontWeight: 300, letterSpacing: "0" },
    "paragraph-large-semibold": { fontSize: "32px", lineHeight: "44px", fontWeight: 700, letterSpacing: "0" },
    "label-m": { fontSize: "18px", lineHeight: "1", fontWeight: 700, letterSpacing: "0" },
    "button-label": { fontSize: "16px", lineHeight: "1", fontWeight: 600, letterSpacing: "1px" },
    "button-link-label": { fontSize: "16px", lineHeight: "1", fontWeight: 600, letterSpacing: "0.12px" },
    "button-scroll-label": { fontSize: "12px", lineHeight: "1", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" as const },
    "links": { fontSize: "14px", lineHeight: "1", fontWeight: 400, letterSpacing: "0.5px" },
  },
} as const;

// =============================================================================
// ELEVATION
// =============================================================================

export const elevation = {
  small: "0 2px 8px 0 rgba(0, 46, 70, 0.1)",
  medium: "0 4px 16px 0 rgba(0, 46, 70, 0.1)",
  large: "0 8px 24px 0 rgba(0, 46, 70, 0.1)",
} as const;

// =============================================================================
// SHAPES
// =============================================================================

export const radius = {
  none: "0",
  sm: "6px",
  md: "8px",
  lg: "12px",
  pill: "9999px",
} as const;

// =============================================================================
// SPACING (provisional — to be validated with Labster team)
// =============================================================================

export const spacing = {
  /** 4-px scale, common UI standard. To validate vs Labster brand kit (not observed yet). */
  0: "0",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

// =============================================================================
// EXPORT GROUPED — for tailwind.config.ts consumption
// =============================================================================

export const tokens = {
  colors,
  typography,
  elevation,
  radius,
  spacing,
} as const;

export type Tokens = typeof tokens;
export type ColorToken = keyof typeof colors;
export type TypographyStyle = keyof typeof typography.styles;
export type ElevationToken = keyof typeof elevation;
export type RadiusToken = keyof typeof radius;
