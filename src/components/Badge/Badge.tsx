import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Labster DS — Badge
 *
 * Pill-shaped status indicator. Observé sur le brand kit Labster pour les statuts :
 * "En cours" (warning), "En attente de validation" (pending), "Validé" (success),
 * "Terminé" (info).
 *
 * 6 variants sémantiques :
 * - info       (brand.blue)   — Terminé / Done / Info
 * - success    (semantic.success #4ECCA3 [À CONFIRMER]) — Validé / Success
 * - warning    (brand.yellow)  — En cours / In Progress / Warning
 * - pending    (brand.red)     — En attente / Awaiting / Action required (positive use of red)
 * - danger     (brand.red)     — Failed / Error / Negative state (same value as pending, distinct semantic)
 * - neutral    (neutral.grey-2) — Idle / Unknown
 *
 * 3 sizes : Small (24px) / Medium (32px default) / Large (40px).
 * Forme pill (radius-pill) systématique.
 */

export type BadgeVariant =
  | "info"
  | "success"
  | "warning"
  | "pending"
  | "danger"
  | "neutral";

export type BadgeSize = "Small" | "Medium" | "Large";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Optional icon before the label */
  icon?: ReactNode;
  /** Badge label */
  children: ReactNode;
}

// =============================================================================
// VARIANT STYLES — bg + text color combinations
// =============================================================================

const variantClasses: Record<BadgeVariant, string> = {
  info: "bg-semantic-action-primary text-neutral-white",
  success: "bg-semantic-success text-neutral-white",
  warning: "bg-brand-yellow text-neutral-grey-6",
  pending: "bg-semantic-danger text-neutral-white",
  danger: "bg-semantic-danger text-neutral-white",
  neutral: "bg-neutral-grey-2 text-neutral-grey-6",
};

// =============================================================================
// SIZE STYLES — height + padding + typography
// =============================================================================

const sizeClasses: Record<BadgeSize, string> = {
  Small: "h-6 px-3 text-[12px] leading-[1] font-semibold",
  Medium: "h-8 px-4 text-[14px] leading-[1] font-semibold",
  Large: "h-10 px-5 text-[16px] leading-[1] font-bold",
};

// =============================================================================
// COMPONENT
// =============================================================================

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = "info", size = "Medium", icon, children, className, ...rest },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={twMerge(
          clsx(
            "inline-flex items-center justify-center gap-2 rounded-pill font-labster tracking-wide",
            variantClasses[variant],
            sizeClasses[size]
          ),
          className
        )}
        {...rest}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
