interface IChosenWordConstructorProps {
  content: string;
  category: string;
}

class SelectableWord {
  private _content: string;
  private _category: string;

  constructor({ content, category }: IChosenWordConstructorProps) {
    this._content = content;
    this._category = category;
  }
  get content(): string {
    return this._content;
  }

  get category(): string {
    return this._category;
  }

  static create(content: string, category: string): SelectableWord {
    return new SelectableWord({ content, category });
  }
}

export default SelectableWord;
