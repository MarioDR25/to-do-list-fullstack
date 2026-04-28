import { UserRequest, UserUpdateRequest } from "@/types/user";
import { UserRequestDto, UserUpdateRequestDto } from "../dtos/userDto";

export const userRequestToDto = (user: UserRequest): UserRequestDto => {
    return {
        username: user.username.trim().toLowerCase(),
        password: user.password,
    };
}

export const userUpdateRequestToDto = (user: UserUpdateRequest): UserUpdateRequestDto => {
    return {
        ...(user.username && { username: user.username.trim().toLowerCase() }),
        ...(user.password && { password: user.password }),
    };
}