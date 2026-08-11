export declare const createComment: (userId: string, postId: string, content: string) => Promise<{
    author: {
        id: string;
        name: string;
        profileImage: string | null;
    };
} & {
    id: string;
    content: string;
    authorId: string;
    postId: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getPostComments: (postId: string) => Promise<({
    author: {
        id: string;
        name: string;
        profileImage: string | null;
    };
} & {
    id: string;
    content: string;
    authorId: string;
    postId: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const deleteComment: (commentId: string, userId: string) => Promise<{
    id: string;
    content: string;
    authorId: string;
    postId: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=comment.service.d.ts.map