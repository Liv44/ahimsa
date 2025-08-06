import React from 'react';
import { Link } from 'react-router-dom';

interface ContentBlockProps {
  title: string;
  descriptions: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageLeft?: boolean;
  linkText?: string;
  hrefLink?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  descriptions,
  imageSrc,
  imageAlt,
  imageLeft = false,
  linkText,
  hrefLink,
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
          loading="lazy"
          decoding="async"
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
        {hrefLink && (
          <Link
            className="w-fit text-dark-blue border border-dark-blue p-2 rounded-md hover:bg-dark-blue hover:text-white transition-all duration-300"
            to={hrefLink}
          >
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ContentBlock;
