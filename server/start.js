import { access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createContactApi } from './contact-api.js';

try {
  process.loadEnvFile();
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
await access(new URL('../dist/index.html', import.meta.url));

const contact = createContactApi({
  databaseUrl: process.env.DATABASE_URL,
  dataDir: process.env.PORTFOLIO_DATA_DIR || '.portfolio-data/production',
});
const app = express();
app.disable('x-powered-by');
app.use('/api', contact.api);
app.use(express.static(dist));

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 4173);
const server = app.listen(port, host, () => {
  console.log(`Portfolio running at http://${host}:${server.address().port}/`);
});

function shutdown() {
  server.close(() => {
    contact.close().catch(() => { process.exitCode = 1; });
  });
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
