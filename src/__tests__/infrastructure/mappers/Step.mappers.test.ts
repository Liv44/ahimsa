import Step, { DiscussionStepKey } from '@/domain/entities/Step';
import StepMappers from '@/infrastructure/mappers/Step.mappers';
import { describe, expect, it } from 'vitest';

describe('StepMappers.fromDatabase', () => {
  describe('fromDatabase', () => {
    it('should map a step from database to domain entity', () => {
      const step = StepMappers.fromDatabase({
        id: '1',
        discussion_id: '1',
        step: 'observation',
        content: 'Je vois que tu es tendu·e',
        created_at: '2025-07-01T10:05:00.000Z',
        updated_at: '2025-07-02T12:00:00.000Z',
      });
      expect(step.id).toBe('1');
      expect(step.key).toBe(DiscussionStepKey.OBSERVATION);
      expect(step.content).toBe('Je vois que tu es tendu·e');
      expect(step.createdAt).toEqual(new Date('2025-07-01T10:05:00.000Z'));
    });
    it('should return date for createdAt and updatedAt if they are not present', () => {
      const step = StepMappers.fromDatabase({
        id: '1',
        discussion_id: '1',
        step: 'observation',
        content: 'Je vois que tu es tendu·e',
        created_at: null as unknown as string,
        updated_at: null as unknown as string,
      });
      expect(step.createdAt).toBeInstanceOf(Date);
      expect(step.updatedAt).toBeInstanceOf(Date);
      expect(step.createdAt).toEqual(step.updatedAt);
    });
  });

  describe('toDatabase', () => {
    it('should map a step from domain entity to database', () => {
      const step = StepMappers.toDatabase(
        new Step({
          id: '1',
          discussionId: '1',
          key: DiscussionStepKey.OBSERVATION,
          content: 'Je vois que tu es tendu·e',
          createdAt: new Date('2025-07-01T10:05:00.000Z'),
          updatedAt: new Date('2025-07-02T12:00:00.000Z'),
        })
      );
      expect(step.id).toBe('1');
      expect(step.discussion_id).toBe('1');
      expect(step.step).toBe('observation');
      expect(step.content).toBe('Je vois que tu es tendu·e');
      expect(step.created_at).toBe('2025-07-01T10:05:00.000Z');
      expect(step.updated_at).toBe('2025-07-02T12:00:00.000Z');
    });
    it('should throw an error if the step has no discussionId', () => {
      expect(() =>
        StepMappers.toDatabase(
          new Step({
            id: '1',
            key: DiscussionStepKey.OBSERVATION,
            content: 'Je vois que tu es tendu·e',
          })
        )
      ).toThrow(
        'StepMappers.toDatabase: Step must have a discussionId to be mapped to database'
      );
    });
    it('should return undefined for createdAt and updatedAt if they are not present', () => {
      const step = StepMappers.toDatabase({
        id: '1',
        discussionId: '1',
        key: DiscussionStepKey.OBSERVATION,
        content: 'Je vois que tu es tendu·e',
        createdAt: undefined as unknown as Date,
        updatedAt: undefined as unknown as Date,
      } as unknown as Step);
      expect(step.created_at).toBeUndefined();
      expect(step.updated_at).toBeUndefined();
    });
  });
});
