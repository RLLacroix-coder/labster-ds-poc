import { forwardRef, useState, type ImgHTMLAttributes } from "react";
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
 * 🚀 V1.0 — auto-fallback :
 * Le composant tente toujours de charger /assets/pictos/<name>-<size>.svg.
 * Si le fichier n'existe pas (404), il bascule automatiquement sur un placeholder.
 * Plus besoin de flag — déposer le SVG dans public/assets/pictos/ suffit.
 */

export type PictoSize = 64 | 80 | 150 | 180;

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

export interface PictoProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size"> {
  name: PictoName;
  size?: PictoSize;
  ariaLabel?: string;
  className?: string;
}

const PICTOS: Record<PictoName, { description: string }> = {
  "workflow-ab-test": { description: "A/B test workflow" },
  bug: { description: "Bug / debug" },
  kanban: { description: "Kanban board" },
  diagram: { description: "Node diagram / network" },
  code: { description: "Code editor" },
  document: { description: "Document / spec" },
  rocket: { description: "Rocket / launch" },
  "rocket-launch": { description: "Rocket launching" },
  "rocket-dollar": { description: "Rocket with $ symbol (monetization)" },
  "brain-ai": { description: "Brain with AI sparkles" },
  lightning: { description: "Lightning bolt (speed, AI)" },
  "speech-quote": { description: "Quotation mark" },
  smile: { description: "Smile / satisfaction" },
  target: { description: "Target / focus" },
  team: { description: "Team / group of people" },
  "team-grid": { description: "Team in grid layout" },
  "clock-rocket": { description: "Clock with rocket (time to market)" },
  "clock-check": { description: "Clock with check (deadline met)" },
  calendar: { description: "Calendar / schedule" },
  "location-pin": { description: "Location pin / map" },
};

const SIZE_CLASSES: Record<PictoSize, string> = {
  64: "w-16 h-16",
  80: "w-20 h-20",
  150: "w-[150px] h-[150px]",
  180: "w-[180px] h-[180px]",
};

export const Picto = forwardRef<
  HTMLDivElement,
  PictoProps & { ref?: React.Ref<HTMLDivElement> }
>(({ name, size = 80, ariaLabel, className, ...rest }, ref) => {
  const meta = PICTOS[name];
  const [svgFailed, setSvgFailed] = useState(false);

  if (!meta) {
    console.warn(`[Labster DS] Picto "${name}" not in registry.`);
    return null;
  }

  // Try to load the SVG. Falls back to placeholder if 404.
  if (!svgFailed) {
    return (
      <img
        src={`/assets/pictos/${name}-${size}.svg`}
        alt={ariaLabel || meta.description}
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
      aria-label={ariaLabel || meta.description}
      className={clsx(
        "inline-flex flex-col items-center justify-center text-center p-2",
        "bg-brand-blue-light text-neutral-grey-6 rounded-md border-2 border-dashed border-brand-blue",
        SIZE_CLASSES[size],
        className
      )}
      title={`Picto not yet exported. Drop ${name}-${size}.svg in public/assets/pictos/. ${meta.description}`}
    >
      <span className="text-[10px] font-semibold leading-tight">{name}</span>
      {size >= 80 && (
        <span className="text-[8px] leading-tight mt-1 text-neutral-grey-4">
          {meta.description}
        </span>
      )}
    </div>
  );
});

Picto.displayName = "Picto";

export const PICTO_NAMES: PictoName[] = Object.keys(PICTOS) as PictoName[];
