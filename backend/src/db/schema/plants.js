// src/db/schema/plants.js
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const plants = pgTable("plants", {
  id: serial("id").primaryKey(),
  plant_code: varchar("plant_code", { length: 50 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  location: varchar("location", { length: 100 }),
});