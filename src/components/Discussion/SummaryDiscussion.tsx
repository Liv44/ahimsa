import Discussion from '@/domain/entities/Discussion';
import { Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const SummaryDiscussion = ({ discussion }: { discussion: Discussion }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row justify-center items-center gap-1">
      <p className="text-md">"{discussion.getSummary()}"</p>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => {
          navigator.clipboard.writeText(discussion.getSummary());
          toast.success(t('discussion-page.summary.toast-text'), {
            duration: 2000,
          });
        }}
        aria-label={t('discussion-page.summary.copy-button-aria')}
      >
        <Copy className="size-4" />
      </Button>
    </div>
  );
};

export default SummaryDiscussion;
