export declare const createPost: (title: string, description: string, image: string | undefined, authorId: string, categoryId?: string) => Promise<{
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
}>;
export declare const getAllPosts: (page: number, limit: number, search?: string, categoryId?: string) => Promise<{
    posts: ({
        author: {
            bio: string | null;
            id: string;
            name: string;
            profileImage: string | null;
        };
        category: {
            id: string;
            name: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
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
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getPostById: (id: string) => Promise<{
    author: {
        bio: string | null;
        id: string;
        name: string;
        profileImage: string | null;
    };
    category: {
        id: string;
        name: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
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
}>;
export declare const updatePost: (postId: string, userId: string, data: {
    title?: string;
    description?: string;
    image?: string;
    categoryId?: string;
}) => Promise<{
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
}>;
export declare const deletePost: (postId: string, userId: string) => Promise<{
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
}>;
export declare const getMyPosts: (userId: string) => Promise<({
    category: {
        id: string;
        name: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
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
})[]>;
//# sourceMappingURL=post.service.d.ts.map