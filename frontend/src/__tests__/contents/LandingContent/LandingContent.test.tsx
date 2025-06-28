import LandingContent from '@/contents/LandingContent/LandingContent';
import { render, screen } from '@testing-library/react';
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
        'landing.hero.buttonText': 'Bouton Hero',
        'landing.hero.buttonLink': '/hero',
        'landing.block1.title': 'Titre Bloc 1',
        'landing.block1.descriptions': ['Desc Bloc 1'],
        'landing.block1.buttonText': undefined,
        'landing.block1.buttonLink': undefined,
        'landing.block2.title': 'Titre Bloc 2',
        'landing.block2.descriptions': ['Desc Bloc 2'],
        'landing.block2.buttonText': undefined,
        'landing.block2.buttonLink': undefined,
        'landing.block3.title': 'Titre Bloc 3',
        'landing.block3.descriptions': ['Desc Bloc 3'],
        'landing.block3.buttonText': undefined,
        'landing.block3.buttonLink': undefined,
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
    render(<LandingContent />);

    // Hero block
    expect(screen.getByText('Titre Hero')).toBeInTheDocument();
    expect(screen.getByText('Desc Hero 1')).toBeInTheDocument();
    expect(screen.getByText('Desc Hero 2')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Bouton Hero' })
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
    render(<LandingContent />);
    const blocks = screen.getAllByTestId('divContentBlock');
    // Premier et troisième block doivent avoir flexDirection row-reverse
    expect(blocks[0]).toHaveClass('md:flex-row-reverse');
    expect(blocks[2]).toHaveClass('md:flex-row-reverse');
    // Le deuxième block doit avoir flexDirection row
    expect(blocks[1]).toHaveClass('md:flex-row');
  });

  it('vérifie que le bouton du hero block a un onClick qui redirige vers /contact', () => {
    render(<LandingContent />);

    const heroButton = screen.getByRole('button', { name: 'Bouton Hero' });
    expect(heroButton).toBeInTheDocument();

    // Simule le clic sur le bouton
    heroButton.click();

    // Vérifie que window.location.href a été modifié
    expect(mockLocation.href).toBe('/contact');
  });

  it("vérifie que les blocs 1 et 2 n'ont pas de bouton", () => {
    render(<LandingContent />);

    // Il ne doit y avoir qu'un seul bouton (celui du hero)
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent('Bouton Hero');
  });

  it('vérifie que tous les images ont un alt vide', () => {
    render(<LandingContent />);

    const images = screen.getAllByTestId('imgContentBlock');
    images.forEach((image) => {
      expect(image).toHaveAttribute('alt', '');
    });
  });
});
