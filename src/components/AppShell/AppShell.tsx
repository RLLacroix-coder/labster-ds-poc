import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/**
 * Labster DS — AppShell
 *
 * Layout primaire d'une app dashboard : sidebar fixe à gauche + contenu scrollable à droite.
 *
 * Composition :
 * - `sidebar` : ReactNode (typiquement <Sidebar>)
 * - `children` : contenu principal (typiquement <PageHeader> + sections)
 *
 * Le shell prend toute la hauteur viewport (`h-screen`). Pour intégrer dans une
 * page partielle, override `className` (ex: `h-[800px]`).
 */

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  sidebar: ReactNode;
  /** Padding du contenu principal. Défaut "lg" (40px). */
  contentPadding?: "none" | "sm" | "md" | "lg";
  /** Background du contenu. Défaut "smoke". */
  contentBg?: "white" | "smoke";
}

const PADDING_CLASS = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-10",
} as const;

export function AppShell({
  sidebar,
  children,
  contentPadding = "lg",
  contentBg = "smoke",
  className,
  ...rest
}: AppShellProps) {
  return (
    <div
      className={clsx(
        "flex h-screen w-full overflow-hidden font-labster",
        className,
      )}
      {...rest}
    >
      {sidebar}
      <main
        className={clsx(
          "flex-1 overflow-y-auto",
          contentBg === "smoke" ? "bg-neutral-smoke" : "bg-neutral-white",
          PADDING_CLASS[contentPadding],
        )}
      >
        {children}
      </main>
    </div>
  );
}
