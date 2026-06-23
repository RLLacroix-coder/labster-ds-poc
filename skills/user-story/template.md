# Template — User Story

Utiliser ce template pour rédiger une User Story lisible par le PO et prête à exporter vers Azure DevOps.

## Règles d'utilisation

- Un seul **Quand** et un seul **Alors** par story. Si plusieurs → décomposer (cf. `skills/story-splitting/SKILL.md`).
- Le "afin de" exprime la **valeur pour l'utilisateur**, pas le fonctionnement du système.
- La **Vue d'ensemble** est obligatoire : c'est ce que le PO lit en premier pour valider le sens.
- Les **Métadonnées ADO** sont à renseigner avant l'export — elles ne ralentissent pas la rédaction, elles la finalisent.

---

## Template

```markdown
### User Story [ID] :

**Vue d'ensemble :**
> [Une phrase en langage courant : Qui veut Quoi, et pourquoi c'est utile.]
> Exemple : "Un nouveau client SIG veut créer son compte en ligne pour gérer ses factures
> sans avoir à se déplacer en agence."

- **Résumé :** [Titre court centré sur la valeur — max 255 caractères]

---

#### Cas d'usage :
- **En tant que** [nom si connu · sinon persona · sinon rôle]
- **Je veux** [action que l'utilisateur effectue pour atteindre l'outcome]
- **afin de** [outcome souhaité pour l'utilisateur]

---

#### Critères d'acceptation :
- **Scénario :** [Description lisible du scénario en une phrase]
- **Étant donné que** [contexte initial ou précondition]
- **Et étant donné que** [contexte additionnel si nécessaire]
- **Et étant donné que** [contexte UI garantissant que le Quand peut se déclencher]
- **Quand** [événement déclencheur — unique]
- **Alors** [résultat attendu — observable et vérifiable sans interprétation]

---

#### Métadonnées Azure DevOps :
- **Priorité :** [1 = Critique · 2 = Haute · 3 = Moyenne · 4 = Basse]
- **Points :** [estimation en story points · laisser vide si non estimée]
- **Itération :** [ex : SIG\Sprint 3]
- **Zone :** [ex : SIG\Portail client]
- **Assigné à :** [PO responsable de la story]
- **Tags :** [mots-clés séparés par des virgules · ex : portail-client, création-compte, self-service]
```

---

## Guide des champs

| Champ | Ce qu'il faut écrire | Ce qu'il faut éviter |
|---|---|---|
| **Vue d'ensemble** | 1 phrase en français courant, lisible par n'importe qui | Jargon technique, acronymes non expliqués |
| **Résumé** | "Création de compte en ligne — nouveaux clients SIG" | "Implémenter le flux d'onboarding" |
| **En tant que** | Rôle précis : "client SIG sans compte existant" | "utilisateur", "personne", "client" seul |
| **Je veux** | Verbe actif + objet précis : "consulter mon solde" | "voir des infos", "avoir accès à" |
| **afin de** | Valeur : "sans devoir appeler le support" | Mécanisme : "pour être authentifié" |
| **Scénario** | "Première connexion d'un client après création de compte" | Copie du Résumé ou titre technique |
| **Étant donné que** | État du système : "je suis sur la page d'accueil SIG" | Action (à mettre dans Quand) |
| **Quand** | Événement précis, unique : "je clique sur 'Créer mon compte'" | Plusieurs actions chaînées |
| **Alors** | État observable : "je reçois un email de confirmation sous 2 minutes" | "tout fonctionne", "c'est correct" |
| **Priorité ADO** | 2 pour la plupart des stories. 1 si bloquant pour le sprint. | Mettre tout en Critique — perd sa signification |
| **Tags ADO** | Fonctionnalité + persona + sprint si utile | Acronymes internes non partagés |

---

## Checklist avant export Azure DevOps

**Relecture PO (lisibilité) :**
- [ ] La Vue d'ensemble est compréhensible sans contexte technique
- [ ] Le persona est précis et nommé
- [ ] "Je veux" utilise un verbe actif
- [ ] "afin de" exprime une valeur métier, pas un mécanisme technique
- [ ] La story tient en un sprint

**Relecture équipe (testabilité) :**
- [ ] Il y a exactement un Quand et un Alors
- [ ] Le Alors est vérifiable par un testeur sans interprétation
- [ ] Les préconditions "Étant donné que" sont nécessaires et suffisantes

**Avant export ADO :**
- [ ] Priorité renseignée
- [ ] Itération assignée
- [ ] Tags renseignés
- [ ] Résumé ≤ 255 caractères (titre ADO)
- [ ] Exporter via `/ado-create-story` (cf. `SKILL.md` — Étape 6)
