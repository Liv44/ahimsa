import LayoutLink from '@/components/Layout/LayoutLink';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Wrapper pour fournir le contexte React Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('LayoutLink', () => {
  const mockSetIsMenuOpen = vi.fn();
  const mockIsActive = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays label correctly', () => {
    renderWithRouter(
      <LayoutLink
        path="/test"
        label="Test Link"
        isActive={mockIsActive}
        setIsMenuOpen={mockSetIsMenuOpen}
      />
    );

    expect(screen.getByText('Test Link')).toBeDefined();
  });

  it('displays link with right path', () => {
    renderWithRouter(
      <LayoutLink
        path="/test"
        label="Test Link"
        isActive={mockIsActive}
        setIsMenuOpen={mockSetIsMenuOpen}
      />
    );

    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toHaveAttribute('href', '/test');
  });

  it('when link is active, text must be bold', () => {
    mockIsActive.mockReturnValue(true);

    renderWithRouter(
      <LayoutLink
        path="/test"
        label="Test Link"
        isActive={mockIsActive}
        setIsMenuOpen={mockSetIsMenuOpen}
      />
    );

    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toHaveClass('font-extrabold');
  });

  it('when link is inactive, text must be normal', () => {
    mockIsActive.mockReturnValue(false);

    renderWithRouter(
      <LayoutLink
        path="/test"
        label="Test Link"
        isActive={mockIsActive}
        setIsMenuOpen={mockSetIsMenuOpen}
      />
    );

    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toHaveClass('font-normal');
  });

  it('when link is clicked, call setIsMenuOpen with false', () => {
    renderWithRouter(
      <LayoutLink
        path="/test"
        label="Test Link"
        isActive={mockIsActive}
        setIsMenuOpen={mockSetIsMenuOpen}
      />
    );

    const link = screen.getByRole('link', { name: 'Test Link' });
    link.click();

    expect(mockSetIsMenuOpen).toHaveBeenCalledWith(false);
  });

  it('get classes', () => {
    renderWithRouter(
      <LayoutLink
        path="/test"
        label="Test Link"
        isActive={mockIsActive}
        setIsMenuOpen={mockSetIsMenuOpen}
      />
    );

    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toHaveClass(
      'block',
      'px-3',
      'py-2',
      'text-base',
      'font-medium',
      'text-white',
      'hover:text-light-orange',
      'hover:underline'
    );
  });
});
