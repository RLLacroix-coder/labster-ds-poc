# Exemples — User Stories

Trois exemples dans le contexte SIG (Services Industriels de Genève) :
1. Bonne story ✅
2. Mauvaise story ❌ avec corrections
3. Story à décomposer ✂

---

## Exemple 1 : Bonne User Story ✅

```markdown
### User Story 042 :

- **Résumé :** Permettre la création de compte en ligne pour les nouveaux clients SIG

#### Cas d'usage :
- **En tant que** nouveau client SIG souhaitant gérer ses contrats en ligne
- **Je veux** créer mon espace client depuis le site SIG sans passer par l'agence
- **afin de** pouvoir consulter mes factures et mes contrats à tout moment, sans me déplacer

#### Critères d'acceptation :
- **Scénario :** Création de compte réussie par un nouveau client SIG depuis le web
- **Étant donné que** je suis sur la page d'accueil du portail SIG
- **Et étant donné que** je n'ai pas encore de compte client en ligne
- **Et étant donné que** le bouton "Créer mon compte" est visible
- **Quand** je complète le formulaire de création (nom, prénom, adresse, numéro de contrat) et je clique sur "Valider"
- **Alors** je reçois un email de confirmation avec un lien d'activation dans les 2 minutes
```

**Pourquoi ça fonctionne :**
- Persona précis ("nouveau client SIG souhaitant gérer ses contrats en ligne")
- Action claire et unique ("créer mon espace client")
- Valeur explicitée ("sans me déplacer") — pas le mécanisme
- Critères testables par le QA (email dans les 2 min, lien d'activation)
- Un seul Quand, un seul Alors

---

## Exemple 2 : Mauvaise User Story ❌

```markdown
### User Story 999 :

- **Résumé :** Améliorer le processus d'inscription

#### Cas d'usage :
- **En tant qu'** utilisateur
- **Je veux** mieux m'inscrire
- **afin de** pouvoir utiliser le site

#### Critères d'acceptation :
- **Scénario :** L'utilisateur s'inscrit
- **Étant donné que** je veux créer un compte
- **Quand** je m'inscris
- **Alors** ça marche mieux
```

**Pourquoi ça échoue :**
- "utilisateur" est trop générique (nouveau client ? client existant ? agent SIG ?)
- "mieux m'inscrire" n'est pas une action — qu'est-ce qui est meilleur, et comment ?
- "utiliser le site" n'est pas un outcome spécifique
- "ça marche mieux" est impossible à tester par le QA

**Comment la corriger :**

| Champ | ❌ Avant | ✅ Après |
|---|---|---|
| Persona | "utilisateur" | "nouveau client SIG sans compte existant" |
| Action | "mieux m'inscrire" | "créer mon compte avec mon numéro de contrat SIG" |
| Valeur | "utiliser le site" | "sans devoir appeler le support pour activer l'accès" |
| Alors | "ça marche mieux" | "mon compte est actif et je suis redirigé vers mon tableau de bord" |

---

## Exemple 3 : Story à décomposer ✂

```markdown
### User Story 100 :

- **Résumé :** Gérer son espace client SIG

#### Cas d'usage :
- **En tant que** client SIG connecté
- **Je veux** consulter mes factures, modifier mon adresse, changer mon IBAN, déclarer une panne et contacter le support
- **afin de** gérer tous mes contrats SIG au même endroit

#### Critères d'acceptation :
- **Scénario :** Gestion de l'espace client
- **Étant donné que** je suis connecté à mon espace client
- **Quand** je consulte mes factures
- **Alors** je les vois
- **Quand** je modifie mon adresse
- **Alors** elle est mise à jour
- **Quand** je déclare une panne
- **Alors** un ticket est créé
- **Quand** je contacte le support
- **Alors** je reçois une réponse
```

**Pourquoi il faut la décomposer :**
- Cinq "Quand" = cinq stories distinctes
- Périmètre trop large pour un sprint
- Les outcomes sont sans lien entre eux (consulter une facture ≠ déclarer une panne)
- Impossible à estimer ou à prioriser unitairement

**Comment la décomposer :**

```
US 100a — Consultation de factures
  En tant que client SIG connecté
  Je veux consulter la liste de mes factures des 24 derniers mois
  afin de vérifier mes consommations sans contacter le support

US 100b — Modification d'adresse postale
  En tant que client SIG ayant déménagé
  Je veux mettre à jour mon adresse de livraison dans mon espace client
  afin que mes prochains courriers arrivent à ma nouvelle adresse

US 100c — Changement de RIB / IBAN
  En tant que client SIG en prélèvement automatique
  Je veux modifier mon IBAN dans mon espace client
  afin que mes prochains prélèvements soient débités sur mon nouveau compte

US 100d — Déclaration de panne
  En tant que client SIG constatant une interruption de service
  Je veux déclarer une panne depuis mon espace client
  afin d'être informé de l'avancement de l'intervention sans avoir à rappeler

US 100e — Contact support
  En tant que client SIG ayant une question non résolue en self-service
  Je veux envoyer un message au support depuis mon espace client
  afin de ne pas devoir retrouver un numéro de téléphone ou une adresse email
```

Chaque story devient un item de backlog indépendant, estimable, et livrable séparément.

---

## Référence rapide

| Signal | Diagnostic | Action |
|---|---|---|
| Persona = "utilisateur" ou "client" seul | Persona trop générique | Préciser le contexte : "client sans compte", "agent de niveau 2", "sponsor SIG" |
| "afin de" = mécanisme technique | Valeur absente | Demander "pourquoi c'est utile pour lui ?" |
| Plusieurs "Quand" dans les CA | Story trop large | Décomposer (1 Quand = 1 story) |
| "Alors" non testable | Critère vague | Reformuler avec un état observable et mesurable |
| "Je veux" = liste de fonctionnalités | Spécification déguisée | Reprendre depuis le besoin utilisateur, pas depuis la solution |
