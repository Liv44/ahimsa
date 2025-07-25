import ProfileContent from '@/contents/ProfileContent/ProfileContent';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const signOutMock = vi.hoisted(() => vi.fn());

const mocks = vi.hoisted(() => ({
  useAuth: vi.fn().mockReturnValue({
    user: null,
    loading: false,
    signOut: signOutMock,
  }),
}));

vi.mock('@/hooks/auth/useAuth', () => ({
  useAuth: mocks.useAuth,
}));

vi.mock('@/components/Profile/HistoryCard', () => ({
  default: () => <div>History Card</div>,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'profile-page.title': 'Titre Profile',
        'profile-page.email': 'Email',
        'profile-page.pseudo': 'Pseudo',
        'profile-page.sign-out': 'Sign Out',
        'profile-page.loading-spinner': 'Loading...',
        'profile-page.history-title': 'Discussions',
        'profile-page.history-description': 'Description',
      };
      return translations[key];
    },
  }),
}));

describe('ProfileContent', () => {
  beforeEach(() => {
    mocks.useAuth.mockClear();
  });

  it('should display the user email and pseudo', () => {
    mocks.useAuth.mockReturnValue({
      user: { email: 'test@test.com', user_metadata: { display_name: 'test' } },
      loading: false,
      signOut: vi.fn(),
    });
    render(<ProfileContent />);
    expect(screen.getByText('Titre Profile')).toBeInTheDocument();
    expect(screen.getByText('Email : test@test.com')).toBeInTheDocument();
    expect(screen.getByText('Pseudo : test')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByText('History Card')).toBeInTheDocument();
  });

  it('should display a loading spinner if the user is loading', () => {
    mocks.useAuth.mockReturnValue({
      user: null,
      loading: true,
      signOut: vi.fn(),
    });
    render(<ProfileContent />);
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });

  it('should sign out the user', () => {
    mocks.useAuth.mockReturnValue({
      user: { email: 'test@test.com', user_metadata: { display_name: 'test' } },
      loading: false,
      signOut: signOutMock,
    });
    render(<ProfileContent />);
    fireEvent.click(screen.getByText('Sign Out'));
    expect(signOutMock).toHaveBeenCalled();
  });
});
