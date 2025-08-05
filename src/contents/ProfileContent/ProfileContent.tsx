import HistoryCard from '@/components/Profile/HistoryCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth/useAuth';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProfileContent = () => {
  const { user, loading, signOut } = useAuth();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <h1 className="text-2xl font-bold">{t('profile-page.title')}</h1>
      {loading ? (
        <Loader2
          className="animate-spin"
          aria-label={t('profile-page.loading-spinner')}
          aria-hidden={false}
        />
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-md">
            {t('profile-page.email')} : {user?.email}
          </p>
          <p className="text-md">
            {t('profile-page.pseudo')} : {user?.user_metadata.display_name}
          </p>
        </div>
      )}
      <Button onClick={handleSignOut}>{t('profile-page.sign-out')}</Button>
      <HistoryCard />
    </div>
  );
};

export default ProfileContent;
