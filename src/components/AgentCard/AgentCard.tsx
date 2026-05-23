import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { StatusBadge, type AgentStatus } from "../StatusBadge";

/**
 * Labster DS — AgentCard
 *
 * Card colorée pour représenter un agent IA dans une liste (Labsterse dashboard,
 * AI Studio, automations gallery).
 *
 * Composition :
 * - Gradient background (preset par "tone" ou custom CSS gradient)
 * - Title (nom de l'agent, 18px Bold blanc)
 * - Description (2 lignes max, 14px Regular blanc/85)
 * - Footer : meta items (Created, Total runs) + StatusBadge à droite
 * - Padding 24px, rounded-2xl, hauteur ~180px
 *
 * Le texte est en blanc pour contraste sur gradient — pas de variant light.
 *
 * Interactions :
 * - Si `onClick` ou `href` : devient cliquable (hover : légère élévation)
 */

export type AgentCardTone =
  | "blue-purple"
  | "red-purple"
  | "teal-blue"
  | "yellow-orange"
  | "green-teal"
  | "purple-pink"
  | "blue-cyan"
  | "red-orange";

const GRADIENTS: Record<AgentCardTone, string> = {
  "blue-purple": "linear-gradient(135deg, #476AE3 0%, #6A4DE3 50%, #AF52DE 100%)",
  "red-purple": "linear-gradient(135deg, #EF4C59 0%, #B5436E 50%, #AF52DE 100%)",
  "teal-blue": "linear-gradient(135deg, #4ECCA3 0%, #4AA0BC 50%, #476AE3 100%)",
  "yellow-orange": "linear-gradient(135deg, #FFC31D 0%, #FF9A3D 50%, #EF4C59 100%)",
  "green-teal": "linear-gradient(135deg, #6DCB69 0%, #4ECCA3 50%, #4AA0BC 100%)",
  "purple-pink": "linear-gradient(135deg, #AF52DE 0%, #D14CB5 50%, #EF4C59 100%)",
  "blue-cyan": "linear-gradient(135deg, #476AE3 0%, #4AA0BC 50%, #4ECCA3 100%)",
  "red-orange": "linear-gradient(135deg, #EF4C59 0%, #FF7A4C 50%, #FFC31D 100%)",
};

export interface AgentCardMeta {
  label: string;
  value: ReactNode;
}

export interface AgentCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Nom de l'agent (titre). */
  name: string;
  /** Description courte (2-3 phrases). */
  description?: string;
  /** Items de metadata (ex: Created date, Total runs). */
  meta?: AgentCardMeta[];
  /** Statut affiché en bottom-right via StatusBadge translucent. */
  status?: AgentStatus;
  /** Override le label par défaut du status. */
  statusLabel?: string;
  /** Preset de gradient. Défaut "blue-purple". */
  tone?: AgentCardTone;
  /** Override custom CSS background (ex: "linear-gradient(...)"). Ignore `tone` si fourni. */
  customBackground?: string;
  /** Si fourni, rend la card cliquable. */
  href?: string;
  /** Hauteur fixe (px). Défaut auto (min-height 180). */
  height?: number;
}

export function AgentCard({
  name,
  description,
  meta,
  status,
  statusLabel,
  tone = "blue-purple",
  customBackground,
  href,
  height,
  className,
  onClick,
  ...rest
}: AgentCardProps) {
  const isInteractive = Boolean(href || onClick);
  const Component = (href ? "a" : isInteractive ? "button" : "div") as any;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={clsx(
        "relative block w-full overflow-hidden rounded-2xl p-6 font-labster text-left text-neutral-white",
        "shadow-[0_4px_12px_0_rgba(14,41,70,0.08)]",
        isInteractive && "cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_20px_0_rgba(14,41,70,0.12)]",
        className,
      )}
      style={{
        background: customBackground ?? GRADIENTS[tone],
        minHeight: height ?? 180,
      }}
      {...rest}
    >
      <div className="flex h-full flex-col">
        <h3 className="text-[18px] font-bold leading-tight">{name}</h3>
        {description ? (
          <p
            className="mt-2 text-[14px] font-normal leading-snug text-white/85"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-2 pt-6">
          <dl className="flex flex-col gap-1 text-[12px] leading-tight text-white/75">
            {meta?.map((m, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <dt className="font-semibold">{m.label}:</dt>
                <dd className="font-normal">{m.value}</dd>
              </div>
            ))}
          </dl>
          {status ? <StatusBadge status={status} label={statusLabel} appearance="translucent" /> : null}
        </div>
      </div>
    </Component>
  );
}

export const AGENT_CARD_TONES: AgentCardTone[] = [
  "blue-purple",
  "red-purple",
  "teal-blue",
  "yellow-orange",
  "green-teal",
  "purple-pink",
  "blue-cyan",
  "red-orange",
];
