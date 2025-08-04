import Discussion, { DiscussionRepository } from '@/domain/entities/Discussion';

const deleteDiscussion = async (
  discussion: Discussion,
  discussionRepository: DiscussionRepository,
  userId: string
) => {
  if (userId !== discussion.userId) {
    throw new Error('You are not the owner of this discussion');
  }
  await discussionRepository.delete(discussion.id);
};

export default deleteDiscussion;
