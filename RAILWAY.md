# Deploy on Railway with PostgreSQL

This project is configured to run on [Railway](https://railway.app) with a PostgreSQL backend.

## 1. Create a Railway project

- Sign in at [railway.app](https://railway.app) and create a new project.
- **Deploy from GitHub:** Connect your repo and select this repository. Railway will use `railway.json` for build and start commands.

## 2. Add PostgreSQL

- In the project, click **+ New** → **Database** → **PostgreSQL**.
- Railway provisions Postgres and automatically adds **`DATABASE_URL`** to your service’s environment (no copy-paste needed if the app and DB are in the same project).

## 3. Create tables and seed data (one-time)

After Postgres is running, create the tables and load seed data.

**Option A – from your machine (with `DATABASE_URL` in `.env.local`):**

```bash
npm run db:setup
```

This runs the schema (`src/lib/db/schema.sql`) and then the seed (`src/lib/db/seed.sql`). Seed includes demo users, teams, permissions, a sample document, and a workflow.

**Option B – via Railway CLI (recommended):**

```bash
railway link
railway run npm run db:setup
```

To create **tables only** (no seed data): `railway run npm run db:schema`

**Option C – manually:** Run `src/lib/db/schema.sql` then `src/lib/db/seed.sql` in the Railway Postgres Query tab or with `psql`.

## 4. Environment variables

- **`DATABASE_URL`** – Set automatically by Railway when you add Postgres to the same project.
- **AI keys** – In your **service** → **Variables**, add at least one of:
  - `OPENAI_API_KEY`
  - `GEMINI_API_KEY`

Redeploy after changing variables.

## 5. Deploy and verify

- Push to the branch connected to Railway to trigger a deploy.
- After deploy, open **Settings** → **Networking** → **Generate domain** to get a public URL.
- Check health: `https://<your-app>.railway.app/api/health`  
  Response includes `database: "connected"` when Postgres is reachable.

## Config in code

Build and deploy behavior is defined in **`railway.json`**:

- **Build:** `npm run build`
- **Start:** `npm run start`
- **Health check:** `/api/health`

To change build/start commands or health path, edit `railway.json`.
