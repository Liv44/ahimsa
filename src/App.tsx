import '@/i18n';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { persister, queryClient } from '@/config/queryConfig';
import Router from '@/router/Router';

import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import './App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <Router />
        <Toaster position="top-center" closeButton={true} richColors={true} />
      </PersistQueryClientProvider>
    </QueryClientProvider>
  );
}

export default App;
