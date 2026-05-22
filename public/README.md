# `public/` — static assets

Tout fichier déposé ici est servi par Vite à la racine URL au runtime.

| Chemin disque | URL au runtime |
|---|---|
| `public/assets/illustrations/conversion.svg` | `/assets/illustrations/conversion.svg` |
| `public/assets/pictos/rocket-80.svg` | `/assets/pictos/rocket-80.svg` |
| `public/fonts/Fieldwork-Geo-Bold.woff2` | `/fonts/Fieldwork-Geo-Bold.woff2` |

## Sous-dossiers attendus

### `assets/illustrations/`
14 web illustrations Labster (cf. README dans le dossier).
Source Figma : `01-Labster-illustrations`.

### `assets/pictos/`
20 pictos Labster en 4 tailles (cf. README dans le dossier).
Source Figma : `00-Labster-Tokens` page Pictos.

### `fonts/` (optionnel)
Fieldwork .woff2 si tu as une license. Décommenter les `@font-face` dans `src/index.css`.

## Notes

- Les fichiers de ce dossier sont copiés tels quels dans le bundle final lors de `npm run build`
- Ne PAS importer ces fichiers via `import` côté code (utiliser des URL absolues `/assets/...`)
- Storybook reload automatiquement quand un nouveau fichier est ajouté
