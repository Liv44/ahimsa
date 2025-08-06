import { renderWithRouter } from '@/__tests__/utils';
import Introduction from '@/contents/DiscussionContent/Introduction';
import Discussion from '@/domain/entities/Discussion';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    setStateMock: vi.fn(),
  };
});

vi.mock('@/hooks/discussion/useDiscussionStore', () => ({
  __esModule: true,
  default: () => ({ discussion: { resetDiscussion: mocks.setStateMock } }),
  discussionStore: { setState: mocks.setStateMock },
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'discussion-page.example.examples': ['example 1', 'example 2'],
        'discussion-page.example.title': 'Title Examples',
        'discussion-page.description': 'Description',
        'discussion-page.button-start': 'Start',
      };
      return translations[key];
    },
  }),
}));

describe('Introduction', () => {
  it('renders component with correct trads', () => {
    renderWithRouter(<Introduction />);
    expect(screen.getByRole('heading')).toHaveTextContent('Title Examples');
    expect(screen.getByText('Description')).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveTextContent('Start');

    const examples = screen.getAllByRole('listitem');
    expect(examples).toHaveLength(2);
    expect(examples[0]).toHaveTextContent('example 1');
    expect(examples[1]).toHaveTextContent('example 2');
  });

  it('calls setState with Discussion.reset() when start button is clicked', () => {
    renderWithRouter(<Introduction />);

    const startButton = screen.getByRole('link');
    expect(startButton).toHaveTextContent('Start');
    fireEvent.click(startButton);

    // Vérifier que setState a été appelé
    expect(mocks.setStateMock).toHaveBeenCalledTimes(1);

    // Récupérer l'argument passé à setState
    const setStateCall = mocks.setStateMock.mock.calls[0][0];

    // Vérifier les propriétés attendues
    expect(setStateCall).toMatchObject({
      isStarted: true,
      isCompleted: false,
      activeStep: 0,
    });

    expect(setStateCall.discussion).toBeInstanceOf(Discussion);

    const discussion = setStateCall.discussion as Discussion;
    const steps = discussion.steps;
    expect(steps).toHaveLength(4);

    steps.forEach((step) => {
      expect(step.content).toBe('');
      expect(step.createdAt).toBeInstanceOf(Date);
      expect(step.updatedAt).toBeInstanceOf(Date);
    });
  });
});
