import { db } from "../db.js"; // your drizzle db connection
import { departments } from "./schema/departments.js";

async function seed() {
  await db.insert(departments).values([
    { department_name: "HR", department_code: "HR001", plant_id: 1 },
    { department_name: "Production", department_code: "PRD001", plant_id: 1 },
  ]);
  console.log("Departments seeded");
}

seed();