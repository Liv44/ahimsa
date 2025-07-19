import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useLocation } from 'react-router-dom';

import LoginContent from '@/contents/AuthContent/LoginContent';
import RegisterContent from '@/contents/AuthContent/RegisterContent';
import { useAuth } from '@/hooks/auth/useAuth';

const ConnexionPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { user, loading } = useAuth();

  if (user && !loading) {
    return <Navigate to="/profile" />;
  }

  if (location.pathname !== '/login' && location.pathname !== '/register') {
    return <Navigate to="/login" />;
  }
  const register = location.pathname === '/register';

  return loading ? (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <Loader2 className="animate-spin" size={40} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-center text-2xl font-bold">
        {register ? t('connexion.title-register') : t('connexion.title-login')}
      </h1>
      <p className="text-center max-w-sm">
        {register
          ? t('connexion.description-register')
          : t('connexion.description-login')}
      </p>
      {register ? <RegisterContent /> : <LoginContent />}
      <Link
        to={register ? '/login' : '/register'}
        className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
      >
        {register
          ? t('connexion.button-already-account')
          : t('connexion.button-no-account')}
      </Link>
    </div>
  );
};

export default ConnexionPage;
