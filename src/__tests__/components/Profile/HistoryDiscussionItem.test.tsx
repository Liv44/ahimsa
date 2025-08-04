import { renderWithRouter } from '@/__tests__/utils';
import HistoryDiscussionItem from '@/components/Profile/HistoryDiscussionItem';
import Discussion from '@/domain/entities/Discussion';
import Step, { DiscussionStepKey } from '@/domain/entities/Step';
import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  useGetDiscussions: vi.fn(),
}));

vi.mock('@/hooks/discussion/useGetDiscussions', () => ({
  default: mocks.useGetDiscussions,
}));

describe('HistoryDiscussionItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title and description', () => {
    const date = new Date('2023-02-01');
    const discussion = new Discussion({
      id: '1',
      steps: [
        new Step({
          id: '1',
          discussionId: '1',
          key: DiscussionStepKey.OBSERVATION,
          content: 'Observation phrase',
        }),
        new Step({
          id: '2',
          discussionId: '1',
          key: DiscussionStepKey.FEELINGS,
          content: 'Feelings phrase',
        }),
      ],
      updatedAt: date,
      createdAt: date,
      userId: 'userId',
    });
    console.log(discussion.getPreview());

    renderWithRouter(<HistoryDiscussionItem discussion={discussion} />);

    expect(screen.getByText('01/02/2023')).toBeInTheDocument();

    expect(
      screen.getByText('"Observation phrase. Feelings phrase."')
    ).toBeInTheDocument();
  });
});
