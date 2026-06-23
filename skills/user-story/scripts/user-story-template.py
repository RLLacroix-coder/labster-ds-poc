#!/usr/bin/env python3
"""
Générateur de User Stories — Labster DS

Génère une User Story formatée en Markdown depuis les arguments de la ligne de commande.
Format : cas d'usage (En tant que / Je veux / afin de) + critères d'acceptation Gherkin.

Usage :
    python user-story-template.py \\
        --resume "Création de compte en ligne pour les nouveaux clients SIG" \\
        --persona "nouveau client SIG souhaitant gérer ses contrats en ligne" \\
        --action "créer mon espace client depuis le site SIG sans passer par l'agence" \\
        --valeur "pouvoir consulter mes factures et mes contrats à tout moment, sans me déplacer" \\
        --scenario "Création de compte réussie par un nouveau client SIG depuis le web" \\
        --etant-donne "je suis sur la page d'accueil du portail SIG" \\
        --etant-donne "je n'ai pas encore de compte client en ligne" \\
        --quand "je complète le formulaire et je clique sur Valider" \\
        --alors "je reçois un email de confirmation avec un lien d'activation dans les 2 minutes"

Référence : skills/user-story/SKILL.md
"""

import argparse


def normaliser(valeur, placeholder="[À COMPLÉTER]"):
    """Retourne la valeur nettoyée, ou le placeholder si absente."""
    if valeur and valeur.strip():
        return valeur.strip()
    return placeholder


def main():
    parser = argparse.ArgumentParser(
        description="Génère une User Story Markdown au format Labster DS.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--id", help="Identifiant de la story (ex: US-042)", default="")
    parser.add_argument("--resume", help="Titre court centré sur la valeur utilisateur")
    parser.add_argument("--persona", help="Rôle/persona pour la clause 'En tant que'")
    parser.add_argument("--action", help="Action pour la clause 'Je veux'")
    parser.add_argument("--valeur", help="Outcome pour la clause 'afin de'")
    parser.add_argument("--scenario", help="Description lisible du scénario")
    parser.add_argument(
        "--etant-donne",
        action="append",
        dest="etant_donne",
        help="Précondition (répétable pour les 'Et étant donné que')",
    )
    parser.add_argument("--quand", help="Événement déclencheur")
    parser.add_argument("--alors", help="Résultat attendu")

    args = parser.parse_args()

    # Normalisation
    story_id = f" {args.id.strip()}" if args.id and args.id.strip() else ""
    resume = normaliser(args.resume, "User Story")
    persona = normaliser(args.persona)
    action = normaliser(args.action)
    valeur = normaliser(args.valeur)
    scenario = normaliser(args.scenario)
    preconditions = args.etant_donne or []
    quand = normaliser(args.quand)
    alors = normaliser(args.alors)

    # Génération Markdown
    lignes = [
        f"### User Story{story_id} :\n",
        f"- **Résumé :** {resume}\n",
        "",
        "#### Cas d'usage :",
        f"- **En tant que** {persona}",
        f"- **Je veux** {action}",
        f"- **afin de** {valeur}",
        "",
        "#### Critères d'acceptation :",
        f"- **Scénario :** {scenario}",
    ]

    # Préconditions
    for i, precondition in enumerate(preconditions):
        valeur_prec = normaliser(precondition)
        if i == 0:
            lignes.append(f"- **Étant donné que** {valeur_prec}")
        else:
            lignes.append(f"- **Et étant donné que** {valeur_prec}")

    lignes.append(f"- **Quand** {quand}")
    lignes.append(f"- **Alors** {alors}")

    print("\n".join(lignes))


if __name__ == "__main__":
    main()
