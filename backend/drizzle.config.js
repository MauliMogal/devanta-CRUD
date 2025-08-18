import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config(); // load .env

export default defineConfig({
  schema: "./src/db/schema/*", // adjust path
  out: "./drizzle",
  dialect: "postgresql",       // ✅ instead of driver
  dbCredentials: {
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT ?? "5432"),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: false,
  },
});