# Yousef Elaraby Portfolio

The portfolio runs on React and Vite. An Express API validates contact submissions and stores them in PostgreSQL.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The development server also handles `GET /api/health` and `POST /api/contact`.

## Database

The default local database is PGlite, an embedded PostgreSQL build that stores data on disk. Development, preview, and production use separate directories under `.portfolio-data/`.

To use a PostgreSQL server, set `DATABASE_URL` in the environment or in a local `.env` file. The database user needs permission to create and write to the `contact_messages` table. The API creates the table on its first database request. Keep `DATABASE_URL` server-side.

## Serve the production build

```sh
npm run build
npm start
```

Express serves the site and API together at `http://127.0.0.1:4173` by default. Set `HOST` and `PORT` to change the bind address.
