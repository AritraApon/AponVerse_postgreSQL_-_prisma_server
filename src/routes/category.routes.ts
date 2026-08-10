import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

import {
  create,
  getAll,
  getSingle,
  update,
  remove,
} from "../services/category/category.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getSingle);

router.post("/", authMiddleware, create);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

export default router;