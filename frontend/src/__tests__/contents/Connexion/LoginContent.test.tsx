import LoginContent from '@/contents/AuthContent/LoginContent';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    mutateMock: vi.fn(),
  };
});

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
      options.onError({ code: 'otp_disabled' });
    });
    expect(screen.getByText('Error signin in')).toBeInTheDocument();
  });
});
