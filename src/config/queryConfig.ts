import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';

const MAX_RETRIES = 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 60 * 2, // 1 hour
      retry: (failureCount) => {
        if (failureCount > MAX_RETRIES) {
          return false;
        }

        return true;
      },
    },
  },
});

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
