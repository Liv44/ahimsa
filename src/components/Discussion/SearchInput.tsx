import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import React from 'react';

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Search = ({
  className,
  ref,
  ...props
}: React.ComponentProps<'input'>) => {
  return (
    <div
      className={cn(
        'flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
        className
      )}
    >
      <SearchIcon className="h-[16px] w-[16px]" />
      <input
        {...props}
        type="search"
        ref={ref}
        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
};

Search.displayName = 'Search';

export { Search };
