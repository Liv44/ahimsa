import { useTranslation } from 'react-i18next';
import FeelingCategory from './FeelingCategory';

interface NeedsAndFeelingsContent {
  keyTranslation: 'feelings' | 'needs';
}

const NeedsAndFeelingsContent = ({
  keyTranslation,
}: NeedsAndFeelingsContent) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-bold">
        {t(`feelings-list-page.${keyTranslation}.title`)}
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        {t(`feelings-list-page.${keyTranslation}.description`)}
      </p>
      {keyTranslation === 'needs' ? (
        <FeelingCategory keyTranslation={keyTranslation} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['needs_met', 'needs_unmet'].map((key) => {
            return (
              <FeelingCategory
                key={key}
                keyTranslation={keyTranslation}
                category={key}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NeedsAndFeelingsContent;
