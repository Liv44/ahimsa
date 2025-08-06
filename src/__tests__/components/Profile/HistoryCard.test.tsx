import { renderWithRouter } from '@/__tests__/utils';
import HistoryCard from '@/components/Profile/HistoryCard';
import Discussion from '@/domain/entities/Discussion';
import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'profile-page.history-title': 'Title History',
        'profile-page.history-description': 'Description History',
        'profile-page.loading-spinner': 'Loading...',
      };
      return translations[key];
    },
  }),
}));

const mocks = vi.hoisted(() => ({
  useGetDiscussions: vi.fn(),
}));

vi.mock('@/hooks/discussion/useGetDiscussions', () => ({
  default: mocks.useGetDiscussions,
}));

vi.mock('@/components/Profile/HistoryDiscussionItem', () => ({
  default: ({ discussion }: { discussion: Discussion }) => (
    <div data-testid={'discussion-item-${discussion.id}'}>{discussion.id}</div>
  ),
}));

describe('HistoryCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state when pending and no discussions', () => {
    mocks.useGetDiscussions.mockReturnValue({
      discussions: [],
      isPending: true,
      error: null,
    });

    renderWithRouter(<HistoryCard />);

    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });

  it('renders discussions when loaded', () => {
    const mockDiscussions = [
      {
        id: '1',
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        updatedAt: new Date().toISOString(),
      },
    ];

    mocks.useGetDiscussions.mockReturnValue({
      discussions: mockDiscussions,
      isPending: false,
      error: null,
    });

    renderWithRouter(<HistoryCard />);

    expect(screen.getByTestId('discussion-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('discussion-item-2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders card title and description', () => {
    mocks.useGetDiscussions.mockReturnValue({
      discussions: [],
      isPending: false,
      error: null,
    });

    renderWithRouter(<HistoryCard />);

    expect(screen.getByText('Title History')).toBeInTheDocument();
    expect(screen.getByText('Description History')).toBeInTheDocument();
  });

  it('filters out discussions without updatedAt', () => {
    const mockDiscussions = [
      {
        id: '1',
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        updatedAt: null,
      },
    ];

    mocks.useGetDiscussions.mockReturnValue({
      discussions: mockDiscussions,
      isPending: false,
      error: null,
    });

    renderWithRouter(<HistoryCard />);

    expect(screen.getByTestId('discussion-item-1')).toBeInTheDocument();
    expect(screen.queryByTestId('discussion-item-2')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  it('renders empty state when no discussions', () => {
    mocks.useGetDiscussions.mockReturnValue({
      discussions: [],
      isPending: false,
      error: null,
    });

    renderWithRouter(<HistoryCard />);

    expect(screen.queryByTestId('discussion-item-1')).not.toBeInTheDocument();
  });

  it('has correct card structure', () => {
    mocks.useGetDiscussions.mockReturnValue({
      discussions: [],
      isPending: false,
      error: null,
    });

    renderWithRouter(<HistoryCard />);

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('flex', 'flex-col', 'gap-2', 'p-2', 'md:p-4');
  });
});
