import { Pool, PoolClient, QueryResultRow } from "pg";

const env = process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL;

/** Lazy-initialized pool for Postgres (safe for Next.js serverless). */
let pool: Pool | null = null;

function getPool(): Pool {
  if (!env) {
    throw new Error(
      "DATABASE_URL or DATABASE_PUBLIC_URL is not set. Add a Postgres service in Railway or set one of these locally."
    );
  }
  if (!pool) {
    pool = new Pool({
      connectionString: env,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }
  return pool;
}

/**
 * Run a parameterized query against the Postgres backend.
 * Use when DATABASE_URL is set (e.g. Railway Postgres).
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values?: unknown[]
): Promise<{ rows: T[]; rowCount: number }> {
  const result = await getPool().query<T>(text, values);
  return { rows: result.rows, rowCount: result.rowCount ?? 0 };
}

/**
 * Get a client from the pool for transactions.
 * Caller must release the client when done (e.g. in a finally block).
 */
export async function getClient(): Promise<PoolClient> {
  return getPool().connect();
}

/**
 * Whether the app has a Postgres backend configured.
 */
export function isDatabaseConfigured(): boolean {
  return Boolean(env);
}
