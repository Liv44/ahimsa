import RegisterContent from '@/contents/AuthContent/RegisterContent';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    mutateMock: vi.fn(),
  };
});

vi.mock('@/hooks/auth/useSignIn', () => {
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
      options.onError();
    });

    expect(screen.getByText('Error sending email')).toBeInTheDocument();
  });
});
