import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  toggle,
  getReactions,
} from "../services/reaction/reaction.controller";

const router = Router();

router.get(
  "/post/:postId",
  getReactions
);

router.post(
  "/post/:postId",
  authMiddleware,
  toggle
);

export default router;