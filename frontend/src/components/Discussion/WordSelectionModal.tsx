import SelectableWord from '@/domain/entities/SelectableWord';
import { DiscussionStepKey } from '@/domain/entities/Step';
import WordCollection from '@/domain/entities/WordCollection';
import { Label } from '@radix-ui/react-label';
import { CircleX } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { Search } from './SearchInput';
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

  const chosenWords = useMemo(
    () => WordCollection.create({ words: feelings }),
    []
  );

  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [searchInput, setSearchInput] = useState<string>('');

  const [filteredWords, setFilteredWords] =
    useState<WordCollection>(chosenWords);

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

  const handleSearch = useCallback(
    (word: string) => {
      const filtered = chosenWords.searchWords(word);
      if (filtered.getAllCategories().length < 5) {
        console.log('setSelectedCategories');
        setSelectedCategories(filtered.getAllCategories());
      } else {
        setSelectedCategories([]);
      }
      setFilteredWords(filtered);
    },
    [chosenWords]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, handleSearch]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t1('discussion-page.step.modal.title')}</Button>
      </DialogTrigger>
      <DialogContent className="min-h-150 flex flex-col gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle>{t1('discussion-page.step.modal.title')}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {t1('discussion-page.step.modal.description')}
          </DialogDescription>
          <div>
            {/* Search bar */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-col gap-2">
                <Label className="text-sm sr-only" htmlFor="search">
                  {t1('discussion-page.step.modal.search-placeholder')}
                </Label>
                <Search
                  className="w-full"
                  placeholder={t1(
                    'discussion-page.step.modal.search-placeholder'
                  )}
                  id="search"
                  value={searchInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(searchInput);
                    }
                  }}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                />
              </div>
            </div>
            <Separator className="mt-4" />
            {/* Categories */}
            <ul
              className="grid grid-cols-2 items-start gap-4 overflow-auto max-h-60 p-2"
              aria-pressed="true"
            >
              {filteredWords.getAllCategories().map((category, index) => (
                <WordCategorySection
                  key={category + index}
                  category={category}
                  words={filteredWords.getWordsByCategory(category)}
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
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Separator />
          <div className="flex flex-wrap gap-1">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WordSelectionModal;
