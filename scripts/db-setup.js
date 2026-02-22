/**
 * Create tables (schema) and optionally load seed data.
 * Usage:
 *   node scripts/db-setup.js           — schema + seed
 *   node scripts/db-setup.js --schema-only — create tables only
 *   node scripts/db-setup.js --seed-only   — run seed only (tables must exist)
 * Requires DATABASE_URL or DATABASE_PUBLIC_URL (set in .env.local or environment).
 */
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Load .env.local so database URL is set when running locally
try {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });
} catch {
  // dotenv optional
}

const DATABASE_URL = process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL or DATABASE_PUBLIC_URL is not set. Add one to .env.local or the environment.");
  process.exit(1);
}

const projectRoot = path.join(__dirname, "..");
const schemaPath = path.join(projectRoot, "src", "lib", "db", "schema.sql");
const seedPath = path.join(projectRoot, "src", "lib", "db", "seed.sql");

function splitStatements(content) {
  const hasExecutableSql = (s) =>
    /\b(CREATE|INSERT|ALTER|DROP)\s/i.test(s);
  return content
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && hasExecutableSql(s));
}

async function runFile(pool, filePath, label) {
  const content = fs.readFileSync(filePath, "utf8");
  const statements = splitStatements(content);
  for (let i = 0; i < statements.length; i++) {
    const sql = statements[i] + ";";
    try {
      await pool.query(sql);
    } catch (err) {
      console.error(`${label} statement ${i + 1} failed:`, err.message);
      console.error("SQL:", sql.slice(0, 120) + "...");
      throw err;
    }
  }
  console.log(`${label}: ${statements.length} statement(s) executed.`);
}

async function main() {
  const seedOnly = process.argv.includes("--seed-only");
  const schemaOnly = process.argv.includes("--schema-only");
  const pool = new Pool({ connectionString: DATABASE_URL });

  try {
    if (!seedOnly) {
      await runFile(pool, schemaPath, "Schema");
    }
    if (!schemaOnly) {
      await runFile(pool, seedPath, "Seed");
    }
    console.log("Done.");
  } catch (e) {
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
