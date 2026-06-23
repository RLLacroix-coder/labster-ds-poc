# Figma — Description composant Card

> **Usage** : coller ce contenu dans le champ "Description" du master component Figma `Card`
> Fichier cible : `02-Labster-DS-V0.1` (fileKey `fTtwrwxa74iSPMMTbq5GK8`) — node à créer.
> Référence code : `src/components/Card/Card.tsx`

> **Note** : le composant Card n'existe pas dans le source Shadcn Kit (`01-Shadcn-Kit-POC`).
> Il a été créé pour Labster V1.0 (2026-05-22) comme molécule de composition principale.
> Il doit être créé dans `02-Labster-DS-V0.1` — annoter `[COMPOSANT À CRÉER EN FIGMA]`.

---

## Description Figma (copier dans le panneau composant)

```
Molécule de composition. Blocs de contenu dans les dashboards, tuiles de navigation, sélecteurs de plan, cartes de service (labster.io). Remplace Dialog comme molécule principale en V1.0.

Propriétés Figma :
• Variant → default | interactive | with-actions | selectable | elevated
• Size → Small (280px) | Medium* (400px) | Large (560px)
• Has image → false* | true (slot média en haut)
• Selected → false* | true (visible seulement si Variant=selectable)
• State → Default | Hover | Focus | Disabled  (pour interactive et selectable)

Règles d'usage :
• Default : bloc de contenu statique, pas de clic.
• interactive : surface cliquable entière — utiliser <a> ou <button> côté HTML (pas <div onClick>).
• with-actions : max 2 Button instances dans la zone action (1 primary + 1 secondary max).
• selectable : implémente le pattern WAI-ARIA Radio-Card.
• elevated : shadow permanente — ne pas mélanger elevation levels dans la même grille.
• Titres : 6 mots max. Corps : 3-4 lignes max (tronquer si plus long).

Tokens :
• Fond : colors.neutral.white
• Bordure hover : colors.neutral.grey-2 (interactive) → colors.semantic.action-primary 2px (selectable selected)
• Radius : shapes.radius.md (12px)
• Typo titre : typography.headings.h5
• Typo label catégorie : typography.text_styles.label_m
• Typo corps : typography.paragraphs.small
• Ombre default : aucune | elevated : elevation.small
• Ombre hover interactive : elevation.medium
```

---

## Propriétés Component Set Figma (à créer)

| Propriété | Type Figma | Valeurs | Défaut |
|-----------|-----------|---------|--------|
| Variant | Variant | default, interactive, with-actions, selectable, elevated | default |
| Size | Variant | Small, Medium, Large | Medium |
| Has image | Boolean | true, false | false |
| Selected | Boolean | true, false | false |
| State | Variant | Default, Hover, Focus, Disabled | Default |

## Nommage des layers (pour Code Connect)

```
Card                          ← frame principale (auto-layout vertical)
├── Image slot                ← frame ou image fill (visible si Has image)
├── Content                   ← frame (auto-layout vertical, padding 24px)
│   ├── Subtitle              ← text (typography.text_styles.label_m, optionnel)
│   ├── Title                 ← text (typography.headings.h5)
│   └── Body                  ← text (typography.paragraphs.small)
└── Actions                   ← frame (auto-layout horizontal, visible si with-actions)
    ├── Action primary        ← instance Button
    └── Action secondary      ← instance Button (optionnel)
```

## Composants enfants autorisés

- `Button` (0..2, variants quelconques) — zone `Actions`
- `Input` (0..n, rare) — uniquement pour form cards

## Accessibilité (annotations Figma)

- interactive : annoter `role="link"` ou `role="button"` selon l'action
- selectable : annoter `role="radio"` + `aria-checked="true/false"` + `aria-label="<contenu carte>"`
- elevated + interactive : annoter le focus ring 2px action-primary sur le composant

## Lien Code Connect

Fichier : `src/components/Card/Card.tsx`
Prop `variant` → propriété Figma `Variant`
Prop `size` → propriété Figma `Size`
Prop `selected` → propriété Figma `Selected`
Prop `image` → propriété Figma `Has image`

## Statut création Figma

```
[COMPOSANT À CRÉER EN FIGMA — 02-Labster-DS-V0.1, page Component Library]
Priorité : Medium (composant V1.0, utilisé dans PortefeuilleClients pattern)
Responsable : Designer Labster
```
