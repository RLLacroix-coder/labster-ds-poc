---
title: Vision — Workflow agentique product team Labster autour du DS
auteur: Rachel Lacroix, Le Labster
date_v0.1: 2026-05-22
date_v0.2: 2026-05-22 (révision stack technique)
date_v0.3: 2026-05-22 (ajout workflow Creation/Maintenance du DS)
statut: V0.3 — 2 workflows distincts (Creation/Maintenance + Usage), stack Claude Code + Figma MCP + Storybook + React + Tailwind
audience: équipe Labster (PM, Designer, Dev) + Remy et Christophe pour validation
related:
  - projects/labster-ds/tutoriel-ds-ai-ready-labster-2026-05-13.md (V0.5)
  - projects/sig/master-process-ia-sig-2026-05-07.md
  - repo POC : https://github.com/RLLacroix-coder/labster-ds-poc
purpose: Décrire le workflow end-to-end PO → PRD → prototype → design → handover → dev, avec Claude Code + Figma MCP + Storybook comme pipeline tech central. Le DS Labster devient une lib de composants React + Tailwind vivante, pas juste de la documentation.
changelog:
  v0.2:
    - "Étape 3 (vibe-code) : Claude Code directement, plus Lovable/V0 externe. Avantage : DS-aware dès le départ."
    - "Storybook ajouté comme livrable principal du DS (4ème lecteur, à côté de Figma/repo/agents)."
    - "Stack tech confirmée : React + Tailwind + Storybook + TypeScript. Le DS devient une lib de composants utilisable."
    - "Pipeline Figma → Code automatique via Figma MCP : Claude lit les composants Figma, génère React + Tailwind, output Storybook fonctionnel."
    - "Phase B.4 et Phase C re-cadrées en conséquence."
  v0.3:
    - "Distinction explicite de 2 workflows : (1) Creation/Maintenance du DS, (2) Usage du DS pour produire une feature."
    - "Workflow Creation décrit en 7 étapes (extraction tokens → mapping structure → arbitrages → génération composants → validation → handover doc)."
    - "Nouveaux skills : labster-ds:extract-tokens, labster-ds:map-structure, labster-ds:bootstrap-ds, labster-ds:gen-ds-docs."
    - "Réponse à la question : oui, le workflow permet bien de CONCEVOIR le DS Labster en combinant un DS de référence (pour la structure) + un brand kit (pour les visuels)."
---

# Vision — Workflow agentique product team Labster

## Pourquoi ce document

Le POC `labster-ds-poc` (V0.5) a validé qu'on peut produire un Design System AI-ready (4 couches Tokenization / Intent / Indexing / Orchestration) et le générer dans Figma via MCP. Mais le POC reste un **artefact isolé** — il n'est connecté à aucun workflow d'équipe.

Pour qu'il devienne un **kit prototype utilisable**, il faut le positionner dans un workflow agentique où chaque rôle de l'équipe (PM, Designer, Dev) trouve sa valeur. Ce document décrit cette vision.

---

## Stack technique (V0.2 — confirmée 2026-05-22)

Le DS Labster repose sur un **pipeline tech central** :

```
Figma (DS source visuel)
    ↓ via Figma MCP (mcp__figma__get_design_context, use_figma, etc.)
Claude Code (lecture des composants Figma + génération code)
    ↓ génère
React + Tailwind components (TypeScript, src/components/*.tsx)
    ↓ documentés dans
Storybook (lib de composants vivante, consommable par PM/Designer/Dev)
```

### Composants tech

| Élément | Rôle | Version cible MVP |
|---|---|---|
| **Claude Code** | Agent qui lit Figma + génère le code | actuel (Opus 4.7) |
| **Figma MCP** | Pont entre Claude et Figma (read/write) | actuel |
| **React** | Framework des composants | 18+ (hooks) |
| **Tailwind CSS** | Styling utility-first, configuré avec tokens Labster | 3.x (4 quand stable) |
| **TypeScript** | Typage (cohérent avec `metadata.ts` Intent layer) | 5.x |
| **Storybook** | Lib de composants documentée, interactive | 8.x |
| **Vite** | Bundler (recommandé pour Storybook 8 + React) | latest |

### Pourquoi cette stack

- **Claude Code** au lieu de Lovable/V0 : intégré, DS-aware nativement, pas de friction outil externe.
- **React + Tailwind** : standard de fait pour le DS modernes (Shadcn, Material 3 web), bien supporté par Figma MCP, code maintenable par toute équipe dev senior.
- **Storybook** : c'est le **livrable concret** du DS Labster. Pas juste de la doc, c'est une lib `npm install` consommable par tout projet Labster (Insight, Octopus, future apps).
- **TypeScript** : aligne avec la couche Intent (`metadata.ts`) — un seul langage typé pour Intent + Code.

### Repo cible

Le `labster-ds-poc` évolue en **monorepo léger** :

```
labster-ds-poc/
├── DESIGN.md                    # source de vérité humaine + LLM
├── components/                  # couche Intent (DESIGN.md + metadata.ts)
├── src/components/              # NEW — code React + Tailwind des composants
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx   # NEW — story Storybook
│   │   └── Button.test.tsx      # NEW (V1.1+) — tests
│   ├── Input/...
│   └── Card/...
├── src/tokens/                  # NEW — tokens TypeScript exportables
│   └── index.ts                 # export des couleurs, typo, etc.
├── tailwind.config.ts           # NEW — config Tailwind avec tokens Labster
├── .storybook/                  # NEW — config Storybook
├── tokens/                      # Tokenization layer (DTCG, MD raw)
├── .ai/                         # Indexing layer
├── rules/                       # Orchestration (schémas, méthode)
└── examples/                    # patterns (login screen, contact form)
```

---

## Les 2 workflows du DS (V0.3 — clarification)

Le DS Labster s'inscrit dans **2 workflows distincts** qui se complètent :

### Workflow 1 — CREATION / MAINTENANCE du DS

**Question** : Comment fabriquer (ou maintenir) le DS Labster lui-même ?

**Inputs** :
- Un **Figma DS de référence** pour la structure (ex: kit `01-DS-Figma-Kit-POC` mBvCItuxiknFm3udmqEd64) — fournit les conventions : matrice variants × sizes × states, naming, organisation des pages, présentation visuelle
- Le **Figma brand kit Labster** (`00-Labster-Tokens` PVYjz7w3CG5Lh0GU2iAoG3) — fournit les visuels : couleurs, typo Fieldwork, élévations, logos, icons, pictos
- (Optionnel) Observation site web client (labster.io) — révèle les patterns d'usage réels

**Outputs** : Le DS Labster complet, lisible par les 4 acteurs (Storybook + Figma + repo + code).

### Workflow 2 — USAGE du DS

**Question** : Comment produire une feature en consommant le DS existant ?

**Inputs** : brief PM + DS Labster (sortie du Workflow 1)
**Outputs** : feature production (code React + Tailwind utilisant les composants du DS, validée Figma, mergée)

C'est le workflow décrit dans la section suivante (les 6 étapes).

---

## Workflow 1 — CREATION / MAINTENANCE du DS Labster (V0.3)

Ce workflow s'exécute **une fois pour bootstrapper** le DS, puis **à chaque ajout/modification** d'un composant. Il est piloté principalement par toi (PM) ou un designer, avec Claude Code en agent.

### Diagramme

```
┌──────────────────────────────────────────────────────────────┐
│  ÉTAPE A — Inputs (sources visuelles + structurelles)         │
│  - Figma DS de référence (URL + nodeId pour structure)        │
│  - Figma brand kit Labster (URL + nodeId pour visuels)        │
│  - Optionnel : screenshots/URL site web pour patterns réels   │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│  ÉTAPE B — Extraction tokens (skill labster-ds:extract-tokens) │
│  Input : Figma brand kit                                       │
│  Action : Claude Code lit via Figma MCP                        │
│   - get_design_context sur 'Color palette' → hex + naming      │
│   - get_design_context sur 'Type scale' → famille + échelle    │
│   - get_design_context sur frame elevation → drop shadows      │
│  Output :                                                      │
│   - tokens/labster-tokens.json (DTCG format)                   │
│   - src/tokens/index.ts (TypeScript exports)                   │
│   - tailwind.config.ts (config avec tokens)                    │
│  Moment de vérité : Rachel/Designer relit tokens vs brand kit  │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│  ÉTAPE C — Mapping structure (skill labster-ds:map-structure)  │
│  Input : Figma DS de référence                                 │
│  Action : Claude Code lit la structure                         │
│   - Inventaire des pages, sections, Component Sets             │
│   - Pour chaque Component Set : variant properties + variants  │
│   - Conventions de naming, layout, présentation visuelle       │
│  Output :                                                      │
│   - ds-blueprint.md : structure cible du DS Labster            │
│   - Liste des composants à créer/adapter                       │
│   - Mapping conventions DS ref → DS Labster                    │
│  Moment de vérité : Rachel valide quels composants on retient  │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│  ÉTAPE D — Arbitrages humains (PM + Designer)                  │
│  Input : ds-blueprint.md + tokens Labster                      │
│  Décisions à trancher :                                        │
│   - Quels composants on garde du DS ref vs on omet ?           │
│   - Conflits identité/sémantique (rouge brand = accent + danger)│
│   - Couleur du Button primary (brand.blue vs Grey 6) ?         │
│   - Variants à créer pour Labster (Input error, etc.) ?        │
│   - Sizes à inclure (Giant/Large/Medium/Small/Tiny) ?          │
│   - Composants from-scratch (ex: Card si absent du DS ref)     │
│  Output : decisions.md documentant chaque arbitrage             │
│  ⚠ Étape NON automatisable — design judgment humain            │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│  ÉTAPE E — Génération composants (skill labster-ds:add-component│
│  pour chaque composant validé en D)                            │
│  Input par composant : nom + master Figma source + decisions   │
│  Action : pour chaque composant, applique la méthode 8 étapes   │
│  (cf. rules/add-component-method.md) :                          │
│   1. Cadrage                                                    │
│   2. Inventaire Figma                                           │
│   3. Arbitrages (déjà tranchés en D pour macro, ici fine)       │
│   4. DESIGN.md                                                  │
│   5. metadata.ts                                                │
│   6. .ai/ indexes update                                        │
│   7. Figma Component Set natif (dans 02-Labster-DS-V0.1)        │
│   8. Pattern d'exemple                                          │
│   + (V0.3 ajout) :                                              │
│   9. React + Tailwind component (src/components/<C>.tsx)        │
│   10. Storybook story (src/components/<C>.stories.tsx)          │
│  Itératif : on peut commencer par 1 composant (validation       │
│  méthode), puis étendre par lot.                                │
│  Moment de vérité : validation visuelle Storybook par étape     │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│  ÉTAPE F — Validation visuelle DS (Designer)                   │
│  Input : Storybook lancé localhost:6006 + Figma DS V1.0        │
│  Action : Designer compare                                      │
│   - Structure DS Labster vs DS de référence : matrice          │
│     variants×sizes×states, présentation, naming                │
│   - Visuel composants vs brand kit Labster : couleurs, typo,    │
│     élévations cohérentes                                       │
│   - Pattern d'usage vs site labster.io : reconnaissable ?       │
│  Output : feedback list (corrections demandées)                 │
│  Si corrections : re-exécuter Étape E sur composants concernés  │
│  Si OK : continuer Étape G                                      │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│  ÉTAPE G — Documentation handover (skill labster-ds:gen-ds-docs)│
│  Input : DS Labster complet                                    │
│  Action : Claude Code produit la doc d'utilisation              │
│   - README du DS Labster (installation, usage par les projets)  │
│   - Examples d'utilisation par composant                        │
│   - Migration guide depuis l'ancien DS Labster (si existant)    │
│   - Liste des moments de vérité (qui valide quoi)               │
│  Output :                                                       │
│   - README.md du repo labster-ds-poc                            │
│   - Page Cover du Storybook (avec quickstart)                   │
│   - Lien partagé équipe Labster                                 │
└──────────────────────────────────────────────────────────────┘
```

### Skills mobilisés (Workflow Creation)

| Skill | Mission | Statut |
|---|---|---|
| `labster-ds:extract-tokens` | Étape B — Figma brand kit → tokens DTCG + TypeScript + Tailwind config | 🔄 Phase C |
| `labster-ds:map-structure` | Étape C — Figma DS ref → blueprint structurel | 🔄 Phase C |
| `labster-ds:add-component` | Étape E — un composant complet (10 sous-étapes) | 🔄 Phase C |
| `labster-ds:bootstrap-ds` | Orchestrateur B → E (un seul prompt pour bootstrap le DS) | 🔄 Phase C (optionnel) |
| `labster-ds:gen-ds-docs` | Étape G — doc d'utilisation du DS | 🔄 Phase C |

### Cas d'usage actuel — où on en est

Ce qu'on a fait en POC V0.5 = exécution **manuelle** de ce workflow Creation :
- Étape B : tokens Labster extraits dans `tokens/labster-styles-raw.md` (manuel via parsing MCP)
- Étape C : pas formalisée (j'ai juste exploré le DS ref pour comprendre la structure)
- Étape D : arbitrages tranchés dans le chat (mapping shadcn→Labster, accent-cta vs danger, etc.)
- Étape E : 4 composants créés (Button, Input, Dialog, Card) avec DESIGN.md + metadata.ts. Code React + Storybook **pas encore** (Phase B.3-B.5)
- Étape F : auto-validation partielle (pas de designer)
- Étape G : `notes-figma.md` + README minimaux

Phase B (à venir) **complète** ce workflow Creation jusqu'à G, pour qu'il devienne reproductible et que tout futur composant suive la même méthode.

---

## Workflow 2 — USAGE du DS (V0.2 conservé) — 6 étapes

```
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 1 — Brief produit (humain : PM/PO)                    │
│  Input : besoin métier, contexte, contraintes                │
│  Action : PM rédige un brief court (1 page max)              │
│  Output : brief.md                                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 2 — Structuration en PRD (Claude Code + skill)        │
│  Skill : /ai-pm:prd-section                                  │
│  Input : brief.md + frameworks Rachel                        │
│  Action : Claude Code produit un PRD complet                 │
│  Output : prd.md (validé par PM)                             │
│  Moment de vérité : PM relit + valide                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 3 — Vibe-code prototype DS-aware (Claude Code direct) │
│  Skill : /labster-ds:vibe-prototype (à créer Phase C)        │
│  Input : prd.md + DS Labster (DESIGN.md + components React)  │
│  Action : Claude Code génère un prototype React utilisant    │
│           DIRECTEMENT les composants de la lib Labster.      │
│           Plus de Lovable/V0. Le prototype est DS-aware.     │
│  Output : src/prototypes/<feature>.tsx + Storybook story     │
│  Moment de vérité : PM valide UX/flow dans Storybook         │
│  ⚠ Avantage V0.2 : le prototype EST déjà DS-aware            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 4 — Design Figma (Designer humain + Claude Code)      │
│  Skill : /labster-ds:design-from-prototype (à créer Phase C) │
│  Input : prototype React + PRD + DS Labster Figma            │
│  Action : Designer ouvre Figma, Claude Code génère mockup    │
│           Figma avec instances du DS (via Figma MCP).        │
│           Le mockup miroite le prototype React.              │
│  Output : Figma frames + screenshots                         │
│  Moment de vérité : Designer ajuste + valide visuellement    │
│  ⚠ Note : le designer peut aussi commenter le PROTOTYPE      │
│           React directement si plus efficace (skip Figma)    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 5 — Handover Dev (Claude Code)                        │
│  Skill : /labster-ds:handover-dev (à créer Phase C)          │
│  Input : Figma validé + prototype React + DS Labster         │
│  Action : Claude Code produit :                              │
│   1. Spec dev (composants utilisés, tokens, props, events)   │
│   2. Tickets Linear/Jira                                     │
│   3. (Si feature majeure) Branche Git avec scaffold initial  │
│  Output : handover.md + tickets + (opt) branche git          │
│  Moment de vérité : Dev relit, pose questions, démarre impl. │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 6 — Implémentation (Dev humain + Claude Code support) │
│  Input : handover + prototype React + DS Labster + Storybook │
│  Action : Dev finalise l'impl en s'appuyant sur :            │
│   - Les composants React DS prêts à l'emploi (lib Labster)   │
│   - Le prototype Claude Code comme starting point            │
│   - Storybook pour vérifier visuel + accessibilité           │
│  Output : Pull Request + screenshots + tests                 │
│  Moment de vérité : Designer review visuel via Storybook +   │
│                     PM review UX                             │
└─────────────────────────────────────────────────────────────┘
```

### Gain V0.2 vs V0.1

| Aspect | V0.1 | V0.2 |
|---|---|---|
| Outils externes | Lovable/V0 pour étape 3 | Claude Code direct partout |
| Cohérence DS du prototype | Style hors-brand initial, à refaire en Figma | DS-aware dès la génération |
| Livrable principal du DS | Markdown + Figma statique | Lib React + Storybook **vivante** |
| Re-travail design → code | Élevé (designer refait dans Figma, dev re-implémente) | Faible (prototype = base du code prod) |
| Étape "Figma" obligatoire | Oui (étape 4) | Optionnelle (le Storybook peut suffire si validation visuelle OK) |

---

## Le DS Labster comme source de vérité partagée — 4 lecteurs (V0.2)

Au cœur du workflow, le **DS Labster est un artefact unique consommé par 4 acteurs** :

| Acteur | Comment il consomme le DS | Source |
|---|---|---|
| **Claude Code (agents)** | Lecture machine : `.ai/*.json`, `components/*.metadata.ts`, `DESIGN.md`. Aussi lecture Figma via MCP pour génération. | Couche Intent + Indexing du repo + Figma DS |
| **Designer humain** | Lecture visuelle : Figma DS V1.0 (Component Sets natifs avec variants, instances Assets panel) + Storybook pour valider le rendu code | Figma `02-Labster-DS-V0.1` + Storybook |
| **Dev humain** | Lecture lisible + interactive : `DESIGN.md` + **Storybook** + code React + Tailwind directement | `src/components/*.tsx` + Storybook + DESIGN.md |
| **PM humain (toi)** | Lecture exploratoire : Storybook pour comprendre ce qui est dispo + prototypage rapide via Claude Code | Storybook + Claude Code |

### Storybook = pivot central

Le Storybook est le **point de convergence** où tous les acteurs se retrouvent :
- Le **PM** y explore les composants disponibles avant un brief.
- Le **Designer** y valide le rendu code vs intention Figma.
- Le **Dev** y consomme les composants via `npm install`.
- Les **agents** y génèrent automatiquement des stories à partir de `metadata.ts` (skill `labster-ds:gen-stories` Phase C).

La cohérence des 4 vues est garantie par :
- **Source = repo** (DESIGN.md + code React). Figma est un miroir visuel généré, Storybook est l'exécution du code.
- **Pipeline automatique** Figma → Claude Code → Code React → Storybook (via skills Phase C).
- **Code Connect** (V1.1+) pour lier les composants Figma ↔ composants code (round-trip).

---

## Rôles et responsabilités

### Humains

| Rôle | Mission dans le workflow | Outils principaux |
|---|---|---|
| **PO / PM** (Rachel) | Brief, validation PRD, validation UX du prototype, sign-off final | Claude Code + skills ai-pm:* + agile-pm:* |
| **Designer** (collaborateur) | Validation visuelle Figma, ajustements design, validation handover | Figma + Claude Code + skills uxr:* + labster-ds:* |
| **Dev** (équipe Labster) | Implémentation, review handover, PR | IDE + Claude Code + DS Labster (codegen) |

### Agents / Skills (V0.2 — pipeline Claude Code)

Tous les agents sont des **skills Claude Code** (`/skill-name`), pas d'outils externes.

| Skill | Mission | Existant ? |
|---|---|---|
| `ai-pm:prd-section` | Structurer un brief en PRD complet (étape 2) | ✅ Existant |
| `ai-pm:problem-statement` | Cadrer le problème AI / produit | ✅ Existant |
| `labster-ds:add-component` | Ajouter un composant au DS : DESIGN.md + metadata.ts + .ai/ index + **Figma Component Set** + **React + Tailwind code** + **Storybook story** | 🔄 Phase C |
| `labster-ds:vibe-prototype` | Générer un prototype React DS-aware depuis PRD (étape 3) | 🔄 Phase C |
| `labster-ds:figma-to-code` | Pour un composant Figma existant, générer le code React + Tailwind correspondant | 🔄 Phase C |
| `labster-ds:gen-stories` | Auto-générer les Storybook stories depuis `metadata.ts` (1 story par variant) | 🔄 Phase C |
| `labster-ds:design-from-prototype` | Générer un mockup Figma DS-aware depuis un prototype React (étape 4, optionnelle) | 🔄 Phase C |
| `labster-ds:handover-dev` | Produire spec dev depuis Figma/prototype validés (étape 5) | 🔄 Phase C |

---

## Moments de vérité (Human-in-the-Loop)

Pilier de la voice Labster (jamais survendre, trade-offs explicites). 4 moments où un humain doit valider :

1. **Après l'étape 2 (PRD)** — PM valide que le PRD reflète le brief.
2. **Après l'étape 3 (prototype vibe-codé)** — PM valide l'UX et le flow (style hors-brand OK à ce stade).
3. **Après l'étape 4 (Figma DS-aware)** — Designer valide visuel + cohérence DS.
4. **Après l'étape 6 (PR dev)** — Designer + PM review final avant merge.

Aucun de ces moments ne peut être skip : si un humain n'a pas validé, l'étape suivante n'est pas autorisée par convention.

---

## Articulation avec le triple-track agile

Le workflow ci-dessus mappe sur le **Triple-Track Agile** (Discovery + Data + Delivery) que Rachel pratique :

| Track | Étapes correspondantes |
|---|---|
| **Discovery** | Étape 1 (brief), Étape 2 (PRD), Étape 3 (prototype) — exploration et validation problème/solution |
| **Data** | (Pas couvert ici — pertinent quand l'AI/ML est dans le scope, cf. Octopus) |
| **Delivery** | Étape 4 (Figma DS-aware), Étape 5 (handover), Étape 6 (dev) — production de la solution |

Le DS Labster est le **point de synchronisation** entre Discovery (prototype) et Delivery (design + dev).

---

## Articulation avec le master process IA SIG

Le master process IA SIG (`projects/sig/master-process-ia-sig-2026-05-07.md`) définit 4 niveaux :
- Niveau 0 : Socle (Rules + Skills + CLAUDE.md)
- Niveau 1 : Boucle Production DS (étapes 5-8 du tutoriel POC)
- Niveau 2 : Boucle Sprint (étapes 9 du tutoriel POC = écran généré DS-aware)
- Niveau 3 : Mesure (étape 10)

Le workflow agentique Labster ci-dessus **exerce Niveau 2 du master process** : il consomme le DS produit en Niveau 1 pour générer des écrans réels. Et la mesure du workflow (taux de revalidation humaine, temps brief → PR) alimente Niveau 3.

→ Ce workflow Labster pourrait servir de **base mature** quand on industrialisera chez SIG en Phase 2.

---

## Périmètre V1.0 (MVP) du kit prototype

Pour avoir un kit fonctionnel et défensable rapidement, V1.0 cible :

| Composant V1.0 | Why |
|---|---|
| Button (6 variants Labster × 5 sizes × 5 states × icon-only) | Atom le plus utilisé. Existe déjà en V0.5, à refondre proprement. |
| Input (5 variants Labster, state=error créé) | Atom critique pour les formulaires. Existe en V0.5 (DESIGN.md only). |
| Card (à créer pour Labster — Dialog reste molecule séparée) | Molecule critique pour les listes, dashboards. Absente du POC actuel. |

3 composants seulement, mais **propres et reproductibles** — chaque composant suit la même méthode (cf. Livrable 3).

Étend en V1.1+ : Select, Checkbox, Radio, Tabs, Toast, Tooltip, Avatar, Badge.

---

## Métriques de succès du kit

Pour valider que le workflow tient, mesurer sur **1 cas d'usage Labster réel** (ex: feature Insight, ou outil interne PM) :

| Indicateur | Cible MVP | Comment mesurer |
|---|---|---|
| Temps brief → prototype validé | < 4h | Chrono manuel |
| Temps prototype → Figma DS-aware validé | < 2h | Chrono manuel |
| Temps Figma → handover dev | < 1h | Chrono manuel |
| % composants utilisés issus du DS | 100% (zero invention) | Audit Figma file |
| Itérations designer sur le Figma | ≤ 2 | Comptage commits PR |
| Satisfaction PM / Designer / Dev | Score qualitatif | Retro 5 min × 3 |

---

## Risques et hypothèses

| Hypothèse | Risque si fausse | Mitigation |
|---|---|---|
| Le DS Labster Figma sera assez riche pour couvrir 80% des cas en V1.0 | Designer doit créer des composants à chaque cas → workflow casse | Cible V1.0 = 3 composants, mais étendre rapidement à 8-10 (V1.1) si besoin |
| Les agents peuvent lire le Figma fidèlement via MCP | Si les Variables Figma ne sont pas dispo (cas Pro plan), agents lisent moins bien | On a déjà la stratégie de fallback (extraction via design context) en V0.4 |
| Le designer accepte de travailler dans un workflow Figma + repo Git | Si le designer rejette le repo, on perd la cohérence DS | Convaincre sur la valeur du miroir Figma + commits PR sur DESIGN.md |
| Fieldwork peut être installée dans Figma Labster | Si non, fallback Inter pour les agents Figma | Cherché — actuellement fallback Inter documenté |
| L'équipe produit Labster accepte d'utiliser Claude Code | Si rejet, le workflow agentique n'a pas d'utilisateur | Démo sur projet concret |

---

## Plan de construction (phasage)

### Phase A (ce document, fait)
**Livrable** : ce fichier de vision.
**Validateur** : Remy.

### Phase B — Refonte DS Labster V1.0 + setup React/Tailwind/Storybook (8-10h)
**Livrable** (V0.2 enrichi) :
- Figma `02-Labster-DS-V0.1` refondu proprement (Component Sets natifs)
- Repo POC évolué en monorepo léger React + Tailwind + Storybook
  - `src/components/{Button,Input,Card}.tsx` (code React des 3 composants MVP)
  - `src/tokens/index.ts` (tokens TypeScript exportables)
  - `tailwind.config.ts` (config avec tokens Labster)
  - `.storybook/` config + `*.stories.tsx` (1 story par variant)
- Méthode reproductible étendue : `rules/add-component-method.md` couvre les 3 livrables (DESIGN.md, Figma, Code+Storybook)
- Fieldwork installation tentée

**Sous-phases** :
- B.1 : Méthode reproductible documentée ✅ (fait)
- B.2 : Card côté Intent layer ✅ (fait)
- **B.3 : Setup React + Tailwind + Storybook dans le repo** (~2-3h)
- **B.4 : Générer le code React + Tailwind des 3 composants depuis Figma via MCP** (~3h)
- **B.5 : Générer les Storybook stories depuis metadata.ts** (~1h)
- **B.6 : Refonte Figma propre (Component Sets natifs synchros avec le code)** (~2-3h)

**Validateur** : Rachel (Storybook utilisable), opt. designer (Figma), opt. dev (code lisible).

### Phase C — Skills agentiques (3-4h)
**Livrable** :
- `skills/labster-ds/add-component.md` — orchestre Intent + Figma + Code + Stories
- `skills/labster-ds/figma-to-code.md` — Figma MCP → React + Tailwind
- `skills/labster-ds/gen-stories.md` — metadata.ts → Storybook stories
- `skills/labster-ds/vibe-prototype.md` — PRD + DS → prototype React
- `skills/labster-ds/handover-dev.md` — Figma/code validés → spec dev
- CLAUDE.md du repo POC mis à jour

**Validateur** : Rachel (test "j'ajoute Tabs au DS via add-component, ça marche en 1 commande").

### Phase D (optionnelle, V1.1+) — Validation sur cas réel Labster
**Livrable** : 1 feature Labster (Insight ou autre) prototypée end-to-end via le workflow.
**Validateur** : Christophe, Remy + équipe.

---

## Prochaines décisions

1. **Avant de lancer Phase B** : valider que cette vision résonne avec Christophe et Remy. Une réunion 30 min pour partager le doc.
2. **Pendant Phase B** : choisir Card vs Dialog (Card prioritaire selon la vision, Dialog peut rester séparé).
3. **Pendant Phase C** : décider si on utilise un format de skill existant (Cohort 8) ou si on en construit un Labster spécifique.

---

*Document interne Labster, V0.1 du 2026-05-22. À reviewer en réunion avec Christophe et Remy avant d'attaquer Phase B.*
