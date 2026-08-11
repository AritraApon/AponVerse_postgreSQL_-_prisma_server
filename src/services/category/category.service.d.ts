export declare const createCategory: (name: string) => Promise<{
    id: string;
    name: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getAllCategories: () => Promise<({
    _count: {
        posts: number;
    };
} & {
    id: string;
    name: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const getCategoryById: (id: string) => Promise<{
    posts: {
        id: string;
        title: string;
        description: string;
        image: string | null;
        status: import("../../../generated/prisma/enums").PostStatus;
        isDeleted: boolean;
        authorId: string;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
} & {
    id: string;
    name: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateCategory: (id: string, name: string) => Promise<{
    id: string;
    name: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteCategory: (id: string) => Promise<{
    id: string;
    name: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=category.service.d.ts.map