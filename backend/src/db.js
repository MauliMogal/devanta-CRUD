// src/db/db.js
import pkg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./db/schema/plants.js"; // import your schemas if needed

const { Pool } = pkg;

// Create a new Postgres connection pool
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "Mauli",
  password: process.env.DB_PASSWORD || "929698",
  database: process.env.DB_NAME || "devanta_crud",
  port: process.env.DB_PORT || 5432,
});

// Create Drizzle instance
export const db = drizzle(pool);

// Optional: export schemas if you want
export { schema };

export default pool; 