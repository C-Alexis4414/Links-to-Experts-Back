
export type UserType = {
    userName: string;
    password: string;
    email: string;
    is_Youtuber: boolean;
    is_Professional: boolean;
};

export type UserWithDetails = UserType & {
    youtuber?: {
        tagChannel: string;
    };
    professional?: {
        urlLinkedin: string;
    };
};