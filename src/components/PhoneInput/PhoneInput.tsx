import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Labster DS — PhoneInput
 *
 * Champ téléphone avec préfixe indicatif pays + masque national.
 * Créé pour le Workflow USAGE "Création compte SIG" — `Input` n'a pas de slot
 * préfixe actionnable (gap relevé en Étape A).
 *
 * Aligné DS :
 * - Structure label/helper/error identique à `Input` (asterisk rouge accent-cta,
 *   helper grey-3, error semantic.danger + aria).
 * - Boîte : bg neutral.smoke, border grey-1 (focus → action-primary), radius md, h44.
 * - Préfixe : chip bg semantic.action-primary léger (blue-light brand) + drapeau.
 *
 * Par défaut indicatif Suisse +41 (cf. brief SIG). Tokens uniquement.
 */

const SwissFlag = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
    <rect width="16" height="16" rx="3" className="fill-semantic-danger" />
    <rect x="6.75" y="3.5" width="2.5" height="9" rx="0.5" fill="#fff" />
    <rect x="3.5" y="6.75" width="9" height="2.5" rx="0.5" fill="#fff" />
  </svg>
);

export interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "type"> {
  /** Visible label. */
  label?: string;
  /** Required asterisk (red). */
  required?: boolean;
  /** Indicatif affiché dans le chip préfixe. Défaut "+41". */
  countryCode?: string;
  /** Helper text below the field. */
  helperText?: string;
  /** Error message — switches to error state. */
  errorMessage?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      required = false,
      countryCode = "+41",
      helperText,
      errorMessage,
      className,
      disabled,
      id: providedId,
      placeholder = "78 123 45 67",
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = providedId || autoId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const hasError = Boolean(errorMessage);

    return (
      <div
        className={twMerge(
          clsx("flex w-full flex-col gap-2 font-labster", disabled && "opacity-60"),
          className,
        )}
      >
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              "flex items-start gap-[2px] text-[14px] font-semibold uppercase tracking-[1px]",
              hasError ? "text-semantic-danger" : "text-neutral-grey-3",
            )}
          >
            <span>{label}</span>
            {required && (
              <>
                <span className="text-semantic-accent-cta" aria-hidden="true">
                  *
                </span>
                <span className="sr-only">(requis)</span>
              </>
            )}
          </label>
        )}

        <div
          className={clsx(
            "flex h-11 items-center gap-2 rounded-md border bg-neutral-smoke px-2 transition-colors",
            hasError
              ? "border-semantic-danger"
              : "border-neutral-grey-1 focus-within:border-semantic-action-primary",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {/* Prefix chip */}
          <span className="flex shrink-0 items-center gap-1.5 rounded-sm bg-brand-blue-light px-2 py-1 text-[13px] font-bold text-neutral-grey-6">
            <SwissFlag />
            {countryCode}
          </span>

          <input
            ref={ref}
            id={id}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            className="min-w-0 flex-1 border-none bg-transparent text-[14px] tracking-[0.5px] text-neutral-grey-6 outline-none placeholder:text-neutral-grey-2"
            {...rest}
          />
        </div>

        {hasError ? (
          <p id={errorId} className="text-p-sm font-semibold text-semantic-danger">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-p-sm text-neutral-grey-3">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";
