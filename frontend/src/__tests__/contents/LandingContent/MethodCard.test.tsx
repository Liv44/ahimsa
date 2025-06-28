import MethodCard from '@/contents/LandingContent/MethodCard';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

// Mock des images (pour éviter les erreurs d'import)
vitest.mock('@/assets/illus/form.png', () => ({ default: 'form.png' }));
vitest.mock('@/assets/illus/group-discussion.png', () => ({
  default: 'group-discussion.png',
}));
vitest.mock('@/assets/illus/marshall-rosenberg.png', () => ({
  default: 'marshall-rosenberg.png',
}));

describe('MethodCard', () => {
  it('rend le composant avec les bonnes props', () => {
    render(
      <MethodCard title="Méthode" description="Description" example="Exemple" />
    );
    expect(screen.getByTestId('letter')).toHaveTextContent('M');
    expect(screen.getByText('Méthode')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Exemple')).toBeInTheDocument();
  });
});
