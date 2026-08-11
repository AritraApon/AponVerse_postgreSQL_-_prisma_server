"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const comment_controller_1 = require("../services/comment/comment.controller");
const router = (0, express_1.Router)();
router.get("/post/:postId", comment_controller_1.getAll);
router.post("/post/:postId", auth_middleware_1.authMiddleware, comment_controller_1.create);
router.delete("/:id", auth_middleware_1.authMiddleware, comment_controller_1.remove);
exports.default = router;
//# sourceMappingURL=comment.routes.js.map