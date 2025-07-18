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

describe('Discussion Summary', () => {
  it('should generate a full summary with punctuation added when missing', () => {
    const steps = [
      Step.create({
        key: DiscussionStepKey.OBSERVATION,
        content: 'observation step',
        completedAt: null,
      }),
      Step.create({
        key: DiscussionStepKey.FEELINGS,
        content: 'feeling step',
        completedAt: null,
      }),
      Step.create({
        key: DiscussionStepKey.NEEDS,
        content: 'needs step',
        completedAt: null,
      }),
      Step.create({
        key: DiscussionStepKey.REQUEST,
        content: 'request step',
        completedAt: null,
      }),
    ];
    const discussion = Discussion.create(steps);
    expect(discussion.getSummary()).toBe(
      'Observation step. Feeling step, needs step. Request step.'
    );
  });
  it('should generate a summary when only needs and request are provided', () => {
    const steps = [
      Step.create({
        key: DiscussionStepKey.NEEDS,
        content: 'needs',
        completedAt: null,
      }),
      Step.create({
        key: DiscussionStepKey.REQUEST,
        content: 'request',
        completedAt: null,
      }),
    ];
    const discussion = Discussion.create(steps);
    expect(discussion.getSummary()).toBe('Needs. Request.');
  });

  it('should capitalize needs if feelings ends with punctuation', () => {
    const steps = [
      Step.create({
        key: DiscussionStepKey.FEELINGS,
        content: 'Feelings with  punctuation!',
        completedAt: null,
      }),
      Step.create({
        key: DiscussionStepKey.NEEDS,
        content: 'needs lowercase',
        completedAt: null,
      }),
    ];
    const discussion = Discussion.create(steps);
    expect(discussion.getSummary()).toBe(
      'Feelings with punctuation! Needs lowercase.'
    );
  });

  it('should lowercase needs if feelings has no punctuation', () => {
    const steps = [
      Step.create({
        key: DiscussionStepKey.FEELINGS,
        content: 'Feelings with no punctuation',
        completedAt: null,
      }),
      Step.create({
        key: DiscussionStepKey.NEEDS,
        content: 'Needs to lowercase',
        completedAt: null,
      }),
    ];
    const discussion = Discussion.create(steps);
    expect(discussion.getSummary()).toBe(
      'Feelings with no punctuation, needs to lowercase.'
    );
  });

  it('should return an empty string when no steps are provided', () => {
    const discussion = Discussion.create([]);
    expect(discussion.getSummary()).toBe('');
  });
});
