import * as Sentry from '@sentry/react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import DiscussionStepsAccordion from '@/contents/DiscussionContent/DiscussionStepsAccordion';
import Introduction from '@/contents/DiscussionContent/Introduction';
import SummaryCard from '@/contents/DiscussionContent/SummaryCard';
import ConnexionPage from '@/pages/ConnexionPage';
import DiscussionPage from '@/pages/DiscussionPage';
import LandingPage from '@/pages/LandingPage';
import NeedsAndFeelingsListPage from '@/pages/NeedsAndFeelingsListPage';
import ProfilePage from '@/pages/ProfilePage';

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
