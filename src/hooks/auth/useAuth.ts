import type { User } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/config/supabaseConfig';
import { useSentry } from '@/hooks/useSentry';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { captureError, setTag, setUser: setUserSentry } = useSentry();

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (mounted) {
        setUser(data.user);
        setUserSentry(data.user);
        setLoading(false);
      }
      if (error) {
        setTag('auth_action', 'get_user');
        captureError(error);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setUserSentry(session?.user ?? null);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      setTag('auth_action', 'refresh_user');
      captureError(error);
    }
    setUser(data.user);
    setUserSentry(data.user);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setTag('auth_action', 'sign_out');
      captureError(error);
    }
    setUser(null);
    setUserSentry(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading, refreshUser, signOut };
}
