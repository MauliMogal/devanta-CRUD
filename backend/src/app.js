import express from "express";
import cors from "cors";

import plantsRouter from "./routes/plants.js";
import departmentsRouter from "./routes/departments.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Mount feature routers
app.use("/plants", plantsRouter);
app.use("/departments", departmentsRouter);

export default app;
