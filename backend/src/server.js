// server.js
import express from "express";
import dotenv from "dotenv";
import plantsRoutes from "./routes/plants.js";
import departmentsRoutes from "./routes/departments.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});


// Middleware
app.use(express.json());

// Root endpoint (supports all HTTP methods)
app.all("/", (req, res) => {
  res.json({
    method: req.method,
    message: "API root is working",
  });
});

// Debug route before mounting routers
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Mount routers
app.use("/api/plants", plantsRoutes);
app.use("/api/departments", departmentsRoutes);

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
