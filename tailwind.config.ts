import type { Config } from "tailwindcss";
import { colors, elevation, radius, spacing } from "./src/tokens";

/**
 * Tailwind config that consumes Labster tokens from src/tokens/index.ts.
 *
 * Naming convention in Tailwind classes :
 * - colors: `bg-brand-blue`, `bg-semantic-action-primary`, `text-neutral-grey-6`, etc.
 * - radius: `rounded-sm` (6px), `rounded-md` (8px), `rounded-pill` (9999px)
 * - shadow: `shadow-elevation-small`, `shadow-elevation-medium`, `shadow-elevation-large`
 * - spacing: standard Tailwind scale + extensions Labster
 * - font-family: `font-labster` (Fieldwork + Inter fallback)
 */
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: colors.brand,
        semantic: colors.semantic,
        neutral: colors.neutral,
      },
      fontFamily: {
        labster: ["Fieldwork", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        // Headings
        "h1": ["64px", { lineHeight: "72px", fontWeight: "700", letterSpacing: "0" }],
        "h2": ["56px", { lineHeight: "62px", fontWeight: "700", letterSpacing: "0" }],
        "h3": ["40px", { lineHeight: "44px", fontWeight: "700", letterSpacing: "0" }],
        "h4": ["32px", { lineHeight: "32px", fontWeight: "700", letterSpacing: "0.5px" }],
        "h5": ["24px", { lineHeight: "1", fontWeight: "700", letterSpacing: "0" }],
        "h6": ["18px", { lineHeight: "1", fontWeight: "700", letterSpacing: "0" }],
        // Paragraphs
        "p-sm": ["14px", { lineHeight: "18px", fontWeight: "400", letterSpacing: "0" }],
        "p-sm-bold": ["14px", { lineHeight: "18px", fontWeight: "700", letterSpacing: "0" }],
        "p-md": ["20px", { lineHeight: "24px", fontWeight: "300", letterSpacing: "0" }],
        "p-md-bold": ["20px", { lineHeight: "24px", fontWeight: "700", letterSpacing: "0" }],
        "p-lg": ["32px", { lineHeight: "44px", fontWeight: "300", letterSpacing: "0" }],
        // Text styles
        "label-m": ["18px", { lineHeight: "1", fontWeight: "700", letterSpacing: "0" }],
        "button-label": ["16px", { lineHeight: "1", fontWeight: "600", letterSpacing: "1px" }],
        "button-link": ["16px", { lineHeight: "1", fontWeight: "600", letterSpacing: "0.12px" }],
        "button-scroll": ["12px", { lineHeight: "1", fontWeight: "700", letterSpacing: "1px" }],
        "link": ["14px", { lineHeight: "1", fontWeight: "400", letterSpacing: "0.5px" }],
      },
      boxShadow: {
        "elevation-small": elevation.small,
        "elevation-medium": elevation.medium,
        "elevation-large": elevation.large,
      },
      borderRadius: {
        // Override standard scale with Labster values
        none: radius.none,
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
        pill: radius.pill,
      },
      spacing: {
        // Extends standard Tailwind scale with Labster custom (mostly aligned 4px)
        ...spacing,
      },
    },
  },
  plugins: [],
};

export default config;
