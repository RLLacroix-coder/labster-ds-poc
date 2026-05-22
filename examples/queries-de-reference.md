---
title: Queries de référence pour mesurer les KPIs ARC
date: 2026-05-22
poc_version: V0.1
---

# Queries de référence — mesure ARC

5 queries types qui exercent chacune une couche du protocole ARC (Audit / Report / Compose). Chaque query a une **réponse attendue** dérivable des artefacts du POC sans inventer.

## 1. Audit — Inventaire composants

**Query** : *"Combien de composants y a-t-il dans le DS Labster ? Liste-les avec leur type."*

**Réponse attendue** :
- 3 composants : Button (atom), Input (atom), Dialog (molecule).

**Source de vérité** : `.ai/index.json` → `statistics.total_components` + tableau `components[]`.

**Fichier(s) que l'agent doit charger** : `.ai/index.json` (≈ 4KB, lecture rapide).

## 2. Audit — Variants d'un composant

**Query** : *"Liste tous les variants du composant Button avec leur statut."*

**Réponse attendue** :
- 9 variants : `primary` (stable), `secondary` (stable), `ghost` (stable), `danger` (stable), `link` (stable), `size-small` (to_create_in_figma), `icon-only-square` (stable), `icon-only-circle` (stable), `loading` (stable).

**Source de vérité** : `components/Button.metadata.ts` → `metadata.variants[]`.

**Fichier(s) que l'agent doit charger** : `components/Button.metadata.ts` OU `.ai/index.json` (qui contient déjà la liste mais sans statuts).

## 3. Report — Tokens d'un composant

**Query** : *"Quels tokens couleur sont utilisés par le composant Input ?"*

**Réponse attendue** :
- 9 tokens couleur : `neutral.white`, `neutral.smoke`, `neutral.grey-1`, `neutral.grey-2`, `neutral.grey-3`, `neutral.grey-6`, `semantic.danger`, `semantic.action-primary`, `brand.red-light`.

**Source de vérité** : `.ai/design-tokens.json` → entrée `components[]` où `component=Input`.

**Fichier(s) que l'agent doit charger** : `.ai/design-tokens.json` (lecture ciblée).

## 4. Report — Usage d'un composant

**Query** : *"Où est utilisé le composant Button dans le DS Labster ?"*

**Réponse attendue** :
- Dialog contient 1..2 Button (variant secondary + primary | danger).
- Input contient optionnellement 1 Button suffix (pattern Shadcn legacy, non promu comme standard Labster V0.1).
- L'écran login (examples/login-screen.html) utilise 2 Buttons (primary "Sign in" + link "Forgot password").

**Source de vérité** : `.ai/component-usage.json` → relations où `target=Button`.

**Fichier(s) que l'agent doit charger** : `.ai/component-usage.json`.

## 5. Compose — Génération conforme

**Query** : *"Génère un bouton 'Annuler' en variant secondary, taille default. Donne le HTML/CSS minimal compatible avec le DS Labster."*

**Réponse attendue** :
- Le bouton doit utiliser `--color-neutral-white` (background), `--color-neutral-grey-1` (border), `--color-neutral-grey-6` (text), `--radius-sm` (radius), `--font-body-medium` (typo).
- Aucun hex hardcodé.
- aria-label inutile (libellé visible).
- Pattern : `<button class="ds-button ds-button--secondary">Annuler</button>`.

**Source de vérité** : `components/Button.design.md` (variant secondary) + `examples/login-screen.html` (pattern CSS référence).

**Fichier(s) que l'agent doit charger** : `components/Button.design.md` + `.ai/design-tokens.json` (tokens) + `examples/login-screen.html` (pattern existant).
