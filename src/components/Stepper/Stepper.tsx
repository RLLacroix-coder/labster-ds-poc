import type { HTMLAttributes } from "react";
import clsx from "clsx";
import { Icon } from "../Icon";

/**
 * Labster DS — Stepper
 *
 * Indicateur de progression pour parcours multi-étapes (wizard).
 * Créé pour le Workflow USAGE "Création compte SIG" — aucun équivalent DS
 * préexistant (gap relevé en Étape A).
 *
 * Aligné DS :
 * - Cercle actif : bg semantic.action-primary (Blue brand), numéro blanc.
 * - Cercle complété : bg action-primary + check icon blanc.
 * - Cercle à venir : bg white, border grey-1, numéro grey-2.
 * - Label sous le cercle : 13px, Bold grey-6 (actif/complété) sinon grey-3.
 * - Connecteurs : trait 2px, action-primary jusqu'à l'étape courante sinon grey-1.
 *
 * Tokens uniquement. Pas de hex hardcodé.
 */

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** Libellés des étapes, dans l'ordre. */
  steps: string[];
  /** Index 0-based de l'étape courante. */
  current: number;
}

export function Stepper({ steps, current, className, ...rest }: StepperProps) {
  return (
    <div
      className={clsx("flex w-full items-center font-labster", className)}
      role="list"
      aria-label={`Étape ${current + 1} sur ${steps.length}`}
      {...rest}
    >
      {steps.map((label, i) => {
        const isDone = i < current;
        const isActive = i === current;
        const reached = i <= current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            {/* Step node */}
            <div
              className="flex shrink-0 flex-col items-center gap-2"
              role="listitem"
              aria-current={isActive ? "step" : undefined}
            >
              <span
                className={clsx(
                  "grid size-10 place-items-center rounded-pill border text-[16px] font-bold transition-colors",
                  reached
                    ? "border-transparent bg-semantic-action-primary text-neutral-white"
                    : "border-neutral-grey-1 bg-neutral-white text-neutral-grey-2",
                )}
              >
                {isDone ? (
                  <Icon name="check" size={20} ariaLabel="Complété" />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={clsx(
                  "text-[13px] font-semibold",
                  reached ? "text-neutral-grey-6" : "text-neutral-grey-3",
                )}
              >
                {label}
              </span>
            </div>

            {/* Connector (not after last step) */}
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={clsx(
                  "mx-2 h-0.5 flex-1 self-start",
                  // align with the 40px circle center (20px), minus label space
                  "mt-5",
                  isDone ? "bg-semantic-action-primary" : "bg-neutral-grey-1",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
