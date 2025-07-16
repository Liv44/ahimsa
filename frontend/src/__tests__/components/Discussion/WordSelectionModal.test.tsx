import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import WordSelectionModal from '@/components/Discussion/WordSelectionModal';
import { DiscussionStepKey } from '@/domain/entities/Step';
import { afterEach, beforeEach } from 'node:test';
import { act } from 'react';

// - MOCKS -
vi.mock('react-i18next', () => ({
  useTranslation: (namespace?: string) => {
    if (!namespace) {
      return {
        t: (key: string) => {
          const translations: Record<string, unknown> = {
            'discussion-page.step.modal.title': 'Title',
            'discussion-page.step.modal.description': 'Description',
            'discussion-page.step.modal.button-cancel': 'Cancel',
            'discussion-page.step.modal.button-confirm': 'Confirm',
            'discussion-page.step.modal.feelings-start-phrase':
              'Feelings start phrase : ',
            'discussion-page.step.modal.needs-start-phrase':
              'Needs start phrase : ',
            'discussion-page.step.modal.button-delete': 'Delete',
            'discussion-page.step.modal.search-placeholder': 'Search',
            'discussion-page.step.modal.search-button-aria': 'Search Aria',
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
            { category: 'category3', content: 'word1' },
            { category: 'category4', content: 'word1' },
            { category: 'category5', content: 'word1' },
            { category: 'category6', content: 'word1' },
          ];
        }
        return key; // Retourne la clé si returnObjects n'est pas true
      },
    };
  },
}));

describe('WordSelectionModal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render a button', () => {
    render(
      <WordSelectionModal
        translationKey={DiscussionStepKey.NEEDS}
        activeStep={0}
        currentContent=""
        setContent={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: 'Title' });
    expect(button).toBeInTheDocument();
  });

  it('should render modal when button is clicked', () => {
    render(
      <WordSelectionModal
        translationKey={DiscussionStepKey.NEEDS}
        activeStep={0}
        currentContent=""
        setContent={() => {}}
      />
    );
    const button = screen.getByRole('button', { name: 'Title' });
    fireEvent.click(button);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const title = screen.getByRole('heading', { name: 'Title' });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Title');

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(9);

    const searchInput = screen.getByRole('searchbox');
    const searchLabel = screen.getByText('Search');
    expect(searchLabel).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Search');
  });

  it('should close modal when close button is clicked', () => {
    render(
      <WordSelectionModal
        translationKey={DiscussionStepKey.NEEDS}
        activeStep={0}
        currentContent=""
        setContent={() => {}}
      />
    );
    const button = screen.getByRole('button', { name: 'Title' });
    fireEvent.click(button);

    const closeButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(closeButton);

    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  it('should set content with starting phrase if content is empty', () => {
    const currentContent = '';
    let newContent: string[] = [];
    const setContent = (value: string[] | ((prev: string[]) => string[])) => {
      if (typeof value === 'function') {
        newContent = value([]);
      } else {
        newContent = value;
      }
    };
    render(
      <WordSelectionModal
        translationKey={DiscussionStepKey.NEEDS}
        activeStep={0}
        currentContent={currentContent}
        setContent={setContent}
      />
    );

    const button = screen.getByRole('button', { name: 'Title' });
    fireEvent.click(button);

    const buttonCategory = screen.getByRole('button', {
      name: 'category1',
    });
    fireEvent.click(buttonCategory);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    const buttonConfirm = screen.getByRole('button', { name: 'Confirm' });
    fireEvent.click(buttonConfirm);

    expect(newContent).toEqual(['Needs start phrase : word1']);
  });

  it('should add content if content is not empty', () => {
    const currentContent = 'current content';
    let newContent: string[] = [];
    const setContent = (value: string[] | ((prev: string[]) => string[])) => {
      if (typeof value === 'function') {
        newContent = value([]);
      } else {
        newContent = value;
      }
    };
    render(
      <WordSelectionModal
        translationKey={DiscussionStepKey.NEEDS}
        activeStep={0}
        currentContent={currentContent}
        setContent={setContent}
      />
    );

    const button = screen.getByRole('button', { name: 'Title' });
    fireEvent.click(button);

    const buttonCategory = screen.getByRole('button', {
      name: 'category1',
    });
    fireEvent.click(buttonCategory);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    const buttonConfirm = screen.getByRole('button', { name: 'Confirm' });
    fireEvent.click(buttonConfirm);

    expect(newContent).toEqual(['current content word1']);
  });

  it('should show badge with checked word and delete it when clicking on it', () => {
    render(
      <WordSelectionModal
        translationKey={DiscussionStepKey.NEEDS}
        activeStep={0}
        currentContent={''}
        setContent={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: 'Title' });
    fireEvent.click(button);

    const buttonCategory = screen.getByRole('button', {
      name: 'category1',
    });
    fireEvent.click(buttonCategory);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    const badge = screen.getAllByTestId('badge');
    expect(badge).toHaveLength(2);
    const deleteButton = screen.getByRole('button', {
      name: 'Delete word1',
    });
    fireEvent.click(deleteButton);

    const badgeAfterDelete = screen.getAllByTestId('badge');

    expect(badgeAfterDelete).toHaveLength(1);
  });

  it('should remove category when clicking on an opened category', () => {
    render(
      <WordSelectionModal
        translationKey={DiscussionStepKey.NEEDS}
        activeStep={0}
        currentContent={''}
        setContent={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: 'Title' });
    fireEvent.click(button);

    const buttonCategory = screen.getByRole('button', {
      name: 'category1',
    });
    fireEvent.click(buttonCategory);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);

    fireEvent.click(buttonCategory);

    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  });

  it('should search for a word after pressing enter', () => {
    render(
      <WordSelectionModal
        translationKey={DiscussionStepKey.NEEDS}
        activeStep={0}
        currentContent=""
        setContent={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: 'Title' });
    fireEvent.click(button);

    const searchInput = screen.getByRole('searchbox');

    fireEvent.change(searchInput, { target: { value: 'category2' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    // fireEvent.waiting(searchInput);

    expect(searchInput).toHaveValue('category2');

    const buttonCategory = screen.getByRole('button', {
      name: 'category2',
    });
    expect(buttonCategory).toBeInTheDocument();
    expect(buttonCategory).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('should search for a word after writing in the search input', () => {
    vi.useFakeTimers();
    render(
      <WordSelectionModal
        translationKey={DiscussionStepKey.NEEDS}
        activeStep={0}
        currentContent=""
        setContent={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: 'Title' });
    fireEvent.click(button);

    const searchInput = screen.getByRole('searchbox');

    fireEvent.change(searchInput, { target: { value: 'category1' } });
    expect(
      screen.queryByRole('button', { name: 'category1' })
    ).not.toHaveAttribute('aria-expanded', 'true');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(searchInput).toHaveValue('category1');

    const buttonCategory = screen.getByRole('button', {
      name: 'category1',
    });
    expect(buttonCategory).toBeInTheDocument();
    expect(buttonCategory).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });
  it('should close all categories when searching an element that is present in more than five categories', () => {
    render(
      <WordSelectionModal
        translationKey={DiscussionStepKey.NEEDS}
        activeStep={0}
        currentContent=""
        setContent={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: 'Title' });
    fireEvent.click(button);

    const searchInput = screen.getByRole('searchbox');

    fireEvent.change(searchInput, { target: { value: 'word1' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    expect(searchInput).toHaveValue('word1');

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(9);

    const buttonCategory1 = screen.getByRole('button', {
      name: 'category1',
    });
    const buttonCategory2 = screen.getByRole('button', {
      name: 'category2',
    });
    const buttonCategory3 = screen.getByRole('button', {
      name: 'category3',
    });
    const buttonCategory4 = screen.getByRole('button', {
      name: 'category4',
    });
    const buttonCategory5 = screen.getByRole('button', {
      name: 'category5',
    });
    const buttonCategory6 = screen.getByRole('button', {
      name: 'category6',
    });

    expect(buttonCategory1).toHaveAttribute('aria-expanded', 'false');
    expect(buttonCategory2).toHaveAttribute('aria-expanded', 'false');
    expect(buttonCategory3).toHaveAttribute('aria-expanded', 'false');
    expect(buttonCategory4).toHaveAttribute('aria-expanded', 'false');
    expect(buttonCategory5).toHaveAttribute('aria-expanded', 'false');
    expect(buttonCategory6).toHaveAttribute('aria-expanded', 'false');
  });
});
