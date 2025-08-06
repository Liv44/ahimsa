import Step, { DiscussionStepKey } from '@/domain/entities/Step';
import { describe, expect, it } from 'vitest';

describe('Step entity', () => {
  it('should create a Step with the correct properties', () => {
    const step = Step.create(DiscussionStepKey.OBSERVATION);

    expect(step.key).toBe(DiscussionStepKey.OBSERVATION);
    expect(step.content).toBe('');
    expect(step.createdAt).toBeInstanceOf(Date);
    expect(step.updatedAt).toBeInstanceOf(Date);
  });

  it('should create Step with required properties from constructor', () => {
    const step = new Step({
      id: 'id',
      key: DiscussionStepKey.OBSERVATION,
      content: 'Test content',
    });

    expect(step.id).toBe('id');
    expect(step.key).toBe(DiscussionStepKey.OBSERVATION);
    expect(step.content).toBe('Test content');
    expect(step.createdAt).toBeInstanceOf(Date);
    expect(step.updatedAt).toEqual(step.createdAt);
  });

  it('should create Step with optional properties from constructor', () => {
    const now = new Date();
    const step = new Step({
      id: 'id',
      key: DiscussionStepKey.OBSERVATION,
      content: 'Test content',
      createdAt: now,
      updatedAt: now,
      discussionId: 'discussionId',
    });

    expect(step.key).toBe(DiscussionStepKey.OBSERVATION);
    expect(step.content).toBe('Test content');
    expect(step.createdAt).toBe(now);
    expect(step.updatedAt).toBe(now);
    expect(step.discussionId).toBe('discussionId');
  });

  it('should update the content of the step', async () => {
    const step = new Step({
      id: 'id',
      key: DiscussionStepKey.FEELINGS,
      content: 'Initial content',
    });
    const firstUpdate = step.updatedAt;

    await new Promise((resolve) => setTimeout(resolve, 10));

    step.updateContent('Updated content');

    expect(step.content).toBe('Updated content');
    expect(step.updatedAt).not.toEqual(firstUpdate);
    expect(step.updatedAt.getTime()).toBeGreaterThan(firstUpdate.getTime());
  });

  it('should reset the content to an empty string', () => {
    const step = new Step({
      id: 'id',
      key: DiscussionStepKey.REQUEST,
      content: 'Some content',
    });

    step.reset();
    expect(step.content).toBe('');
  });
});
