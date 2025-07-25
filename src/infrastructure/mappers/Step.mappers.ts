import Step, { DiscussionStepKey } from '@/domain/entities/Step';
import { Tables, TablesInsert } from './supabase.types';

type StepRow = Tables<'discussionStep'>;
type StepInsert = TablesInsert<'discussionStep'>;

const stepTypeMapping: Record<string, DiscussionStepKey> = {
  observation: DiscussionStepKey.OBSERVATION,
  feelings: DiscussionStepKey.FEELINGS,
  needs: DiscussionStepKey.NEEDS,
  request: DiscussionStepKey.REQUEST,
};

const StepMappers = {
  toDatabase: (step: Step) => {
    if (!step.discussionId) {
      throw new Error(
        'StepMappers.toDatabase: Step must have a discussionId to be mapped to database'
      );
    }
    const newStep: StepInsert = {
      id: step.id,
      discussion_id: step.discussionId,
      content: step.content,
      step: step.key,
      created_at: step.createdAt?.toISOString() || undefined,
      updated_at: step.updatedAt?.toISOString() || undefined,
    };
    console.log(newStep);
    return newStep;
  },
  fromDatabase: (step: StepRow) => {
    return new Step({
      id: step.id,
      discussionId: step.discussion_id,
      key: stepTypeMapping[step.step],
      content: step.content,
      createdAt: step.created_at ? new Date(step.created_at) : undefined,
      updatedAt: step.updated_at ? new Date(step.updated_at) : undefined,
    });
  },
};

export default StepMappers;
