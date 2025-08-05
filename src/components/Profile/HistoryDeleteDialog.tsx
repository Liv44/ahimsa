import { Info, Trash2 } from 'lucide-react';

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
import { useDeleteDiscussion } from '@/hooks/discussion/useDeleteDiscussion';
import { useTranslation } from 'react-i18next';

const HistoryDeleteDialog = ({ discussion }: { discussion: Discussion }) => {
  const { t } = useTranslation();
  const { mutate: deleteDiscussion } = useDeleteDiscussion();
  const handleDelete = () => {
    deleteDiscussion(discussion);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-light-orange m-1">
          <span className="sr-only">Delete</span>
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogTitle>
          <DialogHeader className="">
            <h2 className="text-xl font-bold text-dark-blue">
              {t('profile-page.history-delete-dialog.title', {
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
              {t('profile-page.history-delete-dialog.description')}
            </DialogDescription>
          </DialogHeader>
        </DialogTitle>
        <p className="text-xs">Preview : {discussion.getPreview()}</p>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="ghost">
              {t('profile-page.history-delete-dialog.back')}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="default"
              className="bg-red-500"
              onClick={handleDelete}
            >
              {t('profile-page.history-delete-dialog.delete')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryDeleteDialog;
