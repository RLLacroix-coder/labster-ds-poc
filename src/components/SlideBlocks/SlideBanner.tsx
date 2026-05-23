import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { LabsterLogo } from "../LabsterLogo";

/**
 * Labster DS — SlideBanner
 *
 * Bandeau top de slide.
 * Source : Figma 0akzw8mYzFByJcrrRgJbQp, node 1:1410.
 *
 * Specs exactes du Figma :
 * - Container : 1920×80, padding-top/bottom 24px + padding-right 24px
 * - Chapter title : marge-left 56px, font 16px Bold uppercase tracking 3px, color #0E2946
 * - Yellow line : 40×4px, **AVANT** le texte (côté gauche, espacement ~16px)
 * - Logo Labster : 128.762×32 à droite
 *
 * ⚠ Logo : par défaut utilise l'inline `<LabsterLogo>` (reconstruction POC, pas
 * pixel-perfect). Pour rendu fidèle Figma, exporte le SVG du logo depuis Figma
 * (fileKey 00-Labster-Tokens, page Logo Labster nodeId 705:2220) vers
 * `public/assets/labster-logo-normal.svg`, puis passe le slot :
 *
 *   <SlideBanner logo={<img src="/assets/labster-logo-normal.svg" alt="Labster" />} />
 */

export interface SlideBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Texte de section (rendu en uppercase, ex: "introduction", "approach & methodology"). */
  chapterTitle?: string;
  /** Afficher le logo Labster à droite. Défaut true. Ignoré si `logo` est fourni. */
  showLogo?: boolean;
  /** Slot logo custom (ex: `<img src="/assets/labster-logo-normal.svg" />`). Remplace le LabsterLogo inline. */
  logo?: ReactNode;
}

export function SlideBanner({
  chapterTitle,
  showLogo = true,
  logo,
  className,
  ...rest
}: SlideBannerProps) {
  return (
    <div
      className={clsx(
        "flex w-full items-center justify-between py-6 pr-6 font-labster",
        className,
      )}
      style={{ minHeight: 80 }}
      {...rest}
    >
      <div className="ml-14 flex items-center gap-4">
        {chapterTitle ? (
          <>
            <span className="block h-[4px] w-10 bg-brand-yellow" aria-hidden />
            <span className="text-[16px] font-bold uppercase tracking-[3px] text-neutral-grey-6">
              {chapterTitle}
            </span>
          </>
        ) : (
          <span aria-hidden />
        )}
      </div>

      {logo ? (
        <div className="flex h-8 items-center" style={{ width: 128.762 }}>
          {logo}
        </div>
      ) : showLogo ? (
        <LabsterLogo type="normal" mode="light" colorVariant="3-colors" width={128} />
      ) : (
        <span />
      )}
    </div>
  );
}
