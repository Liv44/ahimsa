import AuthForm, { FieldConfig } from '@/components/Auth/AuthForm';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import z from 'zod';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, unknown> = {
        'connexion.error-sending-email': 'Error sending email',
        'connexion.tried-to-signin': 'Error signin in',
        'connexion.email-sent': 'Email sent !',
      };
      return translations[key];
    },
  }),
}));

describe('AuthForm', () => {
  const zodSchema = z.object({
    email: z.string(),
    name: z.string(),
  });

  const fields: FieldConfig<z.infer<typeof zodSchema>>[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
    },
    {
      name: 'name',
      label: 'Name',
      type: 'name',
      placeholder: 'Name',
    },
  ];

  it('has correct inputs', () => {
    render(
      <AuthForm
        formSchema={zodSchema}
        onSubmit={async () => {}}
        submitLabel={'Submit'}
        errorSendingEmail={false}
        emailSent={false}
        fields={fields}
      />
    );

    const inputs = screen.getAllByRole('textbox');

    expect(inputs[0]).toBeVisible();
    expect(inputs[0]).toHaveAttribute('id', 'email-input');
    expect(inputs[0]).toHaveValue('');
    expect(inputs[1]).toHaveAttribute('id', 'name-input');
    expect(inputs[1]).toHaveValue('');

    expect(screen.getByRole('button')).toBeVisible();
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
  });

  it('displays errorSendingEmail Message when errorSendingEmail is true and triedToSignin is false', () => {
    render(
      <AuthForm
        formSchema={zodSchema}
        onSubmit={async () => {}}
        submitLabel={'Submit'}
        errorSendingEmail={true}
        emailSent={false}
        fields={fields}
      />
    );

    expect(screen.getByText('Error sending email'));
  });

  it('displays triedToSignin Message when errorSendingEmail is true and triedToSignin is true', () => {
    render(
      <AuthForm
        formSchema={zodSchema}
        onSubmit={async () => {}}
        submitLabel={'Submit'}
        errorSendingEmail={true}
        emailSent={false}
        fields={fields}
        triedToSignin={true}
      />
    );

    expect(screen.getByText('Error signin in'));
  });

  it('displays emailSent Message when emailSent is true', () => {
    render(
      <AuthForm
        formSchema={zodSchema}
        onSubmit={async () => {}}
        submitLabel={'Submit'}
        errorSendingEmail={false}
        emailSent={true}
        fields={fields}
      />
    );

    expect(screen.getByText('Email sent !'));
  });
});
