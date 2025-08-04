import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import SummaryDiscussion from '@/components/Discussion/SummaryDiscussion';
import { Button } from '@/components/ui/button';
import Discussion from '@/domain/entities/Discussion';
import useDiscussionStore, {
  discussionStore,
} from '@/hooks/discussion/useDiscussionStore';

const SummaryCard = () => {
  const { discussion } = useDiscussionStore();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 mt-4 bg-dark-blue text-white p-4 rounded-lg w-full max-w-2xl mx-auto justify-center items-center">
      <h2 className="text-xl font-bold text-light-blue">
        {t('discussion-page.summary.title')}
      </h2>

      <SummaryDiscussion discussion={discussion} />

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild>
          <Link to="/discussion/create">
            {t('discussion-page.summary.button-back')}
          </Link>
        </Button>
        <Button
          className="bg-light-blue text-dark-blue hover:bg-light-blue/80 mx-auto"
          asChild
        >
          <Link
            to="/discussion"
            onClick={() => {
              discussionStore.setState({
                discussion: Discussion.reset(),
                isStarted: true,
                isCompleted: false,
                activeStep: 0,
              });
            }}
          >
            {t('discussion-page.summary.button-restart')}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SummaryCard;
