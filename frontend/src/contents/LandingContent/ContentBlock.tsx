import { Button } from '@/components/ui/button';
import React from 'react';

interface ContentBlockProps {
  title: string;
  descriptions: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageLeft?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  descriptions,
  imageSrc,
  imageAlt,
  imageLeft = false,
  buttonText,
  onClick,
}) => {
  return (
    <div
      data-testid="divContentBlock"
      className={`flex flex-col md:flex-row items-center gap-10 ${
        imageLeft ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {imageSrc && (
        <img
          data-testid="imgContentBlock"
          src={imageSrc}
          alt={imageAlt || ''}
          className="max-w-[500px] w-full md:w-auto h-auto object-cover rounded-2xl"
        />
      )}
      <div className="flex flex-col gap-4 items-center flex-1">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="text-lg leading-6 text-start">
          {descriptions.map((description, index) => (
            <p key={index} className="mb-4">
              {description}
            </p>
          ))}
        </div>
        {buttonText && (
          <Button className="w-fit" onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContentBlock;
