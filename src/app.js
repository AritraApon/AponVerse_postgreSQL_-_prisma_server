"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = require("./lib/prisma");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const reaction_routes_1 = __importDefault(require("./routes/reaction.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use('/api/posts', post_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/categories", category_routes_1.default);
app.use("/api/comments", comment_routes_1.default);
app.use("/api/reactions", reaction_routes_1.default);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is running!",
    });
});
app.get("/test-db", async (req, res) => {
    try {
        const users = await prisma_1.prisma.user.findMany();
        res.json({
            success: true,
            message: "Database connected successfully!",
            data: users,
        });
    }
    catch (error) {
        console.error("DATABASE ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
app.get("/protected", auth_middleware_1.authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "You are authenticated!",
        user: req.user,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map