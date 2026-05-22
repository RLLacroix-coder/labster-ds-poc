import { forwardRef, useState, type ImgHTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Labster DS — Illustration
 *
 * Illustrations marketing/web Labster — vrais COMPONENT Figma natifs
 * dans le fichier dédié 01-Labster-illustrations
 * (fileKey 9pLXmhLSqKpyObBxrytDxw, page "Website Illustrations").
 *
 * 14 illustrations observées, 720×640px chacune, organisées en catégories :
 * - Marketing / Acquisition : conversion, fidelisation, generation-traffic
 * - Innovation : innovation-readiness, workshops
 * - UX Design : ux-ui-design, evaluation-ux, design-system
 * - Team : renfort-equipe
 * - Recruitment : qualif-besoins, qualif-candidat, test-technique,
 *   soft-skills, coaching-suivi
 *
 * 🚀 V1.0 — auto-fallback :
 * Le composant tente toujours de charger /assets/illustrations/<name>.svg.
 * Si le fichier n'existe pas (404), il bascule automatiquement sur un
 * placeholder. Plus besoin de flag `available: true` — il suffit de déposer
 * le SVG dans public/assets/illustrations/ et ça marche.
 */

export type IllustrationCategory =
  | "marketing"
  | "innovation"
  | "ux-design"
  | "team"
  | "recruitment";

export type IllustrationName =
  // Marketing
  | "conversion"
  | "fidelisation"
  | "generation-traffic"
  // Innovation
  | "innovation-readiness"
  | "workshops"
  // UX Design
  | "ux-ui-design"
  | "evaluation-ux"
  | "design-system"
  // Team
  | "renfort-equipe"
  // Recruitment
  | "qualif-besoins"
  | "qualif-candidat"
  | "test-technique"
  | "soft-skills"
  | "coaching-suivi";

export interface IllustrationProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size"> {
  name: IllustrationName;
  /** Default width (height preserved by 720:640 aspect ratio) */
  width?: number;
  ariaLabel?: string;
  className?: string;
}

/**
 * Registry : nodeId + figma_name (original avec typos) + category + description.
 * Pas de flag `available` en V1.0 — détection auto via onError de l'<img>.
 */
const ILLUSTRATIONS: Record<
  IllustrationName,
  {
    figma_node_id: string;
    figma_name: string;
    category: IllustrationCategory;
    description: string;
  }
> = {
  conversion: {
    figma_node_id: "2:236",
    figma_name: "illustrations-conversion",
    category: "marketing",
    description: "Conversion funnel illustration",
  },
  fidelisation: {
    figma_node_id: "2:2545",
    figma_name: "illustrations-fidelisation",
    category: "marketing",
    description: "Customer retention / loyalty",
  },
  "generation-traffic": {
    figma_node_id: "2:3380",
    figma_name: "illustrations-generation-traffic",
    category: "marketing",
    description: "Traffic generation",
  },
  "innovation-readiness": {
    figma_node_id: "2:4074",
    figma_name: "illustrations-innovation-readyness",
    category: "innovation",
    description: "Innovation readiness assessment",
  },
  workshops: {
    figma_node_id: "2:6103",
    figma_name: "illustrations-worshops",
    category: "innovation",
    description: "Collaborative workshops",
  },
  "ux-ui-design": {
    figma_node_id: "2:5618",
    figma_name: "illustrations-ux-ui-design",
    category: "ux-design",
    description: "UX / UI design",
  },
  "evaluation-ux": {
    figma_node_id: "2:2106",
    figma_name: "illustrations-evaluation-ux",
    category: "ux-design",
    description: "UX evaluation / usability test",
  },
  "design-system": {
    figma_node_id: "2:1073",
    figma_name: "illustrations-desin-system",
    category: "ux-design",
    description: "Design system",
  },
  "renfort-equipe": {
    figma_node_id: "2:5066",
    figma_name: "illustrations-renfort-equipe",
    category: "team",
    description: "Team reinforcement / staffing",
  },
  "qualif-besoins": {
    figma_node_id: "2:4629",
    figma_name: "illustrations-qualif-besoins",
    category: "recruitment",
    description: "Needs qualification",
  },
  "qualif-candidat": {
    figma_node_id: "2:4806",
    figma_name: "illustrations-qualif-candidat",
    category: "recruitment",
    description: "Candidate qualification",
  },
  "test-technique": {
    figma_node_id: "2:5515",
    figma_name: "illustrations-test-technique",
    category: "recruitment",
    description: "Technical test",
  },
  "soft-skills": {
    figma_node_id: "2:5393",
    figma_name: "illustrations-softs-skills",
    category: "recruitment",
    description: "Soft skills assessment",
  },
  "coaching-suivi": {
    figma_node_id: "2:2",
    figma_name: "illustrations-coaching-suivi",
    category: "recruitment",
    description: "Coaching & follow-up",
  },
};

const CATEGORY_LABELS: Record<IllustrationCategory, string> = {
  marketing: "Marketing & Acquisition",
  innovation: "Innovation",
  "ux-design": "UX Design",
  team: "Team",
  recruitment: "Recruitment",
};

export const Illustration = forwardRef<
  HTMLDivElement,
  IllustrationProps & { ref?: React.Ref<HTMLDivElement> }
>(({ name, width = 360, ariaLabel, className, ...rest }, ref) => {
  const meta = ILLUSTRATIONS[name];
  const [svgFailed, setSvgFailed] = useState(false);

  if (!meta) {
    console.warn(`[Labster DS] Illustration "${name}" not in registry.`);
    return null;
  }

  const height = (width / 720) * 640; // preserve 720:640 aspect ratio

  // Try to load the SVG. Falls back to placeholder if 404.
  if (!svgFailed) {
    return (
      <img
        src={`/assets/illustrations/${name}.svg`}
        alt={ariaLabel || meta.description}
        width={width}
        height={height}
        onError={() => setSvgFailed(true)}
        className={clsx("inline-block", className)}
        {...(rest as ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  // Placeholder — shown if SVG file is missing
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      role="img"
      aria-label={ariaLabel || meta.description}
      style={{ width, height }}
      className={clsx(
        "inline-flex flex-col items-center justify-center text-center p-4",
        "bg-brand-blue-light text-neutral-grey-6 rounded-md border-2 border-dashed border-brand-blue",
        className
      )}
      title={`Illustration not yet exported. Drop ${name}.svg in public/assets/illustrations/. ${meta.description}`}
    >
      <span className="text-p-sm font-bold uppercase tracking-wide">{name}</span>
      <span className="text-link text-neutral-grey-4 mt-2">
        {CATEGORY_LABELS[meta.category]}
      </span>
      <span className="text-link text-neutral-grey-3 mt-1">
        {meta.description}
      </span>
      <span className="text-[10px] text-neutral-grey-2 mt-3 font-mono">
        Drop <code>{name}.svg</code> in public/assets/illustrations/
      </span>
      <span className="text-[10px] text-neutral-grey-2 font-mono">
        nodeId {meta.figma_node_id}
      </span>
    </div>
  );
});

Illustration.displayName = "Illustration";

export const ILLUSTRATION_NAMES: IllustrationName[] = Object.keys(
  ILLUSTRATIONS
) as IllustrationName[];

export function getIllustrationsByCategory(category: IllustrationCategory) {
  return ILLUSTRATION_NAMES.filter(
    (name) => ILLUSTRATIONS[name].category === category
  );
}

export { ILLUSTRATIONS };
