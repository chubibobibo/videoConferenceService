import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

/** Connecting to database */
// getting-started.js
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

/** Routes */
app.use("/api/users", userRoutes);

/** handler for page not found */
app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});

/** Express error handler */
app.use((err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
