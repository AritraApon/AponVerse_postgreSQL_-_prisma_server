import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { create,getAll,getSingle } from "../services/post/post.controller";

const router = Router();


router.get("/", getAll);
router.get("/:id", getSingle);

router.post("/", authMiddleware, create);

export default router;