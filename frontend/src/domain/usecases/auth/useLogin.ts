import { supabase } from '@/config/supabaseConfig';
import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

const useLogin = () => {
  return useMutation<void, AuthError, { email: string }>({
    mutationFn: async ({ email }) => {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${import.meta.env.VITE_APP_URL}/profile?magic_link=true`,
        },
      });
      if (error) {
        throw error;
      }
    },
  });
};

export default useLogin;
