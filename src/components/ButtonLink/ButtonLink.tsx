import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Labster DS — ButtonLink
 *
 * Différent du Button variant=link (générique). Pattern Labster spécifique
 * observé dans 01-Labster-Web-components (nodeId 305:1509) :
 *
 * - Texte Fieldwork Geo Demibold 16/1px letter-spacing
 * - Underline accent rouge brand (#EF4C59) en dessous
 * - Animation : underline démarre à 24px, s'étend à width-full au hover
 * - Color text : default grey-4, hover grey-6
 *
 * Usage : CTA secondaires, liens de section, links de menu portfolio.
 */

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /** If true, force the underline to full width (mimic active state). Default false. */
  active?: boolean;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ children, active = false, className, ...rest }, ref) => {
    return (
      <a
        ref={ref}
        className={twMerge(
          clsx(
            "group inline-flex flex-col items-start gap-[9px] font-labster",
            "text-button-link tracking-[1px] font-semibold",
            "transition-colors duration-150",
            // Color : default grey-4 → hover/active grey-6
            active
              ? "text-neutral-grey-6"
              : "text-neutral-grey-4 hover:text-neutral-grey-6",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-action-primary focus-visible:ring-offset-2 rounded-sm",
            "cursor-pointer"
          ),
          className
        )}
        {...rest}
      >
        <span>{children}</span>
        {/* Animated underline : 24px → full width on hover */}
        <span
          aria-hidden="true"
          className={clsx(
            "h-[2px] bg-semantic-accent-cta transition-all duration-200 ease-out",
            active ? "w-full" : "w-6 group-hover:w-full"
          )}
        />
      </a>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
