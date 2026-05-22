# Pictos Labster — assets folder

Ce dossier reçoit les **fichiers SVG exportés depuis Figma** pour les pictos brand Labster.

## Source Figma
- **Fichier** : `00-Labster-Tokens`
- **URL** : https://www.figma.com/design/PVYjz7w3CG5Lh0GU2iAoG3/00-Labster-Tokens
- **Page** : `Pictos` (nodeId `705:3239`)

## Nommage attendu

Le composant `<Picto name="rocket" size={80} />` cherche le fichier `/assets/pictos/rocket-80.svg`.

**Format** : `<name>-<size>.svg`

Tailles supportées : `64`, `80`, `150`, `180` (chaque picto Labster existe en plusieurs tailles).

Voir le registry complet dans `src/components/Picto/Picto.tsx` (constante `PICTOS`).

## Process d'export (manuel pour V1.0)

1. Ouvrir Figma → fichier `00-Labster-Tokens` → page `Pictos`
2. Sélectionner le picto à la taille voulue (ex : `rocket` 80px)
3. Panneau droit → Export → `+ Add` → format `SVG`
4. Cliquer "Export <NomPicto>"
5. Renommer en `<name>-<size>.svg` (ex : `rocket-80.svg`)
6. Déposer dans **ce dossier**
7. Ouvrir `src/components/Picto/Picto.tsx` → trouver l'entrée → changer `available: false` en `available: true`
8. Storybook reload automatique

## Liste des 20 pictos attendus (à 80px minimum)

### Workx (workflow, productivity)
- [ ] `workflow-ab-test-80.svg`
- [ ] `bug-80.svg`
- [ ] `kanban-80.svg`
- [ ] `diagram-80.svg`
- [ ] `code-80.svg`
- [ ] `document-80.svg`
- [ ] `rocket-80.svg`
- [ ] `rocket-launch-80.svg`
- [ ] `rocket-dollar-80.svg`

### Norks (brain, AI, network)
- [ ] `brain-ai-80.svg`
- [ ] `lightning-80.svg`
- [ ] `speech-quote-80.svg`
- [ ] `smile-80.svg`
- [ ] `target-80.svg`

### Personas (people, team)
- [ ] `team-80.svg`
- [ ] `team-grid-80.svg`

### Temporal (clock, calendar, location)
- [ ] `clock-rocket-80.svg`
- [ ] `clock-check-80.svg`
- [ ] `calendar-80.svg`
- [ ] `location-pin-80.svg`

### Tailles additionnelles (optionnelles)
Pour chaque picto utile, exporter aussi en 64, 150, 180 si pertinent.

## Automatisation future (Phase C)

Le skill `labster-ds:export-pictos` (à créer) pourra automatiser l'export via MCP Figma + Node FS.
