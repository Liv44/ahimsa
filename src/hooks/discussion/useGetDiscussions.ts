import getAllDiscussions from '@/domain/usecases/discussion/getAllDiscussions';
import { useAuth } from '@/hooks/auth/useAuth';
import SupabaseDiscussionRepository from '@/infrastructure/repositories/SupabaseDiscussion.repository';
import { useQuery } from '@tanstack/react-query';

const useGetDiscussions = () => {
  const { user } = useAuth();
  const discussionRepository = new SupabaseDiscussionRepository();

  const {
    data: discussions,
    error,
    ...rest
  } = useQuery({
    queryKey: ['discussions', user?.id],
    queryFn: async () => {
      console.log('queryFn');
      const discussions = await getAllDiscussions(
        discussionRepository,
        user?.id
      );
      console.log({ discussionsFromDB: discussions });
      return discussions;
    },
    gcTime: 0,
    staleTime: 0,
    enabled: !!user?.id,
  });

  return { discussions: discussions || [], error, ...rest };
};

export default useGetDiscussions;
