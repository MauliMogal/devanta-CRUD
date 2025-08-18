import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.js", // path to schema file
  out: "./drizzle",             // where migration files will be generated
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});