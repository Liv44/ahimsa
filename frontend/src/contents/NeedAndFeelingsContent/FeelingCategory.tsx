import { useTranslation } from 'react-i18next';
import { FeelingCard } from '.';

interface FeelingCategoryProps {
  keyTranslation: string;
  category?: string;
}

const FeelingCategory = ({
  keyTranslation,
  category,
}: FeelingCategoryProps) => {
  const { t } = useTranslation();

  const subCategoryKeyTranslation =
    keyTranslation === 'needs' ? '' : '.' + category;
  const subCategories = t(`${keyTranslation}${subCategoryKeyTranslation}`, {
    returnObjects: true,
  }) as { category: string; words: string[] }[];
  return (
    <div
      className="flex flex-col gap-2"
      key={category}
      data-testid="feeling-category"
    >
      <h3 className="text-lg font-bold mb-2">
        {t(
          `feelings-list-page.${keyTranslation}${subCategoryKeyTranslation}.title`
        )}
      </h3>
      {subCategories && Array.isArray(subCategories) && (
        <ul className="flex flex-col gap-2">
          {subCategories.map((subCategory) => (
            <li key={subCategory.category}>
              <FeelingCard
                title={subCategory.category}
                words={subCategory.words}
                key={subCategory.category}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeelingCategory;
