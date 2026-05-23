import type { HTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — StatusBadge
 *
 * Badge compact avec dot coloré + label. Indique l'état d'une ressource
 * (agent, job, build, request).
 *
 * À distinguer de `Badge` :
 * - `Badge` : badge générique avec variants info/success/warning/etc. (typographie/colorisation)
 * - `StatusBadge` (ici) : dot indicator + texte, semi-transparent (utilisable sur fond coloré)
 *
 * Note d'implémentation : couleurs des dots en inline style (hex) plutôt que classes
 * Tailwind dynamiques, pour garantir le rendu même si Tailwind JIT ne pick-up pas
 * une classe générée dynamiquement.
 */

export type AgentStatus =
  | "running"
  | "paused"
  | "failed"
  | "draft"
  | "completed"
  | "queued";

interface StatusMeta {
  label: string;
  dotColor: string;
  tone: "success" | "warning" | "danger" | "neutral" | "info";
}

const STATUS: Record<AgentStatus, StatusMeta> = {
  running: { label: "Running", dotColor: "#4ECCA3", tone: "success" },
  completed: { label: "Completed", dotColor: "#4ECCA3", tone: "success" },
  paused: { label: "Paused", dotColor: "#FFC31D", tone: "warning" },
  queued: { label: "Queued", dotColor: "#476AE3", tone: "info" },
  draft: { label: "Draft", dotColor: "#707F8F", tone: "neutral" },
  failed: { label: "Failed", dotColor: "#EF4C59", tone: "danger" },
};

export type StatusBadgeAppearance = "solid" | "translucent";

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: AgentStatus;
  /** Override le label par défaut. */
  label?: string;
  /** Apparence du fond. "translucent" pour overlay sur fond coloré (ex: dark navy). */
  appearance?: StatusBadgeAppearance;
}

export function StatusBadge({
  status,
  label,
  appearance = "solid",
  className,
  style,
  ...rest
}: StatusBadgeProps) {
  const meta = STATUS[status];
  const appearanceStyle =
    appearance === "translucent"
      ? { backgroundColor: "rgba(255, 255, 255, 0.92)", backdropFilter: "blur(6px)" }
      : { backgroundColor: "#FFFFFF", border: "1px solid #E3E5E8" };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-pill px-3 py-1.5 font-labster text-[13px] font-semibold leading-[1.2] text-neutral-grey-6",
        className,
      )}
      style={{ ...appearanceStyle, ...style }}
      {...rest}
    >
      <span
        aria-hidden
        className="inline-block shrink-0 rounded-full"
        style={{ width: 10, height: 10, backgroundColor: meta.dotColor }}
      />
      <span className="whitespace-nowrap">{label ?? meta.label}</span>
    </span>
  );
}
