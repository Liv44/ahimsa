import SelectableWord from '@/domain/entities/SelectableWord';
import { describe, expect, it } from 'vitest';

describe('SelectableWord', () => {
  it('should create a SelectableWord with constructor', () => {
    const word = 'word';
    const category = 'category';
    const chosenWord = new SelectableWord({ content: word, category });

    expect(chosenWord.content).toBe(word);
    expect(chosenWord.category).toBe(category);
  });
  it('should create a SelectableWord with given parameters', () => {
    const word = 'word';
    const category = 'category';
    const chosenWord = SelectableWord.create(word, category);

    expect(chosenWord.content).toBe(word);
    expect(chosenWord.category).toBe(category);
  });
});
