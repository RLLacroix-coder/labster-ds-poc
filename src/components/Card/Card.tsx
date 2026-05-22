import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type MouseEventHandler,
} from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Labster DS — Card
 *
 * Source de vérité : components/Card.design.md + components/Card.metadata.ts
 *
 * Molecule MVP V1.0. Used for service cards (labster.io pattern), content blocks,
 * selectable list items, featured content. Replaces Dialog as primary molecule in MVP.
 *
 * 5 variants × 3 sizes × 5 states. Composition: Button (0..2) + Input (rare).
 */

export type CardVariant =
  | "default"
  | "interactive"
  | "with-actions"
  | "selectable"
  | "elevated";

export type CardSize = "Small" | "Medium" | "Large";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: CardVariant;
  size?: CardSize;
  /** Card title (max 6 words recommended). Rendered as H5. Required for accessibility. */
  title: string;
  /** Optional subtitle above title (e.g., 'Service' category). Rendered as Label M, grey-3. */
  subtitle?: string;
  /** Optional body content (Paragraph Small, grey-4). Max 3-4 lines for preview. */
  children?: ReactNode;
  /** Optional media slot at the top (image URL or illustration node). */
  image?: string | ReactNode;
  /** Action buttons array (max 2). Required for variant=with-actions. */
  actions?: ReactNode;
  /** Selected state for variant=selectable */
  selected?: boolean;
  /** Click handler. Use for variant=interactive (renders as <button> if onClick set). */
  onClick?: MouseEventHandler<HTMLDivElement>;
  /** Disabled state (rare, for variant=interactive) */
  disabled?: boolean;
  /** ARIA label, especially for interactive cards without visible title. */
  ariaLabel?: string;
}

// =============================================================================
// SIZE STYLES — max-width + padding
// =============================================================================

const sizeClasses: Record<CardSize, string> = {
  Small: "max-w-[280px] p-4",
  Medium: "max-w-[400px] p-6",
  Large: "max-w-[560px] p-8",
};

// =============================================================================
// VARIANT STYLES — bg + border + shadow + interactivity
// =============================================================================

const baseClasses =
  "bg-neutral-white rounded-md transition-all duration-150 ease-in-out";

const variantClasses: Record<CardVariant, string> = {
  default: "border border-neutral-grey-1",
  interactive:
    "border border-neutral-grey-1 cursor-pointer " +
    "hover:border-neutral-grey-2 hover:shadow-elevation-medium " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-action-primary focus-visible:ring-offset-2",
  "with-actions": "border border-neutral-grey-1",
  selectable:
    "border border-neutral-grey-1 cursor-pointer " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-action-primary focus-visible:ring-offset-2",
  elevated: "border border-neutral-grey-1 shadow-elevation-small",
};

const selectedClasses = "border-2 border-semantic-action-primary";

// =============================================================================
// COMPONENT
// =============================================================================

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      size = "Medium",
      title,
      subtitle,
      children,
      image,
      actions,
      selected = false,
      onClick,
      disabled = false,
      ariaLabel,
      className,
      ...rest
    },
    ref
  ) => {
    const isInteractive = variant === "interactive" || onClick;
    const isSelectable = variant === "selectable";
    const showSelected = isSelectable && selected;

    return (
      <div
        ref={ref}
        role={
          isSelectable ? "radio" : isInteractive ? "button" : undefined
        }
        aria-checked={isSelectable ? selected : undefined}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        tabIndex={isInteractive || isSelectable ? 0 : undefined}
        onClick={disabled ? undefined : onClick}
        className={twMerge(
          clsx(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            showSelected && selectedClasses,
            disabled && "opacity-50 cursor-not-allowed",
            "flex flex-col gap-3"
          ),
          className
        )}
        {...rest}
      >
        {/* Optional media slot */}
        {image && (
          <div className="-m-4 mb-2 overflow-hidden rounded-t-md">
            {typeof image === "string" ? (
              <img src={image} alt="" className="w-full h-auto" />
            ) : (
              image
            )}
          </div>
        )}

        {/* Subtitle (label m, grey-3) */}
        {subtitle && (
          <p className="text-p-sm font-semibold text-neutral-grey-3 uppercase tracking-wide">
            {subtitle}
          </p>
        )}

        {/* Title (h5, grey-6) */}
        <h5 className="text-h5 text-neutral-grey-6">{title}</h5>

        {/* Body (paragraph small, grey-4) */}
        {children && (
          <div className="text-p-sm text-neutral-grey-4">{children}</div>
        )}

        {/* Action area — Button instances (max 2) */}
        {actions && variant === "with-actions" && (
          <div className="flex items-center gap-3 mt-2">{actions}</div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";
