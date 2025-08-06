import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import DiscussionStepsAccordion from '@/contents/DiscussionContent/DiscussionStepsAccordion';
import Introduction from '@/contents/DiscussionContent/Introduction';
import SummaryCard from '@/contents/DiscussionContent/SummaryCard';
import ConnexionPage from '@/pages/ConnexionPage';
import DiscussionPage from '@/pages/DiscussionPage';
import LandingPage from '@/pages/LandingPage';
import NeedsAndFeelingsListPage from '@/pages/NeedsAndFeelingsListPage';
import ProfilePage from '@/pages/ProfilePage';

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
  tracePropagationTargets: [
    'localhost',
    'https://ahimsa.onrender.com',
    'https://ahimsa-staging.onrender.com',
  ],
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const Router = () => {
  return (
    <BrowserRouter>
      <SentryRoutes>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="login" element={<ConnexionPage />} />
          <Route path="register" element={<ConnexionPage />} />
          <Route path="feelings-list" element={<NeedsAndFeelingsListPage />} />
          <Route path="discussion" element={<DiscussionPage />}>
            <Route path="" element={<Introduction />} />
            <Route path="create" element={<DiscussionStepsAccordion />} />
            <Route path="summary" element={<SummaryCard />} />
          </Route>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </SentryRoutes>
    </BrowserRouter>
  );
};

export default Router;
