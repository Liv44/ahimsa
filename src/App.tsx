import '@/i18n';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { persister, queryClient } from '@/config/queryConfig';
import Router from '@/router/Router';

import { QueryClientProvider } from '@tanstack/react-query';
import './App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <Router />
      </PersistQueryClientProvider>
    </QueryClientProvider>
  );
}

export default App;
