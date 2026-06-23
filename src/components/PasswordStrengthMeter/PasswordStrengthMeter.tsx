import type { HTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — PasswordStrengthMeter
 *
 * Indicateur de force de mot de passe (barre segmentée + label).
 * Créé pour le Workflow USAGE "Création compte SIG" — gap relevé en Étape A.
 *
 * Aligné DS :
 * - Segments : rectangles rounded-sm, gap 6px, h 6px.
 * - Couleurs par palier : danger (faible) → warning (moyen) → success (bon/fort).
 *   Segments non atteints : grey-1.
 * - Label force : 12px semibold, couleur du palier.
 * - Requirements : 12px grey-3 (équivalent textuel pour lecteurs d'écran).
 *
 * Présentationnel : le `score` est calculé en amont (politique NCSC/ISO 27001
 * côté logique métier), pas par ce composant. Tokens uniquement.
 */

export interface PasswordStrengthMeterProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Score de 0 (vide) à 4 (fort). */
  score: 0 | 1 | 2 | 3 | 4;
  /** Nombre de segments affichés. Défaut 4. */
  segments?: number;
  /** Texte des exigences (équivalent textuel a11y). */
  requirementsText?: string;
}

const SCORE_META: Record<
  number,
  { label: string; bar: string; text: string }
> = {
  0: { label: "—", bar: "bg-neutral-grey-1", text: "text-neutral-grey-3" },
  1: { label: "Faible", bar: "bg-semantic-danger", text: "text-semantic-danger" },
  2: { label: "Moyen", bar: "bg-semantic-warning", text: "text-semantic-warning" },
  3: { label: "Bon", bar: "bg-semantic-success", text: "text-semantic-success" },
  4: { label: "Fort", bar: "bg-semantic-success", text: "text-semantic-success" },
};

export function PasswordStrengthMeter({
  score,
  segments = 4,
  requirementsText,
  className,
  ...rest
}: PasswordStrengthMeterProps) {
  const meta = SCORE_META[score] ?? SCORE_META[0];
  return (
    <div className={clsx("flex flex-col gap-1.5 font-labster", className)} {...rest}>
      <div
        className="flex gap-1.5"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={segments}
        aria-valuenow={score}
        aria-label={`Force du mot de passe : ${meta.label}`}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              "h-1.5 flex-1 rounded-sm transition-colors",
              i < score ? meta.bar : "bg-neutral-grey-1",
            )}
          />
        ))}
      </div>
      <p className="text-[12px] font-semibold text-neutral-grey-4">
        <span className={meta.text}>Force : {meta.label}</span>
        {requirementsText ? (
          <span className="text-neutral-grey-3"> · {requirementsText}</span>
        ) : null}
      </p>
    </div>
  );
}
