import Layout from '@/components/Layout/Layout';
import DiscussionPage from '@/pages/DiscussionPage';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import NeedsAndFeelingsListPage from '@/pages/NeedsAndFeelingsListPage';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

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
          <Route path="discussion" element={<DiscussionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
