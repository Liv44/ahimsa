import NeedsAndFeelingsContent from '@/contents/NeedAndFeelingsContent/NeedsAndFeelingsContent';
import { useTranslation } from 'react-i18next';

const NeedsAndFeelingsListPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        {t('feelings-list-page.title')}
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        {t('feelings-list-page.description')}
      </p>
      <div className="flex flex-col gap-8 mb-8">
        <NeedsAndFeelingsContent keyTranslation="feelings" />
        <NeedsAndFeelingsContent keyTranslation="needs" />
      </div>
    </div>
  );
};

export default NeedsAndFeelingsListPage;
