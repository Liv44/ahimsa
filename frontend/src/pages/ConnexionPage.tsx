import { useTranslation } from 'react-i18next';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { supabase } from '@/config/supabaseConfig';
import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/ui/button';
import LoginContent from '@/contents/AuthContent/LoginContent';
import RegisterContent from '@/contents/AuthContent/RegisterContent';

const ConnexionPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();

  if (location.pathname !== '/login' && location.pathname !== '/register') {
    return <Navigate to="/login" />;
  }
  const register = location.pathname === '/register';

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-center text-2xl font-bold">
        {register ? t('connexion.title-register') : t('connexion.title-login')}
      </h1>
      <p className="text-center max-w-sm">
        {register
          ? t('connexion.description-register')
          : t('connexion.description-login')}
      </p>
      {user && (
        <p>
          You are logged in as {user.email}. <br />
          <Button onClick={() => supabase.auth.signOut()} variant={'link'}>
            Déconnexion
          </Button>
        </p>
      )}
      {register ? <RegisterContent /> : <LoginContent />}
      <Link to={register ? '/login' : '/register'}>
        {register
          ? t('connexion.button-already-account')
          : t('connexion.button-no-account')}
      </Link>
    </div>
  );
};

export default ConnexionPage;
