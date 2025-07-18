import { renderWithRouter } from '@/__tests__/utils';
import LandingContent from '@/contents/LandingContent';
import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vitest } from 'vitest';

// Mock des images (pour éviter les erreurs d'import)
vitest.mock('@/assets/illus/isolation.png', () => ({
  default: 'isolation.png',
}));
vitest.mock('@/assets/illus/group-discussion.png', () => ({
  default: 'group-discussion.png',
}));
vitest.mock('@/assets/illus/marshall-rosenberg.png', () => ({
  default: 'marshall-rosenberg.png',
}));

// Mock de window.location.href
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

// Mock de useTranslation
vitest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'landing.hero.title': 'Titre Hero',
        'landing.hero.descriptions': ['Desc Hero 1', 'Desc Hero 2'],
        'landing.hero.linkText': 'Bouton Hero',
        'landing.hero.hrefLink': '/hero',
        'landing.block1.title': 'Titre Bloc 1',
        'landing.block1.descriptions': ['Desc Bloc 1'],
        'landing.block2.title': 'Titre Bloc 2',
        'landing.block2.descriptions': ['Desc Bloc 2'],
        'landing.block3.title': 'Titre Bloc 3',
        'landing.block3.descriptions': ['Desc Bloc 3'],
        'landing.ofnr_method.title': 'Title Method Card',
        'landing.ofnr_method.description': 'Desc Method Card',
        'landing.ofnr_method.observation.title': 'Title Observation',
        'landing.ofnr_method.observation.description': 'Desc Observation',
        'landing.ofnr_method.observation.example': 'Example Observation',
        'landing.ofnr_method.feelings.title': 'Title Feelings',
        'landing.ofnr_method.feelings.description': 'Desc Feelings',
        'landing.ofnr_method.feelings.example': 'Example Feelings',
        'landing.ofnr_method.needs.title': 'Title Needs',
        'landing.ofnr_method.needs.description': 'Desc Needs',
        'landing.ofnr_method.needs.example': 'Example Needs',
        'landing.ofnr_method.request.title': 'Title Request',
        'landing.ofnr_method.request.description': 'Desc Request',
        'landing.ofnr_method.request.example': 'Example Request',
      };
      return translations[key];
    },
  }),
}));

describe('LandingContent', () => {
  beforeEach(() => {
    // Reset mock location before each test
    mockLocation.href = '';
  });

  it('rend tous les ContentBlock avec les bonnes props', () => {
    renderWithRouter(<LandingContent />);

    // Hero block
    expect(screen.getByText('Titre Hero')).toBeInTheDocument();
    expect(screen.getByText('Desc Hero 1')).toBeInTheDocument();
    expect(screen.getByText('Desc Hero 2')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Bouton Hero' })
    ).toBeInTheDocument();

    // Bloc 1
    expect(screen.getByText('Titre Bloc 1')).toBeInTheDocument();
    expect(screen.getByText('Desc Bloc 1')).toBeInTheDocument();

    // Bloc 2
    expect(screen.getByText('Titre Bloc 2')).toBeInTheDocument();
    expect(screen.getByText('Desc Bloc 2')).toBeInTheDocument();

    const images = screen.getAllByTestId('imgContentBlock');
    expect(images[0]).toHaveAttribute('src', 'group-discussion.png');
    expect(images[1]).toHaveAttribute('src', 'isolation.png');
    expect(images[2]).toHaveAttribute('src', 'marshall-rosenberg.png');
  });

  it('vérifie la position des images (imageLeft)', () => {
    renderWithRouter(<LandingContent />);
    const blocks = screen.getAllByTestId('divContentBlock');
    // Premier et troisième block doivent avoir flexDirection row-reverse
    expect(blocks[0]).toHaveClass('md:flex-row-reverse');
    expect(blocks[2]).toHaveClass('md:flex-row-reverse');
    // Le deuxième block doit avoir flexDirection row
    expect(blocks[1]).toHaveClass('md:flex-row');
  });

  it('check number of links rendered', () => {
    renderWithRouter(<LandingContent />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('Bouton Hero');
  });

  it('check that all images have an empty alt text', () => {
    renderWithRouter(<LandingContent />);

    const images = screen.getAllByTestId('imgContentBlock');
    images.forEach((image) => {
      expect(image).toHaveAttribute('alt', '');
    });
  });

  it('Renders Method Cards list', () => {
    renderWithRouter(<LandingContent />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const methodCards = screen.getAllByTestId('method-card');
    expect(methodCards).toHaveLength(4);

    expect(methodCards[0]).toBeInTheDocument();
    expect(methodCards[1]).toBeInTheDocument();
    expect(methodCards[2]).toBeInTheDocument();
    expect(methodCards[3]).toBeInTheDocument();

    // Method Card
    expect(methodCards[0]).toHaveTextContent('Title Observation');
    expect(methodCards[0]).toHaveTextContent('Desc Observation');
    expect(methodCards[0]).toHaveTextContent('Example Observation');

    expect(methodCards[1]).toHaveTextContent('Title Feelings');
    expect(methodCards[1]).toHaveTextContent('Desc Feelings');
    expect(methodCards[1]).toHaveTextContent('Example Feelings');

    expect(methodCards[2]).toHaveTextContent('Title Needs');
    expect(methodCards[2]).toHaveTextContent('Desc Needs');
    expect(methodCards[2]).toHaveTextContent('Example Needs');

    expect(methodCards[3]).toHaveTextContent('Title Request');
    expect(methodCards[3]).toHaveTextContent('Desc Request');
    expect(methodCards[3]).toHaveTextContent('Example Request');
  });
});
