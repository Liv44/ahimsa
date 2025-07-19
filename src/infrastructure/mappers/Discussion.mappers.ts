import Discussion from '@/domain/entities/Discussion';
import StepMappers from './Step.mappers';
import { Tables, TablesInsert } from './supabase.types';

type DiscussionRow = Tables<'discussion'>;
type DiscussionInsert = TablesInsert<'discussion'>;
type DiscussionStepRow = Tables<'discussionStep'>;

// Types étendus avec les relations
type DiscussionWithSteps = DiscussionRow & {
  discussionSteps: DiscussionStepRow[];
};

const DiscussionMappers = {
  toDatabase: (discussion: Discussion): DiscussionInsert => {
    if (!discussion.userId) {
      throw new Error(
        'DiscussionMappers.toDatabase: Discussion must have a userId to be mapped to database'
      );
    }
    return {
      id: discussion.id,
      completed_at: discussion.completedAt?.toISOString() || null,
      created_at: discussion.createdAt?.toISOString() || undefined,
      updated_at: discussion.updatedAt?.toISOString() || undefined,
      user_id: discussion.userId,
    };
  },

  fromDatabase: (discussionWithSteps: DiscussionWithSteps): Discussion => {
    const steps = discussionWithSteps.discussionSteps.map((stepRow) =>
      StepMappers.fromDatabase(stepRow)
    );

    const discussion = new Discussion({
      id: discussionWithSteps.id,
      steps,
      userId: discussionWithSteps.user_id,
      completedAt: discussionWithSteps.completed_at
        ? new Date(discussionWithSteps.completed_at)
        : null,
      createdAt: discussionWithSteps.created_at
        ? new Date(discussionWithSteps.created_at)
        : undefined,
      updatedAt: discussionWithSteps.updated_at
        ? new Date(discussionWithSteps.updated_at)
        : undefined,
    });

    return discussion;
  },
};

export default DiscussionMappers;
