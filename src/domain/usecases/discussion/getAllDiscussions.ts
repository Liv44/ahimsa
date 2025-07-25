import Discussion, { DiscussionRepository } from '@/domain/entities/Discussion';

const getAllDiscussions = async (
  discussionRepository: DiscussionRepository,
  userId?: string
) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  const discussions = await discussionRepository.getAllFromUser(userId);
  console.log({ discussions });
  if (discussions.length > 0) {
    discussions.forEach((discussion) => {
      if (!(discussion instanceof Discussion)) {
        throw new Error('Discussion is not an instance of Discussion');
      }
    });
  }
  return discussions;
};

export default getAllDiscussions;
