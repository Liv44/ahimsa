import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useHelloWorld from '@/domain/usecases/useHelloWorld';
import useHelloWorldStore, {
  helloWorldStore,
} from '@/domain/usecases/useStore';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const { t } = useTranslation();
  const { text, isPending, error } = useHelloWorld();
  const { isHelloWorld } = useHelloWorldStore();

  const handleClick = () => {
    helloWorldStore.setState({ isHelloWorld: !isHelloWorld });
  };

  return (
    <div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('home.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          {!isPending && <p>{text}</p>}
          {isPending && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
        <CardFooter className="flex justify-center flex-col gap-2">
          <Link to="/login">Login</Link>
          <Button onClick={handleClick}>{isHelloWorld ? 'yes' : 'no'}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LandingPage;
