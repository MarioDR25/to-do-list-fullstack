import { User } from "@/types/user";
import { UserDto } from "../dtos/userDto";

export const userDtoToUser = (dto: UserDto): User => {
    return {
        id: dto.id,
        username: dto.username.charAt(0).toUpperCase() + dto.username.slice(1).toLowerCase(),
        createdAt: dto.createdAt,
    };
}