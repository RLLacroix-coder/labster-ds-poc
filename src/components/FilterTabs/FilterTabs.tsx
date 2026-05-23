import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — FilterTabs
 *
 * Groupe segmenté de pills pour filtrer une vue (catégorie active = darker).
 * Pattern dashboard SaaS (segment control).
 *
 * Composition :
 * - Boutons pill rounded-full
 * - Inactif : white bg + grey-1 border + grey-4 text
 * - Actif : grey-6 bg + white text
 * - Hover inactif : light grey bg
 *
 * Comportement :
 * - Contrôlé : passer `value` + `onChange(value)`
 * - Optionnel : passer `defaultValue` (uncontrolled — non géré pour rester simple)
 */

export interface FilterTabItem {
  value: string;
  label: ReactNode;
  /** Compteur optionnel à droite du label. */
  count?: number;
}

export interface FilterTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: FilterTabItem[];
  /** Valeur active. */
  value: string;
  /** Callback quand l'utilisateur change de tab. */
  onChange: (value: string) => void;
  /** Taille. Défaut "md". */
  size?: "sm" | "md";
}

const SIZE_CLASS = {
  sm: "px-4 py-1.5 text-[13px]",
  md: "px-5 py-2 text-[14px]",
} as const;

export function FilterTabs({
  items,
  value,
  onChange,
  size = "md",
  className,
  ...rest
}: FilterTabsProps) {
  return (
    <div
      role="tablist"
      className={clsx("flex flex-wrap items-center gap-2 font-labster", className)}
      {...rest}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={clsx(
              "rounded-pill border font-semibold leading-none transition-colors",
              SIZE_CLASS[size],
              active
                ? "border-neutral-grey-6 bg-neutral-grey-6 text-neutral-white"
                : "border-neutral-grey-1 bg-neutral-white text-neutral-grey-4 hover:bg-neutral-smoke hover:text-neutral-grey-6",
            )}
          >
            <span>{item.label}</span>
            {typeof item.count === "number" ? (
              <span className={clsx("ml-2 tabular-nums", active ? "opacity-80" : "text-neutral-grey-3")}>
                {item.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
