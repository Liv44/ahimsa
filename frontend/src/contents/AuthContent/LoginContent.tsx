import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import AuthForm, { FieldConfig } from '@/components/Auth/AuthForm';
import { supabase } from '@/config/supabaseConfig';

const LoginContent = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [errorSendingEmail, setErrorSendingEmail] = useState(false);
  const [triedToSignin, setTriedToSignin] = useState(false);
  const { t } = useTranslation();

  const loginFormSchema = z.object({
    email: z
      .string({ required_error: t('connexion.missing-email') })
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
    console.log(values);
    setErrorSendingEmail(false);
    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    if (error) {
      console.error(error);
      setErrorSendingEmail(true);
      const code = error.code;
      if (code === 'otp_disabled') {
        setTriedToSignin(true);
      } else {
        setErrorSendingEmail(true);
      }
    } else {
      setEmailSent(true);
    }
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
    />
  );
};

export default LoginContent;
