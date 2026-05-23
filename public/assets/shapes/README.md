# public/assets/shapes/

**Brand shapes Labster** — les 3 pièces graphiques qui composent le logo Labster, représentant les 3 piliers métier (Design / Dev / Talents).

## ⚠ Ne pas confondre avec floating-elements/

| Concept | Folder | Usage |
|---|---|---|
| Brand shapes (ici) | `/assets/shapes/` | Pièces constitutives du logo, utilisables seules pour de gros accents brand (hero, backgrounds) |
| Floating elements | `/assets/floating-elements/` | Petites shapes décoratives (triangle/cercle/+/etc.) en 3 couleurs pour décorer les slides |

## Source Figma

- Fichier : `00-Labster-Tokens` (fileKey `PVYjz7w3CG5Lh0GU2iAoG3`)
- Page : `LABSTER LOGO`, section **LOGO SHAPES** (nodeId `705:2222`)

## Fichiers attendus

| variant | couleur brand | Filename |
|---|---|---|
| design | red `#EF4C59` | `labster-shape-design.svg` |
| dev | blue `#476AE3` | `labster-shape-dev.svg` |
| talents | yellow `#FFC31D` | `labster-shape-talents.svg` |

Chaque SVG est carré (`viewBox 120 120`).

## Usage

```tsx
import { LabsterShape } from "@/components/LabsterShape";

<LabsterShape variant="design" width={120} />
<LabsterShape variant="dev" width={120} />
<LabsterShape variant="talents" width={120} />
```
