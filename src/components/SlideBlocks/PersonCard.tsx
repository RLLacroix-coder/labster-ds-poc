import { useState, type HTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — PersonCard
 *
 * Portrait circulaire + nom + rôle, centré. Pattern slide (1:6446 du deck RFP).
 *
 * À distinguer de `ManagerCard` :
 * - `ManagerCard` : carré, aligné à gauche, registry des 4 co-fondateurs Labster (brand kit)
 * - `PersonCard` (ici) : cercle, centré, générique (utilisable pour n'importe quel team member en slide)
 *
 * Composition :
 * - Portrait : 252px cercle (outer ring grey-1, inner photo 228×228 — comme Figma)
 * - Nom : 24px Bold center grey-4
 * - Rôle : 20px Regular center grey-4 (optionnel)
 *
 * Auto-fallback : si la photo n'est pas dans `/assets/managers/` (ou URL custom), affiche les initiales.
 */

export interface PersonCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Nom complet. */
  name: string;
  /** Rôle / position (optionnel). */
  role?: string;
  /** URL de la photo. Si absente ou 404, fallback initiales. */
  photo?: string;
  /** Taille du cercle outer (px). Défaut 252. */
  size?: number;
  /** Couleur du ring outer. Défaut grey-1 (cf. Figma). */
  ringColor?: string;
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

export function PersonCard({
  name,
  role,
  photo,
  size = 252,
  ringColor,
  className,
  ...rest
}: PersonCardProps) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const initials = getInitials(name);
  // Inner photo size matches Figma ratio: 228 / 252 ≈ 0.905
  const innerSize = Math.round(size * 0.905);
  const offset = Math.round((size - innerSize) / 2);

  return (
    <div
      className={clsx("inline-flex flex-col items-center gap-[6px] font-labster", className)}
      style={{ width: size }}
      {...rest}
    >
      <div
        className="relative shrink-0 rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: ringColor ?? "var(--ring-color, #E3E5E8)",
        }}
      >
        {photo && !photoFailed ? (
          <img
            src={photo}
            alt={name}
            width={innerSize}
            height={innerSize}
            onError={() => setPhotoFailed(true)}
            className="absolute rounded-full object-cover"
            style={{ top: offset, left: offset, width: innerSize, height: innerSize }}
          />
        ) : (
          <div
            role="img"
            aria-label={name}
            className="absolute grid place-items-center rounded-full bg-neutral-smoke"
            style={{ top: offset, left: offset, width: innerSize, height: innerSize }}
            title={photo ? `Photo not found at ${photo}` : `No photo provided for ${name}`}
          >
            <span
              className="font-bold text-neutral-grey-3"
              style={{ fontSize: Math.round(innerSize * 0.28) }}
            >
              {initials}
            </span>
          </div>
        )}
      </div>

      <p className="w-full text-center text-[24px] font-bold leading-[1.35] tracking-[-0.24px] text-neutral-grey-4">
        {name}
      </p>

      {role ? (
        <p className="w-full text-center text-[20px] font-normal leading-[1.4] tracking-[-0.2px] text-neutral-grey-4">
          {role}
        </p>
      ) : null}
    </div>
  );
}
