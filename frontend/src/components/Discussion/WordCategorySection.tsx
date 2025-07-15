import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface ChooseWordsCategoryProps {
  category: string;
  words: string[];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedWords: string[];
  setSelectedWords: (words: string[]) => void;
}

const WordCategorySection = ({
  category,
  words,
  isOpen,
  setIsOpen,
  selectedWords,
  setSelectedWords,
}: ChooseWordsCategoryProps) => {
  const handleCheckboxChange = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((item) => item !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  return (
    <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-1">
      <Button
        className="text-start justify-between"
        aria-expanded={isOpen}
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
      >
        {category}
        {isOpen ? (
          <ChevronDown className="ml-2" />
        ) : (
          <ChevronRight className="ml-2" />
        )}
      </Button>
      <ul
        className={`${isOpen ? 'block' : 'hidden'} flex flex-col gap-2 p-2`}
        aria-hidden={!isOpen}
        data-testid="word-category-list"
      >
        {words.map((item, index) => {
          return (
            <li className="flex items-center gap-3" key={`${item}-${index}`}>
              <Checkbox
                id={`${item}-${index}`}
                onClick={() => handleCheckboxChange(item)}
                checked={selectedWords.includes(item)}
              />
              <Label htmlFor={`${item}-${index}`}>{item}</Label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WordCategorySection;
