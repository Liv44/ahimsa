import Discussion from '@/domain/entities/Discussion';
import Step, { DiscussionStepKey } from '@/domain/entities/Step';
import { describe, expect, it } from 'vitest';

describe('Discussion entity', () => {
  it('should create a Discussion with given steps', () => {
    const steps = [
      Step.create({
        key: DiscussionStepKey.OBSERVATION,
        content: 'Observation',
        completedAt: null,
      }),
      Step.create({
        key: DiscussionStepKey.FEELINGS,
        content: 'Feeling',
        completedAt: null,
      }),
    ];
    const discussion = Discussion.create(steps);

    expect(discussion.steps).toHaveLength(2);
    expect(discussion.steps[0].content).toBe('Observation');
    expect(discussion.steps[1].key).toBe(DiscussionStepKey.FEELINGS);
    expect(discussion.completedAt).toBeNull();
  });

  it('should return a summary of all step contents', () => {
    const steps = [
      Step.create({
        key: DiscussionStepKey.OBSERVATION,
        content: 'A',
        completedAt: null,
      }),
      Step.create({
        key: DiscussionStepKey.FEELINGS,
        content: 'B',
        completedAt: null,
      }),
      Step.create({
        key: DiscussionStepKey.NEEDS,
        content: 'C',
        completedAt: null,
      }),
    ];
    const discussion = Discussion.create(steps);

    expect(discussion.getSummary()).toBe('A, B, C');
  });

  it('should set completedAt when complete() is called', () => {
    const steps = [
      Step.create({
        key: DiscussionStepKey.OBSERVATION,
        content: '',
        completedAt: null,
      }),
    ];
    const discussion = Discussion.create(steps);

    expect(discussion.completedAt).toBeNull();
    discussion.complete();
    expect(discussion.completedAt).toBeInstanceOf(Date);
  });

  it('should reset all steps and return a new Discussion', () => {
    const discussion = Discussion.reset();

    expect(discussion.steps).toHaveLength(4);
    discussion.steps.forEach((step) => {
      expect(step.content).toBe('');
      expect(step.completedAt).toBeNull();
    });
    expect(discussion.completedAt).toBeNull();
  });
});
