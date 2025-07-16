import WordCategorySection from '@/components/Discussion/WordCategorySection';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('WordCategorySection', () => {
  let selectedWords = ['word1'];
  const setSelectedWords = (words: string[]) => (selectedWords = words);

  it('should toggle isOpen state when button is clicked', () => {
    let isOpen = false;
    const setIsOpen = (value: boolean) => {
      isOpen = value;
    };
    render(
      <WordCategorySection
        category="category"
        words={['word1', 'word2']}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedWords={selectedWords}
        setSelectedWords={setSelectedWords}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(isOpen).toBe(true);
  });

  it('should render a WordCategorySection closed', () => {
    render(
      <WordCategorySection
        category="category"
        words={['word1', 'word2']}
        isOpen={false}
        setIsOpen={() => {}}
        selectedWords={selectedWords}
        setSelectedWords={setSelectedWords}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveTextContent('category');
    const list = screen.getByTestId('word-category-list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute('aria-hidden', 'true');
  });
  it('should render a WordCategorySection expanded', () => {
    render(
      <WordCategorySection
        category="category"
        words={['word1', 'word2']}
        isOpen={true}
        setIsOpen={() => {}}
        selectedWords={selectedWords}
        setSelectedWords={setSelectedWords}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveTextContent('category');
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute('aria-hidden', 'false');

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('word1');
    expect(items[1]).toHaveTextContent('word2');

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
    expect(checkboxes[0]).toHaveAttribute('id', 'word1-0');
    expect(checkboxes[0]).toHaveAttribute('aria-checked', 'true');
    expect(checkboxes[1]).toHaveAttribute('id', 'word2-1');
    expect(checkboxes[1]).toHaveAttribute('aria-checked', 'false');
  });

  it('should add word to selectedWords when checkbox is checked', () => {
    let selectedWords = ['word1'];
    const setSelectedWords = (words: string[]) => {
      selectedWords = words;
    };
    render(
      <WordCategorySection
        category="category"
        words={['word1', 'word2']}
        isOpen={true}
        setIsOpen={() => {}}
        selectedWords={selectedWords}
        setSelectedWords={setSelectedWords}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');

    fireEvent.click(checkboxes[1]);

    expect(selectedWords).toHaveLength(2);
    expect(selectedWords[0]).toBe('word1');
    expect(selectedWords[1]).toBe('word2');
  });

  it('should remove word to selectedWords when checkbox is unchecked', () => {
    let selectedWords = ['word1'];
    const setSelectedWords = (words: string[]) => {
      selectedWords = words;
    };
    render(
      <WordCategorySection
        category="category"
        words={['word1', 'word2']}
        isOpen={true}
        setIsOpen={() => {}}
        selectedWords={selectedWords}
        setSelectedWords={setSelectedWords}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');

    fireEvent.click(checkboxes[0]);

    expect(selectedWords).toHaveLength(0);
  });
});
