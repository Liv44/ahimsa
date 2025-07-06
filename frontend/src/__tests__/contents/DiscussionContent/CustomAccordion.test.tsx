import DiscussionAccordion from '@/contents/DiscussionContent/CustomAccordion';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// - MOCKS -
const mocks = vi.hoisted(() => {
  return {
    setStateMock: vi.fn(),
    navigateMock: vi.fn(),
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'discussion-page.step.step1.title': 'Step 1',
        'discussion-page.step.step2.title': 'Step 2',
        'discussion-page.step.step1.description': 'Description step 1',
        'discussion-page.step.step2.description': 'Description step 2',
        'discussion-page.step.step1.label': 'Label step 1',
        'discussion-page.step.step2.label': 'Label step 2',
        'discussion-page.step.step1.placeholder': 'Placeholder step 1',
        'discussion-page.step.step2.placeholder': 'Placeholder step 2',
        'discussion-page.step.step1.aria-label': 'Aria step 1',
        'discussion-page.step.step2.aria-label': 'Aria step 2',
        'discussion-page.step.button-next': 'Next Button',
        'discussion-page.step.button-next-aria': 'Next Button Aria',
        'discussion-page.step.button-finish-aria': 'Final Button Aria',
        'discussion-page.step.button-finish': 'Final Button',
      };
      return translations[key];
    },
  }),
}));

const stepsMock = [
  {
    key: 'step1',
    content: '',
    updateContent: vi.fn(),
    complete: vi.fn(),
  },
  {
    key: 'step2',
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
const clickButton = (name: string) => {
  fireEvent.click(screen.getByRole('button', { name }));
};

const getLastSetStateResult = (initialState: unknown) => {
  const fn = mocks.setStateMock.mock.calls.at(-1)?.[0];
  return fn?.(initialState);
};

// - TESTS -
describe('DiscussionAccordion', () => {
  it('Displays first step with correct elements', () => {
    render(<DiscussionAccordion />);

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
    expect(label).toHaveAttribute('for', 'step1');

    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveAttribute('id', 'step1');
    expect(textArea).toHaveAttribute('name', 'step1');
    expect(textArea).toHaveAttribute('placeholder', 'Placeholder step 1');
    expect(textArea).toHaveAccessibleName('Aria step 1');
  });

  it('hides all steps when clicking on first step', () => {
    render(<DiscussionAccordion />);

    clickButton('1. Step 1');

    const buttonsAllStepsHidden = screen.getAllByRole('button');

    expect(buttonsAllStepsHidden).toHaveLength(2);
    expect(buttonsAllStepsHidden[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttonsAllStepsHidden[1]).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows next step when clicking on next button', () => {
    render(<DiscussionAccordion />);

    clickButton('Next Button Aria');

    const buttonsStep2Visible = screen.getAllByRole('button');
    expect(buttonsStep2Visible).toHaveLength(3);
    expect(buttonsStep2Visible[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttonsStep2Visible[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttonsStep2Visible[2]).toHaveTextContent('Final Button');
  });

  it('updates content of step when textArea is changed', () => {
    render(<DiscussionAccordion />);

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

    render(<DiscussionAccordion />);

    const nextButton = screen.getByRole('button', { name: 'Next Button Aria' });
    fireEvent.click(nextButton);
    const finalButton = screen.getByRole('button', {
      name: 'Final Button Aria',
    });
    expect(finalButton).toBeInTheDocument();

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
