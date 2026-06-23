# Template — User Story

Utiliser ce template pour rédiger une User Story avec des critères d'acceptation au format Gherkin.

## Règles d'utilisation

- Un seul **Quand** et un seul **Alors** par story.
- Si plusieurs actions ou outcomes sont nécessaires → décomposer en plusieurs stories (cf. `skills/story-splitting/SKILL.md`).
- Le "afin de" exprime la **valeur pour l'utilisateur**, pas le fonctionnement du système.
- Les préconditions "Et étant donné que" sont optionnelles — en ajouter uniquement si elles sont nécessaires pour comprendre le contexte du scénario.

---

## Template

```markdown
### User Story [ID] :

- **Résumé :** [Titre court centré sur la valeur utilisateur — pas sur l'implémentation]

#### Cas d'usage :
- **En tant que** [nom si connu, sinon persona, sinon rôle]
- **Je veux** [action que l'utilisateur effectue pour atteindre l'outcome]
- **afin de** [outcome souhaité pour l'utilisateur]

#### Critères d'acceptation :
- **Scénario :** [Description courte et lisible du scénario — centrée sur la valeur]
- **Étant donné que** [contexte initial ou précondition]
- **Et étant donné que** [contexte additionnel si nécessaire]
- **Et étant donné que** [contexte UI garantissant que le Quand peut se déclencher]
- **Quand** [événement qui déclenche l'action]
- **Alors** [résultat attendu — aligné sur "afin de"]
```

---

## Notes

| Champ | Ce qu'il faut écrire | Ce qu'il faut éviter |
|---|---|---|
| **En tant que** | Rôle précis : "client SIG sans compte existant" | "utilisateur", "personne", "client" seul |
| **Je veux** | Verbe actif + objet précis : "consulter mon solde" | "voir des infos", "avoir accès à" |
| **afin de** | Valeur utilisateur : "sans devoir appeler le support" | Mécanisme : "pour être authentifié" |
| **Scénario** | Description lisible : "Première connexion d'un client après création de compte" | Copie du résumé ou titre technique |
| **Étant donné que** | État du système ou du contexte : "je suis sur la page d'accueil SIG" | Action de l'utilisateur (à mettre dans Quand) |
| **Quand** | Événement précis, unique : "je clique sur 'Créer mon compte'" | Plusieurs actions chaînées |
| **Alors** | État observable et testable : "je reçois un email de confirmation sous 2 minutes" | "tout fonctionne", "c'est correct" |

---

## Checklist avant livraison

- [ ] Le persona est précis (pas "utilisateur")
- [ ] "Je veux" utilise un verbe actif
- [ ] "afin de" exprime une valeur, pas un mécanisme
- [ ] Il y a exactement un **Quand** et un **Alors**
- [ ] Le **Alors** est vérifiable sans interprétation
- [ ] Le périmètre est faisable en un sprint
