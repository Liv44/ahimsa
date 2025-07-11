import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import DiscussionAccordion from '@/contents/DiscussionContent/CustomAccordion';
import Introduction from '@/contents/DiscussionContent/Introduction';
import Summary from '@/contents/DiscussionContent/Summary';
import DiscussionPage from '@/pages/DiscussionPage';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import NeedsAndFeelingsListPage from '@/pages/NeedsAndFeelingsListPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="feelings-list" element={<NeedsAndFeelingsListPage />} />
          <Route path="discussion" element={<DiscussionPage />}>
            <Route path="" element={<Introduction />} />
            <Route path="create" element={<DiscussionAccordion />} />
            <Route path="summary" element={<Summary />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
