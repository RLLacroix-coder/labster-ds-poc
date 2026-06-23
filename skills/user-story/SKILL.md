# Skill — Rédaction de User Stories

Ce skill traduit un besoin métier en User Stories structurées avec des critères d'acceptation testables (format Gherkin). Il correspond à l'**Étape 1** du workflow de production de feature décrit dans `CLAUDE.md`.

## Processus en 5 étapes

### 1. Collecter le contexte
- Identifier le persona précis (éviter "En tant qu'utilisateur")
- Comprendre le problème que l'utilisateur cherche à résoudre
- Identifier l'outcome souhaité
- Noter les contraintes (UX, métier, technique, légal)

### 2. Rédiger le cas d'usage
Compléter ce template avec précision :
- **En tant que** [persona/rôle] — nommer des rôles précis si disponibles
- **Je veux** [action que l'utilisateur effectue]
- **afin de** [outcome souhaité pour l'utilisateur]

### 3. Rédiger les critères d'acceptation
Format Gherkin :
- **Scénario :** [description lisible de la valeur]
- **Étant donné que** [préconditions]
- **Et étant donné que** [préconditions additionnelles]
- **Quand** [événement déclencheur]
- **Alors** [résultat attendu, aligné sur "afin de"]

### 4. Ajouter un résumé
Titre court et mémorable centré sur la valeur utilisateur, pas sur l'implémentation.

### 5. Valider et affiner
- Réviser avec l'équipe (PO + Designer en itération US-Design, cf. Étape 2a)
- Vérifier la clarté : le persona est-il précis ?
- Vérifier la complétude : le "afin de" explique-t-il la valeur, pas le mécanisme ?
- Vérifier le périmètre : un seul Quand/Alors ?

---

## Ce que sont les User Stories

Les User Stories sont des **points de départ pour la conversation** : elles traduisent les besoins utilisateurs en éléments de travail prêts pour le développement, avec des conditions de succès testables. Elles restent vivantes — elles évoluent pendant le sprint, notamment lors de l'itération US-Design avec le Designer.

## Ce que NE SONT PAS les User Stories

- Des listes de fonctionnalités ("Ajouter la connexion", "Construire le tableau de bord")
- Des spécifications techniques ("Refactoriser la base de données", "Mettre à jour le CSS")
- Des formulations vagues ("Améliorer les performances", "Meilleure UX")
- Des contrats figés (elles évoluent au contact du design et du développement)

---

## Cinq principes critiques

### 1. Précision du persona
Éviter "En tant qu'utilisateur". Nommer le rôle ou le persona spécifique.

✅ "En tant que **client SIG en démarche de création de compte en ligne**"
✅ "En tant que **agent SIG de service client traitant une réclamation**"
❌ "En tant qu'**utilisateur**"

### 2. Clarté de l'action
Utiliser des verbes actifs et précis.

✅ "Je veux **consulter mon historique de factures sur les 12 derniers mois**"
❌ "Je veux **voir mes factures**" (trop vague)

### 3. Alignement sur la valeur
La clause "afin de" explique *pourquoi* l'utilisateur veut l'action — pas *comment* le système la délivre.

✅ "afin de **ne pas avoir à appeler le service client pour obtenir un duplicata**"
❌ "afin d'**être authentifié**" (c'est un mécanisme, pas une valeur)

### 4. Testabilité des critères d'acceptation
Les critères Gherkin doivent être réfutables par le QA — chaque "Alors" doit être vérifiable sans interprétation.

✅ "Alors je vois un récapitulatif avec le montant, la date d'échéance et un bouton 'Télécharger le PDF'"
❌ "Alors la page s'affiche correctement" (non vérifiable objectivement)

### 5. Discipline de périmètre
Un seul **Quand** et un seul **Alors** par story. Plusieurs paires signalent un périmètre trop large.
Utiliser `skills/story-splitting/SKILL.md` pour décomposer.

---

## Connexion au workflow Labster × SIG

Ce skill s'utilise à l'**Étape 1** du master process (`examples/master-process-ia-ux-ui-sig-2026-06-22.md`) :

```
Brief métier (PO)
    ↓  [ce skill] : génère le draft de User Stories + critères d'acceptation
[User Stories + CA]  ← porte ① : PO valide

    ↓  Designer + IA : Intention de design (Étape 2a)
⟳  ITÉRATION US-Design : la frame révèle des US manquantes → retour à ce skill
[Intention de design + US finalisées]  ← porte ②
```

**Prompt de rôle PO** (cf. `CLAUDE.md`) :
```
Tu es PO chez <Client>. Mets au propre ce brief : structure en sections
(Contexte métier, Logique métier, Critères d'acceptation, Cas d'usage).
Pose les questions qui manquent pour le scope V1.0.
NE PAS inventer de règles métier — flag les ambiguïtés.
```

---

## Liens

- `skills/user-story/template.md` — template à compléter
- `skills/user-story/examples/sample.md` — exemples annotés (bonne story, mauvaise story, story à décomposer)
- `skills/story-splitting/SKILL.md` — décomposer les grandes stories en unités livrables *(à créer)*
- `examples/master-process-ia-ux-ui-sig-2026-06-22.md` — workflow complet Brief → US → Design → Code
