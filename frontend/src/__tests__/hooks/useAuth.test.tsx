import { useAuth } from '@/hooks/useAuth';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    mockGetUser: vi.fn(),
    mockOnAuthStateChange: vi.fn(),
    mockSignOut: vi.fn(),
  };
});

vi.mock('@/config/supabaseConfig', () => ({
  supabase: {
    auth: {
      getUser: mocks.mockGetUser,
      onAuthStateChange: mocks.mockOnAuthStateChange,
      signOut: mocks.mockSignOut,
    },
  },
}));

describe('useAuth', () => {
  beforeEach(() => {
    mocks.mockGetUser.mockReset();
    mocks.mockOnAuthStateChange.mockReset();
  });

  it('return user if connected', async () => {
    const fakeUser = { id: '123', email: 'test@test.com' };
    mocks.mockGetUser.mockResolvedValue({ data: { user: fakeUser } });
    mocks.mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });

    const { result } = renderHook(() => useAuth());
    await act(async () => {});

    expect(result.current.user).toEqual(fakeUser);
    expect(result.current.loading).toBe(false);
  });

  it('returns null if not connected', async () => {
    mocks.mockGetUser.mockResolvedValue({ data: { user: null } });
    mocks.mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });

    const { result } = renderHook(() => useAuth());
    await act(async () => {});

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('refreshes user with refreshUser', async () => {
    const fakeUser = { id: '456', email: 'refresh@test.com' };
    mocks.mockGetUser
      .mockResolvedValueOnce({ data: { user: null } })
      .mockResolvedValueOnce({ data: { user: fakeUser } });

    mocks.mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });

    const { result } = renderHook(() => useAuth());
    await act(async () => {});

    await act(async () => {
      await result.current.refreshUser();
    });

    expect(result.current.user).toEqual(fakeUser);
    expect(result.current.loading).toBe(false);
  });

  it('refreshes user when auth state changes', async () => {
    const fakeUser = { id: '999', email: 'authchange@test.com' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let authStateChangeCallback: any = null;

    mocks.mockGetUser.mockResolvedValue({ data: { user: null } });
    mocks.mockOnAuthStateChange.mockImplementation((cb) => {
      authStateChangeCallback = cb;
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });

    const { result } = renderHook(() => useAuth());

    act(() => {
      authStateChangeCallback('SIGNED_IN', { user: fakeUser });
    });
    expect(result.current.user).toEqual(fakeUser);

    act(() => {
      authStateChangeCallback('SIGNED_OUT', { user: null });
    });
    expect(result.current.user).toBeNull();
  });

  it('sign out', async () => {
    const fakeUser = { id: '123', email: 'test@test.com' };
    mocks.mockGetUser.mockResolvedValue({ data: { user: fakeUser } });
    mocks.mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });

    const { result } = renderHook(() => useAuth());
    await act(async () => {});

    await act(async () => {
      await result.current.signOut();
    });

    expect(mocks.mockSignOut).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
