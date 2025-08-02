/* istanbul ignore file */
import Discussion from '@/domain/entities/Discussion';
import { Store, useStore } from '@tanstack/react-store';

export const discussionStore = new Store<{
  discussion: Discussion;
  activeStep: number;
  isStarted: boolean;
  isCompleted: boolean;
}>({
  discussion: Discussion.reset(),
  activeStep: 0,
  isStarted: false,
  isCompleted: false,
});

const useDiscussionStore = () => {
  return useStore(discussionStore, (state) => state);
};

export default useDiscussionStore;
