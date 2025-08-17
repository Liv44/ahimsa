import Discussion from '@/domain/entities/Discussion';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import HistoryDeleteDialog from './HistoryDeleteDialog';
import HistoryDetailsDialog from './HistoryDetailsDialog';

const HistoryDiscussionItem = ({ discussion }: { discussion: Discussion }) => {
  return (
    <li className="w-full flex flex-col gap-2">
      <div className="flex flex-row gap-2 justify-between items-center">
        <div className="flex flex-col gap-2">
          <Badge
            variant="outline"
            className="bg-light-blue text-dark-blue border-dark-blue"
          >
            {discussion.createdAt?.toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </Badge>
          <p>{discussion.getPreview()}</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <HistoryDetailsDialog discussion={discussion} />
          <HistoryDeleteDialog discussion={discussion} />
        </div>
      </div>
      <Separator />
    </li>
  );
};

export default HistoryDiscussionItem;
