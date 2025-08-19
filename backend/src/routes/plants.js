import express from "express";
import { db } from "../db/index.js";
import { plants } from "../db/schema.js";
import { eq, like } from "drizzle-orm";

const router = express.Router();

// GET /api/plants (with optional pagination & search)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, q } = req.query;
    const offset = (page - 1) * limit;

    let query = db.select().from(plants).limit(limit).offset(offset);

    if (q) {
      query = db
        .select()
        .from(plants)
        .where(like(plants.name, `%${q}%`))
        .limit(limit)
        .offset(offset);
    }

    const result = await query;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plants" });
  }
});

// GET /api/plants/:id
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await db.select().from(plants).where(eq(plants.id, id));
    if (result.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plant" });
  }
});

// POST /api/plants
// router.post("/", async (req, res) => {
//   try {
//     console.log("Incoming body:", req.body);
//     const { plant_code, name, location } = req.body;
//     const [newPlant] = await db
//       .insert(plants)
//       .values({ plant_code, name, location })
//       .returning();
//     res.status(201).json(newPlant);
//   } catch (err) {
//     console.error("Error inserting plant:", err);   
//     res.status(500).json({ error: "Failed to create plant" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { plant_code, name, location } = req.body;

    // Validate
    if (!plant_code || !name) {
      return res.status(400).json({ error: "plant_code and name are required" });
    }

    // Insert into DB
    const [newPlant] = await db
      .insert(plants)
      .values({ plant_code, name, location })
      .returning();

    res.status(201).json(newPlant);
  } catch (err) {
    console.error("Error inserting plant:", err);   // FULL error in terminal
    res.status(500).json({ error: err.message });   // return error message
  }
});

// PUT /api/plants/:id
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { plant_code, name, location } = req.body;
    const [updated] = await db
      .update(plants)
      .set({ plant_code, name, location })
      .where(eq(plants.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update plant" });
  }
});

// DELETE /api/plants/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(plants)
      .where(eq(plants.id, id))
      .returning();

    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete plant" });
  }
});

export default router;
