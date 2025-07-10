import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, Path, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import z, { ZodTypeAny } from 'zod';

import { Button } from '../ui/button';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export interface FieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
}

interface AuthComponentProps<T extends ZodTypeAny> {
  formSchema: T;
  onSubmit: (values: z.infer<T>) => Promise<void>;
  submitLabel: string;
  errorSendingEmail: boolean;
  emailSent: boolean;
  fields: FieldConfig<z.infer<T>>[];
  triedToSignin?: boolean;
}

const AuthForm = <T extends ZodTypeAny>({
  formSchema,
  onSubmit,
  submitLabel,
  errorSendingEmail,
  emailSent,
  fields,
  triedToSignin,
}: AuthComponentProps<T>) => {
  const { t } = useTranslation();

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-100 items-center"
      >
        {fields.map((customField) => (
          <FormField
            control={form.control}
            name={customField.name}
            key={customField.name}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 items-start w-full">
                <FormLabel htmlFor={`${field.name}-input`}>
                  {customField.label}
                </FormLabel>
                <Input
                  type="text"
                  id={`${field.name}-input`}
                  placeholder={customField.placeholder}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        ))}
        {errorSendingEmail && (
          <FormMessage className="max-w-sm">
            {triedToSignin
              ? t('connexion.tried-to-signin')
              : t('connexion.error-sending-email')}
          </FormMessage>
        )}
        {emailSent && (
          <FormDescription className="text-center">
            <p>
              {t('connexion.email-sent', { email: form.getValues().email })}
            </p>
          </FormDescription>
        )}
        <Button type="submit" className="mx-auto min-w-20 max-w-40">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
