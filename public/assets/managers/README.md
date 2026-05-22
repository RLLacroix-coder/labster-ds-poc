# Managers Labster — assets folder

Photos des managers Labster pour le composant `<ManagerCard />`.

## Source Figma

- **Fichier** : `01-Labster-Web-components`
- **URL** : https://www.figma.com/design/difGKjqp7xzKrwuUXZRJrD/01-Labster-Web-components
- **Page** : `Web components`

## Fichiers attendus

| Slug | Nom | Figma nodeId |
|---|---|---|
| `christophe-gras.png` | Christophe Gras | 2:2247 |
| `alain-priser.png` | Alain Priser | 2:2249 |
| `remy-meyer.png` | Remy Meyer | 2:2251 |
| `yann-auxenfans.png` | Yann Auxenfans | 2:2253 |

## Process d'export

1. Ouvrir Figma → fichier `01-Labster-Web-components`
2. Sélectionner le master `Managers/<Name>`
3. Panneau droit → Export → format **PNG @2x** (recommandé pour photos)
   ou SVG si l'illustration est vectorielle
4. Renommer en `<slug>.png` (cf. table ci-dessus)
5. Déposer dans **ce dossier**
6. Storybook reload automatique → l'initiale placeholder est remplacée par le portrait

## Auto-fallback

Si une photo manque, le composant `<ManagerCard />` rend automatiquement
un placeholder avec les initiales du manager (ex : "CG" pour Christophe Gras).
