# Manuel de Mise à jour

## 1. Créer une nouvelle branche :

```bash
git switch -c feature/[Issue_Number]-feature-name
```

> Merci de nommer votre branche selon le nom de la fonctionnalité que vous souhaitez implémenter et le numéro de l'issue s'il y en a une.

## 2. Développer la fonctionnalité dans la branche :

### Stack technique

- Frontend : React, Tailwind, TypeScript
- Backend & Base de données : Supabase
- Tests : Vitest et Testing Library
- Qualité & Formatage : ESLint, Prettier, Commitlint
- Automatisation & CI/CD : Husky, GitHub Actions
- Gestion de paquets : Yarn
- Hébergement : Render

### UI

- Composants UI à développer dans le dossier `@/components`
- Création des pages dans le dossiers `@/pages`
- Contenu des pages à développer dans le dossier `@/content`

### Métier

- Entitées à développer dans le dossier `@/domain/entities`
- usecases à développer dans le dossier `@/domain/usecases`

### Infrastructure

- Création des repositories Supabase dans le dossier `@/infrastructure/repositories`
- Si besoin de créer un nouveau service, créez-le dans le dossier `@/infrastructure`
- Ajout des hooks Tanstack dans le dossier `@/hooks`

### Tests et Traductions

- Tests unitaires à développer dans le dossier `@/__tests__`
- Les traductions sont stockées dans le dossier `@/translations`

> Assurez-vous que les tests unitaires passent avant de soumettre votre code. Vous pouvez utiliser la commande `yarn test` pour lancer les tests, puis `yarn coverage` pour générer un rapport de couverture de code.

> Vous pouvez utiliser la commande `yarn lint` pour vérifier la qualité du code.

## 3. Commiter vos modifications :

```bash
git add .
git commit -m "feat(feature-name): modifications"
git push origin feature/[Issue_Number]-feature-name
```

> Des scripts de pré-commit et de commit-msg vérifient automatiquement si les tests et le lint sont corrects.
> Les commits doivent être faits avec les messages de commits de Conventional Commits. Vous pouvez vous référer à la section [Versionning](Versioning.md) pour plus d'informations.

## 4. Ouvrez une pull request basée sur `develop` et demandez une revue de code.
