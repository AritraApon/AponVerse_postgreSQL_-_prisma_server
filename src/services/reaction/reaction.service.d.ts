export declare const toggleLike: (userId: string, postId: string) => Promise<{
    liked: boolean;
    message: string;
}>;
export declare const getPostReactions: (postId: string, userId?: string) => Promise<{
    likeCount: number;
    likedByMe: boolean;
}>;
//# sourceMappingURL=reaction.service.d.ts.map