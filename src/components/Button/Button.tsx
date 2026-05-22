import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Labster DS — Button
 *
 * Source de vérité : components/Button.design.md + components/Button.metadata.ts
 *
 * V0 — scaffold initial (validation du pipeline Tailwind + Storybook).
 * Variants 'secondary', 'ghost', 'danger', 'accent-cta', 'link' viendront en B.4.
 * Sizes 'Giant', 'Large', 'Small', 'Tiny' + icon-only viendront en B.4.
 */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "accent-cta"
  | "link";

export type ButtonSize = "Giant" | "Large" | "Medium" | "Small" | "Tiny";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant. Maps to Labster semantic tokens. */
  variant?: ButtonVariant;
  /** Size variant. Maps to Labster size specs (Giant 64px ... Tiny 24px). */
  size?: ButtonSize;
  /** When true, renders a square icon-only button (children must be an icon). */
  iconOnly?: boolean;
  /** Optional loading state (replaces children with spinner). */
  loading?: boolean;
  /** Button content (label + optional icons). */
  children?: ReactNode;
}

// =====================================================================
// VARIANT STYLES
// =====================================================================

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-semantic-action-primary text-neutral-white hover:bg-semantic-action-primary-hover " +
    "disabled:bg-neutral-grey-2 disabled:cursor-not-allowed",
  secondary:
    "bg-neutral-white border border-neutral-grey-1 text-neutral-grey-6 " +
    "hover:bg-neutral-smoke hover:border-neutral-grey-2 " +
    "disabled:bg-neutral-smoke disabled:text-neutral-grey-3 disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-neutral-grey-6 hover:bg-neutral-smoke " +
    "disabled:text-neutral-grey-3 disabled:cursor-not-allowed",
  danger:
    "bg-semantic-danger text-neutral-white hover:bg-semantic-danger-hover " +
    "disabled:bg-neutral-grey-2 disabled:cursor-not-allowed",
  "accent-cta":
    "bg-semantic-accent-cta text-neutral-white hover:bg-semantic-accent-cta-hover " +
    "disabled:bg-neutral-grey-2 disabled:cursor-not-allowed",
  link:
    "bg-transparent text-semantic-action-primary hover:underline " +
    "disabled:text-neutral-grey-3 disabled:cursor-not-allowed",
};

// =====================================================================
// SIZE STYLES (height + padding + font-size mapping)
// =====================================================================

const sizeClasses: Record<ButtonSize, string> = {
  Giant: "px-8 py-5 text-[20px] leading-[28px]",
  Large: "px-7 py-4 text-[18px] leading-[24px]",
  Medium: "px-6 py-3 text-[16px] leading-[20px]",
  Small: "px-4 py-2 text-[14px] leading-[16px]",
  Tiny: "px-3 py-1.5 text-[12px] leading-[14px]",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  Giant: "p-4",
  Large: "p-3.5",
  Medium: "p-2.5",
  Small: "p-2",
  Tiny: "p-1.5",
};

// =====================================================================
// COMPONENT
// =====================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "Medium",
      iconOnly = false,
      loading = false,
      className,
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isPill = variant === "accent-cta";
    const isLink = variant === "link";

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={twMerge(
          clsx(
            // Base
            "inline-flex items-center justify-center gap-2 font-labster font-semibold",
            "transition-colors duration-150 ease-in-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-action-primary focus-visible:ring-offset-2",
            "tracking-[1px]",

            // Variant
            variantClasses[variant],

            // Size — different padding for icon-only
            iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],

            // Radius — pill for accent-cta, none for link, sm by default
            isPill && "rounded-pill",
            isLink && "rounded-none px-0 py-2",
            !isPill && !isLink && "rounded-sm",

            // Loading state
            loading && "opacity-60 cursor-wait"
          ),
          className
        )}
        {...rest}
      >
        {loading ? "Loading…" : children}
      </button>
    );
  }
);

Button.displayName = "Button";
