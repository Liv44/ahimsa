import SelectableWord from '@/domain/entities/SelectableWord';
import WordCollection from '@/domain/entities/WordCollection';
import { describe, expect, it } from 'vitest';

describe('WordCollection', () => {
  it('should create a WordCollection with given parameters', () => {
    const words = [
      new SelectableWord({ content: 'word1', category: 'category1' }),
      new SelectableWord({ content: 'word2', category: 'category2' }),
      new SelectableWord({ content: 'word3', category: 'category3' }),
    ];
    const chosenWords = WordCollection.create({ words });

    expect(chosenWords.words).toHaveLength(3);
    expect(chosenWords.words[0].content).toBe('word1');
    expect(chosenWords.words[0].category).toBe('category1');
  });

  it('should return words by category', () => {
    const words: SelectableWord[] = [
      new SelectableWord({
        content: 'word1.1',
        category: 'category1',
      }),
      new SelectableWord({
        content: 'word1.2',
        category: 'category1',
      }),
      new SelectableWord({
        content: 'word2.1',
        category: 'category2',
      }),
      new SelectableWord({
        content: 'word2.2',
        category: 'category2',
      }),
      new SelectableWord({
        content: 'word3.1',
        category: 'category3',
      }),
      new SelectableWord({
        content: 'word3.2',
        category: 'category3',
      }),
    ];
    const chosenWords = WordCollection.create({ words });

    const categories = chosenWords.groupByCategory();
    expect(categories).toHaveLength(3);
    expect(categories[0].category).toBe('category1');
    expect(categories[0].words).toHaveLength(2);
    expect(categories[1].category).toBe('category2');
    expect(categories[1].words).toHaveLength(2);
    expect(categories[2].category).toBe('category3');
    expect(categories[2].words).toHaveLength(2);
  });

  it('should return words for a given category', () => {
    const words: SelectableWord[] = [
      new SelectableWord({
        content: 'word1.1',
        category: 'category1',
      }),
      new SelectableWord({
        content: 'word1.2',
        category: 'category1',
      }),
      new SelectableWord({
        content: 'word2.1',
        category: 'category2',
      }),
      new SelectableWord({
        content: 'word2.2',
        category: 'category2',
      }),
    ];
    const chosenWords = WordCollection.create({ words });

    const categoryWords = chosenWords.getWordsByCategory('category1');
    expect(categoryWords).toHaveLength(2);
    expect(categoryWords[0].content).toBe('word1.1');
    expect(categoryWords[1].content).toBe('word1.2');
  });

  it('should return all categories', () => {
    const words: SelectableWord[] = [
      new SelectableWord({
        content: 'word1.1',
        category: 'category1',
      }),
      new SelectableWord({
        content: 'word1.2',
        category: 'category1',
      }),
      new SelectableWord({
        content: 'word2.1',
        category: 'category2',
      }),
      new SelectableWord({
        content: 'word2.2',
        category: 'category2',
      }),
    ];

    const chosenWords = WordCollection.create({ words });

    const categories = chosenWords.getAllCategories();
    expect(categories).toHaveLength(2);
    expect(categories[0]).toBe('category1');
    expect(categories[1]).toBe('category2');
  });
});
