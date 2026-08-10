import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { create } from "../services/post/post.controller";

const router = Router();

router.post("/", authMiddleware, create);

export default router;