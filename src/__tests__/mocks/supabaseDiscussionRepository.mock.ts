import Discussion, { DiscussionRepository } from '@/domain/entities/Discussion';
import { vi } from 'vitest';

class SupabaseDiscussionRepositoryMock implements DiscussionRepository {
  create = vi
    .fn()
    .mockResolvedValue(new Discussion({ steps: [], id: '1', userId: '1' }));
  getById = vi
    .fn()
    .mockResolvedValue(new Discussion({ steps: [], id: '1', userId: '1' }));
  update = vi
    .fn()
    .mockResolvedValue(new Discussion({ steps: [], id: '1', userId: '1' }));
  delete = vi.fn().mockResolvedValue(undefined);
  getAllFromUser = vi.fn().mockResolvedValue([]);
}

export default SupabaseDiscussionRepositoryMock;
