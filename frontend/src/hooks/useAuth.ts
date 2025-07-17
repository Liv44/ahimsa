import type { User } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/config/supabaseConfig';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setUser(data.user);
        setLoading(false);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    setLoading(false);
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  return { user, loading, refreshUser, signOut };
}
