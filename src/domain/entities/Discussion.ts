import { v4 as uuidv4 } from 'uuid';

import Step, { DiscussionStepKey } from './Step';

const initialSteps: Step[] = [
  Step.create(DiscussionStepKey.OBSERVATION),
  Step.create(DiscussionStepKey.FEELINGS),
  Step.create(DiscussionStepKey.NEEDS),
  Step.create(DiscussionStepKey.REQUEST),
];

interface DiscussionProps {
  id: string;
  steps: Step[];
  userId?: string;
  completedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

class Discussion {
  private _id: string;
  private _steps: Step[];
  private _completedAt: Date | null;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _userId?: string;

  constructor({
    id,
    steps,
    userId,
    completedAt,
    createdAt,
    updatedAt,
  }: DiscussionProps) {
    const now = new Date();
    this._id = id;
    this._steps = steps;
    this._completedAt = completedAt ?? null;
    this._createdAt = createdAt ?? now;
    this._updatedAt = updatedAt ?? now;
    this._userId = userId;
  }

  get id(): string {
    return this._id;
  }

  get steps(): Step[] {
    return this._steps;
  }

  get completedAt(): Date | null {
    return this._completedAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get userId(): string | undefined {
    return this._userId;
  }

  getSummary(): string {
    const capitalizeFirst = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    const lowercaseFirst = (str: string) =>
      str.charAt(0).toLowerCase() + str.slice(1);

    const endsWithPunctuation = (str: string) => /[.!?]$/.test(str.trim());

    const formatSentence = (str: string, capitalize = true): string => {
      let formatted = capitalize ? capitalizeFirst(str) : str;
      if (!endsWithPunctuation(formatted)) {
        formatted += '.';
      }
      return formatted;
    };

    const findStepContent = (key: DiscussionStepKey): string | null => {
      const step = this._steps.find((s) => s.key === key);
      return step?.content ?? null;
    };

    const formatObservation = (): string => {
      const content = findStepContent(DiscussionStepKey.OBSERVATION);
      return content ? formatSentence(content) + ' ' : '';
    };

    const formatFeelingsAndNeeds = (): string => {
      const feeling = findStepContent(DiscussionStepKey.FEELINGS);
      const needs = findStepContent(DiscussionStepKey.NEEDS);

      if (feeling && needs) {
        const feelingFormatted = capitalizeFirst(feeling);
        const needsFormatted = endsWithPunctuation(feelingFormatted)
          ? capitalizeFirst(needs)
          : lowercaseFirst(needs);

        const feelingFinal =
          feelingFormatted +
          (endsWithPunctuation(feelingFormatted) ? ' ' : ', ');
        const needsFinal = formatSentence(needsFormatted, false) + ' ';

        return feelingFinal + needsFinal;
      } else if (needs) {
        return formatSentence(needs) + ' ';
      }
      return '';
    };

    const formatRequest = (): string => {
      const content = findStepContent(DiscussionStepKey.REQUEST);
      return content ? formatSentence(content) : '';
    };

    const summary =
      formatObservation() + formatFeelingsAndNeeds() + formatRequest();

    return summary.replace(/\s+/g, ' ').trim();
  }

  static create(steps: Step[]): Discussion {
    const id = uuidv4();
    const stepsWithDiscussionId = steps.map((step) => {
      step.addDiscussionId(id);
      return step;
    });
    return new Discussion({
      id,
      steps: stepsWithDiscussionId,
    });
  }

  complete() {
    const now = new Date();
    this._completedAt = now;
    this._updatedAt = now;
  }

  static reset(): Discussion {
    initialSteps.map((step) => {
      step.reset();
    });
    const newDiscussion = Discussion.create(initialSteps);
    return newDiscussion;
  }

  addUserId(userId: string) {
    this._userId = userId;
  }
}

export interface DiscussionRepository {
  create(discussion: Discussion): Promise<Discussion>;
  getById(id: string): Promise<Discussion | null>;
  update(discussion: Discussion): Promise<Discussion>;
  delete(id: string): Promise<void>;
  getAllFromUser(userId: string): Promise<Discussion[]>;
}

export default Discussion;
