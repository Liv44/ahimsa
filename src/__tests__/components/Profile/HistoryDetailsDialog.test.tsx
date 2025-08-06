import { renderWithRouter } from '@/__tests__/utils';
import HistoryDetailsDialog from '@/components/Profile/HistoryDetailsDialog';
import Discussion from '@/domain/entities/Discussion';
import Step, { DiscussionStepKey } from '@/domain/entities/Step';
import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'profile-page.history-details-dialog.title': 'Title Dialog',
        'profile-page.history-details-dialog.description': 'Description Dialog',
        'profile-page.history-details-dialog.back': 'Back',
      };
      return translations[key];
    },
  }),
}));

vi.mock('@/components/Discussion/SummaryDiscussion', () => ({
  default: ({ discussion }: { discussion: Discussion }) => (
    <div data-testid={`history-delete-dialog-${discussion.id}`}></div>
  ),
}));

describe('HistoryDetailsDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
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

  it('renders only button when not active', () => {
    renderWithRouter(<HistoryDetailsDialog discussion={discussion} />);

    const button = screen.getByRole('button', { name: 'View' });
    expect(button).toBeInTheDocument();

    expect(screen.queryByText('Title Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Description Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  it('renders title and description when clicked', () => {
    renderWithRouter(<HistoryDetailsDialog discussion={discussion} />);
    const button = screen.getByRole('button', { name: 'View' });
    fireEvent.click(button);

    expect(
      screen.getByRole('heading', { name: 'Title Dialog' })
    ).toBeInTheDocument();
    expect(screen.getByText('Description Dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('hides title and description when click on close button', () => {
    renderWithRouter(<HistoryDetailsDialog discussion={discussion} />);
    const openButton = screen.getByRole('button', { name: 'View' });
    fireEvent.click(openButton);
    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    expect(screen.queryByText('Title Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Description Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });
});
