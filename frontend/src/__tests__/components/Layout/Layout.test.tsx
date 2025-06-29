import Layout from '@/components/Layout/Layout';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Wrapper pour fournir le contexte React Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('LayoutLink', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    renderWithRouter(
      <Layout>
        <div data-testid="test-child">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders logo in header', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const logo = screen.getByAltText('');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src');
  });

  it('renders navigation links', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    const labelHome = screen.getAllByText('layout.navigation.home');
    const labelLogin = screen.getAllByText('layout.navigation.login');
    const labelFeelingsList = screen.getAllByText(
      'layout.navigation.feelings-list'
    );

    expect(labelHome).toHaveLength(2);
    expect(labelLogin).toHaveLength(2);
    expect(labelFeelingsList).toHaveLength(2);
  });

  it('renders footer content', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText('layout.footer.title')).toBeInTheDocument();
    expect(screen.getByText('layout.footer.description')).toBeInTheDocument();
    expect(
      screen.getByText('layout.footer.navigation.title')
    ).toBeInTheDocument();
    expect(screen.getByText('layout.footer.contact.title')).toBeInTheDocument();
    expect(
      screen.getByText('layout.footer.contact.description')
    ).toBeInTheDocument();
    expect(screen.getByText('layout.footer.copyright')).toBeInTheDocument();
  });

  it('has correct layout structure', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const header = screen.getByRole('banner');
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('logo links to home page', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const logoLink = screen.getByRole('link', { name: '' });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('navigation links have correct paths', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(7);

    const iconLink = links[0];
    const firstHomeLink = links[1];
    const firstFeelingsListLink = links[2];
    const firstLoginLink = links[3];

    const secondHomeLink = links[4];
    const secondFeelingsListLink = links[5];
    const secondLoginLink = links[6];

    expect(iconLink).toHaveAttribute('href', '/');

    expect(firstHomeLink).toHaveAttribute('href', '/');
    expect(firstLoginLink).toHaveAttribute('href', '/login');
    expect(firstFeelingsListLink).toHaveAttribute('href', '/feelings-list');

    expect(secondHomeLink).toHaveAttribute('href', '/');
    expect(secondLoginLink).toHaveAttribute('href', '/login');
    expect(secondFeelingsListLink).toHaveAttribute('href', '/feelings-list');
  });

  it('has responsive design classes', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const header = screen.getByRole('banner');
    const nav = header.querySelector('nav');

    expect(nav).toHaveClass(
      'max-w-7xl',
      'mx-auto',
      'px-4',
      'sm:px-6',
      'lg:px-8'
    );
  });

  it('has mobile menu button', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
  });

  it('has footer grid layout', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const footer = screen.getByRole('contentinfo');
    const gridContainer = footer.querySelector('.grid');

    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-3');
  });
});
