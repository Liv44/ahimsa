import { FeelingCard } from '@/contents/NeedAndFeelingsContent';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

vitest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'feelings-list-page.show-words': 'Afficher les mots',
        'feelings-list-page.hide-words': 'Cacher les mots',
      };
      return translations[key];
    },
  }),
}));

describe('FeelingCard', () => {
  it('renders component with correct props', () => {
    render(<FeelingCard title="Title" words={['word 1', 'word 2']} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAccessibleName('Afficher les mots');
  });

  it('check that words are displayed when button is clicked', () => {
    render(<FeelingCard title="Title" words={['word 1', 'word 2']} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toHaveAccessibleName('Cacher les mots');
    expect(screen.getByRole('list')).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('word 1');
    expect(listItems[1]).toHaveTextContent('word 2');
  });

  it('check that words are not displayed when button is clicked', () => {
    render(<FeelingCard title="Title" words={['word 1', 'word 2']} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).toHaveAccessibleName('Afficher les mots');
    expect(screen.queryByText('word 1')).not.toBeInTheDocument();
    expect(screen.queryByText('word 2')).not.toBeInTheDocument();
  });
});
