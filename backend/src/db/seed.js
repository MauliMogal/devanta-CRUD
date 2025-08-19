import { db } from "../db.js";
import { plants } from "./schema/plants.js";
import { departments } from "./schema/departments.js";

async function main() {
  // Insert plants first
  const plantA = await db.insert(plants).values({ plant_code: "PL001", name: "Plant A", location: "Mumbai" }).returning({ id: "id" });
  const plantB = await db.insert(plants).values({ plant_code: "PL002", name: "Plant B", location: "Pune" }).returning({ id: "id" });

  // Insert departments
  await db.insert(departments).values([
    { department_code: "D001", name: "HR", plant_id: plantA[0].id },
    { department_code: "D002", name: "Finance", plant_id: plantB[0].id },
  ]);

  console.log("Seed data inserted for plants and departments!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });