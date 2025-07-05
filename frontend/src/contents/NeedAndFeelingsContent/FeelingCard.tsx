import { Button } from '@/components/ui/button';
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
      <CardHeader className="flex flex-row items-center justify-between">
        <h4 className="text-lg font-bold">{title}</h4>
        <div className="flex flex-row items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={
              isOpen
                ? t('feelings-list-page.hide-words')
                : t('feelings-list-page.show-words')
            }
          >
            {isOpen ? (
              <MinusIcon className="w-4 h-4" aria-hidden="true" />
            ) : (
              <PlusIcon className="w-4 h-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent aria-live="polite">
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {words.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
};

export default FeelingCard;
