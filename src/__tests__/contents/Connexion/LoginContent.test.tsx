import LoginContent from '@/contents/AuthContent/LoginContent';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    mutateMock: vi.fn(),
    captureError: vi.fn(),
  };
});

vi.mock('@/hooks/useSentry', () => ({
  useSentry: () => ({
    captureError: mocks.captureError,
    setTag: vi.fn(),
    captureMessage: vi.fn(),
  }),
}));

vi.mock('@/domain/usecases/auth/useLogin', () => {
  return {
    default: () => ({
      mutate: mocks.mutateMock,
    }),
  };
});

vi.mock('@/components/Auth/AuthForm', () => ({
  default: ({
    onSubmit,
    emailSent,
    triedToSignin,
    errorSendingEmail,
  }: {
    onSubmit: ({ email }: { email: string }) => void;
    emailSent: boolean;
    triedToSignin: boolean;
    errorSendingEmail: boolean;
  }) => (
    <div data-testid="login-auth-form">
      {emailSent && <p>Email sent</p>}
      {triedToSignin && <p>Error signin in</p>}
      {errorSendingEmail && <p>Error sending email</p>}
      <button onClick={() => onSubmit({ email: 'test@test.com' })}>
        Label Button Login
      </button>
    </div>
  ),
}));

describe('LoginContent', () => {
  beforeEach(() => {
    mocks.mutateMock.mockClear();
  });

  it('has correct inputs', () => {
    render(<LoginContent />);

    const authForm = screen.getByTestId('login-auth-form');
    expect(authForm).toBeInTheDocument();
  });

  it('Displays success message', () => {
    render(<LoginContent />);

    fireEvent.click(screen.getByRole('button', { name: 'Label Button Login' }));

    const options = mocks.mutateMock.mock.calls[0][1];

    act(() => {
      options.onSuccess();
    });

    expect(screen.getByText('Email sent')).toBeInTheDocument();
  });

  it('Displays error message', () => {
    render(<LoginContent />);

    fireEvent.click(screen.getByRole('button', { name: 'Label Button Login' }));

    const options = mocks.mutateMock.mock.calls[0][1];

    act(() => {
      options.onError({ code: 'autre_erreur' });
    });

    expect(screen.getByText('Error sending email')).toBeInTheDocument();
  });

  it('Displays error message when otp is disabled', () => {
    render(<LoginContent />);

    fireEvent.click(screen.getByRole('button', { name: 'Label Button Login' }));

    const options = mocks.mutateMock.mock.calls[0][1];

    act(() => {
      options.onError({
        code: 'otp_disabled',
        message: 'Test error message',
        name: 'AuthError',
      });
    });
    expect(screen.getByText('Error signin in')).toBeInTheDocument();
    expect(mocks.captureError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Test error message' }),
      expect.objectContaining({
        auth: expect.objectContaining({
          email: expect.any(String),
          error_code: 'Test error message',
          auth_method: 'magic_link',
          error_type: 'login_failed',
          supabase_code: 'otp_disabled',
        }),
      })
    );
  });

  it('captureError uses "unknown" if error.code is not defined', () => {
    render(<LoginContent />);

    fireEvent.click(screen.getByRole('button', { name: 'Label Button Login' }));

    const options = mocks.mutateMock.mock.calls[0][1];

    act(() => {
      options.onError({
        message: 'no error code',
        name: 'AuthError',
      });
    });

    expect(mocks.captureError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'no error code' }),
      expect.objectContaining({
        auth: expect.objectContaining({
          supabase_code: 'unknown',
        }),
      })
    );
  });
});
