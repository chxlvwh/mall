export type Profile = {
    id: number;
    gender: number;
    photo: string;
    address: string;
    user: User;
};

export type Logs = {
    id: number;
    path: string;
    method: string;
    data: string;
    result: number;
    user: User;
};

export type User = {
    id: number;
    username: string;
    password: string;
    logs: Logs[];
    roles: Roles[];
    profile: Profile;
};

export type Roles = {
    id: number;
    name: string;
    users: User[];
    menus: Menus[];
};

export type Menus = {
    id: number;
    name: string;
    path: string;
    order: number;
    acl: string;
    role: Roles[];
};
