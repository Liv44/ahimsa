import { useSentry } from '@/hooks/useSentry';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import AuthForm, { FieldConfig } from '@/components/Auth/AuthForm';
import useSignIn from '@/hooks/auth/useSignIn';

const RegisterContent = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [errorSendingEmail, setErrorSendingEmail] = useState(false);
  const { mutate: signIn, isPending: isLoading } = useSignIn();
  const { captureError, setTag } = useSentry();
  const { t } = useTranslation();

  const registerFormSchema = z.object({
    pseudo: z
      .string({ required_error: t('connexion.missing-pseudo') })
      .min(1, { message: t('connexion.missing-pseudo') })
      .min(3, { message: t('connexion.wrong-pseudo') })
      .max(25, { message: t('connexion.wrong-pseudo') }),
    email: z
      .string({ required_error: t('connexion.missing-email') })
      .min(1, { message: t('connexion.missing-email') })
      .email({ message: t('connexion.wrong-email') }),
  });

  const fields: FieldConfig<z.infer<typeof registerFormSchema>>[] = [
    {
      name: 'pseudo',
      label: 'Pseudo',
      type: 'text',
      placeholder: 'Pseudo',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
    },
  ];

  const onSubmitRegister = async (
    values: z.infer<typeof registerFormSchema>
  ) => {
    setErrorSendingEmail(false);
    setEmailSent(false);

    // Tag pour identifier l'action dans Sentry
    setTag('auth_action', 'register');

    signIn(
      { email: values.email, pseudo: values.pseudo },
      {
        onSuccess: () => {
          setEmailSent(true);
        },
        onError: (error) => {
          setErrorSendingEmail(true);

          captureError(error, {
            auth: {
              email: values.email,
              pseudo: values.pseudo,
              error_code: error.message,
              auth_method: 'magic_link',
              error_type: 'register_failed',
              supabase_code: error.code || 'unknown',
            },
          });
        },
      }
    );
  };
  return (
    <AuthForm
      fields={fields}
      formSchema={registerFormSchema}
      onSubmit={onSubmitRegister}
      submitLabel={t('connexion.button-register')}
      errorSendingEmail={errorSendingEmail}
      emailSent={emailSent}
      isLoading={isLoading}
      defaultValues={{
        pseudo: '',
        email: '',
      }}
    />
  );
};

export default RegisterContent;
