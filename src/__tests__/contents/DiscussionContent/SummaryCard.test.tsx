import { renderWithRouter } from '@/__tests__/utils';
import SummaryCard from '@/contents/DiscussionContent/SummaryCard';
import Discussion from '@/domain/entities/Discussion';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    resetMock: vi.fn(() => ({ resetDiscussion: true })),
    setStateMock: vi.fn(),
    copyTextMock: vi.fn(),
    toastSuccessMock: vi.fn(),
  };
});

vi.mock('@/components/Discussion/SummaryDiscussion', () => ({
  default: ({ discussion }: { discussion: Discussion }) => (
    <div data-testid={`summary-discussion-${discussion.id}`}></div>
  ),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'discussion-page.summary.title': 'Title Summary',
        'discussion-page.summary.button-back': 'Back Button',
        'discussion-page.summary.button-restart': 'Restart Button',
        'discussion-page.summary.toast-text': 'Copy toast',
        'discussion-page.summary.copy-button-aria': 'Copy button aria',
      };
      return translations[key];
    },
  }),
}));

// Mock the discussion store
vi.mock('@/hooks/discussion/useDiscussionStore', () => ({
  __esModule: true,
  default: () => ({
    discussion: {
      id: '1',
      getSummary: vi.fn(() => 'Summary of the discussion'),
    },
  }),
  discussionStore: { setState: mocks.setStateMock },
}));

// Mock the Discussion entity
vi.mock('@/domain/entities/Discussion', () => ({
  default: {
    reset: mocks.resetMock,
  },
}));

describe('Summary', () => {
  it('renders summary component with correct text', () => {
    renderWithRouter(<SummaryCard />);
    expect(screen.getByRole('heading')).toHaveTextContent('Title Summary');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('Back Button');
    expect(links[1]).toHaveTextContent('Restart Button');
    expect(links[0]).toHaveAttribute('href', '/discussion/create');
    expect(links[1]).toHaveAttribute('href', '/discussion');

    expect(screen.getByTestId('summary-discussion-1')).toBeInTheDocument();
  });

  it('calls setState with Discussion.reset() when restart button is clicked', () => {
    renderWithRouter(<SummaryCard />);

    const restartButton = screen.getByText('Restart Button');
    fireEvent.click(restartButton);

    expect(mocks.resetMock).toHaveBeenCalled();
    expect(mocks.setStateMock).toHaveBeenCalledWith({
      discussion: { resetDiscussion: true },
      isStarted: true,
      isCompleted: false,
      activeStep: 0,
    });
  });
});
