import Step, { DiscussionStepKey } from './Step';

const initialSteps: Step[] = [
  Step.create({
    key: DiscussionStepKey.OBSERVATION,
    content: '',
    completedAt: null,
  }),
  Step.create({
    key: DiscussionStepKey.FEELINGS,
    content: '',
    completedAt: null,
  }),
  Step.create({
    key: DiscussionStepKey.NEEDS,
    content: '',
    completedAt: null,
  }),
  Step.create({
    key: DiscussionStepKey.REQUEST,
    content: '',
    completedAt: null,
  }),
];

class Discussion {
  private _steps: Step[];
  private _completedAt: Date | null;

  constructor(steps: Step[]) {
    this._steps = steps;
    this._completedAt = null;
  }

  get steps(): Step[] {
    return this._steps;
  }

  get completedAt(): Date | null {
    return this._completedAt;
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
    return new Discussion(steps);
  }

  complete() {
    this._completedAt = new Date();
  }

  static reset(): Discussion {
    initialSteps.map((step) => {
      step.reset();
    });
    return new Discussion(initialSteps);
  }
}

export default Discussion;
