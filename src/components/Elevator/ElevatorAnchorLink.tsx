import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — ElevatorAnchorLink
 *
 * 1 item d'un Elevator (scroll-spy navigation type table of contents).
 * Source Figma : 01-Labster-Web-components nodeId 2:2294
 * (Component Set "Elevator/Anchor links", 4 variants).
 *
 * 4 états :
 * - Default       : texte grey-4 + cercle creux 8px border grey-3
 * - Active        : texte grey-6 + cercle plein 16px rouge accent-cta
 * - Default Hover : texte rouge + cercle creux 8px
 * - Active Hover  : texte rouge + cercle plein 16px
 *
 * Layout : cercle à gauche (zone fixe 24px) + texte à droite (40px from left).
 * Typo : Fieldwork Geo Regular 14px letter-spacing 0.5px.
 */

export interface ElevatorAnchorLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Label du link */
  children: ReactNode;
  /** Active = correspond à la section actuellement visible (scroll-spy) */
  active?: boolean;
}

export const ElevatorAnchorLink = forwardRef<
  HTMLAnchorElement,
  ElevatorAnchorLinkProps
>(({ children, active = false, className, ...rest }, ref) => {
  return (
    <a
      ref={ref}
      aria-current={active ? "true" : undefined}
      className={clsx(
        "group relative flex items-center gap-3 h-[21px] w-[169px] font-labster",
        "text-[14px] tracking-[0.5px] leading-[1]",
        "transition-colors duration-150 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-action-primary focus-visible:ring-offset-2 rounded-sm",
        // Text color : default = grey-4, active = grey-6, hover (both) = accent-cta
        active ? "text-neutral-grey-6" : "text-neutral-grey-4",
        "hover:text-semantic-accent-cta",
        className
      )}
      {...rest}
    >
      {/* Bullet zone : 24px wide, centered bullet */}
      <span className="flex items-center justify-center w-6 shrink-0">
        {active ? (
          // Active = filled red circle 16px
          <span
            aria-hidden="true"
            className="w-4 h-4 rounded-full bg-semantic-accent-cta"
          />
        ) : (
          // Default = empty circle 8px with grey-3 border
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full border-2 border-neutral-grey-3 bg-neutral-white"
          />
        )}
      </span>

      {/* Label */}
      <span className="flex-1 truncate">{children}</span>
    </a>
  );
});

ElevatorAnchorLink.displayName = "ElevatorAnchorLink";
