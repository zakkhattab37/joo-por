import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import express from 'express';
import pg from 'pg';

const createMessagesTable = `
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
    email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
    message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 3000),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

export function createContactApi({ databaseUrl, dataDir }) {
  const api = express();
  let databasePromise;

  async function connect() {
    const directory = resolve(dataDir);
    if (!databaseUrl) await mkdir(directory, { recursive: true, mode: 0o700 });
    const db = databaseUrl
      ? new pg.Pool({ connectionString: databaseUrl, connectionTimeoutMillis: 5000 })
      : await PGlite.create(directory);
    if (databaseUrl) {
      db.on('error', (error) => console.error('Idle PostgreSQL connection failed', error.code ?? error.name));
    }
    try {
      await db.query(createMessagesTable);
      return db;
    } catch (error) {
      await closeDatabase(db);
      throw error;
    }
  }

  function database() {
    databasePromise ??= connect().catch((error) => {
      databasePromise = undefined;
      throw error;
    });
    return databasePromise;
  }

  function closeDatabase(db) {
    return databaseUrl ? db.end() : db.close();
  }

  api.disable('x-powered-by');
  api.use(express.json({ limit: '32kb' }));
  api.get('/health', async (_req, res) => {
    const db = await database();
    await db.query('SELECT 1');
    res.json({ status: 'ok' });
  });

  api.post('/contact', async (req, res) => {
    const { name: rawName, email: rawEmail, message: rawMessage } = req.body ?? {};
    const name = typeof rawName === 'string' ? rawName.trim() : '';
    const email = typeof rawEmail === 'string' ? rawEmail.trim() : '';
    const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';
    if (!name || name.length > 100 || email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 3000 ||
        [name, email, message].some((value) => value.includes('\0'))) {
      return res.status(400).json({ error: 'Enter a valid name, email address, and message.' });
    }

    const db = await database();
    await db.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message],
    );
    return res.status(201).json({ status: 'saved' });
  });

  api.use((_req, res) => res.status(404).json({ error: 'Endpoint not found.' }));
  api.use((error, _req, res, _next) => {
    if (error.type === 'entity.too.large') {
      return res.status(413).json({ error: 'The submitted message is too large.' });
    }
    if (error.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Send a valid JSON request.' });
    }
    console.error('Portfolio database request failed', error.code ?? error.name);
    return res.status(503).json({ error: 'The portfolio service is temporarily unavailable.' });
  });

  return {
    api,
    async close() {
      const db = await databasePromise?.catch(() => undefined);
      if (db) await closeDatabase(db);
    },
  };
}
