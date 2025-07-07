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
    return this._steps.map((step) => step.content).join(', ');
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
