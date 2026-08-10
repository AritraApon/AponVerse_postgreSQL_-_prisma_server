import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  create,
  getAll,
  remove,
} from "../services/comment/comment.controller";

const router = Router();

router.get(
  "/post/:postId",
  getAll
);

router.post(
  "/post/:postId",
  authMiddleware,
  create
);

router.delete(
  "/:id",
  authMiddleware,
  remove
);

export default router;