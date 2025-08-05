import SupabaseDiscussionRepository from '@/__tests__/mocks/supabaseDiscussionRepository.mock';
import Discussion from '@/domain/entities/Discussion';
import Step, { DiscussionStepKey } from '@/domain/entities/Step';
import deleteDiscussion from '@/domain/usecases/discussion/deleteDiscussion';
import { describe, expect, it } from 'vitest';

const repository = new SupabaseDiscussionRepository();

describe('deleteDiscussion', () => {
  const discussion = new Discussion({
    id: '1',
    steps: [
      new Step({
        id: '1',
        discussionId: '1',
        key: DiscussionStepKey.OBSERVATION,
        content: 'Observation phrase',
      }),
      new Step({
        id: '2',
        discussionId: '1',
        key: DiscussionStepKey.FEELINGS,
        content: 'Feelings phrase',
      }),
    ],
    userId: 'userId',
    completedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  it('should throw an error if userId is not provided', () => {
    expect(
      deleteDiscussion(discussion, repository, undefined as unknown as string)
    ).rejects.toThrow('You are not the owner of this discussion');
  });
  it('should return discussions', async () => {
    await deleteDiscussion(discussion, repository, 'userId');
    expect(repository.delete).toHaveBeenCalledWith('1');
  });
});
