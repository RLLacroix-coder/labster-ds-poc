import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Labster DS — NavItem
 *
 * Item de navigation (top nav, sidebar). Source Figma :
 * 01-Labster-Web-components nodeId 2:946 (Navigation/nav item Component Set).
 *
 * Pattern :
 * - Text Fieldwork Geo Regular 14/1px letter-spacing 0.5 (Links style)
 * - Text color : default grey-4 → hover/active grey-6
 * - Highlight bar en bas :
 *   - default : pas de bar
 *   - hover : bar 2px de la couleur du variant
 *   - active : bar 4px de la couleur du variant
 *
 * 4 couleurs × 3 states = 12 variants Figma.
 *
 * Couleurs (mappent généralement à des sections du site Labster) :
 * - Red (accent CTA) → Services / About
 * - Blue (action primary) → Insights / Articles
 * - Yellow (warning brand) → Events / News
 * - Generic (grey-6) → fallback / sub-menu
 */

export type NavItemColor = "red" | "blue" | "yellow" | "generic";
export type NavItemState = "default" | "hover" | "active";

export interface NavItemProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> {
  children: ReactNode;
  /** Brand color for the underline highlight bar */
  color?: NavItemColor;
  /** Force the active state (current page indicator) */
  active?: boolean;
}

const COLOR_BG: Record<NavItemColor, string> = {
  red: "bg-semantic-accent-cta", // #EF4C59
  blue: "bg-brand-blue", // #476AE3
  yellow: "bg-brand-yellow", // #FFC31D
  generic: "bg-neutral-grey-6", // #0E2946
};

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ children, color = "red", active = false, className, ...rest }, ref) => {
    return (
      <a
        ref={ref}
        aria-current={active ? "page" : undefined}
        className={twMerge(
          clsx(
            "group inline-flex flex-col items-start justify-end font-labster",
            "text-link tracking-[0.5px]",
            // Text color
            active
              ? "text-neutral-grey-6"
              : "text-neutral-grey-4 hover:text-neutral-grey-6",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-action-primary focus-visible:ring-offset-2 rounded-sm",
            "cursor-pointer transition-colors duration-150"
          ),
          className
        )}
        {...rest}
      >
        {/* Link label — flex-1 to push the bar to the bottom */}
        <span className="px-2 py-3">{children}</span>

        {/* Highlight bar : 4px when active, 2px when hover, 0px default */}
        <span
          aria-hidden="true"
          className={clsx(
            "w-full transition-all duration-150",
            COLOR_BG[color],
            // Default = no bar (h-0). Hover = 2px. Active = 4px (always shown).
            active ? "h-1" : "h-0 group-hover:h-[2px]"
          )}
        />
      </a>
    );
  }
);

NavItem.displayName = "NavItem";
