import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Icon } from "../Icon";

/**
 * Labster DS — DateInput
 *
 * Champ date au format JJ/MM/AAAA avec icône calendrier.
 * Créé pour le Workflow USAGE "Création compte SIG" — gap relevé en Étape A
 * (l'icône `calendar` a été ajoutée au registre Icon dans la foulée).
 *
 * Aligné DS :
 * - Structure label/helper/error identique à `Input`.
 * - Boîte : bg neutral.smoke, border grey-1 (focus → action-primary), radius md, h44.
 * - Icône calendrier (trait grey-3) en suffixe.
 *
 * Champ texte masqué (pas de date-picker natif) — choix assumé pour matcher le
 * brief ("champ texte avec masque") et garder la cohérence visuelle DS. La
 * validation (format, majorité ≥ 18 ans) vit dans la logique métier. Tokens only.
 */

export interface DateInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Visible label. */
  label?: string;
  /** Required asterisk (red). */
  required?: boolean;
  /** Helper text below the field. */
  helperText?: string;
  /** Error message — switches to error state. */
  errorMessage?: string;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      label,
      required = false,
      helperText,
      errorMessage,
      className,
      disabled,
      id: providedId,
      placeholder = "JJ / MM / AAAA",
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
            "flex h-11 items-center gap-2 rounded-md border bg-neutral-smoke px-4 transition-colors",
            hasError
              ? "border-semantic-danger"
              : "border-neutral-grey-1 focus-within:border-semantic-action-primary",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <input
            ref={ref}
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="bday"
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            className="min-w-0 flex-1 border-none bg-transparent text-[14px] tracking-[0.5px] text-neutral-grey-6 outline-none placeholder:text-neutral-grey-2"
            {...rest}
          />
          <Icon
            name="calendar"
            size={20}
            className="shrink-0 text-neutral-grey-3"
            ariaLabel="Calendrier"
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

DateInput.displayName = "DateInput";
