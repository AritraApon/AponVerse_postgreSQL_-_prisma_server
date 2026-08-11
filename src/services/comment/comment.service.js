"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getPostComments = exports.createComment = void 0;
const prisma_1 = require("../../lib/prisma");
const createComment = async (userId, postId, content) => {
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
    return prisma_1.prisma.comment.create({
        data: {
            content,
            authorId: userId,
            postId,
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    profileImage: true,
                },
            },
        },
    });
};
exports.createComment = createComment;
const getPostComments = async (postId) => {
    return prisma_1.prisma.comment.findMany({
        where: {
            postId,
            isDeleted: false,
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    profileImage: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getPostComments = getPostComments;
const deleteComment = async (commentId, userId) => {
    const comment = await prisma_1.prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId: userId,
            isDeleted: false,
        },
    });
    if (!comment) {
        throw new Error("Comment not found");
    }
    return prisma_1.prisma.comment.update({
        where: {
            id: commentId,
        },
        data: {
            isDeleted: true,
        },
    });
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=comment.service.js.map