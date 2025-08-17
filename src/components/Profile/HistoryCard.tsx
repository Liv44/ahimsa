import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import HistoryDiscussionItem from '@/components/Profile/HistoryDiscussionItem';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import useGetDiscussions from '@/hooks/discussion/useGetDiscussions';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const HistoryCard = () => {
  const { t } = useTranslation();
  const { discussions, isPending } = useGetDiscussions();

  return (
    <Card className="flex flex-col gap-2 p-2 md:p-4 mx-auto md:min-w-xl">
      <CardHeader>
        <CardTitle>{t('profile-page.history-title')}</CardTitle>
        <CardDescription>
          {t('profile-page.history-description')}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2 p-1">
        {isPending === true && discussions.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Loader2
              className="animate-spin"
              aria-label={t('profile-page.loading-spinner')}
              aria-hidden={false}
            />
          </div>
        ) : discussions.length > 0 ? (
          <ScrollArea className="max-h-[500px] h-full w-full p-4">
            <ul className="flex flex-col gap-2">
              {discussions.map((discussion) => {
                if (discussion && discussion.updatedAt) {
                  return (
                    <HistoryDiscussionItem
                      key={discussion.id}
                      discussion={discussion}
                    />
                  );
                }
              })}
            </ul>
          </ScrollArea>
        ) : (
          <div className="flex flex-col justify-center items-center h-full gap-4">
            <p>{t('profile-page.history-empty-state')}</p>
            <Button asChild>
              <Link to="/discussion/create">
                {t('profile-page.history-empty-state-button')}
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
