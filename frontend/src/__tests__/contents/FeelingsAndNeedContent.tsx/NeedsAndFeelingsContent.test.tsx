import NeedsAndFeelingsContent from '@/contents/NeedAndFeelingsContent/NeedsAndFeelingsContent';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

vitest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'feelings-list-page.needs.title': 'Title Needs',
        'feelings-list-page.needs.description': 'Description Needs',
        'feelings-list-page.feelings.title': 'Title Feelings',
        'feelings-list-page.feelings.description': 'Description Feelings',
      };
      return translations[key];
    },
  }),
}));

describe('NeedsAndFeelingsContent', () => {
  it('renders component with correct props for needs', () => {
    render(<NeedsAndFeelingsContent keyTranslation="needs" />);

    const feelingCategory = screen.getAllByTestId('feeling-category');
    expect(feelingCategory).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Title Needs'
    );
    expect(screen.getByText('Description Needs')).toBeInTheDocument();

    const feelingCard = screen.getAllByTestId('feeling-category');
    expect(feelingCard).toHaveLength(1);
  });

  it('renders component with correct props for feelings', () => {
    render(<NeedsAndFeelingsContent keyTranslation="feelings" />);

    const feelingCategory = screen.getAllByTestId('feeling-category');
    expect(feelingCategory).toHaveLength(2);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Title Feelings'
    );
    expect(screen.getByText('Description Feelings')).toBeInTheDocument();

    const feelingCard = screen.getAllByTestId('feeling-category');
    expect(feelingCard).toHaveLength(2);
  });
});
