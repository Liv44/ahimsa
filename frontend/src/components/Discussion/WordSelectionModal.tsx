import SelectableWord from '@/domain/entities/SelectableWord';
import { DiscussionStepKey } from '@/domain/entities/Step';
import WordCollection from '@/domain/entities/WordCollection';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import WordCategorySection from './WordCategorySection';

const WordSelectionModal = ({
  translationKey,
  activeStep,
  currentContent,
  setContent,
}: {
  translationKey: DiscussionStepKey;
  activeStep: number;
  currentContent: string;
  setContent: (value: string[] | ((prev: string[]) => string[])) => void;
}) => {
  const { t: t1 } = useTranslation();
  const { t: t2 } = useTranslation('feelings_and_needs');
  const feelings = (
    t2(translationKey, {
      returnObjects: true,
    }) as { category: string; content: string }[]
  ).map((word) => {
    return SelectableWord.create(word.content, word.category);
  });

  const chosenWords = new WordCollection({ words: feelings });

  const categories = chosenWords.getAllCategories();

  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleAddWordsToDiscussion = () => {
    setContent((prev) => {
      const newContent = [...prev];
      if (currentContent && currentContent.length > 0) {
        newContent[activeStep] =
          currentContent + ' ' + selectedWords.join(', ');
      } else {
        newContent[activeStep] =
          t1(`discussion-page.step.modal.${translationKey}-start-phrase`) +
          selectedWords.join(', ');
      }
      return newContent;
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t1('discussion-page.step.modal.title')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t1('discussion-page.step.modal.title')}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t1('discussion-page.step.modal.description')}
        </DialogDescription>
        <Separator className="mt-2" />
        <div className="m-2">
          <ul
            className="grid grid-cols-2 items-start gap-4 overflow-auto max-h-80 p-2"
            aria-pressed="true"
          >
            {categories.map((category, index) => (
              <WordCategorySection
                key={category + index}
                category={category}
                words={chosenWords.getWordsByCategory(category)}
                isOpen={selectedCategories.includes(category)}
                setIsOpen={() =>
                  setSelectedCategories(
                    selectedCategories.includes(category)
                      ? selectedCategories.filter((item) => item !== category)
                      : [...selectedCategories, category]
                  )
                }
                selectedWords={selectedWords}
                setSelectedWords={setSelectedWords}
              />
            ))}
          </ul>
          <Separator className="mt-2" />
          <div className="flex flex-wrap gap-1 mt-4">
            {selectedWords.map((word) => (
              <Badge key={word} variant={'outline'} data-testid="badge">
                {word}
                <Button
                  variant="ghost"
                  size="icon"
                  className=" size-3"
                  onClick={() => {
                    setSelectedWords(
                      selectedWords.filter((item) => item !== word)
                    );
                  }}
                  aria-label={
                    t1('discussion-page.step.modal.button-delete') + ' ' + word
                  }
                >
                  <CircleX className="size-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose onClick={() => setSelectedWords([])} asChild>
            <Button variant="ghost">
              {t1('discussion-page.step.modal.button-cancel')}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="default" onClick={handleAddWordsToDiscussion}>
              {t1('discussion-page.step.modal.button-confirm')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WordSelectionModal;
