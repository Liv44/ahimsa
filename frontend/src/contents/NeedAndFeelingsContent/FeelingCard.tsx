import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

interface FeelingCardProps {
  title: string;
  words: string[];
}

const FeelingCard = ({ title, words }: FeelingCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex flex-row items-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <MinusIcon className="w-4 h-4" />
            ) : (
              <PlusIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {words.map((word) => (
            <p className="mb-2 text-center">{word}</p>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default FeelingCard;
