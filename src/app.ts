import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import authRoutes from "./routes/auth.routes";
import {authMiddleware,AuthRequest,} from "./middleware/auth.middleware";
import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/posts',postRoutes)
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

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

app.get(
  "/protected",
  authMiddleware,
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      message: "You are authenticated!",
      user: req.user,
    });
  }
);



export default app;