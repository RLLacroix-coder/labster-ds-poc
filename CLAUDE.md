# CLAUDE.md — Repo labster-ds-poc

## Contexte projet

POC AI-ready Design System Labster. Dry-run avant l'industrialisation.

Au 2026-05-24, le repo expose :
- **25+ composants React + Tailwind** dans `src/components/` (Atoms, App UI, Slide Blocks, Brand)
- **3 patterns** dans `src/patterns/` (ContactForm, LabsterseDashboard, PortefeuilleClients)
- **Storybook live** sur Chromatic : https://main--6a118881fbc20cd7a43001a1.chromatic.com/
- **CI auto-deploy** sur push main via GitHub Action

### Sources Figma

- **Brand tokens** (couleurs, typo, élévation) : `00-Labster-Tokens` (fileKey `PVYjz7w3CG5Lh0GU2iAoG3`)
  - Styles legacy uniquement (pas de Variables) — plan Labster Pro, publication Variables bloquée.
- **DS de référence (Shadcn-style)** : `01-Shadcn-Kit-POC` (fileKey `tPwrOV9EX9jLXuxsBskINR`)
  - Re-mappé sur tokens Labster.
- **Miroir Figma du DS code** : `02-Labster-DS-V0.1` (fileKey `fTtwrwxa74iSPMMTbq5GK8`)
  - Page "Test Usage DS" héberge les frames design intent des features qui consomment le DS.

## Couches agentiques (référentiel Cris Morales Achiardi)

Le repo implémente les 4 couches :

1. **Tokenization** → `tokens/labster-tokens.json` (DTCG W3C, extrait des styles Labster)
2. **Intent** → `components/<Composant>.design.md` + `components/<Composant>.metadata.ts`
3. **Indexing** → `.ai/index.json`, `.ai/component-usage.json`, `.ai/design-tokens.json`
4. **Orchestration** → ce fichier + `rules/` + `skills/`

## Protocole ARC (Audit / Report / Compose)

Avant toute génération, applique ce protocole :

- **Audit** (inventaire) : "combien de composants ?", "quels variants ?" → charge `.ai/index.json` et réponds depuis l'index. **JAMAIS** explorer le repo brute-force quand un index existe.
- **Report** (relation) : "où est utilisé X ?", "quels tokens consomme Y ?" → charge `.ai/component-usage.json` ou `.ai/design-tokens.json`.
- **Compose** (génération/transformation) : "génère un écran", "propose un variant" → charge le ou les `DESIGN.md` du ou des composants concernés + les indexes pertinents.

## Conventions de génération

### DESIGN.md (1 global + 1 par composant)

- **Global** : 10 sections — Overview, Colors, Typography, Layout, Elevation, Shapes, Voice, Brand, Components, Do's and Don'ts.
- **Composant** : YAML frontmatter (tokens machine-readable) + Markdown body verbeux (Overview, Usage, Variants détaillés, Accessibilité WCAG AA, Do's and Don'ts).
- Référencer les tokens via `{path.to.token}`. **JAMAIS de hex hardcodés**.
- Voice et Brand vivent au global, pas dans chaque composant.

### .metadata.ts (1 par composant)

- Conforme au schéma `rules/metadata-schema.md`.
- Champs : name, description, type, variants, props, states, tokens_consumed, usage_recommended, usage_discouraged, examples, source (figma_url + figma_node_id).

### Index .ai/

- Format JSON.
- Régénération à chaque modification de composant.

## Garde-fous (CRITIQUES)

1. **Human in the Loop** : toute génération est un draft que Rachel valide. Pas de merge auto.
2. **Pas d'invention** : si un token Labster manque pour un usage Shadcn (ex : couleur destructive), marquer `[TOKEN LABSTER MANQUANT — à définir]` au lieu d'inventer une valeur.
3. **Citation systématique** : pour tout audit, citer fileKey + nodeId du composant analysé.
4. **Pas de hex hardcodés** : tout passe par référence token. Exception explicite si commentée.
5. **Pas de variants inventés** : si un variant attendu n'existe pas dans Shadcn (ex : "loading" sur Card), le générer dans le DESIGN.md avec note `[VARIANT MANQUANT EN FIGMA — à créer]`.

## Voice Labster (à incarner dans toutes les générations de doc/copy)

- Ton : analytique, précis, direct.
- Pas de superlatifs ("transformatif", "révolutionnaire", "synergies", "game-changer").
- Trade-offs explicites, jamais minimisés.
- Anglais pour les artefacts si destinés à Labster offering ; français OK pour les notes internes du POC.

## Limites assumées du POC (à rappeler si on s'en éloigne)

- ~25 composants au 2026-05-24, encore POC (pas de versioning sémantique ni de breaking-changes log).
- Tests unitaires absents — seul le typecheck garantit la robustesse.
- `.ai/` indexes pas systématiquement régénérés après chaque ajout.
- Pas encore de codegen Figma → React systématique (pipeline manuel via MCP).
- Mesure ARC à la main, pas de control run sans `.ai/` pour comparaison.
- Alias `@labster-ds-poc` (cf. script démo SIG scène 4) PAS encore configuré — les imports patterns sont relatifs (`../components/...`). À ajouter dans `tsconfig.json` paths + `vite.config.ts` resolve.alias pour matcher le scénario de publication V1.1.

---

# Workflow 2 — USAGE du DS (consommer le DS pour faire une feature)

Section dédiée à la **consommation** du DS pour produire une nouvelle UI dans Storybook. À distinguer du Workflow CREATION (ajout d'un composant au DS) documenté dans `rules/add-component-method.md`.

## Quand appliquer ce workflow

Tu reçois un **brief feature** (PRD, JTBD, problem statement) et il faut produire une UI dans Storybook en consommant les composants existants du DS.

Format brief attendu :
- Persona + JTBD
- Contraintes (lecture seule / mock data / 100% DS)
- Métriques de succès
- Données à afficher (V1.0 scope)

Si le brief est absent ou incomplet, demande-le avant de continuer.

## Ordre des étapes (non négociable)

```
Brief → [Figma D'ABORD] → [Code APRÈS] → Findings
```

**Figma AVANT le code** est non-optionnel sauf throwaway proto 5 min explicite. Coder avant d'avoir une intention design écrite produit systématiquement de la **copie paresseuse** d'un pattern existant (anti-pattern observé : recyclage d'un composant sémantiquement inadapté).

### Étape A — Design intent Figma

Avant tout code, crée UNE frame Figma 1400×900 sur la page "Test Usage DS" du fichier `02-Labster-DS-V0.1` (fileKey `fTtwrwxa74iSPMMTbq5GK8`), via Figma MCP (`mcp__figma__use_figma`).

- Conçois le **layout depuis le brief** (hiérarchie info-first, parcours du regard). PAS en mode "copie un pattern existant".
- Utilise les **vrais assets DS** : `public/assets/logos/labster-logo-symbol-light-3-colors.svg`, paths SVG des Icon (cf. `src/components/Icon/Icon.tsx`), FloatingShape (cf. `src/components/Icon/FloatingShape.tsx`).
- Tokens uniquement (hex `#0E2946` grey-6, `#EF4C59` red, `#476AE3` blue, `#FFC31D` yellow, `#FCD9D9` red-light, `#D6DFFF` blue-light, `#FFECB8` yellow-light).
- Itère jusqu'à validation utilisateur (typiquement 2-3 passes : layout brut → fixes overflow/badges/initiales → assets réels).
- Réponds avec : URL Figma, liste des composants utilisés, liste des nouveaux masters proposés (avec justification), gaps non résolus.

### Étape B — Vibe-code depuis Figma validé

Une fois la frame Figma validée par l'humain, transpose en code dans `src/patterns/<FeatureName>.stories.tsx`.

- **Fidélité Figma** : le code matche la frame layout pour layout. Pas de re-design pendant l'impl.
- Pour chaque composant Figma : grep `src/components/` → si existe, import direct. Sinon, **crée le nouveau composant aligné** dans `src/components/<X>/` avec sa story standalone.
- Mock data inline (10-15 enregistrements réalistes, **noms fictifs anonymisés** — pas de vrais clients).
- Catégorie Storybook : `Patterns/Test Usage DS/<FeatureName>` avec `parameters.layout: "fullscreen"` et `docs.story: { inline: false, iframeHeight: 1024 }`.

### Étape B.1 — Vérification Storybook local

Avant les Findings, lance Storybook et valide le rendu visuel avec l'utilisateur.

- `npm run storybook` (port 6006 par défaut).
- Navigue vers `Patterns/Test Usage DS/<FeatureName>` ou ouvre directement `http://localhost:6006/?path=/story/patterns-test-usage-ds-<feature>--default`.
- Mode Canvas pour les stories `parameters.layout: "fullscreen"`.
- **GO humain explicite** avant Findings. Si rendu cassé, retour Étape B (pas Étape A — le design intent est validé, c'est l'impl qui dérive).

`npm run typecheck` échoue actuellement sur un bug pré-existant `tsconfig.node.json` (composite/noEmit) — le compile Vite via Storybook tient lieu de vérification syntaxique en attendant le fix.

### Étape C — Findings

Produis un rapport (chat OU fichier markdown local côté utilisateur) avec :
- **Composants DS utilisés** (liste `<X> × <count>`)
- **Nouveaux composants créés** (liste avec lien fichier)
- **Gaps non-résolus** (composants Figma sans équivalent code, justifier pourquoi)
- **Frictions API** (props confuses, naming, variants manquants)
- **Temps réel mesuré** par étape

### Étape D — Publication (push + Chromatic auto-deploy)

Après validation Findings :
- Commit conventionnel : `feat(patterns): <FeatureName> — <V1.x description>` (cf. style des commits récents via `git log`).
- Push branche → PR → merge `main`.
- GitHub Action auto-déploie Storybook sur Chromatic : https://main--6a118881fbc20cd7a43001a1.chromatic.com/
- URL pattern final : `https://main--6a118881fbc20cd7a43001a1.chromatic.com/?path=/story/patterns-test-usage-ds-<feature>--default`
- Délai CI typique : 2-3 min.

Pas de merge auto. La validation Étape B.1 + Findings est le gate humain.

## Garde-fous Workflow USAGE (non-négociables)

1. **RÉUTILISE D'ABORD** : pour chaque besoin UI, grep `src/components/`. Si un composant existant couvre 80%+ du besoin → utilise-le.
2. **ALIGNE QUAND TU CRÉES** : si un nouveau composant est nécessaire :
   - **Tokens uniquement** (`src/tokens/index.ts` + classes Tailwind du `tailwind.config.ts`)
   - **Patterns visuels existants** : white cards, rounded-2xl, bandeau couleur 8px top, highlight rectangulaire derrière titre (cf. AgentCard, DeliverableCard, PriorityCard)
   - **Conventions API** : props cohérents (`tone="red|blue|yellow"`, `size="..."`, `clsx` pour merge classes)
   - **Inspire-toi** du composant existant le plus proche dans l'esprit (ex. `EngagementRow` s'inspire de `AgentCard` mais sémantique propre)
3. **PAS DE COPIE PARESSEUSE** : ne réutilise pas un composant uniquement "parce qu'il existe et ressemble". Ex : un `AgentCard` pour représenter un engagement client = mauvaise réutilisation sémantique → crée un `EngagementRow` aligné.
4. **PAS D'INVENTION VISUELLE** : pas de gradient, pas de hex inline, pas de typo hors Fieldwork + Inter fallback. Si tu as envie de violer le DS pour "améliorer", c'est un signal de **gap** — flag-le au lieu d'inventer.
5. **PAS DE BACKEND** : toutes les données mockées inline. Pas de `fetch`, pas de `useEffect` data loading.
6. **HUMAN IN THE LOOP** : utilisateur valide à chaque étape (brief → Figma → code → findings). Pas de merge ni de push auto.

## Composants disponibles (au 2026-05-24)

**Brand** : `LabsterLogo`, `LabsterShape`

**App UI** : `AppShell`, `Sidebar` + `SidebarNavItem`, `PageHeader`, `Avatar`, `KpiCard`, `FilterTabs`, `StatusBadge`, `AgentCard`, `PriorityCard`, `EngagementRow`, `TeamStack`, `CapacityBar`

**Atoms/Molecules** : `Button`, `ButtonLink`, `ButtonIcon`, `Input`, `Checkbox`, `Badge`, `NavItem`, `Icon`, `Card`, `ManagerCard`, `Picto`, `Illustration`, `Elevator` + `ElevatorAnchorLink`

**Slide Blocks** (utilisables aussi en contexte app) : `SlideBanner`, `StatCard`, `InsightCard`, `DeliverableCard`, `UserProfileChip`, `EffortGanttCard`, `RoleCard`, `PersonCard`, `Timer`, `TimedListItem`, `SlideParagraph`, `SourceLink`

Pour la matrix exhaustive props × variants : ouvre la story Storybook → onglets Controls + Docs.

## Anti-patterns à éviter

- ❌ Coder avant Figma → produit une copie paresseuse du dernier pattern vu
- ❌ Réutiliser un composant pour autre chose que sa sémantique d'origine
- ❌ Hacker du `<div>` + Tailwind brut quand un composant DS existe
- ❌ Inventer une nouvelle couleur / radius / shadow plutôt que flag le gap
- ❌ Skip findings → les gaps observés se reperdent et le DS stagne

---

# Prompts par rôle (multi-rôles SIG démo + équipe Labster)

Quand l'IA est sollicitée par rôle métier, démarre le prompt par le préambule de rôle pour ancrer la posture, les responsabilités et les garde-fous spécifiques. Cohérent avec le script démo SIG (cf. `examples/script-video-demo-bloc3-sig-2026-06-09.md`).

## PO

> Tu es PO chez `<Client>`. Mets au propre ce brief : structure en sections (Contexte métier, Logique métier, Critères d'acceptation, Cas d'usage). Pose les questions qui manquent pour le scope V1.0. NE PAS inventer de règles métier — flag les ambiguïtés.

## Designer

> Tu es Designer chez Labster. Voici CLAUDE.md, DESIGN.md global, composants `.design.md`, brief PO. Génère le DESIGN.md de l'écran `<X>` qui compose UNIQUEMENT depuis le DS. Marque `[COMPOSANT MANQUANT — à créer]` plutôt que d'inventer. Puis pousse la frame design intent dans Figma `02-Labster-DS-V0.1` page « Test Usage DS ».

## Dev

> Tu es Dev chez Labster. Voici la spec d'écran et le DS Labster dans `src/components/`. Génère le composant React + Tailwind dans `src/patterns/<X>.stories.tsx`. CONTRAINTE : tu IMPORTES depuis `src/components/<X>`. PAS de hex inline. Mock data inline anonymisée. Inclus tests unitaires si demandé.

## Publisher

> Tu es Publisher chez Labster. Voici l'écran + voice Labster (analytique, précis, direct, pas de superlatifs) + voice client (cf. brief). Génère titre, libellés, messages d'erreur (constructifs), aide, CTA. Conformité légale citée explicitement.

## Tech Lead

> Tu es Tech Lead chez Labster. Applique le protocole ARC sur la feature `<X>` : AUDIT (composants DS utilisés, cf. `.ai/index.json`), REPORT (tokens consommés vs `.ai/design-tokens.json`, flag écarts), COMPOSE (3 améliorations priorisées : cohérence DS / sécurité / accessibilité / perf). Cite fileKey + nodeId Figma source.

---

# Azure DevOps

Configuration requise par le skill `/ado-create-story` (`skills/ado-create-story/SKILL.md`).

- **Organization** : `[À CONFIGURER — ex : labster]`
- **Project** : `[À CONFIGURER — ex : SIG-Portail-Client]`
- **Team** : `[À CONFIGURER — ex : SIG Team]`
- **Area Path par défaut** : `[À CONFIGURER — ex : SIG\Portail client]`
- **Iteration Path par défaut** : `[À CONFIGURER — ex : SIG\Sprint 1]`

## Utilisation

1. **Prérequis** : avoir un **ID de Feature parent** dans ADO (chaque User Story est enfant d'une Feature).
2. **Export** : une fois la story validée à la porte ①, invoquer `/ado-create-story` avec les métadonnées ADO renseignées dans la story (cf. `skills/user-story/template.md`).
3. **Modes** : le skill propose deux modes — AI-powered (génère title/description/critères depuis la story) ou Manual (champs à saisir un par un).
4. **Résultat** : lien direct vers le Work Item créé — `https://dev.azure.com/[ORGANIZATION]/[PROJECT]/_workitems/edit/[STORY_ID]`

## Types de Work Items

- **User Story** : type utilisé pour les stories générées par `skills/user-story/SKILL.md`
- **Feature** : parent obligatoire — créer ou identifier la Feature avant de créer les stories enfants

## Champs ADO utilisés

| Champ ADO | Chemin technique | Source dans la story |
|---|---|---|
| Title | `System.Title` | Résumé (max 255 car.) |
| Description | `System.Description` | Vue d'ensemble + Cas d'usage (HTML) |
| Acceptance Criteria | `Microsoft.VSTS.Common.AcceptanceCriteria` | Critères Gherkin |
| Story Points | `Microsoft.VSTS.Scheduling.StoryPoints` | Points |
| Priority | `Microsoft.VSTS.Common.Priority` | Priorité (1-4) |
| Iteration Path | `System.IterationPath` | Itération |
| Area Path | `System.AreaPath` | Zone |
| Tags | `System.Tags` | Tags (séparés par `;`) |
