# Versioning

Le versioning de ce projet est automatisé par [Release It](https://github.com/release-it/release-it). Il est configuré dans le fichier [.release-it.json](../.release-it.json).

## Types de commits

Les commits doivent respecter le format suivant : `[type](scope): message`. Ce format est conforme au [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) et vérifié en amont par [Commitlint](https://commitlint.js.org/#/) (avec le fichier de configuration [commitlint.config.js](../commitlint.config.js)), qui est exécuté par Husky en amont de chaque commit (voir [.husky/commit-msg](../.husky/commit-msg)).

Exemples de commits acceptés : 
- `feat(login): add login page` 
- `fix(login): fix login page`
- `docs(login): update login page`
- `refactor(login): refactor login page`
- `test(login): add unit tests for login page`
- `chore(login): update dependencies`

Certains commits influent sur le versionning du projet : 
- le `fix`corrige un bug, et incrément le numéro de version de patch
- le `feat` ajoute une fonctionnalité, et incrément le numéro de version de minor

Si un changement de version majeure est nécessaire, il suffit d'ajouter un commit avec le type `BREAKING CHANGE`.
Exemple : 
``` 
feat(login): add login page
BREAKING CHANGE: add Authentification Feature in Application
``` 

## Automatisation des releases

Les releases sont automatisées par [Release It](https://github.com/release-it/release-it). Chaque commit sur la branche `main` génère automatiquement une release sur le repo Github, grâce à l'action [Release](../.github/workflows/release.yml). 

Release It crée le tag, l'archive du projet et la release sur le repo Github. Il ajoute automatiquement un nouveau commit sur la branche `main` sous la forme `chore(release): X.Y.Z` qui intègre les modifications du [CHANGELOG](../CHANGELOG.md) et la version incrémentée du package.json.