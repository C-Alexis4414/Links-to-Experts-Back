export type UserType = {
    id: number;
    userName: string;
    password: string;
    email: string;
    is_Youtuber: boolean;
    is_Professional: boolean;
    hashRefreshToken: string;
    refreshExpiresAt: Date;
};

export type UserWithDetails = UserType & {
    youtuber?: {
        tagChannel: string;
    };
    professional?: {
        urlLinkedin: string;
    };
};
