export declare const getMyProfile: (userId: string) => Promise<{
    bio: string | null;
    createdAt: Date;
    email: string;
    id: string;
    name: string;
    profileImage: string | null;
    updatedAt: Date;
}>;
export declare const updateMyProfile: (userId: string, data: {
    name?: string;
    bio?: string;
    profileImage?: string;
}) => Promise<{
    bio: string | null;
    createdAt: Date;
    email: string;
    id: string;
    name: string;
    profileImage: string | null;
    updatedAt: Date;
}>;
//# sourceMappingURL=user.service.d.ts.map