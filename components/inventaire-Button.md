---
component: Button
type: atom
source:
  figma_file: "01-Shadcn-Kit-POC"
  figma_file_key: tPwrOV9EX9jLXuxsBskINR
  figma_node_id: "1:85"
  figma_url: "https://www.figma.com/design/tPwrOV9EX9jLXuxsBskINR/01-Shadcn-Kit-POC?node-id=1-85"
  master_page: Primitives
inventory_date: 2026-05-22
---

# Inventaire — Button

> Source : page **Primitives** du Shadcn UI Kit (nodeId `1:85`). Données extraites via `mcp__figma__get_design_context`.

## Vue d'ensemble

| Champ | Valeur |
|---|---|
| Type | atom |
| Nb variants | 19 |
| Famille typo unique | Inter Medium 14/24 (style nommé `body-medium`) |
| Radius standard | 6px (96px pour `just icon circle`) |
| Padding standard | `px-[16px] py-[8px]` (`p-[12px]` pour just icon circle, `p-[8px]` pour just icon) |
| Hauteur standard | 40px (32px pour `just icon`) |

## Variants détaillés

Combinaisons `type × state` extraites de la prop TypeScript du composant (nodeIds Figma + nom Tailwind du token couleur Shadcn) :

| # | type | state | nodeId | Background | Border | Text color |
|---|---|---|---|---|---|---|
| 1 | default | Default | `1:72` | slate/900 (#0F172A) | — | white (#FFFFFF) |
| 2 | primary button | hover | `13:903` | slate/700 (#334155) | — | white |
| 3 | destructive | Default | `1:86` | red/500 (#EF4444) | — | white |
| 4 | destructive | hover | `13:905` | red/600 (#DC2626) | — | white |
| 5 | outline | Default | `1:73` | white | slate/200 (#E2E8F0) | slate/900 |
| 6 | outline | hover | `13:901` | slate/100 (#F1F5F9) | slate/200 | slate/900 |
| 7 | subtle | Default | `1:88` | slate/100 (#F1F5F9) | — | slate/900 |
| 8 | subtle | hover | `13:907` | slate/200 (#E2E8F0) | — | slate/900 |
| 9 | ghost | Default | `1:90` | rgba(255,255,255,0) | — | slate/900 |
| 10 | ghost | hover | `13:911` | slate/100 (#F1F5F9) | — | slate/900 |
| 11 | link | Default | `1:92` | rgba(255,255,255,0) | — | slate/900 |
| 12 | link | hover | `13:913` | rgba(255,255,255,0) | — | slate/900 (underline) |
| 13 | with icon | Default | `1:94` | slate/900 (#0F172A) | — | white |
| 14 | with icon | hover | `13:936` | slate/700 (#334155) | — | white |
| 15 | just icon | Default | `13:2231` | white | slate/200 | slate/900 (icon) |
| 16 | just icon | hover | `13:2239` | slate/100 | slate/200 | slate/900 |
| 17 | just icon circle | Default | `13:2247` | white | slate/200 | slate/900 (icon) |
| 18 | just icon circle | hover | `13:2257` | slate/100 | slate/200 | slate/900 |
| 19 | loading | Default | `1:99` | rgba(15,23,42,0.5) | — | white |

## Tokens consommés (palette Shadcn)

### Couleur

| Nom Shadcn | Hex |
|---|---|
| slate/900 | `#0F172A` |
| slate/700 | `#334155` |
| slate/500 | `#64748B` |
| slate/400 | `#94A3B8` |
| slate/200 | `#E2E8F0` |
| slate/100 | `#F1F5F9` |
| red/500 | `#EF4444` |
| red/600 | `#DC2626` |
| white | `#FFFFFF` |

### Typographie

| Style nommé | Valeur |
|---|---|
| body-medium | Inter Medium 14/24/0 |

## Hex hardcodés détectés

**Tous les composants Shadcn utilisent des classes Tailwind avec hex inline** (`bg-[#0f172a]`, `text-[#94a3b8]`, etc.). Le DS source n'utilise pas de tokens DTCG ni de variables Figma : les couleurs sont *nommées en commentaire* (`slate/900`) mais inlinées en hex dans le code généré.

**Conséquence pour le POC** : à l'étape 6, chaque hex Shadcn devra être ré-écrit en référence vers un token Labster équivalent (ex : `slate/900` → `{color.labster.dark}`) ou flaggé `[TOKEN LABSTER MANQUANT — à définir]` si aucun équivalent Labster n'existe.

## Variants attendus état de l'art vs présents

| Variant attendu Material 3 / WAI-ARIA | Présent ? | Note |
|---|---|---|
| default | ✅ | type=default |
| hover | ✅ | tous les types ont leur variante hover |
| pressed / active | ❌ | absent du kit Shadcn — fallback CSS `:active` à documenter |
| focus | ⚠️ | pas de variant Figma dédié — repose sur l'outline browser. À documenter dans Accessibilité |
| disabled | ⚠️ | pas de variant explicite — l'état loading sert de proxy (opacité 50%) mais pas de "disabled clic" séparé |
| destructive | ✅ | type=destructive |
| loading | ✅ | type=loading |
| with icon | ✅ | type=with icon |
| icon only | ✅ | type=just icon + just icon circle |

**À flagger en étape 6** :
- `[VARIANT MANQUANT EN FIGMA — pressed/active]` à créer si DS Labster cible WAI-ARIA complet
- `[VARIANT MANQUANT EN FIGMA — focus]` même remarque
- `[VARIANT MANQUANT EN FIGMA — disabled]` même remarque

## Notes pour la re-tokenisation Labster (étape 6)

- La palette Labster a une **palette branding** (rouge primaire vif vu sur screenshot Color palette : `#E20A18` ou proche), différente du `slate/900` Shadcn (gris foncé). Le mapping `Button > default background` devra être tranché : Labster pourrait choisir le rouge brand pour le bouton principal, ou un gris neutre pour rester "shadcn-like".
- Pas d'équivalent direct des nuances `slate/100..900` dans Labster styleguide (qui a 6 niveaux de gris d'après le screenshot, et 2 sets "Brand colors" + "Brand secondary colors"). Mapping à 1:1 impossible.
- Variant `destructive` : Labster a une couleur rouge brand qui est sans doute aussi la couleur "erreur" — risque de conflit sémantique (rouge brand ≠ rouge danger). À documenter.
