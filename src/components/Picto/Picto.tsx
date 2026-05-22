import { forwardRef, useState, type ImgHTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — Picto
 *
 * Illustrations brand Labster (workflow, rocket, target, clock, business
 * concepts, profiles, ateliers, etc.).
 *
 * Source : 00-Labster-Tokens, page Pictos (nodeId 705:3239).
 *
 * 🚀 V1.0 — auto-fallback + name as string :
 * - Le composant accepte n'importe quel nom de fichier SVG présent dans
 *   /public/assets/pictos/.
 * - Pas de type union restrictif : `name` est une string libre — pratique
 *   car le brand kit Labster a 70+ pictos avec naming non standardisé
 *   (ex: "Picto-funding strategy-blue", "Prochaines Etapes-red",
 *   "Picto-cta-delegation").
 * - Si le fichier n'existe pas (404), fallback automatique sur un
 *   placeholder qui suggère où déposer le SVG manquant.
 *
 * Naming convention (suggestion pour cohérence DS, pas obligatoire) :
 * - <category>-<concept>-<color>.svg : `Picto-coding-blue.svg`, `Lieu-yellow.svg`
 * - <name>.svg : `Contexte.svg`, `Picto-paf.svg`
 *
 * Sizes : 64 | 80 | 150 | 180 (rendu CSS — le fichier SVG est rendu à la
 * taille demandée).
 */

export type PictoSize = 64 | 80 | 150 | 180;

export interface PictoProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size" | "name"> {
  /** Picto file name (without .svg extension). Must match a file in /public/assets/pictos/. */
  name: string;
  size?: PictoSize;
  /** Description for accessibility */
  ariaLabel?: string;
  className?: string;
}

const SIZE_CLASSES: Record<PictoSize, string> = {
  64: "w-16 h-16",
  80: "w-20 h-20",
  150: "w-[150px] h-[150px]",
  180: "w-[180px] h-[180px]",
};

/**
 * Catégorisation des pictos officiels du DS Labster (pour les stories +
 * documentation). Pas exhaustif et pas restrictif — le composant accepte
 * n'importe quel nom string. C'est juste un guide pour la lib.
 */
export const PICTO_CATEGORIES = {
  Ateliers: [
    "Contexte",
    "Déroulé",
    "Objectifs",
    "Participants",
    "Lieu-blue",
    "Lieu-red",
    "Lieu-yellow",
    "Prochaines Etapes-blue",
    "Prochaines Etapes-red",
    "Prochaines Etapes-yellow",
  ],
  "Concepts business (× 3 colors)": [
    "Picto-ab-test-red",
    "Picto-ab-test-yellow",
    "Picto-bug-free-yellow",
    "Picto-business-model-canvas-red",
    "Picto-centralized-blue",
    "Picto-centralized-red",
    "Picto-centralized-yellow",
    "Picto-coding-blue",
    "Picto-coding-red",
    "Picto-coding-yellow",
    "Picto-deliverables-blue",
    "Picto-deliverables-red",
    "Picto-deliverables-yellow",
    "Picto-funding strategy-blue",
    "Picto-funding strategy-red",
    "Picto-funding strategy-yellow",
    "Picto-go market-blue",
    "Picto-go market-red",
    "Picto-go market-yellow",
    "Picto-Inclusive-design-blue",
    "Picto-Inclusive-design-red",
    "Picto-intelligence collective-blue",
    "Picto-intelligence collective-red",
    "Picto-intelligence collective-yellow",
    "Picto-powerful",
    "Picto-powerful-blue",
    "Picto-powerful-yellow",
    "Picto-productivity-blue",
    "Picto-productivity-red",
    "Picto-productivity-yellow",
    "Picto-satisfaction-blue",
    "Picto-satisfaction-red",
    "Picto-satisfaction-yellow",
    "Picto-target-red",
    "Picto-team-collaboration-blue",
    "Picto-team-collaboration-red",
    "Picto-team-collaboration-yellow",
    "Picto-time-market-red",
    "Picto-time-tasks-blue",
    "Picto-time-tasks-red",
    "Picto-time-tasks-yellow",
    "Picto-user-test-red",
    "Picto-user-test-yellow",
    "Picto-ux&ui-red",
  ],
  CTA: [
    "Picto-cta-delegation",
    "Picto-cta-design",
    "Picto-cta-dev",
    "Picto-cta-marketing",
    "Picto-cta-tryandhire",
    "Picto-cta-workforce",
  ],
  Profils: [
    "Picto-profile-data-scientist",
    "Picto-profile-designer",
    "Picto-profile-developer",
    "Picto-profile-marketer",
    "Picto-profile-project-manager",
  ],
  Divers: ["Picto-paf", "Picto-quote-down", "Frame"],
} as const;

export const ALL_PICTO_NAMES: string[] = Object.values(PICTO_CATEGORIES).flat();

export const Picto = forwardRef<
  HTMLDivElement,
  PictoProps & { ref?: React.Ref<HTMLDivElement> }
>(({ name, size = 80, ariaLabel, className, ...rest }, ref) => {
  const [svgFailed, setSvgFailed] = useState(false);

  // 🐛 Fix macOS NFD : sur macOS (HFS+/APFS), les noms de fichiers Unicode
  // sont stockés en NFD (Normalized Form Decomposed) où "é" = "e" + accent
  // combinant. JavaScript utilise NFC (Composed) par défaut. Le navigateur
  // fait la requête HTTP avec le nom NFC, Vite cherche le fichier — mismatch.
  // Solution : normaliser le name en NFD côté code pour matcher le filesystem.
  //
  // Exemple : "Déroulé" en JS (NFC, "c3 a9") → "Déroulé" (NFD,
  // "65 cc 81 65 cc 81") qui matche le fichier macOS "Déroulé.svg".
  //
  // Sur Linux (déploiement prod), les filenames sont en NFC — la normalize
  // NFD côté code n'aura pas d'effet visible si le fichier prod est en NFC
  // (la normalize NFC d'un nom NFC ne change rien). Donc safe.
  const normalizedName = name.normalize("NFD");

  // Try to load the SVG. Falls back to placeholder if 404.
  if (!svgFailed) {
    return (
      <img
        src={`/assets/pictos/${normalizedName}.svg`}
        alt={ariaLabel || name}
        width={size}
        height={size}
        onError={() => setSvgFailed(true)}
        className={clsx("inline-block", SIZE_CLASSES[size], className)}
        {...(rest as ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  // Placeholder
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      role="img"
      aria-label={ariaLabel || name}
      className={clsx(
        "inline-flex flex-col items-center justify-center text-center p-2",
        "bg-brand-blue-light text-neutral-grey-6 rounded-md border-2 border-dashed border-brand-blue",
        SIZE_CLASSES[size],
        className
      )}
      title={`Picto not found. Drop ${name}.svg in public/assets/pictos/`}
    >
      <span className="text-[10px] font-semibold leading-tight px-1">
        {name}
      </span>
      {size >= 80 && (
        <span className="text-[8px] leading-tight mt-1 text-neutral-grey-4">
          missing
        </span>
      )}
    </div>
  );
});

Picto.displayName = "Picto";

// Backwards compat — kept for existing imports
export const PICTO_NAMES = ALL_PICTO_NAMES;
