import { renderWithRouter } from '@/__tests__/utils';
import Introduction from '@/contents/DiscussionContent/Introduction';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'discussion-page.example.examples': ['exemple 1', 'exemple 2'],
        'discussion-page.example.title': 'Titre exemples',
        'discussion-page.description': 'Description',
        'discussion-page.button-start': 'Commencer',
      };
      return translations[key];
    },
  }),
}));

describe('Introduction', () => {
  it('renders component with correct trads', () => {
    renderWithRouter(<Introduction />);
    expect(screen.getByRole('heading')).toHaveTextContent('Titre exemples');
    expect(screen.getByText('Description')).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveTextContent('Commencer');

    const examples = screen.getAllByRole('listitem');
    expect(examples).toHaveLength(2);
    expect(examples[0]).toHaveTextContent('exemple 1');
    expect(examples[1]).toHaveTextContent('exemple 2');
  });
});
