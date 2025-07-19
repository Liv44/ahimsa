import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/config/setupTest.ts',
      coverage: {
        reporter: ['text', 'json', 'html'],
        exclude: [
          '**/*.config.{js,ts,cjs}', // Vite, ESLint, Lighthouse configs
          'src/main.tsx',
          'src/App.tsx',
          'src/i18n.ts',
          '**/*.d.ts', // fichiers de déclaration
          'lighthouserc.cjs',
          '**/components/ui/**',
          '**/config/**',
          '**/translations/**',
          '**/pages/**',
          '**/router/**',
          '**/dist/**',
          'src/hooks/discussion/useDiscussionStore.ts',
          'src/hooks/auth/useSignIn.ts',
          'src/hooks/auth/useLogin.ts',
          'src/infrastructure/mappers/supabase.types.ts',
          'src/infrastructure/repositories/**',
        ],
      },
    },
  };
});
