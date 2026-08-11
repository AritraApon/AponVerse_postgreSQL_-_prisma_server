"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const reaction_controller_1 = require("../services/reaction/reaction.controller");
const router = (0, express_1.Router)();
router.get("/post/:postId", reaction_controller_1.getReactions);
router.post("/post/:postId", auth_middleware_1.authMiddleware, reaction_controller_1.toggle);
exports.default = router;
//# sourceMappingURL=reaction.routes.js.map