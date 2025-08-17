# Unit Tests

L'application est testée en utilisant Vitest et React Testing Library.

Les commandes pour lancer les tests sont :

```bash
yarn test
```

```bash
yarn coverage
```

## Layout et Landing Page

### Composants

- [Layout.test.tsx](../src/__tests__/components/Layout/Layout.test.tsx)
- [LayoutLink.test.tsx](../src/__tests__/components/Layout/LayoutLink.test.tsx)

### Contenu

- [ContentBlock.test.tsx](../src/__tests__/contents/LandingContent/ContentBlock.test.tsx)
- [LandingContent.test.tsx](../src/__tests__/contents/LandingContent/LandingContent.test.tsx)
- [MethodCard.test.tsx](../src/__tests__/contents/LandingContent/MethodCard.test.tsx)

## Discussion

### Composants

- [SummaryDiscussion.test.tsx](../src/__tests__/components/Discussion/SummaryDiscussion.test.tsx)
- [WordCategorySection.test.tsx](../src/__tests__/components/Discussion/WordCategorySection.test.tsx)
- [WordSelectionModal.test.tsx](../src/__tests__/components/Discussion/WordSelectionModal.test.tsx)

### Contenu

- [DiscussionStepsAccordion.test.tsx](../src/__tests__/contents/DiscussionContent/DiscussionStepsAccordion.test.tsx)
- [Introduction.test.tsx](../src/__tests__/contents/DiscussionContent/Introduction.test.tsx)
- [SummaryCard.test.tsx](../src/__tests__/contents/DiscussionContent/SummaryCard.test.tsx)

### Besoins et sentiments

- [FeelingCard.test.tsx](../src/__tests__/contents/FeelingsAndNeedContent/FeelingCard.test.tsx)
- [FeelingCategory.test.tsx](../src/__tests__/contents/FeelingsAndNeedContent/FeelingCategory.test.tsx)
- [NeedsAndFeelingsContent.test.tsx](../src/__tests__/contents/FeelingsAndNeedContent/NeedsAndFeelingsContent.test.tsx)

### Domaine métier

#### Entités

- [Discussion.test.ts](../src/__tests__/domain/entities/Discussion.test.ts)
- [SelectableWord.test.ts](../src/__tests__/domain/entities/SelectableWord.test.ts)
- [Step.test.ts](../src/__tests__/domain/entities/Step.test.ts)
- [WordCollection.test.ts](../src/__tests__/domain/entities/WordCollection.test.ts)

#### Cas d'usage

- [completeAndSaveDiscussion.test.ts](../src/__tests__/domain/usecases/discussion/completeAndSaveDiscussion.test.ts)
- [deleteDiscussion.test.ts](../src/__tests__/domain/usecases/discussion/deleteDiscussion.test.ts)
- [getAllDiscussions.test.ts](../src/__tests__/domain/usecases/discussion/getAllDiscussions.test.ts)

#### Infrastructure

- [Discussion.mappers.test.ts](../src/__tests__/infrastructure/mappers/Discussion.mappers.test.ts)
- [Step.mappers.test.ts](../src/__tests__/infrastructure/mappers/Step.mappers.test.ts)

## Connexion

### Composants

- [AuthForm.test.tsx](../src/__tests__/components/Auth/AuthForm.test.tsx)

### Contenu

- [LoginContent.test.tsx](../src/__tests__/contents/Connexion/LoginContent.test.tsx)
- [RegisterContent.test.tsx](../src/__tests__/contents/Connexion/RegisterContent.test.tsx)

### Hooks

- [useAuth.test.tsx](../src/__tests__/hooks/useAuth.test.tsx)

## Profil

### Composants

- [HistoryCard.test.tsx](../src/__tests__/components/Profile/HistoryCard.test.tsx)
- [HistoryDeleteDialog.test.tsx](../src/__tests__/components/Profile/HistoryDeleteDialog.test.tsx)
- [HistoryDetailsDialog.test.tsx](../src/__tests__/components/Profile/HistoryDetailsDialog.test.tsx)
- [HistoryDiscussionItem.test.tsx](../src/__tests__/components/Profile/HistoryDiscussionItem.test.tsx)

### Contenu

- [ProfileContent.test.tsx](../src/__tests__/contents/ProfileContent/ProfileContent.test.tsx)

## Mocks

### Mocks

- [supabaseDiscussionRepository.mock.ts](../src/__tests__/mocks/supabaseDiscussionRepository.mock.ts)
