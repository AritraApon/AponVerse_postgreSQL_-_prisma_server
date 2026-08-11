"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMine = exports.remove = exports.update = exports.getSingle = exports.getAll = exports.create = void 0;
const post_service_1 = require("./post.service");
const create = async (req, res) => {
    try {
        const { title, description, image, categoryId } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }
        if (!req.user?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const post = await (0, post_service_1.createPost)(title, description, image, req.user.userId, categoryId);
        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create post",
        });
    }
};
exports.create = create;
// Get all Post
const getAll = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;
        const search = typeof req.query.search === "string"
            ? req.query.search
            : undefined;
        const categoryId = typeof req.query.categoryId === "string"
            ? req.query.categoryId
            : undefined;
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                message: "Page and limit must be greater than 0",
            });
        }
        const result = await (0, post_service_1.getAllPosts)(page, limit, search, categoryId);
        return res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: result.posts,
            pagination: result.pagination,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve posts",
        });
    }
};
exports.getAll = getAll;
// Get singel post details page
const getSingle = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await (0, post_service_1.getPostById)(id);
        return res.status(200).json({
            success: true,
            message: "Post retrieved successfully",
            data: post,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({
            success: false,
            message: "Post not found",
        });
    }
};
exports.getSingle = getSingle;
// Update post
const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.user?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { title, description, image, categoryId } = req.body;
        const post = await (0, post_service_1.updatePost)(id, req.user.userId, {
            title,
            description,
            image,
            categoryId,
        });
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: post,
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error
            ? error.message
            : "Failed to update post";
        const statusCode = message.includes("not allowed") ? 403 : 404;
        return res.status(statusCode).json({
            success: false,
            message,
        });
    }
};
exports.update = update;
// delete controller
const remove = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.user?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        await (0, post_service_1.deletePost)(id, req.user.userId);
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error
            ? error.message
            : "Failed to delete post";
        const statusCode = message.includes("not allowed") ? 403 : 404;
        return res.status(statusCode).json({
            success: false,
            message,
        });
    }
};
exports.remove = remove;
// get myPosts
const getMine = async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const posts = await (0, post_service_1.getMyPosts)(req.user.userId);
        return res.status(200).json({
            success: true,
            message: "Your posts retrieved successfully",
            data: posts,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve your posts",
        });
    }
};
exports.getMine = getMine;
//# sourceMappingURL=post.controller.js.map