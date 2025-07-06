import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FeelingCardProps {
  title: string;
  words: string[];
}

const FeelingCard = ({ title, words }: FeelingCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <Card data-testid="feeling-card">
      <CardHeader
        className="flex flex-row items-center justify-between py-2"
        role="button"
        aria-expanded={isOpen}
        aria-controls={`${title.toLowerCase()}-content`}
        aria-label={
          isOpen
            ? t('feelings-list-page.hide-words', { word: title })
            : t('feelings-list-page.show-words', { word: title })
        }
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsOpen(!isOpen);
          }
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-bold">{title}</h4>
        <div className="flex flex-row items-center gap-2">
          {isOpen ? (
            <MinusIcon className="w-4 h-4" aria-hidden="true" />
          ) : (
            <PlusIcon className="w-4 h-4" aria-hidden="true" />
          )}
        </div>
      </CardHeader>

      <CardContent
        aria-live="polite"
        aria-hidden={!isOpen}
        className={!isOpen ? 'hidden' : ''}
        id={`${title.toLowerCase()}-content`}
        data-testid="feeling-card-content"
      >
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {words.map((word, index) => (
            <li key={word + index}>{word}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FeelingCard;
