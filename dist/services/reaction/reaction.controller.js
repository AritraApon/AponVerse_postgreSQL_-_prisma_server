"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReactions = exports.toggle = void 0;
const reaction_service_1 = require("./reaction.service");
const toggle = async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { postId } = req.params;
        const result = await (0, reaction_service_1.toggleLike)(req.user.userId, postId);
        return res.status(200).json({
            success: true,
            message: result.message,
            data: {
                liked: result.liked,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to toggle like",
        });
    }
};
exports.toggle = toggle;
const getReactions = async (req, res) => {
    try {
        const { postId } = req.params;
        const result = await (0, reaction_service_1.getPostReactions)(postId, req.user?.userId);
        return res.status(200).json({
            success: true,
            message: "Reactions retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve reactions",
        });
    }
};
exports.getReactions = getReactions;
//# sourceMappingURL=reaction.controller.js.map