# Figma — Description composant Button

> **Usage** : coller ce contenu dans le champ "Description" du master component Figma `Button`
> (fichier `01-Shadcn-Kit-POC`, node `1:85`).
> Référence code : `src/components/Button/Button.tsx`

---

## Description Figma (copier dans le panneau composant)

```
Bouton d'action ou de navigation. Atome le plus utilisé du DS Labster.

Propriétés Figma :
• Variant → primary | secondary | ghost | danger | accent-cta | link
• Size → Giant | Large | Medium* | Small | Tiny  (*default)
• Icon only → false* | true
• State → Default | Hover | Focus | Disabled | Loading

Règles d'usage :
• Maximum 1 bouton primary par section (CTA principal).
• danger uniquement pour les actions destructives irréversibles — toujours associé à une Dialog de confirmation.
• accent-cta = rouge Labster sur fond sombre (usage positif, ex. Contact Form). Distinct de danger même si même couleur source.
• link = navigation inline dans du texte ou des listes.
• Icon only : obligatoire d'ajouter une annotation "aria-label" sur la frame dans Figma.

Tokens :
• Fond primary : colors.semantic.action-primary (#476AE3)
• Fond danger : colors.semantic.danger (#EF4C59)
• Fond accent-cta : colors.semantic.accent-cta (#EF4C59)
• Radius : shapes.radius.sm (6px) — shapes.radius.pill pour accent-cta
• Typo : typography.text_styles.button_label (Fieldwork 14/500)
```

---

## Propriétés Component Set Figma

| Propriété | Type Figma | Valeurs | Défaut |
|-----------|-----------|---------|--------|
| Variant | Variant | primary, secondary, ghost, danger, accent-cta, link | primary |
| Size | Variant | Giant, Large, Medium, Small, Tiny | Medium |
| Icon only | Boolean | true, false | false |
| State | Variant | Default, Hover, Focus, Active, Disabled, Loading | Default |
| Icon Left | Instance swap | — | (aucun) |
| Icon Right | Instance swap | — | (aucun) |

## Nommage des layers (pour Code Connect)

```
Button                        ← frame principale (auto-layout horizontal, gap 8px)
├── Icon Left                 ← instance Icon (visible si icon présent)
├── Label                     ← text layer (typography.text_styles.button_label)
└── Icon Right                ← instance Icon (visible si icon présent)
```

## Variants à créer dans Figma (manquants au 2026-05-22)

- `State=Focus` : ring 2px action-primary, offset 2px
- `State=Active` : opacity 85%, pas de scale
- `State=Loading` : spinner 16px blanc centré, opacity 70% sur label
- `Size=Giant` et `Size=Tiny` : à valider avec Labster (usage marketing vs micro-UI)

Marquer ces frames : `[VARIANT MANQUANT — à créer]` dans le layer name jusqu'à la création.

## Accessibilité (annotations Figma)

- Icon-only : annoter `aria-label="<action>"` sur la frame de la story
- Loading : annoter `aria-busy="true"` et `aria-label="Chargement en cours"`
- Disabled : annoter `aria-disabled="true"` (ne pas utiliser `disabled` natif si l'état doit recevoir le focus)

## Lien Code Connect

Fichier : `src/components/Button/Button.tsx`
Prop `variant` → propriété Figma `Variant`
Prop `size` → propriété Figma `Size`
Prop `disabled` → propriété Figma `State=Disabled`
