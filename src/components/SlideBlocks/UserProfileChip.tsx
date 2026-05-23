import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — UserProfileChip
 *
 * Chip horizontal compact : avatar circle (initiales ou photo) + nom + role.
 * Pattern observé sur 0akzw8mYzFByJcrrRgJbQp node 1:5842 (RFP — Mickaël Deschodt).
 *
 * Dimensions Figma : variable, hauteur ~90px, rounded-[14px], padding-left 22px gap 14.
 * Background blanc avec drop-shadow subtil rgba(27,42,74,0.06).
 *
 * Avatar : 48×48, rounded-full, fond color configurable. Initiales 16px Bold blanc.
 * Nom : 20px Bold #1B2A4A.
 * Role : 14px Demibold #9BA4B5 ls 0.3px.
 */

export type UserChipAvatarColor =
  | "red"
  | "blue"
  | "yellow"
  | "purple"
  | "grey";

const AVATAR_BG: Record<UserChipAvatarColor, string> = {
  red: "bg-[#E63946]",
  blue: "bg-brand-blue",
  yellow: "bg-brand-yellow",
  purple: "bg-[#AF52DE]",
  grey: "bg-neutral-grey-3",
};

export interface UserProfileChipProps extends HTMLAttributes<HTMLDivElement> {
  /** Nom complet. Initiales calculées si pas de photo. */
  name: string;
  /** Rôle / position / ville. */
  role?: string;
  /** Photo ou node custom à la place des initiales. */
  avatar?: ReactNode;
  /** Couleur du fond avatar quand initiales. Défaut "red". */
  avatarColor?: UserChipAvatarColor;
}

export function UserProfileChip({
  name,
  role,
  avatar,
  avatarColor = "red",
  className,
  ...rest
}: UserProfileChipProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-[14px] rounded-[14px] bg-neutral-white py-3 pl-[22px] pr-6 font-labster",
        "shadow-[0_1px_1.5px_0_rgba(27,42,74,0.06)]",
        className,
      )}
      {...rest}
    >
      <div
        className={clsx(
          "grid size-12 shrink-0 place-items-center rounded-full",
          AVATAR_BG[avatarColor],
        )}
      >
        {avatar ?? (
          <span className="text-[16px] font-bold leading-none text-neutral-white">{initials}</span>
        )}
      </div>
      <div className="flex flex-col items-start">
        <p className="text-[20px] font-bold leading-tight text-[#1B2A4A]">{name}</p>
        {role ? (
          <p className="text-[14px] font-semibold leading-tight tracking-[0.3px] text-[#9BA4B5]">
            {role}
          </p>
        ) : null}
      </div>
    </div>
  );
}
