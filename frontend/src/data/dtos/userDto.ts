export interface UserDto {
    id: string;
    username: string;
    createdAt: string;
}

export type UserRequestDto = {
    username: string;
    password: string;
}

export type UserUpdateRequestDto = Partial<UserRequestDto>;