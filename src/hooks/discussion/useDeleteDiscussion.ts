import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { queryClient } from '@/config/queryConfig';
import Discussion from '@/domain/entities/Discussion';
import deleteDiscussion from '@/domain/usecases/discussion/deleteDiscussion';
import { useAuth } from '@/hooks/auth/useAuth';
import SupabaseDiscussionRepository from '@/infrastructure/repositories/SupabaseDiscussion.repository';

const repository = new SupabaseDiscussionRepository();

export const useDeleteDiscussion = () => {
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (discussion: Discussion) => {
      if (!user) {
        throw new Error('User is not authenticated');
      }
      await deleteDiscussion(discussion, repository, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });
      if (user) {
        toast.success('Discussion deleted');
      }
    },
    onError: (error) => {
      toast.error('Error deleting discussion');
      console.error(error);
    },
  });
};
