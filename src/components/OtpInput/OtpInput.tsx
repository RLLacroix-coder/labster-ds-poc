import { useId, useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import clsx from "clsx";

/**
 * Labster DS — OtpInput
 *
 * Saisie de code à usage unique (OTP), champs segmentés avec auto-focus.
 * Créé pour le Workflow USAGE "Création compte SIG" — gap explicitement
 * flaggé dans le brief (§8) : "ne pas inventer, créer dans le DS".
 *
 * Aligné DS :
 * - Cellule : bg neutral.smoke, border grey-1 (focus → action-primary 2px),
 *   radius md (8px), digit centré 24px Bold grey-6.
 * - État erreur : border semantic.danger.
 * - Accessibilité : chaque cellule est un <input> natif (clavier complet),
 *   inputMode numeric, aria-label par position, paste réparti sur les cellules.
 *
 * Contrôlé : `value` (string) + `onChange(next)`. Tokens uniquement.
 */

export interface OtpInputProps {
  /** Longueur du code. Défaut 6. */
  length?: number;
  /** Valeur courante (string de chiffres). */
  value: string;
  /** Callback à chaque modification. */
  onChange: (value: string) => void;
  /** État erreur (border danger). */
  error?: boolean;
  /** Label groupé pour lecteurs d'écran. */
  ariaLabel?: string;
  className?: string;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  error = false,
  ariaLabel = "Code de vérification",
  className,
}: OtpInputProps) {
  const groupId = useId();
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const focusCell = (i: number) => {
    const el = refs.current[Math.max(0, Math.min(length - 1, i))];
    el?.focus();
    el?.select();
  };

  const setDigit = (i: number, char: string) => {
    const next = digits.slice();
    next[i] = char;
    onChange(next.join("").slice(0, length));
  };

  const handleChange = (i: number, raw: string) => {
    const char = raw.replace(/\D/g, "").slice(-1);
    if (!char) return;
    setDigit(i, char);
    if (i < length - 1) focusCell(i + 1);
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[i]) {
        setDigit(i, "");
      } else if (i > 0) {
        setDigit(i - 1, "");
        focusCell(i - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusCell(i - 1);
    } else if (e.key === "ArrowRight") {
      focusCell(i + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    focusCell(pasted.length - 1);
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={clsx("flex gap-2.5 font-labster", className)}
    >
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          id={`${groupId}-${i}`}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          aria-label={`Chiffre ${i + 1} sur ${length}`}
          aria-invalid={error || undefined}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={clsx(
            "h-14 w-full min-w-0 rounded-md border bg-neutral-smoke text-center text-[24px] font-bold text-neutral-grey-6",
            "outline-none transition-colors",
            error
              ? "border-semantic-danger"
              : "border-neutral-grey-1 focus:border-semantic-action-primary focus:border-2",
          )}
        />
      ))}
    </div>
  );
}
