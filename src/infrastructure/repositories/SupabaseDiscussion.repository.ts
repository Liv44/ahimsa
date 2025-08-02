// src/infrastructure/repositories/SupabaseDiscussionRepository.ts
import { supabase } from '@/config/supabaseConfig';
import Discussion, { DiscussionRepository } from '@/domain/entities/Discussion';
import DiscussionMappers from '../mappers/Discussion.mappers';
import StepMappers from '../mappers/Step.mappers';
import { TablesInsert } from '../mappers/supabase.types';

type DiscussionInsert = TablesInsert<'discussion'>;

class SupabaseDiscussionRepository implements DiscussionRepository {
  async create(discussion: Discussion): Promise<Discussion> {
    const discussionToInsert: DiscussionInsert =
      DiscussionMappers.toDatabase(discussion);
    const { error } = await supabase
      .from('discussion')
      .insert([discussionToInsert]);

    if (error) {
      throw error;
    }

    const { error: stepsError } = await supabase
      .from('discussionStep')
      .insert(discussion.steps.map(StepMappers.toDatabase));

    if (stepsError) {
      throw stepsError;
    }

    const discussionWithSteps = await this.getById(discussion.id);

    return discussionWithSteps;
  }

  async getById(id: string): Promise<Discussion> {
    const { data, error } = await supabase
      .from('discussion')
      .select(
        `
        *,
        steps:discussionStep (*)
      `
      )
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Discussion not found');
    }

    return DiscussionMappers.fromDatabase(data);
  }

  async update(discussion: Discussion): Promise<Discussion> {
    const { data, error } = await supabase
      .from('discussion')
      .update(DiscussionMappers.toDatabase(discussion))
      .eq('id', discussion.id);

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Discussion not updated');
    }

    return DiscussionMappers.fromDatabase(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('discussion').delete().eq('id', id);

    if (error) {
      throw error;
    }
  }

  async getAllFromUser(userId: string): Promise<Discussion[]> {
    const { data, error } = await supabase
      .from('discussion')
      .select(
        `
        *,
        steps:discussionStep(*)
      `
      )
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    console.log({ data });

    return data
      ? data.map((discussion) => DiscussionMappers.fromDatabase(discussion))
      : [];
  }
}

export default SupabaseDiscussionRepository;
