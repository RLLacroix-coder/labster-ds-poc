import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Icon, type UiIconName } from "../Icon";

/**
 * Labster DS — InlineNotice
 *
 * Bandeau d'information contextuel (note légale, reprise de brouillon, alerte).
 * Créé pour le Workflow USAGE "Création compte SIG" — gap relevé en Étape A.
 *
 * Aligné DS :
 * - Fond = couleur "light" brand selon le tone (blue/yellow/red-light).
 * - Texte grey-6 (titre Bold) / grey-4 (corps).
 * - Radius md, padding compact, icône optionnelle à gauche.
 *
 * NOTE GAP : aucun token "success-light" n'existe dans le DS (cf. tokens/index.ts).
 * Le tone "success" retombe donc sur blue-light en attendant une décision
 * [TOKEN LABSTER MANQUANT — success-light à définir].
 *
 * Tokens uniquement.
 */

export type InlineNoticeTone = "info" | "warning" | "danger" | "success";

const TONE: Record<InlineNoticeTone, { bg: string; defaultIcon: UiIconName }> = {
  info: { bg: "bg-brand-blue-light", defaultIcon: "alert-circle" },
  warning: { bg: "bg-brand-yellow-light", defaultIcon: "alert-circle" },
  danger: { bg: "bg-brand-red-light", defaultIcon: "alert-circle" },
  // [TOKEN LABSTER MANQUANT — success-light] : fallback blue-light.
  success: { bg: "bg-brand-blue-light", defaultIcon: "verified" },
};

export interface InlineNoticeProps extends HTMLAttributes<HTMLDivElement> {
  /** Couleur sémantique du bandeau. */
  tone?: InlineNoticeTone;
  /** Titre optionnel (Bold). */
  title?: string;
  /** Affiche une icône à gauche (icône par défaut selon le tone). */
  withIcon?: boolean;
  /** Override de l'icône. */
  icon?: UiIconName;
  /** Contenu (corps du message). */
  children?: ReactNode;
}

export function InlineNotice({
  tone = "info",
  title,
  withIcon = true,
  icon,
  children,
  className,
  ...rest
}: InlineNoticeProps) {
  const t = TONE[tone];
  return (
    <div
      role="note"
      className={clsx(
        "flex items-start gap-3 rounded-md px-3 py-2.5 font-labster",
        t.bg,
        className,
      )}
      {...rest}
    >
      {withIcon && (
        <Icon
          name={icon ?? t.defaultIcon}
          size={18}
          className="mt-px shrink-0 text-neutral-grey-4"
        />
      )}
      <div className="min-w-0 flex-1">
        {title && (
          <p className="text-[13px] font-bold text-neutral-grey-6">{title}</p>
        )}
        {children && (
          <p className="text-[12px] font-semibold leading-snug text-neutral-grey-4">
            {children}
          </p>
        )}
      </div>
    </div>
  );
}
