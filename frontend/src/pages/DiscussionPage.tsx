import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

const DiscussionPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4" aria-live="polite">
      <h1 className="text-2xl font-bold">{t('discussion-page.title')}</h1>
      <Outlet />
    </div>
  );
};

export default DiscussionPage;
