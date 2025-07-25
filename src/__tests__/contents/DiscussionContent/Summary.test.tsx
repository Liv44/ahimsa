import { renderWithRouter } from '@/__tests__/utils';
import Summary from '@/contents/DiscussionContent/Summary';
import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    resetMock: vi.fn(() => ({ resetDiscussion: true })),
    setStateMock: vi.fn(),
    copyTextMock: vi.fn(),
    toastSuccessMock: vi.fn(),
  };
});

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

vi.mock('sonner', () => ({
  toast: { success: mocks.toastSuccessMock },
}));

// Mock the discussion store
vi.mock('@/hooks/discussion/useDiscussionStore', () => ({
  __esModule: true,
  default: () => ({
    discussion: {
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
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: mocks.copyTextMock,
      },
    });
  });
  it('renders summary component with correct text', () => {
    renderWithRouter(<Summary />);
    expect(screen.getByRole('heading')).toHaveTextContent('Title Summary');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('Back Button');
    expect(links[1]).toHaveTextContent('Restart Button');
    expect(links[0]).toHaveAttribute('href', '/discussion/create');
    expect(links[1]).toHaveAttribute('href', '/discussion');

    expect(screen.getByText('"Summary of the discussion"')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAccessibleName('Copy button aria');
  });

  it('calls setState with Discussion.reset() when restart button is clicked', () => {
    renderWithRouter(<Summary />);

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

  it('displays a toast when the copy button is clicked', () => {
    renderWithRouter(<Summary />);

    const copyButton = screen.getByRole('button');
    fireEvent.click(copyButton);
    expect(mocks.copyTextMock).toHaveBeenCalledWith(
      'Summary of the discussion'
    );
    expect(mocks.toastSuccessMock).toHaveBeenCalledWith('Copy toast', {
      duration: 2000,
    });
  });
});
