import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Labster DS — Input
 *
 * Source de vérité : components/Input.design.md + components/Input.metadata.ts
 *
 * Variants :
 * - size : default (40px) | small (32px)
 * - labelPlacement : above | inline-left
 * - state inferred from props : default | focused | completed | error | disabled | read-only
 *
 * State=error is CREATED FOR LABSTER (absent du Shadcn source). Border + helper en `danger`,
 * icône `alert-circle` à droite.
 */

export type InputSize = "default" | "small";
export type LabelPlacement = "above" | "inline-left";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Size variant. default = ~40px height, small = ~32px height */
  size?: InputSize;
  /** Where the label sits. inline-left = 84px right-aligned label next to field */
  labelPlacement?: LabelPlacement;
  /** Visible label. MUST be set if no ariaLabel. */
  label?: string;
  /** Helper text shown under the field (Paragraphs/Small grey-3) */
  helperText?: string;
  /** Error message. When set, switches to state=error (border danger + alert-circle suffix) */
  errorMessage?: string;
  /** Optional icon at the left of the field */
  iconPrefix?: ReactNode;
  /** Optional icon at the right of the field (overridden to alert-circle when error) */
  iconSuffix?: ReactNode;
}

// =============================================================================
// SIZE STYLES — height + padding + typography
// =============================================================================

const fieldSizeClasses: Record<InputSize, string> = {
  default: "h-10 px-3 text-[16px] leading-[24px]",
  small: "h-8 px-3 text-[14px] leading-[20px]",
};

const labelSizeClasses: Record<InputSize, string> = {
  default: "text-label-m mb-1",
  small: "text-p-sm font-semibold mb-1",
};

// =============================================================================
// ICON — alert-circle SVG inline (for error state)
// =============================================================================

const AlertCircleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 4.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.75" fill="currentColor" />
  </svg>
);

// =============================================================================
// COMPONENT
// =============================================================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "default",
      labelPlacement = "above",
      label,
      helperText,
      errorMessage,
      iconPrefix,
      iconSuffix,
      className,
      disabled,
      readOnly,
      id: providedId,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const id = providedId || autoId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasError = Boolean(errorMessage);
    const ariaDescribedBy = hasError ? errorId : helperText ? helperId : undefined;

    // Field wrapper classes — border + bg + focus ring
    const fieldWrapperClasses = clsx(
      "flex items-center w-full bg-neutral-white border rounded-sm transition-colors",
      "focus-within:ring-2 focus-within:ring-semantic-action-primary focus-within:ring-offset-2",
      fieldSizeClasses[size],
      // Border state
      hasError
        ? "border-semantic-danger"
        : readOnly
        ? "border-dashed border-neutral-grey-1 bg-neutral-smoke"
        : "border-neutral-grey-2",
      // Disabled
      disabled && "opacity-50 cursor-not-allowed",
      // Padding adjust when icons present
      iconPrefix && "pl-2",
      (iconSuffix || hasError) && "pr-2"
    );

    const inputElement = (
      <div className={fieldWrapperClasses}>
        {iconPrefix && (
          <span className="flex-shrink-0 mr-2 text-neutral-grey-3 flex items-center">
            {iconPrefix}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError || undefined}
          aria-describedby={ariaDescribedBy}
          className={twMerge(
            "flex-1 bg-transparent border-none outline-none placeholder:text-neutral-grey-3 text-neutral-grey-6 min-w-0",
            "disabled:cursor-not-allowed",
            className
          )}
          {...rest}
        />
        {hasError && (
          <span className="flex-shrink-0 ml-2 text-semantic-danger flex items-center">
            <AlertCircleIcon />
          </span>
        )}
        {!hasError && iconSuffix && (
          <span className="flex-shrink-0 ml-2 text-neutral-grey-3 flex items-center">
            {iconSuffix}
          </span>
        )}
      </div>
    );

    // Layout 1 : label above
    if (labelPlacement === "above") {
      return (
        <div className={clsx("flex flex-col w-full", disabled && "opacity-60")}>
          {label && (
            <label
              htmlFor={id}
              className={clsx("text-neutral-grey-6", labelSizeClasses[size])}
            >
              {label}
            </label>
          )}
          {inputElement}
          {hasError ? (
            <p
              id={errorId}
              className="text-p-sm-bold text-semantic-danger mt-1"
            >
              {errorMessage}
            </p>
          ) : helperText ? (
            <p id={helperId} className="text-p-sm text-neutral-grey-3 mt-1">
              {helperText}
            </p>
          ) : null}
        </div>
      );
    }

    // Layout 2 : label inline-left (84px right-aligned)
    return (
      <div
        className={clsx(
          "flex items-center gap-4 w-full",
          disabled && "opacity-60"
        )}
      >
        {label && (
          <label
            htmlFor={id}
            className="text-p-sm font-semibold text-neutral-grey-6 w-[84px] text-right shrink-0"
          >
            {label}
          </label>
        )}
        <div className="flex-1 flex flex-col">
          {inputElement}
          {hasError ? (
            <p
              id={errorId}
              className="text-p-sm-bold text-semantic-danger mt-1"
            >
              {errorMessage}
            </p>
          ) : helperText ? (
            <p id={helperId} className="text-p-sm text-neutral-grey-3 mt-1">
              {helperText}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
