import * as Sentry from '@sentry/react';
import type { User } from '@supabase/supabase-js';

interface AuthContext {
  email?: string;
  pseudo?: string;
  error_code?: string;
  auth_method?: string;
  error_type?: string;
  supabase_code?: string;
  action?: string;
}

interface SentryContext {
  auth?: AuthContext;
  discussion?: Record<string, unknown>;
  [key: string]: unknown;
}

export const useSentry = () => {
  const captureError = (error: Error, context?: SentryContext) => {
    Sentry.withScope((scope) => {
      if (context) {
        scope.setContext('error_context', context);
      }
      scope.setTag('error_source', 'manual_capture');

      if (context?.auth?.error_code) {
        scope.setFingerprint(['auth-error', context.auth.error_code]);
      } else if (context?.auth?.action) {
        scope.setFingerprint(['auth-error', context.auth.action]);
      } else {
        scope.setFingerprint(['manual-error', error.message]);
      }

      Sentry.captureException(error);
    });
  };

  const captureMessage = (
    message: string,
    level: Sentry.SeverityLevel = 'info',
    context?: SentryContext
  ) => {
    Sentry.withScope((scope) => {
      if (context) {
        scope.setContext('message_context', context);
      }
      scope.setTag('message_type', 'manual_message');

      if (context?.auth?.action) {
        scope.setFingerprint(['auth-message', context.auth.action]);
      } else {
        scope.setFingerprint(['manual-message', message]);
      }

      Sentry.captureMessage(message, level);
    });
  };

  const setTag = (key: string, value: string) => {
    Sentry.setTag(key, value);
  };

  const setContext = (name: string, context: SentryContext) => {
    Sentry.setContext(name, context);
  };

  const setUser = (user: User | null) => {
    if (user) {
      Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.user_metadata?.full_name || user.email,
      });
    } else {
      Sentry.setUser(null);
    }
  };

  return {
    captureError,
    captureMessage,
    setTag,
    setContext,
    setUser,
  };
};
