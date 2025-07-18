import Step, { DiscussionStepKey } from '@/domain/entities/Step';
import { describe, expect, it } from 'vitest';

describe('Step entity', () => {
  it('should create a Step with the correct properties', () => {
    const date = new Date();
    const step = Step.create({
      key: DiscussionStepKey.OBSERVATION,
      content: 'Test content',
      completedAt: date,
    });

    expect(step.key).toBe(DiscussionStepKey.OBSERVATION);
    expect(step.content).toBe('Test content');
    expect(step.completedAt).toBe(date);
  });

  it('should update the content of the step', () => {
    const step = Step.create({
      key: DiscussionStepKey.FEELINGS,
      content: 'Initial content',
      completedAt: null,
    });

    step.updateContent('Updated content');
    expect(step.content).toBe('Updated content');
  });

  it('should set completedAt when complete() is called', () => {
    const step = Step.create({
      key: DiscussionStepKey.NEEDS,
      content: '',
      completedAt: null,
    });

    expect(step.completedAt).toBeNull();
    step.complete();
    expect(step.completedAt).toBeInstanceOf(Date);
  });

  it('should reset the content to an empty string', () => {
    const step = Step.create({
      key: DiscussionStepKey.REQUEST,
      content: 'Some content',
      completedAt: null,
    });

    step.reset();
    expect(step.content).toBe('');
  });

  it('should allow multiple operations: update, complete, reset', () => {
    const step = Step.create({
      key: DiscussionStepKey.OBSERVATION,
      content: 'Start',
      completedAt: null,
    });

    step.updateContent('Middle');
    expect(step.content).toBe('Middle');

    step.complete();
    expect(step.completedAt).toBeInstanceOf(Date);

    step.reset();
    expect(step.content).toBe('');
    // completedAt should not be reset by reset()
    expect(step.completedAt).toBeInstanceOf(Date);
  });
});
