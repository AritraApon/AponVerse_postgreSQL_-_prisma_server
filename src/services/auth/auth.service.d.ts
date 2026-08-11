export declare const registerUser: (name: string, email: string, password: string) => Promise<{
    id: string;
    name: string;
    email: string;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        bio: string | null;
        profileImage: string | null;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map