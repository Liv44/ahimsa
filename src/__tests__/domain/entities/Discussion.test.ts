import Discussion from '@/domain/entities/Discussion';
import Step, { DiscussionStepKey } from '@/domain/entities/Step';
import { describe, expect, it } from 'vitest';

describe('Discussion entity', () => {
  it('should create a Discussion with given steps', () => {
    const steps = [
      new Step({
        id: 'id',
        key: DiscussionStepKey.OBSERVATION,
        content: 'Observation',
      }),
      new Step({
        id: 'id',
        key: DiscussionStepKey.FEELINGS,
        content: 'Feelings step',
      }),
    ];
    const discussion = Discussion.create(steps);

    expect(discussion.steps).toHaveLength(2);
    expect(discussion.steps[0].content).toBe('Observation');
    expect(discussion.steps[0].key).toBe(DiscussionStepKey.OBSERVATION);
    expect(discussion.steps[1].content).toBe('Feelings step');
    expect(discussion.steps[1].key).toBe(DiscussionStepKey.FEELINGS);
    expect(discussion.completedAt).toBeNull();
  });

  it('should create a Discussion with all properties in constructor', () => {
    const date = new Date();
    const discussion = new Discussion({
      id: 'id',
      steps: [],
      userId: 'userId',
      completedAt: date,
      createdAt: date,
      updatedAt: date,
    });

    expect(discussion.id).toBe('id');
    expect(discussion.steps).toHaveLength(0);
    expect(discussion.userId).toBe('userId');
    expect(discussion.completedAt).toBe(date);
    expect(discussion.createdAt).toBe(date);
    expect(discussion.updatedAt).toBe(date);
  });

  it('should create a Discussion with default values', () => {
    const discussion = new Discussion({
      id: 'id',
      steps: [],
      userId: 'userId',
      completedAt: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    });
    expect(discussion.id).toBe('id');
    expect(discussion.steps).toHaveLength(0);
    expect(discussion.completedAt).toBeNull();
    expect(discussion.createdAt).toBeDefined();
    expect(discussion.updatedAt).toBeDefined();
    expect(discussion.userId).toBe('userId');
  });

  it('should set completedAt when complete() is called', () => {
    const steps = [Step.create(DiscussionStepKey.OBSERVATION)];
    const discussion = Discussion.create(steps);

    expect(discussion.completedAt).toBeNull();
    discussion.complete();
    expect(discussion.completedAt).toBeInstanceOf(Date);
    expect(discussion.updatedAt).toBeInstanceOf(Date);
    expect(discussion.updatedAt).toBe(discussion.completedAt);
  });

  it('should reset all steps and return a new Discussion', () => {
    const discussion = Discussion.reset();

    expect(discussion.steps).toHaveLength(4);
    discussion.steps.forEach((step) => {
      expect(step.content).toBe('');
    });
    expect(discussion.completedAt).toBeNull();
  });

  it('should add userId to a discussion', () => {
    const discussion = Discussion.create([]);
    discussion.addUserId('userId');
    expect(discussion.userId).toBe('userId');
  });
});

describe('Discussion Summary', () => {
  it('should generate a full summary with punctuation added when missing', () => {
    const steps = [
      new Step({
        id: 'id',
        key: DiscussionStepKey.OBSERVATION,
        content: 'Observation step',
      }),
      new Step({
        id: 'id',
        key: DiscussionStepKey.FEELINGS,
        content: 'Feelings step',
      }),
      new Step({
        id: 'id',
        key: DiscussionStepKey.NEEDS,
        content: 'Needs step',
      }),
      new Step({
        id: 'id',
        key: DiscussionStepKey.REQUEST,
        content: 'Request step',
      }),
    ];
    const discussion = Discussion.create(steps);
    expect(discussion.getSummary()).toBe(
      'Observation step. Feelings step, needs step. Request step.'
    );
  });
  it('should generate a summary when not all steps are provided', () => {
    const stepsWithNeedsAndRequest = [
      new Step({
        id: 'id',
        key: DiscussionStepKey.NEEDS,
        content: 'Needs',
      }),
      new Step({
        id: 'id',
        key: DiscussionStepKey.REQUEST,
        content: 'Request',
      }),
    ];
    const discussion = Discussion.create(stepsWithNeedsAndRequest);
    expect(discussion.getSummary()).toBe('Needs. Request.');

    const stepsWithObservationAndFeelings = [
      new Step({
        id: 'id',
        key: DiscussionStepKey.OBSERVATION,
        content: 'Observation',
      }),
      new Step({
        id: 'id',
        key: DiscussionStepKey.FEELINGS,
        content: 'Feelings',
      }),
    ];
    const discussion2 = Discussion.create(stepsWithObservationAndFeelings);
    expect(discussion2.getSummary()).toBe('Observation. Feelings.');
  });

  it('should capitalize needs if feelings ends with punctuation', () => {
    const steps = [
      new Step({
        id: 'id',
        key: DiscussionStepKey.FEELINGS,
        content: 'Feelings with punctuation!',
      }),
      new Step({
        id: 'id',
        key: DiscussionStepKey.NEEDS,
        content: 'Needs lowercase',
      }),
    ];
    const discussion = Discussion.create(steps);
    expect(discussion.getSummary()).toBe(
      'Feelings with punctuation! Needs lowercase.'
    );
  });

  it('should lowercase needs if feelings has no punctuation', () => {
    const steps = [
      new Step({
        id: 'id',
        key: DiscussionStepKey.FEELINGS,
        content: 'Feelings with no punctuation',
      }),
      new Step({
        id: 'id',
        key: DiscussionStepKey.NEEDS,
        content: 'Needs to lowercase',
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

describe('Discussion Preview', () => {
  it('should get a preview of 40 characters maximum', () => {
    const steps = [
      new Step({
        id: 'id',
        key: DiscussionStepKey.FEELINGS,
        content: 'This is a very long sentence.',
      }),
      new Step({
        id: 'id',
        key: DiscussionStepKey.NEEDS,
        content: 'This one will be truncated.',
      }),
    ];
    const discussion = Discussion.create(steps);
    expect(discussion.getPreview()).toBe(
      '"This is a very long sentence. This one w..."'
    );
  });
  it('should get a preview of all summary if it is less than 40 characters', () => {
    const steps = [
      new Step({
        id: 'id',
        key: DiscussionStepKey.FEELINGS,
        content: 'This is a sentence.',
      }),
      new Step({
        id: 'id',
        key: DiscussionStepKey.NEEDS,
        content: 'This one too.',
      }),
    ];
    const discussion = Discussion.create(steps);
    expect(discussion.getPreview()).toBe('"This is a sentence. This one too."');
  });
});
