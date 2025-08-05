import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Discussion from '@/domain/entities/Discussion';
import { discussionStore } from '@/hooks/discussion/useDiscussionStore';

const Introduction = () => {
  const { t } = useTranslation();

  const examples = t('discussion-page.example.examples', {
    returnObjects: true,
  }) as string[];

  return (
    <div className="flex flex-col gap-4 max-w-250 mx-auto p-4">
      <p className="text-md">{t('discussion-page.description')}</p>
      <Button
        asChild
        className="mx-auto"
        onClick={() => {
          discussionStore.setState({
            isStarted: true,
            isCompleted: false,
            activeStep: 0,
            discussion: Discussion.reset(),
          });
        }}
      >
        <Link to="/discussion/create">{t('discussion-page.button-start')}</Link>
      </Button>
      <h2 className="text-lg font-bold">
        {t('discussion-page.example.title')}
      </h2>
      <ul className="flex flex-col gap-4 text-sm">
        {examples.map((example) => (
          <>
            <li>{example}</li>
            <Separator />
          </>
        ))}
      </ul>
    </div>
  );
};

export default Introduction;
