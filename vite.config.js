import { resolve } from 'node:path';
import { defineConfig, loadEnv, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import { createContactApi } from './server/contact-api.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['DATABASE_URL', 'PORTFOLIO_DATA_DIR']);
  const dataDirectory = normalizePath(resolve(env.PORTFOLIO_DATA_DIR || '.portfolio-data'));

  function mountContactApi(server, directory) {
    const contact = createContactApi({
      databaseUrl: env.DATABASE_URL,
      dataDir: env.PORTFOLIO_DATA_DIR || `.portfolio-data/${directory}`,
    });
    server.middlewares.use('/api', contact.api);
    server.httpServer?.once('close', () => {
      contact.close().catch(() => console.error('Could not close the portfolio database.'));
    });
  }

  return {
    plugins: [
      react(),
      {
        name: 'portfolio-contact-api',
        configureServer(server) { mountContactApi(server, 'dev'); },
        configurePreviewServer(server) { mountContactApi(server, 'preview'); },
      },
    ],
    server: {
      fs: {
        deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.portfolio-data/**', `${dataDirectory}/**`],
      },
    },
  };
});
