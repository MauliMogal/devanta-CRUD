// src/db/schema/departments.js
import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { plants } from "./plants.js";

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  department_name: varchar("department_name", { length: 100 }).notNull(),
  department_code: varchar("department_code", { length: 50 }).notNull(),
  plant_id: integer("plant_id")
    .notNull()
    .references(() => plants.id),   // ✅ foreign key syntax
});