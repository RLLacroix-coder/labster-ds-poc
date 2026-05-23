import { useState, type ImgHTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — Avatar
 *
 * Avatar circulaire (photo ou initiales) pour identifier un utilisateur dans
 * une UI app (top bar, lists, comments, etc.).
 *
 * À distinguer :
 * - `ManagerCard` / `PersonCard` : composants complets avec name + role
 * - `Avatar` : seulement le cercle photo, standalone
 *
 * Fallback automatique : si `src` est absent ou 404, affiche les initiales sur
 * un fond coloré (palette brand).
 */

export type AvatarSize = 24 | 32 | 40 | 48 | 64 | 80;
export type AvatarBgColor = "blue" | "red" | "yellow" | "purple" | "grey" | "smoke";

const BG_COLOR: Record<AvatarBgColor, string> = {
  blue: "bg-brand-blue text-neutral-white",
  red: "bg-brand-red text-neutral-white",
  yellow: "bg-brand-yellow text-neutral-grey-6",
  purple: "bg-[#AF52DE] text-neutral-white",
  grey: "bg-neutral-grey-3 text-neutral-white",
  smoke: "bg-neutral-smoke text-neutral-grey-5",
};

const FONT_SIZE: Record<AvatarSize, number> = {
  24: 10,
  32: 12,
  40: 14,
  48: 16,
  64: 22,
  80: 28,
};

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  /** URL photo. Si absente ou 404, affiche les initiales. */
  src?: string;
  /** Nom complet pour calculer initiales + alt text. */
  name: string;
  /** Taille (px). Défaut 40. */
  size?: AvatarSize;
  /** Couleur fond initiales. Défaut "smoke". */
  bgColor?: AvatarBgColor;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({
  src,
  name,
  size = 40,
  bgColor = "smoke",
  className,
  ...rest
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const initials = getInitials(name);
  const showPhoto = src && !failed;

  return showPhoto ? (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={clsx("inline-block shrink-0 rounded-full object-cover", className)}
      style={{ width: size, height: size }}
      {...rest}
    />
  ) : (
    <div
      role="img"
      aria-label={name}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-labster font-bold",
        BG_COLOR[bgColor],
        className,
      )}
      style={{ width: size, height: size }}
    >
      <span style={{ fontSize: FONT_SIZE[size], lineHeight: 1, display: "inline-block" }}>
        {initials}
      </span>
    </div>
  );
}
