import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getProfile,
  updateProfile,
} from "../services/user/user.controller";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  getProfile
);

router.put(
  "/me",
  authMiddleware,
  updateProfile
);

export default router;