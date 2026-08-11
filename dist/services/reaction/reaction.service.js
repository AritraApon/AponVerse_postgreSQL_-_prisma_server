"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostReactions = exports.toggleLike = void 0;
const prisma_1 = require("../../lib/prisma");
const toggleLike = async (userId, postId) => {
    const post = await prisma_1.prisma.post.findFirst({
        where: {
            id: postId,
            isDeleted: false,
            status: "PUBLISHED",
        },
    });
    if (!post) {
        throw new Error("Post not found");
    }
    const existingReaction = await prisma_1.prisma.reaction.findUnique({
        where: {
            userId_postId: {
                userId,
                postId,
            },
        },
    });
    if (existingReaction) {
        await prisma_1.prisma.reaction.delete({
            where: {
                id: existingReaction.id,
            },
        });
        return {
            liked: false,
            message: "Post unliked",
        };
    }
    await prisma_1.prisma.reaction.create({
        data: {
            userId,
            postId,
            type: "LIKE",
        },
    });
    return {
        liked: true,
        message: "Post liked",
    };
};
exports.toggleLike = toggleLike;
const getPostReactions = async (postId, userId) => {
    const likeCount = await prisma_1.prisma.reaction.count({
        where: {
            postId,
            type: "LIKE",
        },
    });
    let likedByMe = false;
    if (userId) {
        const reaction = await prisma_1.prisma.reaction.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });
        likedByMe = !!reaction;
    }
    return {
        likeCount,
        likedByMe,
    };
};
exports.getPostReactions = getPostReactions;
//# sourceMappingURL=reaction.service.js.map