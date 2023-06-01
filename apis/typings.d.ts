export type UserInfo = {
    username?: string;
    createdAt?: Date;
    lastModified?: Date;
    profile?: {
        id?: number;
        gender?: number;
        nickName?: string;
        email?: string;
        avatar?: string;
        address?: string;
    };
    logs?: object[];
    roles?: object[];
};
