# Web Illustrations Labster — assets folder

Ce dossier reçoit les **fichiers SVG exportés depuis Figma**.

## Source Figma
- **Fichier** : `01-Labster-illustrations`
- **URL** : https://www.figma.com/design/9pLXmhLSqKpyObBxrytDxw/01-Labster-illustrations
- **Page** : `Website Illustrations`

## Nommage attendu

Le composant `<Illustration name="conversion" />` cherche le fichier `/assets/illustrations/conversion.svg`.

**Nom du fichier = nom du registry** (pas le nom Figma original avec typos).

Voir le mapping complet dans `src/components/Illustration/Illustration.tsx` (constante `ILLUSTRATIONS`).

## Process d'export (manuel pour V1.0)

1. Ouvrir Figma → fichier `01-Labster-illustrations`
2. Sélectionner l'illustration (ex : `illustrations-conversion`)
3. Panneau droit → Export → `+ Add` → format `SVG`
4. Cliquer "Export Picto-name"
5. Renommer le fichier au nom propre du registry (ex : `conversion.svg`, pas `illustrations-conversion.svg`)
6. Déposer dans **ce dossier**
7. Ouvrir `src/components/Illustration/Illustration.tsx` → trouver l'entrée → changer `available: false` en `available: true`
8. Storybook reload automatique → le placeholder est remplacé par le vrai SVG

## Liste des 14 fichiers attendus

### Marketing & Acquisition
- [ ] `conversion.svg`
- [ ] `fidelisation.svg`
- [ ] `generation-traffic.svg`

### Innovation
- [ ] `innovation-readiness.svg` (Figma original : `illustrations-innovation-readyness` — typo corrigée)
- [ ] `workshops.svg` (Figma original : `illustrations-worshops` — typo corrigée)

### UX Design
- [ ] `ux-ui-design.svg`
- [ ] `evaluation-ux.svg`
- [ ] `design-system.svg` (Figma original : `illustrations-desin-system` — typo corrigée)

### Team
- [ ] `renfort-equipe.svg`

### Recruitment
- [ ] `qualif-besoins.svg`
- [ ] `qualif-candidat.svg`
- [ ] `test-technique.svg`
- [ ] `soft-skills.svg` (Figma original : `illustrations-softs-skills` — typo corrigée)
- [ ] `coaching-suivi.svg`

## Alternative — format PNG

Si l'export SVG est trop lourd (beaucoup de paths), tu peux utiliser PNG @2x à la place :
- Sauvegarder en `conversion.png` (ou `conversion@2x.png`) dans ce dossier
- Modifier le composant `Illustration.tsx` pour utiliser `.png` au lieu de `.svg` si tu adoptes ce format

## Automatisation future (Phase C)

Le skill `labster-ds:export-illustrations` (à créer) pourra automatiser l'étape 1-7 via MCP Figma + Node FS. D'ici-là, c'est manuel.
