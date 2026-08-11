"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const category_controller_1 = require("../services/category/category.controller");
const router = (0, express_1.Router)();
router.get("/", category_controller_1.getAll);
router.get("/:id", category_controller_1.getSingle);
router.post("/", auth_middleware_1.authMiddleware, category_controller_1.create);
router.put("/:id", auth_middleware_1.authMiddleware, category_controller_1.update);
router.delete("/:id", auth_middleware_1.authMiddleware, category_controller_1.remove);
exports.default = router;
//# sourceMappingURL=category.routes.js.map