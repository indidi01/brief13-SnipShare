import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT;

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", message: "Backend is runnig" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
