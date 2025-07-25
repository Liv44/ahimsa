import SupabaseDiscussionRepositoryMock from '@/__tests__/mocks/supabaseDiscussionRepository.mock';
import Discussion from '@/domain/entities/Discussion';
import completeAndSaveDiscussion from '@/domain/usecases/discussion/completeAndSaveDiscussion';
import { describe, expect, it } from 'vitest';

const repository = new SupabaseDiscussionRepositoryMock();

describe('completeAndSaveDiscussion', () => {
  it('should complete the discussion', async () => {
    const discussion = Discussion.create([]);
    expect(discussion.completedAt).toBeNull();
    await completeAndSaveDiscussion(discussion, repository);
    expect(discussion.completedAt).toBeDefined();
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('should not create the discussion if userId is not provided', async () => {
    const discussion = Discussion.create([]);
    await completeAndSaveDiscussion(discussion, repository);
    expect(discussion.completedAt).toBeDefined();
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('should add userId to the discussion', async () => {
    const discussion = Discussion.create([]);
    await completeAndSaveDiscussion(discussion, repository, 'userId');
    expect(discussion.userId).toBe('userId');
    expect(repository.create).toHaveBeenCalledWith(discussion);
  });
});
