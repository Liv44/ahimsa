import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import AuthForm, { FieldConfig } from '@/components/Auth/AuthForm';
import useLogin from '@/hooks/auth/useLogin';
import { useSentry } from '@/hooks/useSentry';

const LoginContent = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [errorSendingEmail, setErrorSendingEmail] = useState(false);
  const [triedToSignin, setTriedToSignin] = useState(false);
  const { mutate: login, isPending: isLoading } = useLogin();
  const { captureError, setTag } = useSentry();
  const { t } = useTranslation();

  const loginFormSchema = z.object({
    email: z
      .string({ required_error: t('connexion.missing-email') })
      .min(1, { message: t('connexion.missing-email') })
      .email({ message: t('connexion.wrong-email') }),
  });

  const fields: FieldConfig<z.infer<typeof loginFormSchema>>[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
    },
  ];

  const onSubmitLogin = async (values: z.infer<typeof loginFormSchema>) => {
    setErrorSendingEmail(false);
    setTriedToSignin(false);
    setEmailSent(false);

    setTag('auth_action', 'login');

    login(
      { email: values.email },
      {
        onSuccess: () => {
          setEmailSent(true);
        },
        onError: (error) => {
          setErrorSendingEmail(true);

          captureError(error, {
            title: 'LoginContent',
            context: {
              auth: {
                email: values.email,
                error_code: error.message,
                auth_method: 'magic_link',
                error_type: 'login_failed',
                supabase_code: error.code || 'unknown',
              },
            },
          });

          const code = error.code;
          if (code === 'otp_disabled') {
            setTriedToSignin(true);
          }
        },
      }
    );
  };
  return (
    <AuthForm
      fields={fields}
      formSchema={loginFormSchema}
      onSubmit={onSubmitLogin}
      submitLabel={t('connexion.button-login')}
      errorSendingEmail={errorSendingEmail}
      emailSent={emailSent}
      triedToSignin={triedToSignin}
      isLoading={isLoading}
      defaultValues={{
        email: '',
      }}
    />
  );
};

export default LoginContent;
