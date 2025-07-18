import { renderWithRouter } from '@/__tests__/utils';
import Layout from '@/components/Layout/Layout';
import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  useAuth: vi.fn().mockReturnValue({
    user: null,
    loading: false,
  }),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: mocks.useAuth,
}));

describe('LayoutLink', () => {
  beforeEach(() => {
    mocks.useAuth.mockReset();
    mocks.useAuth.mockReturnValue({
      user: null,
      loading: false,
    });
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
    const labelDiscussion = screen.getAllByText('layout.navigation.discussion');
    const labelFeelingsList = screen.getAllByText(
      'layout.navigation.feelings-list'
    );

    expect(labelHome).toHaveLength(2);
    expect(labelLogin).toHaveLength(2);
    expect(labelFeelingsList).toHaveLength(2);
    expect(labelDiscussion).toHaveLength(2);
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

    const logoLink = screen.getByRole('link', {
      name: 'layout.navigation.aria-label.home',
    });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('navigation links have correct paths', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(9);

    const iconLink = links[0];
    const firstHomeLink = links[1];
    const firstFeelingsListLink = links[2];
    const firstDiscussionLink = links[3];
    const firstLoginLink = links[4];

    const secondHomeLink = links[5];
    const secondFeelingsListLink = links[6];
    const secondDiscussionLink = links[7];
    const secondLoginLink = links[8];

    expect(iconLink).toHaveAttribute('href', '/');

    expect(firstHomeLink).toHaveAttribute('href', '/');
    expect(firstLoginLink).toHaveAttribute('href', '/login');
    expect(firstDiscussionLink).toHaveAttribute('href', '/discussion');
    expect(firstFeelingsListLink).toHaveAttribute('href', '/feelings-list');

    expect(secondHomeLink).toHaveAttribute('href', '/');
    expect(secondLoginLink).toHaveAttribute('href', '/login');
    expect(secondDiscussionLink).toHaveAttribute('href', '/discussion');
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
    expect(menuButton).toHaveAttribute(
      'aria-label',
      'layout.navigation.aria-label.menu-button-open'
    );

    const menuButtonOpen = screen.getByTestId('menu-button-open');
    expect(menuButtonOpen).toBeInTheDocument();
    expect(menuButtonOpen).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute(
      'aria-label',
      'layout.navigation.aria-label.menu-button-close'
    );

    const menuButtonClose = screen.getByTestId('menu-button-close');
    expect(menuButtonClose).toBeInTheDocument();
    expect(menuButtonClose).toHaveAttribute('aria-hidden', 'true');
  });

  it('has footer grid layout', () => {
    renderWithRouter(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const footer = screen.getByRole('contentinfo');
    const gridContainer = footer.querySelector('.grid');

    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2');
  });

  it('when path is /login and location is /register, link must be active', () => {
    vi.mock('react-router-dom', async (importOriginal) => {
      const actual = (await importOriginal()) as typeof importOriginal;
      return {
        ...actual,
        useLocation: () => ({
          pathname: '/register',
        }),
      };
    });

    renderWithRouter(<Layout>Test Content</Layout>);

    const link = screen.getAllByRole('link', {
      name: 'layout.navigation.login',
    })[0];

    expect(link).toHaveClass('font-extrabold');
  });

  it('when user is logged in, profile link must be here', () => {
    mocks.useAuth.mockReturnValue({ user: { email: 'test@test.com' } });

    renderWithRouter(<Layout>Test Content</Layout>);

    const links = screen.getAllByRole('link', {
      name: 'layout.navigation.profile',
    });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/profile');
    expect(links[1]).toHaveAttribute('href', '/profile');
  });
});
