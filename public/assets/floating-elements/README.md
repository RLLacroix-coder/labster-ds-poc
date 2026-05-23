# public/assets/floating-elements/

**Floating elements Labster** — petites shapes géométriques décoratives utilisées comme décoration de slides (triangle, cercle, +, dot, etc.) en 3 couleurs brand.

## ⚠ Ne pas confondre avec shapes/

Les **floating-elements** sont les petites shapes décoratives à éparpiller dans une slide (corners, accents).
Les **brand shapes** (`/assets/shapes/`) sont les 3 pièces qui composent le logo Labster lui-même.

## Source Figma

- Fichier : `00-Labster-Tokens` (fileKey `PVYjz7w3CG5Lh0GU2iAoG3`) ou deck `0akzw8mYzFByJcrrRgJbQp`
- Composants `Icons / Floating-element / <Shape>-<Color>` (noms observés via MCP : `icons-floating-element/Blue-Dot`, `Red-Triangle up`, `Yellow-Square`, etc.)

## Matrix attendue (shape × color)

9 shapes × 3 couleurs = 27 fichiers max. Tous viewBox 24×24.

| shape | red | blue | yellow |
|---|---|---|---|
| triangle-down | `floating-element-triangle-down-red.svg` | `floating-element-triangle-down-blue.svg` | `floating-element-triangle-down-yellow.svg` |
| triangle-up | `floating-element-triangle-up-red.svg` | `floating-element-triangle-up-blue.svg` | `floating-element-triangle-up-yellow.svg` |
| diamond | `floating-element-diamond-red.svg` | `floating-element-diamond-blue.svg` | `floating-element-diamond-yellow.svg` |
| square | `floating-element-square-red.svg` | `floating-element-square-blue.svg` | `floating-element-square-yellow.svg` |
| square-outline | `floating-element-square-outline-red.svg` | `floating-element-square-outline-blue.svg` | `floating-element-square-outline-yellow.svg` |
| circle | `floating-element-circle-red.svg` | `floating-element-circle-blue.svg` | `floating-element-circle-yellow.svg` |
| circle-outline | `floating-element-circle-outline-red.svg` | `floating-element-circle-outline-blue.svg` | `floating-element-circle-outline-yellow.svg` |
| plus | `floating-element-plus-red.svg` | `floating-element-plus-blue.svg` | `floating-element-plus-yellow.svg` |
| dot | `floating-element-dot-red.svg` | `floating-element-dot-blue.svg` | `floating-element-dot-yellow.svg` |

## Export depuis Figma

1. Cherche les composants dans le brand kit (probablement page Icons / Floating elements). Sinon, ils sont aussi exposés dans le deck `0akzw8mYzFByJcrrRgJbQp` en instances détaillées
2. Sélectionne le master
3. Panel Export → SVG → 1x

## Fallback

Le composant `FloatingShape` (cf. `src/components/Icon/FloatingShape.tsx`) tente d'abord de charger le SVG ici. **Si absent (404), il bascule sur sa reconstruction inline** (suffisante pour la plupart des cas). Tu peux donc déposer les fichiers progressivement, sans casser quoi que ce soit.

## Usage (inchangé)

```tsx
import { FloatingShape } from "@/components/Icon";

<FloatingShape shape="circle" color="red" size={46} />
<FloatingShape shape="plus" color="blue" size={27} />
```
