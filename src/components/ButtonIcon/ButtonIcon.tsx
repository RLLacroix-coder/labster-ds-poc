import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Labster DS — ButtonIcon
 *
 * Bouton circulaire icon-only Labster (44×44px, radius 100px = pill).
 * Source Figma : 01-Labster-Web-components nodeId 306:1566
 * (Component Set 6 variants : Primary|Secondary × Light|Dark × Default|Hover).
 *
 * Note : Primary Dark n'existe pas dans le master Figma car le rouge accent-cta
 * fonctionne aussi bien sur fond clair que sombre — pas besoin de variant dédié.
 *
 * Différent du Button variant="icon-only-square" (carré radius-sm) :
 * - ButtonIcon = circle 44×44, pour FAB / actions secondaires / scroll buttons
 * - Button icon-only-square = carré, intégré dans toolbars / dense UI
 *
 * Specs Labster :
 * - 44×44 px, padding 10px (icon 24×24 centered)
 * - Primary : bg accent-cta (#EF4C59) → hover accent-cta-hover (#E04854), icon white
 * - Secondary Light : transparent + border grey-1 → hover bg smoke + border grey-2
 * - Secondary Dark : transparent + border white/30 (icon white opacity 0.7) → hover bg white/10 + border white/50
 */

export type ButtonIconVariant = "primary" | "secondary";
export type ButtonIconColorMode = "light" | "dark";

export interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: ButtonIconVariant;
  /** Color mode (only matters for `secondary` variant — primary works on both) */
  colorMode?: ButtonIconColorMode;
  /** Icon content (typically <Icon name="..." />) */
  children: ReactNode;
  /** ARIA label is REQUIRED for icon-only buttons (no visible text) */
  ariaLabel: string;
}

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  (
    {
      variant = "primary",
      colorMode = "light",
      children,
      ariaLabel,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        disabled={disabled}
        className={twMerge(
          clsx(
            // Base : 44×44 circle, centered icon
            "inline-flex items-center justify-center shrink-0 rounded-pill",
            "w-11 h-11", // 44×44 px
            "transition-all duration-150 ease-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-action-primary focus-visible:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",

            // PRIMARY (works on both light + dark backgrounds)
            variant === "primary" && [
              "bg-semantic-accent-cta hover:bg-semantic-accent-cta-hover",
              "text-neutral-white",
            ],

            // SECONDARY LIGHT
            variant === "secondary" &&
              colorMode === "light" && [
                "bg-transparent border-2 border-neutral-grey-1",
                "text-neutral-grey-6",
                "hover:bg-neutral-smoke hover:border-neutral-grey-2",
              ],

            // SECONDARY DARK
            variant === "secondary" &&
              colorMode === "dark" && [
                "bg-transparent border-2 border-white/30",
                "text-white/70 hover:text-white",
                "hover:bg-white/10 hover:border-white/50",
              ],

            "cursor-pointer"
          ),
          className
        )}
        {...rest}
      >
        {/* Icon content area — fixed 24×24, the consumer provides the actual <Icon /> */}
        <span className="inline-flex items-center justify-center w-6 h-6">
          {children}
        </span>
      </button>
    );
  }
);

ButtonIcon.displayName = "ButtonIcon";
