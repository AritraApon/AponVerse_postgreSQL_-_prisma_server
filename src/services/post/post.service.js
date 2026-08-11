"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyPosts = exports.deletePost = exports.updatePost = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
const prisma_1 = require("../../lib/prisma");
const createPost = async (title, description, image, authorId, categoryId) => {
    const post = await prisma_1.prisma.post.create({
        data: {
            title,
            description,
            authorId,
            ...(image !== undefined && { image }),
            ...(categoryId !== undefined && { categoryId }),
        },
    });
    return post;
};
exports.createPost = createPost;
// all data get from prisma
const getAllPosts = async (page, limit, search, categoryId) => {
    const skip = (page - 1) * limit;
    const where = {
        isDeleted: false,
        status: "PUBLISHED",
        ...(search && {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ],
        }),
        ...(categoryId && {
            categoryId,
        }),
    };
    const [posts, total] = await Promise.all([
        prisma_1.prisma.post.findMany({
            where,
            skip,
            take: limit,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        bio: true,
                        profileImage: true,
                    },
                },
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.post.count({
            where,
        }),
    ]);
    return {
        posts,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getAllPosts = getAllPosts;
//details page data
const getPostById = async (id) => {
    const post = await prisma_1.prisma.post.findFirst({
        where: {
            id,
            isDeleted: false,
            status: "PUBLISHED",
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    bio: true,
                    profileImage: true,
                },
            },
            category: true,
        },
    });
    if (!post) {
        throw new Error("Post not found");
    }
    return post;
};
exports.getPostById = getPostById;
// update your post
const updatePost = async (postId, userId, data) => {
    const post = await prisma_1.prisma.post.findFirst({
        where: {
            id: postId,
            isDeleted: false,
        },
    });
    if (!post) {
        throw new Error("Post not found");
    }
    if (post.authorId !== userId) {
        throw new Error("You are not allowed to update this post");
    }
    const updatedPost = await prisma_1.prisma.post.update({
        where: {
            id: postId,
        },
        data,
    });
    return updatedPost;
};
exports.updatePost = updatePost;
//delete your post
const deletePost = async (postId, userId) => {
    const post = await prisma_1.prisma.post.findFirst({
        where: {
            id: postId,
            isDeleted: false,
        },
    });
    if (!post) {
        throw new Error("Post not found");
    }
    if (post.authorId !== userId) {
        throw new Error("You are not allowed to delete this post");
    }
    const deletedPost = await prisma_1.prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            isDeleted: true,
        },
    });
    return deletedPost;
};
exports.deletePost = deletePost;
// Get my post
const getMyPosts = async (userId) => {
    const posts = await prisma_1.prisma.post.findMany({
        where: {
            authorId: userId,
            isDeleted: false,
        },
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return posts;
};
exports.getMyPosts = getMyPosts;
//# sourceMappingURL=post.service.js.map