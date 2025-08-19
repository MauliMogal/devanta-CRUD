// src/db/index.js
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import { config } from "dotenv";

config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

// ✅ Export db as named export
export const db = drizzle(pool);
