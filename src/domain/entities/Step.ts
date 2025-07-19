import { v4 as uuidv4 } from 'uuid';

export enum DiscussionStepKey {
  OBSERVATION = 'observation',
  FEELINGS = 'feelings',
  NEEDS = 'needs',
  REQUEST = 'request',
}

interface IStepConstructorProps {
  id: string;
  discussionId?: string;
  key: DiscussionStepKey;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Step {
  private _id: string;
  private _discussionId?: string;
  private _key: DiscussionStepKey;
  private _content: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor({
    id,
    discussionId,
    key,
    content,
    createdAt,
    updatedAt,
  }: IStepConstructorProps) {
    const now = new Date();
    this._id = id;
    this._discussionId = discussionId;
    this._key = key;
    this._content = content;
    this._createdAt = createdAt ?? now;
    this._updatedAt = updatedAt ?? now;
  }

  get id(): string {
    return this._id;
  }

  get discussionId(): string | undefined {
    return this._discussionId;
  }

  get key(): DiscussionStepKey {
    return this._key;
  }

  get content(): string {
    return this._content;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateContent(content: string) {
    this._content = content;
    this._updatedAt = new Date();
  }

  reset() {
    this._content = '';
    this._updatedAt = new Date();
  }

  static create(key: DiscussionStepKey): Step {
    const id = uuidv4();
    return new Step({ id, key, content: '' });
  }
}

export default Step;
