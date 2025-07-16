import DiscussionStepsAccordion from '@/contents/DiscussionContent/DiscussionStepsAccordion';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach } from 'node:test';
import { describe, expect, it, vi } from 'vitest';

// - MOCKS -
const mocks = vi.hoisted(() => {
  return {
    setStateMock: vi.fn(),
    navigateMock: vi.fn(),
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: (namespace?: string) => {
    if (!namespace) {
      return {
        t: (key: string) => {
          const translations: Record<string, unknown> = {
            'discussion-page.step.observation.title': 'Step 1',
            'discussion-page.step.feelings.title': 'Step 2',
            'discussion-page.step.observation.description':
              'Description step 1',
            'discussion-page.step.feelings.description': 'Description step 2',
            'discussion-page.step.observation.label': 'Label step 1',
            'discussion-page.step.feelings.label': 'Label step 2',
            'discussion-page.step.observation.placeholder':
              'Placeholder step 1',
            'discussion-page.step.feelings.placeholder': 'Placeholder step 2',
            'discussion-page.step.observation.aria-label': 'Aria step 1',
            'discussion-page.step.feelings.aria-label': 'Aria step 2',
            'discussion-page.step.button-next': 'Next Button',
            'discussion-page.step.button-next-aria': 'Next Button Aria',
            'discussion-page.step.button-finish-aria': 'Final Button Aria',
            'discussion-page.step.button-finish': 'Final Button',
            'discussion-page.step.modal.title': 'Choose words',
            'discussion-page.step.error': 'Field is required',
          };
          return translations[key];
        },
      };
    }
    return {
      t: (key: string, options?: { returnObjects: boolean }) => {
        if (options?.returnObjects) {
          return [
            { category: 'category1', content: 'word1' },
            { category: 'category1', content: 'word2' },
            { category: 'category2', content: 'word1' },
            { category: 'category2', content: 'word2' },
          ];
        }
        return key;
      },
    };
  },
}));

const stepsMock = [
  {
    key: 'observation',
    content: '',
    updateContent: vi.fn(),
    complete: vi.fn(),
  },
  {
    key: 'feelings',
    content: '',
    updateContent: vi.fn(),
    complete: vi.fn(),
  },
];

vi.mock('@/domain/usecases/discussion/useDiscussionStore', () => ({
  __esModule: true,
  default: () => ({ discussion: { steps: stepsMock } }),
  discussionStore: { setState: mocks.setStateMock },
}));

// - HELPERS -

const fillTextArea = (text: string) => {
  const textarea = screen.getByRole('textbox');
  fireEvent.change(textarea, { target: { value: text } });
};

const clickButton = (name: string) => {
  fireEvent.click(screen.getByRole('button', { name }));
};

const getLastSetStateResult = (initialState: unknown) => {
  const fn = mocks.setStateMock.mock.calls.at(-1)?.[0];
  return fn?.(initialState);
};

// - TESTS -
describe('DiscussionStepsAccordion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('Displays first step with correct elements', () => {
    render(<DiscussionStepsAccordion />);

    // Check Buttons
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(3);

    expect(buttons[0]).toHaveTextContent('1. Step 1');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');

    expect(buttons[1]).toHaveTextContent('Next Button');
    expect(buttons[1]).toHaveAccessibleName('Next Button Aria');

    expect(buttons[2]).toHaveTextContent('Step 2');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    // Check textArea and label

    expect(screen.getByText('Description step 1')).toBeInTheDocument();
    const label = screen.getByText('Label step 1');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'observation');

    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveAttribute('id', 'observation');
    expect(textArea).toHaveAttribute('name', 'observation');
    expect(textArea).toHaveAttribute('placeholder', 'Placeholder step 1');
    expect(textArea).toHaveAccessibleName('Aria step 1');
  });

  it('hides all steps when clicking on first step', () => {
    render(<DiscussionStepsAccordion />);

    clickButton('1. Step 1');

    const buttonsAllStepsHidden = screen.getAllByRole('button');

    expect(buttonsAllStepsHidden).toHaveLength(2);
    expect(buttonsAllStepsHidden[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttonsAllStepsHidden[1]).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows next step when clicking on next button', () => {
    render(<DiscussionStepsAccordion />);

    fillTextArea('Text');

    clickButton('Next Button Aria');

    const buttonsStep2Visible = screen.getAllByRole('button');
    expect(buttonsStep2Visible).toHaveLength(4);
    expect(buttonsStep2Visible[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttonsStep2Visible[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttonsStep2Visible[2]).toHaveTextContent('Choose words');
    expect(buttonsStep2Visible[3]).toHaveTextContent('Final Button');
  });
  it('shows error message when textArea is empty', () => {
    render(<DiscussionStepsAccordion />);
    clickButton('Next Button Aria');
    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });

  it('updates content of step when textArea is changed', () => {
    render(<DiscussionStepsAccordion />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Mon texte' } });

    expect(textarea).toHaveValue('Mon texte');

    clickButton('Next Button Aria');

    expect(stepsMock[0].updateContent).toHaveBeenCalledWith('Mon texte');
    expect(stepsMock[0].complete).toHaveBeenCalled();

    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: '2. Step 2' })
    );

    getLastSetStateResult({
      isStarted: false,
      isCompleted: false,
      activeStep: 0,
      discussion: { steps: stepsMock },
    });
  });

  it('shows ending button when arriving at the last step', () => {
    vi.mock('react-router-dom', async (importOriginal) => {
      const actual = (await importOriginal()) as typeof importOriginal;
      return {
        ...actual,
        useNavigate: () => mocks.navigateMock,
      };
    });

    render(<DiscussionStepsAccordion />);

    fillTextArea('Text');

    const nextButton = screen.getByRole('button', { name: 'Next Button Aria' });
    fireEvent.click(nextButton);
    const finalButton = screen.getByRole('button', {
      name: 'Final Button Aria',
    });
    expect(finalButton).toBeInTheDocument();

    fillTextArea('Text');

    fireEvent.click(finalButton);

    const fakeState = {
      isStarted: true,
      isCompleted: false,
      activeStep: 2,
      discussion: { steps: stepsMock },
    };

    expect(getLastSetStateResult(fakeState)).toEqual({
      ...fakeState,
      isCompleted: true,
    });

    expect(mocks.navigateMock).toHaveBeenCalledWith('/discussion/summary');
  });
});
