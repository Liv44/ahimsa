import Discussion from '@/domain/entities/Discussion';
import DiscussionMappers from '@/infrastructure/mappers/Discussion.mappers';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./Step.mappers', () => ({
  default: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromDatabase: (step: any) => ({
      key: step.key,
      content: step.content,
      createdAt: step.created_at ? new Date(step.created_at) : new Date(),
      updatedAt: step.updated_at ? new Date(step.updated_at) : new Date(),
    }),
  },
}));

describe('Discussion Mapper', () => {
  describe('fromDatabase', () => {
    it('should map a discussion from database to domain entity', () => {
      const discussion = DiscussionMappers.fromDatabase({
        id: '1',
        user_id: '1',
        created_at: '2025-07-01T10:05:00.000Z',
        updated_at: '2025-07-02T12:00:00.000Z',
        completed_at: '2025-07-03T14:00:00.000Z',
        discussionSteps: [
          {
            id: '1',
            discussion_id: '1',
            step: 'observation',
            content: 'Je vois que tu es tendu·e',
            created_at: '2025-07-01T10:05:00.000Z',
            updated_at: '2025-07-02T12:00:00.000Z',
          },
        ],
      });
      expect(discussion.id).toBe('1');
      expect(discussion.userId).toBe('1');
      expect(discussion.createdAt).toEqual(
        new Date('2025-07-01T10:05:00.000Z')
      );
      expect(discussion.updatedAt).toEqual(
        new Date('2025-07-02T12:00:00.000Z')
      );
      expect(discussion.completedAt).toEqual(
        new Date('2025-07-03T14:00:00.000Z')
      );
      expect(discussion.steps.length).toBe(1);
    });
    it('should return undefined for createdAt and updatedAt if they are not present', () => {
      const discussion = DiscussionMappers.fromDatabase({
        id: '1',
        user_id: '1',
        created_at: null as unknown as string,
        updated_at: null as unknown as string,
        completed_at: null as unknown as string | null,
        discussionSteps: [],
      });
      expect(discussion.createdAt).toBeInstanceOf(Date);
      expect(discussion.updatedAt).toBeInstanceOf(Date);
      expect(discussion.createdAt).toEqual(discussion.updatedAt);
      expect(discussion.completedAt).toBeNull();
    });
  });

  describe('toDatabase', () => {
    it('should map a discussion from domain entity to database', () => {
      const discussion = DiscussionMappers.toDatabase(
        new Discussion({
          id: '1',
          userId: '1',
          completedAt: new Date('2025-07-03T14:00:00.000Z'),
          createdAt: new Date('2025-07-01T10:05:00.000Z'),
          updatedAt: new Date('2025-07-02T12:00:00.000Z'),
          steps: [],
        })
      );
      expect(discussion.id).toBe('1');
      expect(discussion.user_id).toBe('1');
      expect(discussion.created_at).toBe('2025-07-01T10:05:00.000Z');
      expect(discussion.updated_at).toBe('2025-07-02T12:00:00.000Z');
      expect(discussion.completed_at).toBe('2025-07-03T14:00:00.000Z');
    });
    it('should return null completed_at and new Date() for created_at and updated_at', () => {
      const discussion = DiscussionMappers.toDatabase({
        id: '1',
        userId: '1',
        createdAt: undefined as unknown as Date,
        updatedAt: undefined as unknown as Date,
        completedAt: undefined as unknown as Date,
        steps: [],
      } as unknown as Discussion);
      expect(discussion.completed_at).toBeNull();
      expect(discussion.created_at).toBeUndefined();
      expect(discussion.updated_at).toBeUndefined();
    });

    it('should throw an error if the discussion has no userId', () => {
      expect(() =>
        DiscussionMappers.toDatabase(new Discussion({ id: '1', steps: [] }))
      ).toThrow(
        'DiscussionMappers.toDatabase: Discussion must have a userId to be mapped to database'
      );
    });
  });
});
