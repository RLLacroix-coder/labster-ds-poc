# Figma — Description composant Dialog

> **Usage** : coller ce contenu dans le champ "Description" du master component Figma `Dialog`
> (fichier `01-Shadcn-Kit-POC`, node `4:329`).
> Référence code : `src/components/Dialog/Dialog.tsx`

---

## Description Figma (copier dans le panneau composant)

```
Modale qui interrompt l'utilisateur pour une action critique ou une information bloquante. À utiliser uniquement pour les confirmations, saisies ponctuelles et acquittements. Pour les contenus non-critiques, utiliser Toast ou Banner.

Propriétés Figma :
• Variant → informational | confirmation | destructive-confirmation | form
• State → Closed* | Open | Closing
• Has backdrop → false* | true
• Has description → false* | true
• Has secondary action → false* | true

Règles d'usage :
• Le titre doit décrire l'action ET ses conséquences ("Supprimer le projet Octopus ?"), jamais "Êtes-vous sûr ?".
• destructive-confirmation : focus initial sur Cancel (jamais sur le bouton danger).
• Ne jamais empiler 2 Dialog (anti-pattern).
• Ne jamais afficher une Dialog au chargement de page.
• Échap ferme la Dialog — sauf si le formulaire a des changements non sauvegardés.
• Le backdrop (overlay grey-6 à 50%) est obligatoire — le contenu derrière ne doit pas être interactif.

Tokens :
• Fond : colors.neutral.white
• Overlay backdrop : colors.neutral.grey-6 @ opacity 50%  [CRÉÉ POUR LABSTER]
• Bordure card : colors.neutral.grey-1
• Radius : shapes.radius.md (12px)
• Ombre : elevation.large
• Typo titre : typography.headings.h6
• Typo description : typography.paragraphs.small
• Typo boutons : typography.text_styles.button_label
```

---

## Propriétés Component Set Figma

| Propriété | Type Figma | Valeurs | Défaut |
|-----------|-----------|---------|--------|
| Variant | Variant | informational, confirmation, destructive-confirmation, form | informational |
| State | Variant | Closed, Open, Closing | Closed |
| Has backdrop | Boolean | true, false | false |
| Has description | Boolean | true, false | true |
| Has secondary action | Boolean | true, false | true |

## Nommage des layers (pour Code Connect)

```
Dialog                        ← frame overlay (fill viewport)
├── Backdrop                  ← rectangle (colors.neutral.grey-6 @ 50%, visible si Has backdrop)
└── Dialog panel              ← frame (auto-layout vertical, radius md, elevation large)
    ├── Header                ← frame (auto-layout horizontal, justify-between)
    │   ├── Title             ← text (typography.headings.h6)
    │   └── Close button      ← instance Button (ghost, icon-only, ×)
    ├── Description           ← text (typography.paragraphs.small, visible si Has description)
    ├── Content               ← frame (slots Input, etc. — visible si Variant=form)
    └── Actions               ← frame (auto-layout horizontal, justify-end)
        ├── Secondary action  ← instance Button (secondary, visible si Has secondary action)
        └── Primary action    ← instance Button (primary | danger)
```

## Variants à créer dans Figma (manquants au 2026-05-22)

- `Has backdrop=true` : frame overlay avec fill grey-6 @ 50% — **CRÉÉ POUR LABSTER** (absent Shadcn)
- `State=Closing` : animation optionnelle (fade 150ms, scale 95%→100%) — à définir en Figma Prototype

## Composition enfants

- `Button` (1..2) : secondary (Cancel) + primary (Confirm) ou danger (Delete)
- `Input` (0..5) : taille `Small`, labelPlacement `inline-left` pour le pattern form

## Accessibilité (annotations Figma à ajouter sur toutes les frames Dialog)

```
role="dialog"
aria-modal="true"
aria-labelledby="dialog-title"
aria-describedby="dialog-description"  (si Has description)
Focus trap : premier element focusable → Close button ou Secondary action
Restitution focus : retour à l'élément déclencheur à la fermeture
```

Pour `destructive-confirmation` : annoter `initialFocus="secondary"` — focus Cancel, jamais le bouton danger.

## Lien Code Connect

Fichier : `src/components/Dialog/Dialog.tsx`
Prop `variant` → propriété Figma `Variant`
Prop `open` → propriété Figma `State=Open`
Prop `primaryAction.variant` → propriété Figma enfant `Primary action / Variant`
Prop `secondaryAction` → propriété Figma `Has secondary action`
Prop `description` → propriété Figma `Has description`
