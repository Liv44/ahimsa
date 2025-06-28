import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface MethodCardProps {
  title: string;
  description: string;
  example: string;
}

const MethodCard = ({ title, description, example }: MethodCardProps) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardDescription
          data-testid="letter"
          className="text-4xl font-bold text-dark-blue"
        >
          {title.charAt(0).toUpperCase()}
        </CardDescription>
        <CardTitle className="text-xl font-bold border-b-2 border-dark-blue pb-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{description}</p>
        <p className="text-sm text-gray-500">{example}</p>
      </CardContent>
    </Card>
  );
};

export default MethodCard;
