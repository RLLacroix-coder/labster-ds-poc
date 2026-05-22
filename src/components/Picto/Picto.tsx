import { forwardRef, type ImgHTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — Picto
 *
 * Illustrations brand Labster (workflow, rocket, target, clock, etc.).
 * Observées dans le brand kit Labster
 * (https://www.figma.com/design/PVYjz7w3CG5Lh0GU2iAoG3, page Pictos nodeId 705:3239).
 *
 * 4 tailles : 64px, 80px, 150px, 180px (chaque picto existe en plusieurs tailles).
 *
 * ⚠ Les pictos sont des illustrations multi-couleurs complexes (line work + accent shapes).
 * Trop complexes pour recoder en SVG inline à la main. Process recommandé :
 *
 * 1. Designer (ou PM) exporte les .svg depuis Figma manuellement :
 *    a. Ouvrir le fichier brand kit Labster (00-Labster-Tokens)
 *    b. Sélectionner un picto sur la page "Pictos"
 *    c. Panneau droit > Export > Format SVG, ajouter au bas → "Export Picto-name"
 *    d. Sauvegarder dans /public/assets/pictos/<name>-<size>.svg
 *
 * 2. Ajouter le nom au type `PictoName` ci-dessous et au registry `PICTOS`.
 *
 * 3. Le composant <Picto /> charge automatiquement /public/assets/pictos/<name>-<size>.svg.
 *
 * Pour le POC actuel : composant placeholder. Le rendu est un encadré coloré avec le nom.
 * À remplacer par les vrais SVG après export.
 */

export type PictoSize = 64 | 80 | 150 | 180;

/**
 * Liste des pictos Labster observés dans le brand kit (à étendre selon exports).
 * Source : page Pictos du brand kit Labster.
 */
export type PictoName =
  // Pictos Workx (workflow, productivity)
  | "workflow-ab-test"
  | "bug"
  | "kanban"
  | "diagram"
  | "code"
  | "document"
  | "rocket"
  | "rocket-launch"
  | "rocket-dollar"
  // Pictos Norks (brain, AI, network)
  | "brain-ai"
  | "lightning"
  | "speech-quote"
  | "smile"
  | "target"
  // Pictos Personas (people, team)
  | "team"
  | "team-grid"
  // Pictos Temporal (clock, calendar)
  | "clock-rocket"
  | "clock-check"
  | "calendar"
  | "location-pin";

export interface PictoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size"> {
  name: PictoName;
  size?: PictoSize;
  ariaLabel?: string;
  className?: string;
}

/**
 * Registry of available picto assets. Path is relative to public/.
 * When you export a new picto from Figma, add its key here.
 */
const PICTOS: Record<PictoName, { description: string; available?: boolean }> = {
  "workflow-ab-test": { description: "A/B test workflow", available: false },
  bug: { description: "Bug / debug", available: false },
  kanban: { description: "Kanban board", available: false },
  diagram: { description: "Node diagram / network", available: false },
  code: { description: "Code editor", available: false },
  document: { description: "Document / spec", available: false },
  rocket: { description: "Rocket / launch", available: false },
  "rocket-launch": { description: "Rocket launching", available: false },
  "rocket-dollar": { description: "Rocket with $ symbol (monetization)", available: false },
  "brain-ai": { description: "Brain with AI sparkles", available: false },
  lightning: { description: "Lightning bolt (speed, AI)", available: false },
  "speech-quote": { description: "Quotation mark", available: false },
  smile: { description: "Smile / satisfaction", available: false },
  target: { description: "Target / focus", available: false },
  team: { description: "Team / group of people", available: false },
  "team-grid": { description: "Team in grid layout", available: false },
  "clock-rocket": { description: "Clock with rocket (time to market)", available: false },
  "clock-check": { description: "Clock with check (deadline met)", available: false },
  calendar: { description: "Calendar / schedule", available: false },
  "location-pin": { description: "Location pin / map", available: false },
};

const SIZE_CLASSES: Record<PictoSize, string> = {
  64: "w-16 h-16",
  80: "w-20 h-20",
  150: "w-[150px] h-[150px]",
  180: "w-[180px] h-[180px]",
};

export const Picto = forwardRef<HTMLDivElement, PictoProps & { ref?: React.Ref<HTMLDivElement> }>(
  ({ name, size = 80, ariaLabel, className, ...rest }, ref) => {
    const meta = PICTOS[name];
    if (!meta) {
      console.warn(`[Labster DS] Picto "${name}" not in registry.`);
      return null;
    }

    // If SVG is actually exported, serve it from /public/assets/pictos/
    if (meta.available) {
      return (
        <img
          src={`/assets/pictos/${name}-${size}.svg`}
          alt={ariaLabel || meta.description}
          width={size}
          height={size}
          className={clsx("inline-block", SIZE_CLASSES[size], className)}
          {...(rest as ImgHTMLAttributes<HTMLImageElement>)}
        />
      );
    }

    // Placeholder render — colored box with name + description
    // To be replaced when SVG exported from Figma (set available: true above).
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="img"
        aria-label={ariaLabel || meta.description}
        className={clsx(
          "inline-flex flex-col items-center justify-center text-center p-2",
          "bg-brand-blue-light text-neutral-grey-6 rounded-md border-2 border-dashed border-brand-blue",
          SIZE_CLASSES[size],
          className
        )}
        title={`Picto placeholder — export from Figma to enable. ${meta.description}`}
      >
        <span className="text-[10px] font-semibold leading-tight">{name}</span>
        {size >= 80 && (
          <span className="text-[8px] leading-tight mt-1 text-neutral-grey-4">
            {meta.description}
          </span>
        )}
      </div>
    );
  }
);

Picto.displayName = "Picto";

export const PICTO_NAMES: PictoName[] = Object.keys(PICTOS) as PictoName[];
