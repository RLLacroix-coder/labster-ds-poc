# Figma — Description composant Input

> **Usage** : coller ce contenu dans le champ "Description" du master component Figma `Input`
> (fichier `01-Shadcn-Kit-POC`, node `2:285`).
> Référence code : `src/components/Input/Input.tsx`

---

## Description Figma (copier dans le panneau composant)

```
Champ de saisie texte. Pour le texte long, utiliser Textarea. Pour les choix exclusifs, Select ou Radio. Pour les booléens, Checkbox ou Switch.

Propriétés Figma :
• Size → Default* | Small
• Label placement → Above* | Inline-left
• State → Default | Focused | Completed | Error | Disabled | Read-only
• Icon prefix → false* | true (icône à gauche)
• Icon suffix → false* | true (icône à droite, ex. eye toggle, alert-circle)
• Has helper text → false* | true
• Has error message → false* | true  (visible seulement si State=Error)

Règles d'usage :
• Toujours afficher un label visible (au-dessus ou inline gauche). Ne jamais utiliser le placeholder comme label.
• helperText : expliquer QUOI saisir ("Nous l'utilisons pour envoyer votre rapport").
• errorMessage : message actionnable ("Format email incorrect — exemple : nom@domaine.fr").
• Ne jamais désactiver un champ sans expliquer pourquoi dans helperText.
• Focus ring : ring 2px action-primary (#476AE3) — visible au clavier, obligatoire WCAG AA.

Tokens :
• Fond : colors.neutral.white
• Bordure : colors.neutral.grey-2 (default) → action-primary (focused) → semantic.danger (error)
• Texte : colors.neutral.grey-6
• Placeholder : colors.neutral.grey-3 (contraste ~5.3:1 — acceptable hint text, AA)
• Radius : shapes.radius.sm (6px)
• Typo label : typography.text_styles.label_m
• Typo value : typography.paragraphs.small
```

---

## Propriétés Component Set Figma

| Propriété | Type Figma | Valeurs | Défaut |
|-----------|-----------|---------|--------|
| Size | Variant | Default, Small | Default |
| Label placement | Variant | Above, Inline-left | Above |
| State | Variant | Default, Focused, Completed, Error, Disabled, Read-only | Default |
| Icon prefix | Boolean | true, false | false |
| Icon suffix | Boolean | true, false | false |
| Has helper text | Boolean | true, false | false |
| Has error message | Boolean | true, false | false |

## Nommage des layers (pour Code Connect)

```
Input                         ← frame principale (auto-layout vertical, gap 4px)
├── Label                     ← text layer (typography.text_styles.label_m)
├── Field                     ← frame (auto-layout horizontal)
│   ├── Icon prefix           ← instance Icon (visible si icon prefix)
│   ├── Input text            ← text layer (typography.paragraphs.small)
│   └── Icon suffix           ← instance Icon (visible si icon suffix)
└── Helper / Error text       ← text layer (typography.paragraphs.small)
```

## Variants à créer dans Figma (manquants au 2026-05-22)

- `State=Error` : bordure semantic.danger, fond red-light, suffix alert-circle icon — **CRÉÉ POUR LABSTER** (absent du Shadcn source)
- `State=Read-only` : fond smoke, bordure dashed subtile — **CRÉÉ POUR LABSTER**

Ces variants sont `status: "to_create_in_figma"` dans `Input.metadata.ts`.

## Accessibilité (annotations Figma)

- Champ sans label visible : annoter `aria-label="<nom du champ>"`
- Error message : annoter `aria-describedby="<id-error-message>"`
- Read-only : annoter `aria-readonly="true"` et `role="presentation"` sur la frame

## Lien Code Connect

Fichier : `src/components/Input/Input.tsx`
Prop `size` → propriété Figma `Size`
Prop `labelPlacement` → propriété Figma `Label placement`
Prop `errorMessage` → propriété Figma `State=Error` + `Has error message`
Prop `disabled` → propriété Figma `State=Disabled`
Prop `readOnly` → propriété Figma `State=Read-only`
Prop `iconPrefix` → propriété Figma `Icon prefix`
Prop `iconSuffix` → propriété Figma `Icon suffix`
