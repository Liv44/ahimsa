import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface ChooseWordsCategoryProps {
  category: string;
  words: string[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
    <li className="flex flex-col gap-2 border border-gray-200 rounded-md p-1">
      <Button
        className="text-start justify-between"
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
      <ul className={`${isOpen ? 'block' : 'hidden'} flex flex-col gap-2 p-2`}>
        {words.map((item, index) => {
          return (
            <li className="flex items-center gap-3">
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
    </li>
  );
};

export default WordCategorySection;
