import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Icon } from "../Icon";

/**
 * Labster DS — Input
 *
 * Pattern Labster officiel observé dans 01-Labster-Web-components
 * (nodeId 2:2302, Component Set 8 variants).
 *
 * Specs Labster :
 * - Background : neutral.smoke (#F5F6F8) en light mode, grey-6 en dark mode
 * - Border : grey-1 default → action-primary (Blue brand) au focus
 * - Radius : md (8px)
 * - Height : 44px (default)
 * - Padding : 16px horizontal
 * - Label : Fieldwork Hum DemiBold 14px letter-spacing 1px, grey-3
 * - Required indicator : '*' rouge accent-cta à droite du label
 * - 3 types : input / dropdown / search (avec icônes correspondants)
 * - 2 colorModes : light / dark
 *
 * Extensions Labster (créées par le POC, non observées dans le master Figma) :
 * - state=error (errorMessage prop) — border + helper en danger
 * - state=disabled
 * - state=read-only
 *
 * Source : components/Input.design.md + components/Input.metadata.ts
 */

export type InputColorMode = "light" | "dark";
export type InputType = "input" | "dropdown" | "search";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visual size (compat avec V0.x — moins utilisé en V1 vu que Labster a une seule taille 44px) */
  size?: "default" | "small";
  /** Labster input variant — affects icons and behavior. NOT the HTML `type` attribute. */
  variant?: InputType;
  /** Light or dark mode (dark = bg grey-6 for dark sections) */
  colorMode?: InputColorMode;
  /** Visible label */
  label?: string;
  /** Show required asterisk (red) next to label */
  required?: boolean;
  /** Helper text shown below the field */
  helperText?: string;
  /** Error message — switches to error state */
  errorMessage?: string;
  /** Native HTML input type (text, email, password, etc.). Default 'text'. */
  type?: HTMLInputElement["type"];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "default",
      variant = "input",
      colorMode = "light",
      label,
      required = false,
      helperText,
      errorMessage,
      type = "text",
      className,
      disabled,
      readOnly,
      id: providedId,
      placeholder,
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

    const isDark = colorMode === "dark";
    const isSearch = variant === "search";
    const isDropdown = variant === "dropdown";

    // Field height
    const heightClass = size === "small" ? "h-9" : "h-11";

    // Background + border + text colors per colorMode + state
    const fieldClasses = clsx(
      // Base
      "flex items-center w-full rounded-md border transition-colors font-labster",
      heightClass,
      "px-4 text-[14px] tracking-[0.5px]",
      // ColorMode
      isDark
        ? "bg-neutral-grey-6 text-neutral-white"
        : "bg-neutral-smoke text-neutral-grey-6",
      // Border state
      hasError
        ? "border-semantic-danger"
        : isDark
        ? "border-neutral-grey-4 focus-within:border-semantic-action-primary"
        : "border-neutral-grey-1 focus-within:border-semantic-action-primary",
      // Read-only
      readOnly && !isDark && "bg-neutral-white border-dashed",
      // Disabled
      disabled && "opacity-50 cursor-not-allowed"
    );

    // Label classes
    const labelColor = hasError
      ? "text-semantic-danger"
      : isDark
      ? "text-neutral-grey-2"
      : "text-neutral-grey-3";

    return (
      <div
        className={twMerge(
          clsx("flex flex-col gap-2 w-full font-labster", disabled && "opacity-60"),
          className
        )}
      >
        {/* Label + required asterisk */}
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              "flex items-start gap-[2px] text-[14px] font-semibold tracking-[1px] uppercase",
              labelColor
            )}
          >
            <span>{label}</span>
            {required && (
              <span className="text-semantic-accent-cta" aria-hidden="true">
                *
              </span>
            )}
            {required && <span className="sr-only">(requis)</span>}
          </label>
        )}

        {/* Input field wrapper */}
        <div className={fieldClasses}>
          {/* Search icon (search variant only) */}
          {isSearch && (
            <Icon
              name="search"
              size={20}
              className={clsx(
                "mr-2 shrink-0",
                isDark ? "text-neutral-grey-2" : "text-neutral-grey-3"
              )}
            />
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={id}
            type={isDropdown ? "text" : type}
            disabled={disabled}
            readOnly={readOnly || isDropdown}
            placeholder={placeholder}
            aria-invalid={hasError || undefined}
            aria-describedby={ariaDescribedBy}
            className={clsx(
              "flex-1 bg-transparent border-none outline-none min-w-0",
              "placeholder:opacity-50",
              isDark ? "placeholder:text-neutral-grey-2" : "placeholder:text-neutral-grey-6",
              isDropdown && "cursor-pointer"
            )}
            {...rest}
          />

          {/* Dropdown chevron */}
          {isDropdown && (
            <Icon
              name="chevron-down"
              size={20}
              className={clsx(
                "ml-2 shrink-0",
                isDark ? "text-neutral-grey-2" : "text-neutral-grey-4"
              )}
            />
          )}

          {/* Error icon (alert-circle) */}
          {hasError && !isDropdown && !isSearch && (
            <Icon
              name="alert-circle"
              size={20}
              className="ml-2 shrink-0 text-semantic-danger"
            />
          )}
        </div>

        {/* Helper text OR error message */}
        {hasError ? (
          <p
            id={errorId}
            className="text-p-sm font-semibold text-semantic-danger"
          >
            {errorMessage}
          </p>
        ) : helperText ? (
          <p
            id={helperId}
            className={clsx(
              "text-p-sm",
              isDark ? "text-neutral-grey-2" : "text-neutral-grey-3"
            )}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
