import { Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

import { Button } from '@/components/ui/button';
import Discussion from '@/domain/entities/Discussion';
import useDiscussionStore, {
  discussionStore,
} from '@/domain/usecases/discussion/useDiscussionStore';

const Summary = () => {
  const { discussion } = useDiscussionStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 mt-4 bg-dark-blue text-white p-4 rounded-lg w-full max-w-2xl mx-auto justify-center items-center">
      <h2 className="text-xl font-bold text-light-blue">
        {t('discussion-page.summary.title')}
      </h2>
      <div className="flex flex-row justify-center items-center gap-1">
        <p className="text-md">"{discussion.getSummary()}"</p>
        <Toaster position="top-center" richColors />
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            navigator.clipboard.writeText(discussion.getSummary());
            toast.success(t('discussion-page.summary.toast-text'), {
              duration: 2000,
            });
          }}
          aria-label="Copier le résumé de la discussion"
        >
          <Copy className="size-4" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild>
          <Link to="/discussion/create">
            {t('discussion-page.summary.button-back')}
          </Link>
        </Button>
        <Button
          className="bg-light-blue text-dark-blue hover:bg-light-blue/80 mx-auto"
          onClick={() => {
            discussionStore.setState({
              discussion: Discussion.reset(),
              isStarted: true,
              isCompleted: false,
              activeStep: 0,
            });
            navigate('/discussion');
          }}
        >
          {t('discussion-page.summary.button-restart')}
        </Button>
      </div>
    </div>
  );
};

export default Summary;
