import { forwardRef, useState, type HTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — ManagerCard
 *
 * Card "Manager Labster" — portrait + nom (+ rôle optionnel). Pattern observé
 * dans 01-Labster-Web-components (page Web components) :
 * - Managers/Christophe Gras (nodeId 2:2247)
 * - Managers/Alain Priser    (nodeId 2:2249)
 * - Managers/Remy Meyer      (nodeId 2:2251)
 * - Managers/Yann Auxenfans  (nodeId 2:2253)
 *
 * Dimensions Figma : 260×259 px. Le master Figma est un Component statique
 * (image portrait directement embedded). Pour le DS code-side, on rend :
 * - Image portrait (PNG/SVG exporté depuis Figma → public/assets/managers/)
 * - Nom en label sous l'image (Label M Fieldwork Geo Bold)
 * - Rôle optionnel en Paragraph Small Fieldwork Geo Regular grey-3
 *
 * Auto-fallback : si la photo n'est pas dans public/assets/managers/,
 * affiche un placeholder avec les initiales.
 */

export type ManagerSlug =
  | "christophe-gras"
  | "alain-priser"
  | "remy-meyer"
  | "yann-auxenfans";

export interface ManagerInfo {
  slug: ManagerSlug;
  name: string;
  role?: string;
  figma_node_id: string;
}

/** Registry des managers Labster observés dans le brand kit. */
export const MANAGERS: Record<ManagerSlug, ManagerInfo> = {
  "christophe-gras": {
    slug: "christophe-gras",
    name: "Christophe Gras",
    role: "Co-fondateur",
    figma_node_id: "2:2247",
  },
  "alain-priser": {
    slug: "alain-priser",
    name: "Alain Priser",
    role: "Co-fondateur",
    figma_node_id: "2:2249",
  },
  "remy-meyer": {
    slug: "remy-meyer",
    name: "Remy Meyer",
    role: "COO",
    figma_node_id: "2:2251",
  },
  "yann-auxenfans": {
    slug: "yann-auxenfans",
    name: "Yann Auxenfans",
    role: "Co-fondateur",
    figma_node_id: "2:2253",
  },
};

export const MANAGER_SLUGS: ManagerSlug[] = Object.keys(MANAGERS) as ManagerSlug[];

export interface ManagerCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Manager slug from the registry (auto-loads name + role + photo) */
  manager?: ManagerSlug;
  /** Or pass custom data directly */
  name?: string;
  role?: string;
  /** Custom photo URL. If omitted with `manager` prop, loads /assets/managers/<slug>.png */
  photo?: string;
  /** Width in pixels (default 260, matches Figma master) */
  width?: number;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const ManagerCard = forwardRef<HTMLDivElement, ManagerCardProps>(
  (
    {
      manager,
      name: customName,
      role: customRole,
      photo: customPhoto,
      width = 260,
      className,
      ...rest
    },
    ref
  ) => {
    const [photoFailed, setPhotoFailed] = useState(false);

    // Resolve from registry if `manager` slug provided, else use custom props
    const meta = manager ? MANAGERS[manager] : null;
    const name = customName ?? meta?.name ?? "Unknown";
    const role = customRole ?? meta?.role;
    const photoUrl =
      customPhoto ?? (manager ? `/assets/managers/${manager}.png` : null);

    const initials = getInitials(name);

    // Image height matches the Figma master ratio (260 wide × 259 tall — basically square)
    const imageSize = width;

    return (
      <div
        ref={ref}
        className={clsx("inline-flex flex-col items-start gap-3 font-labster", className)}
        style={{ width }}
        {...rest}
      >
        {/* Portrait */}
        {photoUrl && !photoFailed ? (
          <img
            src={photoUrl}
            alt={name}
            width={imageSize}
            height={imageSize}
            onError={() => setPhotoFailed(true)}
            className="rounded-md object-cover"
            style={{ width: imageSize, height: imageSize }}
          />
        ) : (
          <div
            role="img"
            aria-label={name}
            className="flex items-center justify-center bg-brand-blue-light text-neutral-grey-6 rounded-md border-2 border-dashed border-brand-blue"
            style={{ width: imageSize, height: imageSize }}
            title={
              photoUrl
                ? `Photo not found. Drop ${manager}.png in public/assets/managers/`
                : `No photo provided for ${name}`
            }
          >
            <span className="text-h2 font-bold tracking-wide">{initials}</span>
          </div>
        )}

        {/* Name */}
        <p className="text-label-m text-neutral-grey-6">{name}</p>

        {/* Role (optional) */}
        {role && <p className="text-p-sm text-neutral-grey-3">{role}</p>}
      </div>
    );
  }
);

ManagerCard.displayName = "ManagerCard";
