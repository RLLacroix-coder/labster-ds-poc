# public/assets/logos/

Logos officiels Labster exportés depuis Figma.

## Source Figma

- Fichier : `00-Labster-Tokens` (fileKey `PVYjz7w3CG5Lh0GU2iAoG3`)
- Page : `Logo Labster` (nodeId `705:2220`)

Variants à exporter (matrix `type` × `mode` × `colorVariant`) :

| `type` | `mode` | `colorVariant` | Filename |
|---|---|---|---|
| normal | light | 3-colors | `labster-logo-normal-light-3-colors.svg` |
| normal | light | monochrome | `labster-logo-normal-light-monochrome.svg` |
| normal | dark | 3-colors | `labster-logo-normal-dark-3-colors.svg` |
| normal | dark | monochrome | `labster-logo-normal-dark-monochrome.svg` |
| symbol | light | 3-colors | `labster-logo-symbol-light-3-colors.svg` |
| symbol | light | monochrome | `labster-logo-symbol-light-monochrome.svg` |
| symbol | dark | 3-colors | `labster-logo-symbol-dark-3-colors.svg` |
| symbol | dark | monochrome | `labster-logo-symbol-dark-monochrome.svg` |
| tagline | light | 3-colors | `labster-logo-tagline-light-3-colors.svg` |
| tagline | dark | 3-colors | `labster-logo-tagline-dark-3-colors.svg` |

## Export depuis Figma

1. Ouvre le fichier `00-Labster-Tokens` dans Figma
2. Va sur la page **Logo Labster**
3. Sélectionne le master correspondant au variant
4. Panel Export (`⌘ + ⇧ + E`) → SVG → 1x → `Export …`
5. Renomme exactement selon la table ci-dessus → dépose dans ce dossier

## Format

- **SVG préféré** (vectoriel, scale infini sans perte)
- PNG accepté en fallback : naming `.png` au lieu de `.svg`

## Tailles de rendu

Les composants consommateurs (LabsterLogo, SlideBanner) calculent la hauteur depuis la largeur via le ratio natif du SVG. Pas besoin d'exporter à plusieurs tailles — un seul fichier suffit.

## Usage

```tsx
// SlideBanner avec le vrai logo (au lieu du LabsterLogo inline POC)
<SlideBanner
  chapterTitle="introduction"
  logo={
    <img
      src="/assets/logos/labster-logo-normal-light-3-colors.svg"
      alt="Labster"
      className="h-8"
    />
  }
/>
```

Quand le composant `LabsterLogo` sera câblé sur ces assets (issue ouverte), il choisira automatiquement le bon fichier selon les props `type` × `mode` × `colorVariant`, avec fallback sur le SVG inline POC si le fichier est absent.
