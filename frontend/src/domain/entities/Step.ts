export enum DiscussionStepKey {
  OBSERVATION = 'observation',
  FEELINGS = 'feelings',
  NEEDS = 'needs',
  REQUEST = 'request',
}

interface IStepConstructorProps {
  key: DiscussionStepKey;
  content: string;
  completedAt: Date | null;
}

class Step {
  private _key: DiscussionStepKey;
  private _content: string;
  private _completedAt: Date | null;

  constructor({ key, content, completedAt }: IStepConstructorProps) {
    this._key = key;
    this._content = content;
    this._completedAt = completedAt;
  }

  get key(): DiscussionStepKey {
    return this._key;
  }

  get content(): string {
    return this._content;
  }

  get completedAt(): Date | null {
    return this._completedAt;
  }

  updateContent(content: string) {
    this._content = content;
  }

  complete() {
    this._completedAt = new Date();
  }

  reset() {
    this._content = '';
  }

  static create({ key, content, completedAt }: IStepConstructorProps): Step {
    return new Step({ key, content, completedAt });
  }
}

export default Step;
