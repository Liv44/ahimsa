# Guide de contribution

Merci de votre intérêt pour contribuer à Ahimsa ! Ce guide vous aidera à démarrer.

## Prérequis

- Node.js et Yarn installés sur votre machine.
- Forkez ce dépôt et clonez-le localement.

## Installation

1. Installez les dépendances pour le frontend et le backend :
   ```bash
   cd frontend
   yarn install
   cd ../backend
   yarn install
   ```

2. Assurez-vous que tout fonctionne localement avant de proposer des modifications.

## Règles de codage

- Respectez la structure du projet.
- Utilisez les commandes de lint et de formatage avant de soumettre une PR :
  ```bash
  cd frontend
  yarn lint:fix
  yarn prettier:fix
  cd ../backend
  yarn lint
  yarn format
  ```
- Les hooks Husky s’exécutent automatiquement lors des commits pour garantir la qualité du code.

## Convention de commits

Merci de respecter la convention [Conventional Commits](https://www.conventionalcommits.org/fr/v1.0.0/) pour vos messages de commit. Cela permet d’assurer une meilleure lisibilité de l’historique et d’automatiser la génération du changelog.

**Format :**
<type>(scope): sujet du changement

Exemples :
- feat(featureName): ajout de la page d’accueil
- fix(fixName): correction du bug d’authentification
- docs: mise à jour du README

Types courants :
- feat : ajout d’une nouvelle fonctionnalité
- fix : correction de bug
- docs : documentation uniquement
- style : changements de formatage, pas de code
- refactor : refactorisation du code sans ajout de fonctionnalité ni correction de bug
- test : ajout ou correction de tests
- chore : tâches diverses (build, outils, etc.)

Le scope (optionnel) précise la partie concernée (ex : Login, Dashboard, CI).

Le sujet doit être court, à l’infinitif, sans majuscule initiale ni point final.

