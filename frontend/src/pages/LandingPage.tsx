import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{t('home.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t('home.description')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;
