"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const prisma_1 = require("../../lib/prisma");
const createCategory = async (name) => {
    const existingCategory = await prisma_1.prisma.category.findUnique({
        where: {
            name,
        },
    });
    if (existingCategory && !existingCategory.isDeleted) {
        throw new Error("Category already exists");
    }
    const category = await prisma_1.prisma.category.create({
        data: {
            name,
        },
    });
    return category;
};
exports.createCategory = createCategory;
const getAllCategories = async () => {
    return await prisma_1.prisma.category.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            _count: {
                select: {
                    posts: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (id) => {
    const category = await prisma_1.prisma.category.findFirst({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            posts: {
                where: {
                    isDeleted: false,
                    status: "PUBLISHED",
                },
            },
        },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    return category;
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (id, name) => {
    const category = await prisma_1.prisma.category.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    const existingCategory = await prisma_1.prisma.category.findFirst({
        where: {
            name,
            NOT: {
                id,
            },
        },
    });
    if (existingCategory) {
        throw new Error("Category name already exists");
    }
    return await prisma_1.prisma.category.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    const category = await prisma_1.prisma.category.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    return await prisma_1.prisma.category.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.service.js.map