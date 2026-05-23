# Chromatic — Storybook hosting

Le Storybook du DS Labster est déployé automatiquement sur **Chromatic** à chaque push sur `main`.

## URL publique

🔗 **URL stable (toujours latest `main`)** :

```
https://main--6a118881fbc20cd7a43001a1.chromatic.com/
```

Cette URL pointe toujours vers le build le plus récent de la branche `main`. À chaque push qui passe la GitHub Action (ou chaque `npx chromatic` manuel), cette URL est mise à jour automatiquement.

(Partageable avec Christophe, l'équipe Labster, ou tout futur client.)

### Build URLs (snapshots figés)

Chaque build a aussi son URL spécifique de format `https://<project-id>-<random>.chromatic.com/`. Ces URLs sont des snapshots figés — pratiques pour partager une version précise (ex: PR review) mais ne suivent pas les updates.

| Build | Date | Stories | URL build (figée) |
|---|---|---|---|
| #1 | 2026-05-22 | 113 | https://6a118881fbc20cd7a43001a1-tjsgagljer.chromatic.com/ |
| #6 | 2026-05-23 | 126 | https://www.chromatic.com/build?appId=6a118881fbc20cd7a43001a1&number=6 |

Project ID : `6a118881fbc20cd7a43001a1`

## Setup initial (une seule fois)

### 1. Créer le compte Chromatic
- Va sur https://www.chromatic.com
- "Sign in with GitHub"
- "Add project" → sélectionne `labster-ds-poc`
- Récupère le **project-token** (format `chpt_XXXXXXXXXXXX`)

### 2. Ajouter le token comme GitHub secret
- Repo GitHub → Settings → Secrets and variables → Actions
- "New repository secret"
- Name : `CHROMATIC_PROJECT_TOKEN`
- Value : `chpt_XXXXXXXXXXXX` (le token de l'étape 1)

### 3. Premier déploiement manuel (optionnel — sinon attendre le prochain push)
```bash
cd ~/Documents/Labster/labster-ds-poc
npm install                                  # installe chromatic (devDep)
npx chromatic --project-token=chpt_XXXXX     # 1er upload, build + publish
```

## Workflow CI

À chaque push sur `main`, la GitHub Action `.github/workflows/chromatic.yml` :
1. Installe les dépendances (npm ci)
2. Build le Storybook (`npm run build-storybook`)
3. Publie sur Chromatic (`chromaui/action@v11`)
4. Met à jour l'URL publique

## Features Chromatic

- **URL publique** partageable avec PM/designer/dev externes
- **Visual regression testing** automatique : à chaque commit, Chromatic compare les screenshots avant/après et flag les changements visuels
- **Review UI** : tu peux approuver/rejeter chaque changement visuel via l'interface Chromatic
- **Branche-based snapshots** : chaque branche/PR a sa propre version Storybook publiée

## Coût

- **Gratuit** : 5000 snapshots/mois (un snapshot = une story × un changement)
- Pour ~150 stories × ~5 commits/jour = ~750 snapshots/jour = ~22.500/mois → dépassement probable
- **Upgrade $149/mois** si trafic important. Pour le POC, le free tier devrait suffire.

## Commandes locales

```bash
# Build local du Storybook statique
npm run build-storybook
# → génère storybook-static/

# Upload manuel à Chromatic
npm run chromatic -- --project-token=chpt_XXXXXXXXXXXX
```
