import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  create,
  getAll,
  getSingle,
  update,
  remove,
  getMine
} from "../services/post/post.controller";

const router = Router();

// Protected
router.get(
  "/my-posts",
  authMiddleware,
  getMine
);

// Public
router.get("/", getAll);
router.get("/:id", getSingle);

// Protected
router.post("/", authMiddleware, create);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

export default router;