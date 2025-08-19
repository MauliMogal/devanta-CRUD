// backend/src/routes/departments.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all departments
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM departments ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET department by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM departments WHERE id = $1", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE department
router.post("/", async (req, res) => {
  try {
    const { department_name, department_code, plant_id } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO departments (department_name, department_code, plant_id) VALUES ($1, $2, $3) RETURNING *",
      [department_name, department_code, plant_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE department
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { department_name, department_code, plant_id } = req.body;
    const { rows } = await pool.query(
      "UPDATE departments SET department_name = $1, department_code = $2, plant_id = $3 WHERE id = $4 RETURNING *",
      [department_name, department_code, plant_id, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE department
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM departments WHERE id = $1", [id]);

    if (rowCount === 0) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json({ message: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
