"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const post_controller_1 = require("../services/post/post.controller");
const router = (0, express_1.Router)();
// Protected
router.get("/my-posts", auth_middleware_1.authMiddleware, post_controller_1.getMine);
// Public
router.get("/", post_controller_1.getAll);
router.get("/:id", post_controller_1.getSingle);
// Protected
router.post("/", auth_middleware_1.authMiddleware, post_controller_1.create);
router.put("/:id", auth_middleware_1.authMiddleware, post_controller_1.update);
router.delete("/:id", auth_middleware_1.authMiddleware, post_controller_1.remove);
exports.default = router;
//# sourceMappingURL=post.routes.js.map