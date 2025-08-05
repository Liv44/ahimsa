import { renderWithRouter } from '@/__tests__/utils';
import HistoryDeleteDialog from '@/components/Profile/HistoryDeleteDialog';
import Discussion from '@/domain/entities/Discussion';
import Step, { DiscussionStepKey } from '@/domain/entities/Step';
import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  useDeleteDiscussion: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'profile-page.history-delete-dialog.title': 'Title Dialog',
        'profile-page.history-delete-dialog.description': 'Description Dialog',
        'profile-page.history-delete-dialog.back': 'Back',
        'profile-page.history-delete-dialog.delete': 'Delete Button',
      };
      return translations[key];
    },
  }),
}));

vi.mock('@/hooks/discussion/useDeleteDiscussion', () => ({
  useDeleteDiscussion: () => ({
    mutate: mocks.useDeleteDiscussion,
  }),
}));

describe('HistoryDeleteDialog', () => {
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
    renderWithRouter(<HistoryDeleteDialog discussion={discussion} />);

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toBeInTheDocument();

    expect(screen.queryByText('Title Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Description Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  it('renders title and description when clicked', () => {
    renderWithRouter(<HistoryDeleteDialog discussion={discussion} />);
    const button = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(button);

    expect(
      screen.getByRole('heading', { name: 'Title Dialog' })
    ).toBeInTheDocument();
    expect(screen.getByText('Description Dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('hides title and description when click on close button', () => {
    renderWithRouter(<HistoryDeleteDialog discussion={discussion} />);
    const openButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(openButton);
    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    expect(screen.queryByText('Title Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Description Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  it('should delete the discussion and close the dialog', () => {
    renderWithRouter(<HistoryDeleteDialog discussion={discussion} />);
    const openButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(openButton);
    const deleteButton = screen.getByRole('button', { name: 'Delete Button' });
    fireEvent.click(deleteButton);

    expect(mocks.useDeleteDiscussion).toHaveBeenCalledWith(discussion);
    expect(screen.queryByText('Title Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Description Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });
});
