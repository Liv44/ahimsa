import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
        toast.success(t('discussion-page.summary.toast-success'));
      }
    },
    onError: (error) => {
      toast.error(t('discussion-page.summary.toast-error'));
      console.error(error);
    },
  });
};
