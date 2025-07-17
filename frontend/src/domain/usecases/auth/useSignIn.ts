import { supabase } from '@/config/supabaseConfig';
import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

const useSignIn = () => {
  return useMutation<void, AuthError, { email: string; pseudo: string }>({
    mutationFn: async ({
      email,
      pseudo,
    }: {
      email: string;
      pseudo: string;
    }) => {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/profile?magic_link=true&register=true`,
          data: {
            pseudo,
          },
        },
      });
      if (error) {
        throw error;
      }
    },
  });
};

export default useSignIn;
