import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromMagicLink = searchParams.get('magic_link') === 'true';
  const fromRegister = searchParams.get('register');
  const hasShownToast = useRef(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }
    if (fromMagicLink && fromRegister && !hasShownToast.current) {
      toast.success(t('profile-page.registered'), {
        description: t('profile-page.registered-description'),
        duration: 2000,
      });
      hasShownToast.current = true;
    }
    if (fromMagicLink && !hasShownToast.current) {
      toast.success(t('profile-page.connected'), {
        description: t('profile-page.connected-description'),
        duration: 2000,
      });
      hasShownToast.current = true;
    }
  }, [fromMagicLink, fromRegister, t, loading, user, navigate]);

  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <Toaster position="top-center" richColors />
      <h1 className="text-2xl font-bold">{t('profile-page.title')}</h1>
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <p className="text-md">
          {t('profile-page.email')} : {user?.email}
          <br />
          {t('profile-page.pseudo')} : {user?.user_metadata.pseudo}
        </p>
      )}
      <Button onClick={handleSignOut}>{t('profile-page.sign-out')}</Button>
    </div>
  );
};

export default ProfilePage;
