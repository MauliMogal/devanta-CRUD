// src/db/seed_plants.js
import { db } from "./index.js";
import { plants } from "./schema/plants.js";

async function seed() {
  await db.insert(plants).values([
    { plant_code: "PL001", name: "Main Plant", location: "Mumbai" },
    { plant_code: "PL002", name: "Backup Plant", location: "Pune" },
  ]);

  console.log("✅ Plants seeded");
  process.exit(0);
}

seed();
