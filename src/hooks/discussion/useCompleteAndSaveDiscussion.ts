import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { queryClient } from '@/config/queryConfig';
import completeAndSaveDiscussion from '@/domain/usecases/discussion/completeAndSaveDiscussion';
import { useAuth } from '@/hooks/auth/useAuth';
import useDiscussionStore, {
  discussionStore,
} from '@/hooks/discussion/useDiscussionStore';
import SupabaseDiscussionRepository from '@/infrastructure/repositories/SupabaseDiscussion.repository';

const repository = new SupabaseDiscussionRepository();

export const useCompleteAndSaveDiscussion = () => {
  const { user } = useAuth();
  const { discussion } = useDiscussionStore();
  return useMutation({
    mutationFn: async () => {
      const updatedDiscussion = await completeAndSaveDiscussion(
        discussion,
        repository,
        user?.id
      );

      discussionStore.setState((state) => ({
        ...state,
        discussion: updatedDiscussion,
        isCompleted: true,
      }));

      return updatedDiscussion;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });
      if (user) {
        toast.success('Discussion saved');
      }
    },
    onError: (error) => {
      toast.error('Error saving discussion');
      console.error(error);
    },
  });
};
