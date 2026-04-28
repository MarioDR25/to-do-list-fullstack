export interface User {
    id: string;
    username: string;
    createdAt: string;
}

export type UserRequest = {
    username: string;
    password: string;
}

export type UserUpdateRequest = Partial<UserRequest>;