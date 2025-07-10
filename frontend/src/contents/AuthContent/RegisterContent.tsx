import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import AuthForm, { FieldConfig } from '@/components/Auth/AuthForm';
import { supabase } from '@/config/supabaseConfig';

const RegisterContent = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [errorSendingEmail, setErrorSendingEmail] = useState(false);
  const { t } = useTranslation();

  const registerFormSchema = z.object({
    pseudo: z
      .string({ required_error: t('connexion.missing-pseudo') })
      .min(3, { message: t('connexion.wrong-pseudo') })
      .max(25, { message: t('connexion.wrong-pseudo') }),
    email: z
      .string({ required_error: t('connexion.missing-email') })
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
    console.log(values);
    setErrorSendingEmail(false);
    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          pseudo: values.pseudo,
        },
      },
    });
    if (error) {
      setErrorSendingEmail(true);
      console.error(error);
    } else {
      setEmailSent(true);
    }
  };
  return (
    <AuthForm
      fields={fields}
      formSchema={registerFormSchema}
      onSubmit={onSubmitRegister}
      submitLabel={t('connexion.button-register')}
      errorSendingEmail={errorSendingEmail}
      emailSent={emailSent}
    />
  );
};

export default RegisterContent;
