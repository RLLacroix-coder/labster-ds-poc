# Skill — Rédaction de User Stories

Ce skill traduit un besoin métier en User Stories structurées avec des critères d'acceptation testables (format Gherkin). Il correspond à l'**Étape 1** du workflow de production de feature décrit dans `CLAUDE.md`.

## Processus en 6 étapes

### 1. Collecter le contexte
- Identifier le persona précis (éviter "En tant qu'utilisateur")
- Comprendre le problème que l'utilisateur cherche à résoudre
- Identifier l'outcome souhaité
- Noter les contraintes (UX, métier, technique, légal)

### 2. Écrire la Vue d'ensemble (pour le PO)
Avant tout le reste, rédiger **une phrase en langage courant** accessible à tous :
> "[Qui] veut [quoi], pour [pourquoi c'est utile]."

Cette phrase est ce que le PO lit en premier pour valider le sens. Elle devient aussi le contexte que le Designer lit avant de générer l'intention de design.

### 3. Rédiger le cas d'usage
Compléter ce template avec précision :
- **En tant que** [persona/rôle] — nommer des rôles précis si disponibles
- **Je veux** [action que l'utilisateur effectue]
- **afin de** [outcome souhaité pour l'utilisateur]

### 4. Rédiger les critères d'acceptation
Format Gherkin — écrire en français courant, pas en langage technique :
- **Scénario :** [description lisible de la valeur]
- **Étant donné que** [préconditions]
- **Et étant donné que** [préconditions additionnelles]
- **Quand** [événement déclencheur]
- **Alors** [résultat attendu, aligné sur "afin de"]

### 5. Valider et affiner
- Réviser avec l'équipe (PO + Designer en itération US-Design, cf. Étape 2a)
- Vérifier la clarté : le persona est-il précis ?
- Vérifier la complétude : le "afin de" explique-t-il la valeur, pas le mécanisme ?
- Vérifier le périmètre : un seul Quand/Alors ?
- Vérifier la lisibilité PO : la Vue d'ensemble est-elle compréhensible sans contexte technique ?

### 6. Exporter vers Azure DevOps
Une fois la story validée à la porte ①, exporter vers ADO via le skill `ado-create-story` :

```
/ado-create-story
```

**Prérequis avant l'export :**
- Avoir un **ID de Feature parent** dans ADO (ex : `Feature #142 — Portail client self-service`). Le skill crée la story comme Work Item *enfant* de cette Feature — sans Feature ID, l'export échoue.
- La section `## Azure DevOps` de `CLAUDE.md` doit être configurée (org, project, team, area path, iteration path).

**Correspondance champs US → Work Item ADO :**

| Champ User Story | Champ Azure DevOps | Chemin technique |
|---|---|---|
| Résumé | Title | `System.Title` (max 255 car.) |
| Vue d'ensemble + Cas d'usage | Description | `System.Description` (HTML) |
| Critères d'acceptation | Acceptance Criteria | `Microsoft.VSTS.Common.AcceptanceCriteria` |
| Priorité | Priority | `Microsoft.VSTS.Common.Priority` (1-4) |
| Points | Story Points | `Microsoft.VSTS.Scheduling.StoryPoints` |
| Itération | Iteration Path | `System.IterationPath` (ex : `SIG\Sprint 3`) |
| Zone | Area Path | `System.AreaPath` (ex : `SIG\Portail client`) |
| Tags | Tags | `System.Tags` (séparés par `;`) |

**Modes disponibles :**
- **AI-powered** : le skill génère title, description, critères depuis la story — à valider avant création.
- **Manuel** : saisie champ par champ.

Le Work Item créé est de type **User Story** et devient visible par toute l'équipe (POs, Designers, Développeurs, Testeurs) dans le board ADO du projet.

Résultat : lien direct `https://dev.azure.com/[ORG]/[PROJECT]/_workitems/edit/[ID]`.

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
    ↓  [ce skill] : génère le draft de User Stories + Vue d'ensemble + critères d'acceptation
[User Stories + CA]  ← porte ① : PO valide (lisibilité : Vue d'ensemble · testabilité : Alors)
    ↓  [étape 6 de ce skill] : export vers Azure DevOps via /ado-create-story
[Work Items ADO créés — visibles PO · Designer · Dev · Testeurs]

    ↓  Designer + IA : Intention de design (Étape 2a)
⟳  ITÉRATION US-Design : la frame révèle des US manquantes → retour à ce skill
[Intention de design + US finalisées]  ← porte ②
    ↓  mise à jour des Work Items ADO si les US évoluent
```

**Prompt de rôle PO** (cf. `CLAUDE.md`) :
```
Tu es PO chez <Client>. Mets au propre ce brief : structure en sections
(Contexte métier, Logique métier, Critères d'acceptation, Cas d'usage).
Pose les questions qui manquent pour le scope V1.0.
NE PAS inventer de règles métier — flag les ambiguïtés.
Pour chaque User Story : rédige d'abord la Vue d'ensemble en une phrase
avant le cas d'usage et les critères d'acceptation.
```

---

## Lisibilité pour les POs non techniques

Les User Stories générées par ce skill sont structurées pour être lisibles à deux niveaux :

**Niveau 1 — Vue d'ensemble** (pour le PO en relecture rapide)
Une phrase en langage courant. Pas de jargon, pas de format Gherkin. Le PO peut valider le sens en 5 secondes.

**Niveau 2 — Critères d'acceptation Gherkin** (pour les Testeurs et Développeurs)
Format structuré permettant une vérification objective. Rédigé en français courant même s'il suit la structure Étant donné que / Quand / Alors.

Les deux niveaux coexistent dans le même document et dans le même Work Item ADO (Vue d'ensemble dans Description, Gherkin dans Acceptance Criteria).

---

## Liens

- `skills/user-story/template.md` — template complet (Vue d'ensemble + Gherkin + Métadonnées ADO)
- `skills/user-story/examples/sample.md` — exemples annotés (bonne story, mauvaise story, story à décomposer)
- `skills/story-splitting/SKILL.md` — décomposer les grandes stories en unités livrables *(à créer)*
- `examples/master-process-ia-ux-ui-sig-2026-06-22.md` — workflow complet Brief → US → Design → Code
- [ado-create-story](https://app.mcpmarket.com/rla-rlacroix/skills/ado-create-story) — skill d'export Azure DevOps
