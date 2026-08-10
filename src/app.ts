import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running!",
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      success: true,
      message: "Database connected successfully!",
      data: users,
    });
  } catch (error) {
   console.error("DATABASE ERROR:", error);

  res.status(500).json({
    success: false,
    message: "Database connection failed",
    error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default app;