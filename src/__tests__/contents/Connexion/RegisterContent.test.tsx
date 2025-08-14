import RegisterContent from '@/contents/AuthContent/RegisterContent';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    mutateMock: vi.fn(),
    captureError: vi.fn(),
  };
});

vi.mock('@/hooks/auth/useSignIn', () => {
  return {
    default: () => ({
      mutate: mocks.mutateMock,
      isPending: false,
    }),
  };
});

vi.mock('@/hooks/useSentry', () => ({
  useSentry: () => ({
    captureError: mocks.captureError,
    setTag: vi.fn(),
    captureMessage: vi.fn(),
  }),
}));

vi.mock('@/components/Auth/AuthForm', () => ({
  default: ({
    onSubmit,
    emailSent,
    errorSendingEmail,
  }: {
    onSubmit: ({ email, pseudo }: { email: string; pseudo: string }) => void;
    emailSent: boolean;
    errorSendingEmail: boolean;
  }) => (
    <div data-testid="register-auth-form">
      {emailSent && <p>Email sent</p>}
      {errorSendingEmail && <p>Error sending email</p>}
      <button
        onClick={() => onSubmit({ email: 'test@test.com', pseudo: 'pseudo' })}
      >
        Label Button Register
      </button>
    </div>
  ),
}));

describe('RegisterContent', () => {
  beforeEach(() => {
    mocks.mutateMock.mockClear();
  });

  it('has correct inputs', () => {
    render(<RegisterContent />);

    const authForm = screen.getByTestId('register-auth-form');
    expect(authForm).toBeInTheDocument();
  });

  it('Displays success message', () => {
    render(<RegisterContent />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Label Button Register' })
    );

    const options = mocks.mutateMock.mock.calls[0][1];

    act(() => {
      options.onSuccess();
    });

    expect(screen.getByText('Email sent')).toBeInTheDocument();
  });

  it('Displays error message', () => {
    render(<RegisterContent />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Label Button Register' })
    );

    const options = mocks.mutateMock.mock.calls[0][1];

    act(() => {
      options.onError({
        message: 'Test error message',
        code: 'test_error_code',
        name: 'AuthError',
      });
    });

    expect(screen.getByText('Error sending email')).toBeInTheDocument();
    console.log(mocks.captureError.mock.calls[0][1]);
    console.log(mocks.captureError.mock.calls[0][0]);
    expect(mocks.captureError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test error message',
        code: 'test_error_code',
        name: 'AuthError',
      }),
      expect.objectContaining({
        title: 'RegisterContent',
        context: {
          auth: {
            email: 'test@test.com',
            pseudo: 'pseudo',
            error_code: 'Test error message',
            auth_method: 'magic_link',
            error_type: 'register_failed',
            supabase_code: 'test_error_code',
          },
        },
      })
    );
  });
  it('captureError uses "unknown" if error.code is not defined', () => {
    render(<RegisterContent />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Label Button Register' })
    );

    const options = mocks.mutateMock.mock.calls[0][1];

    act(() => {
      options.onError({
        message: 'no error code',
        name: 'AuthError',
      });
    });

    expect(mocks.captureError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'no error code',
        name: 'AuthError',
      }),
      expect.objectContaining({
        title: 'RegisterContent',
        context: {
          auth: {
            email: 'test@test.com',
            pseudo: 'pseudo',
            error_code: 'no error code',
            auth_method: 'magic_link',
            error_type: 'register_failed',
            supabase_code: 'unknown',
          },
        },
      })
    );
  });
});
