import { renderWithRouter } from '@/__tests__/utils';
import SummaryDiscussion from '@/components/Discussion/SummaryDiscussion';
import Discussion from '@/domain/entities/Discussion';
import Step, { DiscussionStepKey } from '@/domain/entities/Step';
import { fireEvent, screen } from '@testing-library/dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    copyTextMock: vi.fn(),
    toastSuccessMock: vi.fn(),
  };
});

vi.mock('sonner', () => ({
  toast: { success: mocks.toastSuccessMock },
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'discussion-page.summary.toast-text': 'Copy toast',
        'discussion-page.summary.copy-button-aria': 'Copy button aria',
      };
      return translations[key];
    },
  }),
}));

describe('SummaryDiscussion', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: mocks.copyTextMock,
      },
    });
  });
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
    userId: 'userId',
    completedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  it('should render a summary of the discussion', () => {
    renderWithRouter(<SummaryDiscussion discussion={discussion} />);
    expect(
      screen.getByText('"Observation phrase. Feelings phrase."')
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAccessibleName('Copy button aria');
  });
  it('displays a toast when the copy button is clicked', () => {
    renderWithRouter(<SummaryDiscussion discussion={discussion} />);

    const copyButton = screen.getByRole('button');
    fireEvent.click(copyButton);
    expect(mocks.copyTextMock).toHaveBeenCalledWith(
      'Observation phrase. Feelings phrase.'
    );
    expect(mocks.toastSuccessMock).toHaveBeenCalledWith('Copy toast', {
      duration: 2000,
    });
  });
});
