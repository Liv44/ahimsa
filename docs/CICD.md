# CI/CD Documentation

Pour ce projet, nous utilisons GitHub Actions pour automatiser les tests et le déploiement du code.

## Workflows

### CI - Pull-Requests

Le workflow [Pull-Requests CI](./.github/workflows/pull-requests-ci.yml) est utilisé pour automatiser les tests du code. Il est déclenché lorsque une pull-request est créée ou modifiée, sur les branches `main` et `develop`.

Le template de workflow [CI Template](./.github/workflows/ci-template.yml) est utilisé pour automatiser les tests du code.
Le template de workflow [Lighthouse Template](./.github/workflows/lighthouse-template.yml) est utilisé pour automatiser les tests de Lighthouse.

### CD - Deploy to Staging

Le workflow [DeployStagin](./.github/workflows/deploy-staging.yml) est utilisé pour déployer le code en staging. Il est déclenché lorsqu'un commit est push sur la branche `develop`. Il intègre les workflows [CI Template](./.github/workflows/ci-template.yml) et actionne le job deploy-staging qui utilise un hook Render.

### CD - Deploy to Production

Le workflow [DeployProduction](./.github/workflows/deploy-production.yml) est utilisé pour déployer le code en production. Il est déclenché lorsqu'un commit est push sur la branche `main`. Il intègre les workflows [CI Template](./.github/workflows/ci-template.yml) et actionne le job deploy-production qui utilise un hook Render. Enfin, il intègre le workflow [Release](./.github/workflows/release.yml) qui génère une release sur le repo Github, qui permet aussi de mettre à jour le [CHANGELOG](./CHANGELOG.md) et les nouvelles versions de l'application.

## Actions

### CI Template

Le template de workflow [CI Template](./.github/workflows/ci-template.yml) est utilisé pour automatiser les tests du code.

### Lighthouse Template

Le template de workflow [Lighthouse Template](./.github/workflows/lighthouse-template.yml) est utilisé pour automatiser les tests de Lighthouse.