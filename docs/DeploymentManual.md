# Manuel de déploiement - Ahimsa

Le déploiement est automatisé par GitHub Actions, qui lance un webhook de Render lorsque les branches `develop` ou `main` sont modifiées.

## Procédures de déploiement

### Déploiement en staging

1. Ouvrir une Pull Request sur la branche `develop`.
2. Une fois la PR approuvée et mergée, le déploiement se déclenche automatiquement.
3. Le déploiement est effectué en utilisant le workflow [.github/workflows/deploy-staging.yml](../.github/workflows/deploy-staging.yml).
4. Sur le Dashboard de Render, vous pouvez voir les logs de déploiement.

### Déploiement en production

1. Ouvrir une Pull Request sur la branche `main`.
2. Nommez la Pull Request `MEP - [01/01/2025]`
3. Vérifiez que les commits comprennent bien des messages de commits avec Conventional Commits.
4. Une fois la PR approuvée et mergée, le déploiement se déclenche automatiquement.
5. Le déploiement est effectué en utilisant le workflow [.github/workflows/deploy-production.yml](../.github/workflows/deploy-production.yml).
6. Sur le Dashboard de Render, vous pouvez voir les logs de déploiement.

> Le versionnement de l'application est automatiquement géré par le workflow de déploiement. Vous pouvez vous référer à la section [Versionning](Versioning.md) pour plus d'informations.
