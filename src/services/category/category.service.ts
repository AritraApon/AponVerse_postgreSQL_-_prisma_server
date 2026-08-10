import { prisma } from "../../lib/prisma";

export const createCategory = async (name: string) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (existingCategory && !existingCategory.isDeleted) {
    throw new Error("Category already exists");
  }

  const category = await prisma.category.create({
    data: {
      name,
    },
  });

  return category;
};

export const getAllCategories = async () => {
  return await prisma.category.findMany({
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

export const getCategoryById = async (id: string) => {
  const category = await prisma.category.findFirst({
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

export const updateCategory = async (
  id: string,
  name: string
) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const existingCategory = await prisma.category.findFirst({
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

  return await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
};

export const deleteCategory = async (id: string) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return await prisma.category.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
};