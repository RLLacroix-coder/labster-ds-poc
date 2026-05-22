import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Labster DS — Checkbox
 *
 * Source Figma : 01-Labster-Web-components nodeId 310:660 (Checkbox)
 * + 329:549 (Checkbox label).
 *
 * Design Labster :
 * - 24×24 square, border 1px, radius 4px, bg white
 * - Unchecked : border neutral.grey-2
 * - Checked : border semantic.action-primary (Blue brand) + check mark SVG center
 * - Label optionnel à droite, gap 12px, text Paragraph Small grey-4
 *
 * Wraps a native <input type="checkbox"> for accessibility + form integration.
 */

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Visible label rendered next to the checkbox. */
  label?: ReactNode;
  /** Error state — border + label in danger color */
  error?: boolean;
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <polyline
      points="5 12 10 17 19 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error = false,
      checked,
      disabled,
      className,
      id: providedId,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const id = providedId || autoId;

    const checkbox = (
      <span
        className={clsx(
          "relative inline-flex items-center justify-center w-6 h-6 rounded-sm border bg-neutral-white shrink-0 transition-colors",
          // Border color depending on state
          error
            ? "border-semantic-danger"
            : checked
            ? "border-semantic-action-primary"
            : "border-neutral-grey-2",
          // Focus ring on container via peer
          "peer-focus-visible:ring-2 peer-focus-visible:ring-semantic-action-primary peer-focus-visible:ring-offset-2"
        )}
      >
        {checked && (
          <CheckIcon
            className={clsx(
              "w-6 h-6",
              error ? "text-semantic-danger" : "text-semantic-action-primary"
            )}
          />
        )}
      </span>
    );

    // Visually hidden native input — drives all the accessibility + form behaviour
    const nativeInput = (
      <input
        ref={ref}
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        className="peer absolute opacity-0 w-6 h-6 cursor-pointer disabled:cursor-not-allowed"
        {...rest}
      />
    );

    // Without label : just the checkbox + hidden input (relative wrapper)
    if (!label) {
      return (
        <label
          htmlFor={id}
          className={twMerge(
            clsx(
              "relative inline-flex items-center cursor-pointer",
              disabled && "opacity-50 cursor-not-allowed"
            ),
            className
          )}
        >
          {nativeInput}
          {checkbox}
        </label>
      );
    }

    // With label : checkbox + text Paragraph Small grey-4 (or danger if error)
    return (
      <label
        htmlFor={id}
        className={twMerge(
          clsx(
            "relative inline-flex items-start gap-3 cursor-pointer font-labster",
            disabled && "opacity-50 cursor-not-allowed"
          ),
          className
        )}
      >
        {nativeInput}
        {checkbox}
        <span
          className={clsx(
            "text-p-sm pt-[3px]",
            error ? "text-semantic-danger" : "text-neutral-grey-4"
          )}
        >
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
