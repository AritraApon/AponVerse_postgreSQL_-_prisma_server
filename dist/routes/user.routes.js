"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const user_controller_1 = require("../services/user/user.controller");
const router = (0, express_1.Router)();
router.get("/me", auth_middleware_1.authMiddleware, user_controller_1.getProfile);
router.put("/me", auth_middleware_1.authMiddleware, user_controller_1.updateProfile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map