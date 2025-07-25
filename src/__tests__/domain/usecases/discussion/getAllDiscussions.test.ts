import SupabaseDiscussionRepository from '@/__tests__/mocks/supabaseDiscussionRepository.mock';
import getAllDiscussions from '@/domain/usecases/discussion/getAllDiscussions';
import { describe, expect, it } from 'vitest';

const repository = new SupabaseDiscussionRepository();

describe('getAllDiscussions', () => {
  it('should throw an error if userId is not provided', () => {
    expect(
      getAllDiscussions(repository, undefined as unknown as string)
    ).rejects.toThrow('User ID is required');
  });
  it('should return discussions', async () => {
    const discussions = await getAllDiscussions(repository, '1');

    expect(discussions[0].id).toBe('1');
    expect(discussions[1].id).toBe('2');
    expect(repository.getAllFromUser).toHaveBeenCalledWith('1');
  });
});
