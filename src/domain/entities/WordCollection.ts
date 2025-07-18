import SelectableWord from './SelectableWord';

interface IChosenWordsConstructorProps {
  words: SelectableWord[];
}

class WordCollection {
  private _words: SelectableWord[];

  constructor({ words }: IChosenWordsConstructorProps) {
    this._words = words;
  }

  get words(): SelectableWord[] {
    return this._words;
  }

  groupByCategory(): { category: string; words: string[] }[] {
    const categories = this._words.map((word) => word.category);
    const uniqueCategories = [...new Set(categories)];
    return uniqueCategories.map((category) => ({
      category,
      words: this._words
        .filter((word) => word.category === category)
        .map((word) => word.content),
    }));
  }

  getAllCategories(): string[] {
    return this._words
      .map((word) => word.category)
      .filter((item, index, self) => self.indexOf(item) === index);
  }

  getWordsByCategory(category: string): string[] {
    return this._words
      .filter((word) => word.category === category)
      .map((word) => word.content);
  }

  searchWords(search: string): WordCollection {
    const words = this._words.filter(
      (word) =>
        word.content.toLowerCase().includes(search.toLowerCase()) ||
        word.category.toLowerCase().includes(search.toLowerCase())
    );
    return WordCollection.create({ words });
  }

  static create({ words }: IChosenWordsConstructorProps): WordCollection {
    return new WordCollection({ words });
  }
}

export default WordCollection;
