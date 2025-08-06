import { Eye, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import SummaryDiscussion from '@/components/Discussion/SummaryDiscussion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Discussion from '@/domain/entities/Discussion';

const HistoryDetailsDialog = ({ discussion }: { discussion: Discussion }) => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-light-orange m-1">
          <span className="sr-only">View</span>
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogTitle>
          <DialogHeader className="">
            <h2 className="text-xl font-bold text-dark-blue">
              {t('profile-page.history-details-dialog.title', {
                date: new Date(discussion.createdAt).toLocaleDateString(
                  'fr-FR',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }
                ),
              })}
            </h2>
            <DialogDescription className="text-xs font-thin text-dark-blue flex items-center gap-1">
              <Info className="w-3 h-3" />
              {t('profile-page.history-details-dialog.description')}
            </DialogDescription>
          </DialogHeader>
        </DialogTitle>
        <SummaryDiscussion discussion={discussion} />
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="default">
              {t('profile-page.history-details-dialog.back')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryDetailsDialog;
