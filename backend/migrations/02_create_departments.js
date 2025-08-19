// backend/migrations/02_create_departments.js
import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { plants } from "../src/db/schema/plants.js";

// Define departments table
export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  department_name: varchar("department_name", { length: 100 }).notNull(),
  department_code: varchar("department_code", { length: 50 }).notNull(),
  plant_id: integer("plant_id").notNull(),
});

// Set foreign key
departments.plant_id.references(() => plants.id);