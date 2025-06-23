import { useQuery } from '@tanstack/react-query';

interface UseHelloWorld {
  text: string;
  isPending: boolean;
  error: Error | null;
}

const useHelloWorld = (): UseHelloWorld => {
  const { data, isPending, error } = useQuery({
    queryKey: ['helloWorld'],
    queryFn: () => {
      return 'Hello World';
    },
  });
  return { text: data ?? '', isPending, error };
};

export default useHelloWorld;
