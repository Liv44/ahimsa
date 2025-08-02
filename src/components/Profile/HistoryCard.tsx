import useGetDiscussions from '@/hooks/discussion/useGetDiscussions';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import HistoryDiscussionItem from './HistoryDiscussionItem';

const HistoryCard = () => {
  const { t } = useTranslation();
  const { discussions, isPending, error } = useGetDiscussions();

  useEffect(() => {
    console.log({ isPending, error });
  }, [isPending, error, discussions]);

  return (
    <Card className="flex flex-col gap-2 p-2 md:p-4 ">
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
        ) : (
          <ScrollArea className="h-[500px] w-full p-4">
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
        )}
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
