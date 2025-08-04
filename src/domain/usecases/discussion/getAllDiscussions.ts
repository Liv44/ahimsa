import { DiscussionRepository } from '@/domain/entities/Discussion';

const getAllDiscussions = async (
  discussionRepository: DiscussionRepository,
  userId?: string
) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  const discussions = await discussionRepository.getAllFromUser(userId);

  return discussions;
};

export default getAllDiscussions;
