"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.getAll = exports.create = void 0;
const comment_service_1 = require("./comment.service");
const create = async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { postId } = req.params;
        const { content } = req.body;
        if (!content?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment content is required",
            });
        }
        const comment = await (0, comment_service_1.createComment)(req.user.userId, postId, content.trim());
        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data: comment,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create comment",
        });
    }
};
exports.create = create;
const getAll = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await (0, comment_service_1.getPostComments)(postId);
        return res.status(200).json({
            success: true,
            message: "Comments retrieved successfully",
            data: comments,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve comments",
        });
    }
};
exports.getAll = getAll;
const remove = async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { id } = req.params;
        await (0, comment_service_1.deleteComment)(id, req.user.userId);
        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete comment",
        });
    }
};
exports.remove = remove;
//# sourceMappingURL=comment.controller.js.map