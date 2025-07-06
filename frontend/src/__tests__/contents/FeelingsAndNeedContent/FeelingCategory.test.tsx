import FeelingCategory from '@/contents/NeedAndFeelingsContent/FeelingCategory';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

vitest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'feelings-list-page.needs.title': 'Title Needs Met',
        'feelings-list-page.feelings.category1Test.title': 'Title Feelings 1',
        'feelings-list-page.feelings.category2Test.title': 'Title Feelings 2',
        needs: [
          {
            category: 'Category 1',
            words: [],
          },
          {
            category: 'Category 2',
            words: [],
          },
        ],
        'feelings.category1Test': [
          {
            category: 'subCategory 1',
            words: [],
          },
          {
            category: 'subCategory 2',
            words: [],
          },
        ],
        'feelings.category2Test': [
          {
            category: 'subCategory 3',
            words: [],
          },
        ],
      };
      return translations[key];
    },
  }),
}));

describe('FeelingCategory', () => {
  it('renders component with correct props for needs', () => {
    render(<FeelingCategory keyTranslation="needs" category="needs_met" />);

    expect(screen.getByText('Title Needs Met')).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Category 1');
    expect(listItems[1]).toHaveTextContent('Category 2');
  });

  it('renders component with correct props for feelings', () => {
    render(
      <FeelingCategory keyTranslation="feelings" category="category1Test" />
    );

    expect(screen.getByText('Title Feelings 1')).toBeInTheDocument();
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('subCategory 1');
    expect(listItems[1]).toHaveTextContent('subCategory 2');
  });
});
