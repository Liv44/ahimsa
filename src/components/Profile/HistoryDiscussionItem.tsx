import { Eye, Trash2 } from 'lucide-react';

import Discussion from '@/domain/entities/Discussion';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const HistoryDiscussionItem = ({ discussion }: { discussion: Discussion }) => {
  return (
    <>
      <li className="flex flex-row gap-2 justify-between items-center w-full">
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
          <Button variant="ghost" size="icon" className="bg-light-orange m-1">
            <span className="sr-only">View</span>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-light-orange m-1">
            <span className="sr-only">Delete</span>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </li>
      <Separator />
    </>
  );
};

export default HistoryDiscussionItem;
