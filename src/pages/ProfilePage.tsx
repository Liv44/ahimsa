import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import ProfileContent from '@/contents/ProfileContent/ProfileContent';
import { useAuth } from '@/hooks/auth/useAuth';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromMagicLink = searchParams.get('magic_link') === 'true';
  const fromRegister = searchParams.get('register');
  const hasShownToast = useRef(false);

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

  return <ProfileContent />;
};

export default ProfilePage;
