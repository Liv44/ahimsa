import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { version } from '../../package.json';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN as string,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: useEffect,
      useLocation: useLocation,
      useNavigationType: useNavigationType,
      createRoutesFromChildren: createRoutesFromChildren,
      matchRoutes: matchRoutes,
    }),
  ],
  release: version,
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    'localhost',
    'https://ahimsa.onrender.com',
    'https://ahimsa-staging.onrender.com',
  ],

  sendDefaultPii: true,
});
