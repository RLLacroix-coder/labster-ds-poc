import { forwardRef, type HTMLAttributes } from "react";
import clsx from "clsx";
import { ElevatorAnchorLink } from "./ElevatorAnchorLink";

/**
 * Labster DS — Elevator
 *
 * Navigation latérale "ascenseur de page" (scroll-spy / table of contents).
 * Source Figma : 01-Labster-Web-components nodeId 308:584.
 *
 * Pattern : liste verticale d'ElevatorAnchorLink avec une ligne pointillée
 * verticale qui passe à travers les cercles. Sticky en général sur le côté
 * gauche d'une page longue (article, service, etc.).
 *
 * Width Figma : 169px. Gap entre items : 36px. Le label "actif" est celui
 * du item dont la section est actuellement visible dans le viewport.
 *
 * 2 APIs possibles :
 * 1. Passer une liste d'items via `items` prop (auto-render ElevatorAnchorLinks)
 * 2. Passer des children custom ElevatorAnchorLink (composition manuelle)
 */

export interface ElevatorItem {
  id: string;
  label: string;
  href?: string;
}

export interface ElevatorProps extends HTMLAttributes<HTMLElement> {
  /** Liste des sections (auto-render ElevatorAnchorLink). Alt: children manual. */
  items?: ElevatorItem[];
  /** ID de la section actuellement active */
  activeId?: string;
  /** Callback quand un item est cliqué — pratique pour scroll-to ou state update */
  onItemClick?: (id: string) => void;
  /** Aria label du nav */
  ariaLabel?: string;
}

export const Elevator = forwardRef<HTMLElement, ElevatorProps>(
  (
    { items, activeId, onItemClick, ariaLabel = "Page navigation", className, children, ...rest },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={clsx("relative w-[169px] font-labster", className)}
        {...rest}
      >
        {/* Ligne pointillée verticale — passe à travers les cercles (centrée à x=12, qui est le centre de la zone bullet 24px) */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-3 w-0 border-l-2 border-dashed border-neutral-grey-3"
        />

        {/* Items en flex-col gap-9 (36px) */}
        <div className="relative flex flex-col gap-9">
          {items
            ? items.map((item) => (
                <ElevatorAnchorLink
                  key={item.id}
                  href={item.href || `#${item.id}`}
                  active={activeId === item.id}
                  onClick={(e) => {
                    if (onItemClick) {
                      e.preventDefault();
                      onItemClick(item.id);
                    }
                  }}
                >
                  {item.label}
                </ElevatorAnchorLink>
              ))
            : children}
        </div>
      </nav>
    );
  }
);

Elevator.displayName = "Elevator";
