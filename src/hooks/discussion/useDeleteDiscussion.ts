import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { queryClient } from '@/config/queryConfig';
import Discussion from '@/domain/entities/Discussion';
import deleteDiscussion from '@/domain/usecases/discussion/deleteDiscussion';
import { useAuth } from '@/hooks/auth/useAuth';
import SupabaseDiscussionRepository from '@/infrastructure/repositories/SupabaseDiscussion.repository';
import { useSentry } from '../useSentry';

const repository = new SupabaseDiscussionRepository();

export const useDeleteDiscussion = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { captureError, setTag } = useSentry();

  return useMutation({
    mutationFn: async (discussion: Discussion) => {
      if (!user) {
        throw new Error('User is not authenticated');
      }
      setTag('discussion_action', 'delete');

      await deleteDiscussion(discussion, repository, 'fake-user-id');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });
      if (user) {
        toast.success(t('profile-page.history-delete-dialog.toast-success'));
      }
    },
    onError: (error, discussion) => {
      toast.error(t('profile-page.history-delete-dialog.toast-error'));
      captureError(error, {
        title: 'useDeleteDiscussion',
        context: {
          data: {
            email: user?.email,
            error_message: error.message,
            error_type: 'delete_discussion_failed',
            discussion_id: discussion.id,
            user_id: user?.id,
          },
        },
      });
      console.error(error);
    },
  });
};
