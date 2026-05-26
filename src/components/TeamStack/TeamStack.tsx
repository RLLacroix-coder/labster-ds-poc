import type { HTMLAttributes } from "react";
import clsx from "clsx";
import { Avatar, type AvatarBgColor } from "../Avatar";

/**
 * Labster DS — TeamStack
 *
 * Avatars chevauchés (avec ring) + overflow "+N" — pattern récurrent dès qu'on
 * a une notion d'équipe sur un item (engagement, ticket, projet).
 *
 * Composition :
 * - N `Avatar` de taille `size` (défaut 32), chevauchés via marginLeft négatif
 * - Chaque avatar a un ring blanc (2px) pour séparer visuellement
 * - Si `members.length > maxVisible`, le dernier cercle affiche "+N" sur fond grey
 *
 * Cohérent avec : convention DS d'utiliser Avatar pour tout rendu portrait/initiales.
 * Composé depuis Figma frame node 45:2 (EngagementRow).
 */

export interface TeamMember {
  name: string;
  bgColor?: AvatarBgColor;
  photo?: string;
}

export interface TeamStackProps extends HTMLAttributes<HTMLDivElement> {
  members: TeamMember[];
  /** Nombre max d'avatars visibles avant overflow "+N". Défaut 3. */
  maxVisible?: number;
  /** Taille de chaque avatar en px. Défaut 32. */
  size?: 24 | 32 | 40 | 48;
}

export function TeamStack({
  members,
  maxVisible = 3,
  size = 32,
  className,
  ...rest
}: TeamStackProps) {
  const visible = members.slice(0, maxVisible);
  const overflow = Math.max(0, members.length - maxVisible);
  const offset = Math.round(size * 0.31);

  return (
    <div className={clsx("inline-flex items-center", className)} {...rest}>
      {visible.map((m, i) => (
        <span
          key={i}
          className="inline-flex rounded-full ring-2 ring-neutral-white"
          style={{ marginLeft: i === 0 ? 0 : -offset }}
        >
          <Avatar
            name={m.name}
            src={m.photo}
            bgColor={m.bgColor ?? "blue"}
            size={size}
          />
        </span>
      ))}
      {overflow > 0 ? (
        <span
          className="inline-grid place-items-center rounded-full bg-neutral-grey-1 ring-2 ring-neutral-white font-labster font-bold text-neutral-grey-6"
          style={{
            width: size,
            height: size,
            marginLeft: -offset,
            fontSize: Math.round(size * 0.34),
          }}
          aria-label={`${overflow} more team members`}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}
