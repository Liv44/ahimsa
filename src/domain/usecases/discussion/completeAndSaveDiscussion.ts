import Discussion, { DiscussionRepository } from '@/domain/entities/Discussion';

const completeAndSaveDiscussion = async (
  discussion: Discussion,
  discussionRepository: DiscussionRepository,
  userId?: string
) => {
  discussion.complete();
  if (userId) {
    discussion.addUserId(userId);
    return await discussionRepository.create(discussion);
  }
  return discussion;
};

export default completeAndSaveDiscussion;
