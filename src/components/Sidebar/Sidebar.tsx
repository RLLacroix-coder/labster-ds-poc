import type { HTMLAttributes, ReactNode, ElementType } from "react";
import clsx from "clsx";

/**
 * Labster DS — Sidebar
 *
 * Container vertical fixe pour navigation app (Labsterse, dashboards internes).
 *
 * Composition typique :
 * - `header` : logo + nom app
 * - `children` : liste de `<SidebarNavItem>`
 * - `footer` : log out, user info, etc.
 *
 * À distinguer de :
 * - `NavItem` : item de navigation horizontale (header marketing, footer)
 * - `SidebarNavItem` (ce module) : item de navigation verticale dans une sidebar app
 */

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  header?: ReactNode;
  footer?: ReactNode;
  /** Largeur en px. Défaut 240. */
  width?: number;
}

export function Sidebar({
  header,
  footer,
  children,
  width = 240,
  className,
  ...rest
}: SidebarProps) {
  return (
    <aside
      className={clsx(
        "flex h-full shrink-0 flex-col border-r border-neutral-grey-1 bg-neutral-white font-labster",
        className,
      )}
      style={{ width }}
      {...rest}
    >
      {header ? <div className="px-6 py-6">{header}</div> : null}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-1">{children}</ul>
      </nav>
      {footer ? <div className="border-t border-neutral-grey-1 px-3 py-4">{footer}</div> : null}
    </aside>
  );
}

// =============================================================================
// SidebarNavItem
// =============================================================================

export interface SidebarNavItemProps extends HTMLAttributes<HTMLElement> {
  /** Icon à gauche (ex: `<Icon name="..." />`). */
  icon?: ReactNode;
  /** Libellé. */
  label: string;
  /** Item actif (page courante). */
  active?: boolean;
  /** Badge/compteur à droite. */
  badge?: ReactNode;
  /** Composant racine (`a` par défaut, ou `button`, `Link` next.js, etc.). */
  as?: ElementType;
  /** href si as='a'. */
  href?: string;
}

export function SidebarNavItem({
  icon,
  label,
  active = false,
  badge,
  as,
  href,
  className,
  ...rest
}: SidebarNavItemProps) {
  const Component = (as ?? (href ? "a" : "button")) as ElementType;
  return (
    <li>
      <Component
        href={href}
        aria-current={active ? "page" : undefined}
        className={clsx(
          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left font-labster text-[15px] leading-none transition-colors",
          active
            ? "bg-neutral-smoke font-bold text-neutral-grey-6"
            : "font-normal text-neutral-grey-4 hover:bg-neutral-smoke hover:text-neutral-grey-6",
          className,
        )}
        {...rest}
      >
        {icon ? <span className="grid size-5 shrink-0 place-items-center">{icon}</span> : null}
        <span className="flex-1 truncate">{label}</span>
        {badge ? <span className="shrink-0">{badge}</span> : null}
      </Component>
    </li>
  );
}
