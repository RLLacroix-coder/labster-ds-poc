import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — PageHeader
 *
 * Header de page dashboard : titre + sous-titre optionnel + actions à droite.
 * Pattern observé sur dashboards SaaS modernes (Linear, Stripe, etc.).
 *
 * Layout : titre/subtitle left, actions right (avatar, boutons, search, etc.).
 */

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Titre de la page. */
  title: ReactNode;
  /** Sous-titre / breadcrumb. */
  subtitle?: ReactNode;
  /** Actions à droite (Avatar, Button, etc.). */
  actions?: ReactNode;
  /** Taille du titre. Défaut "lg" (28px). */
  titleSize?: "md" | "lg" | "xl";
}

const TITLE_CLASS = {
  md: "text-[20px] leading-tight",
  lg: "text-[28px] leading-tight",
  xl: "text-[40px] leading-[1.1]",
} as const;

export function PageHeader({
  title,
  subtitle,
  actions,
  titleSize = "lg",
  className,
  ...rest
}: PageHeaderProps) {
  return (
    <header
      className={clsx("flex items-center justify-between gap-4 font-labster", className)}
      {...rest}
    >
      <div className="min-w-0 flex-1">
        <h1 className={clsx("font-bold text-neutral-grey-6", TITLE_CLASS[titleSize])}>{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-[14px] font-normal text-neutral-grey-3">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </header>
  );
}
