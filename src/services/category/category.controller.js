"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getSingle = exports.getAll = exports.create = void 0;
const category_service_1 = require("./category.service");
const create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }
        const category = await (0, category_service_1.createCategory)(name);
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create category",
        });
    }
};
exports.create = create;
const getAll = async (req, res) => {
    try {
        const categories = await (0, category_service_1.getAllCategories)();
        return res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: categories,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve categories",
        });
    }
};
exports.getAll = getAll;
const getSingle = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await (0, category_service_1.getCategoryById)(id);
        return res.status(200).json({
            success: true,
            message: "Category retrieved successfully",
            data: category,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Category not found",
        });
    }
};
exports.getSingle = getSingle;
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }
        const category = await (0, category_service_1.updateCategory)(id, name);
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update category",
        });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, category_service_1.deleteCategory)(id);
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete category",
        });
    }
};
exports.remove = remove;
//# sourceMappingURL=category.controller.js.map