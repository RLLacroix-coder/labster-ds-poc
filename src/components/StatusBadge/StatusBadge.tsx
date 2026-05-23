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
 */

export type AgentStatus =
  | "running"
  | "paused"
  | "failed"
  | "draft"
  | "completed"
  | "queued";

const STATUS: Record<AgentStatus, { label: string; dot: string; tone: "success" | "warning" | "danger" | "neutral" | "info" }> = {
  running: { label: "Running", dot: "bg-[#4ECCA3]", tone: "success" },
  completed: { label: "Completed", dot: "bg-[#4ECCA3]", tone: "success" },
  paused: { label: "Paused", dot: "bg-brand-yellow", tone: "warning" },
  queued: { label: "Queued", dot: "bg-brand-blue", tone: "info" },
  draft: { label: "Draft", dot: "bg-neutral-grey-3", tone: "neutral" },
  failed: { label: "Failed", dot: "bg-brand-red", tone: "danger" },
};

export type StatusBadgeAppearance = "solid" | "translucent";

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: AgentStatus;
  /** Override le label par défaut. */
  label?: string;
  /** Apparence du fond. "translucent" pour overlay sur fond coloré (ex: AgentCard gradient). */
  appearance?: StatusBadgeAppearance;
}

const APPEARANCE = {
  solid: "bg-neutral-white border border-neutral-grey-1 text-neutral-grey-6",
  translucent: "bg-white/85 backdrop-blur-sm text-neutral-grey-6",
} as const;

export function StatusBadge({
  status,
  label,
  appearance = "solid",
  className,
  ...rest
}: StatusBadgeProps) {
  const meta = STATUS[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-labster text-[12px] font-semibold leading-none",
        APPEARANCE[appearance],
        className,
      )}
      {...rest}
    >
      <span aria-hidden className={clsx("inline-block size-1.5 rounded-full", meta.dot)} />
      <span>{label ?? meta.label}</span>
    </span>
  );
}
