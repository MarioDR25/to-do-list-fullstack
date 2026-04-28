import { userDtoToUser } from "../mappers/userDtoToUser";
import { userRequestToDto, userUpdateRequestToDto } from "../mappers/userToUserRequestDto";
import { UserDto } from "../dtos/userDto";
import { User, UserRequest, UserUpdateRequest } from "@/types/user";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const getAllUsers = async (): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    const data: UserDto[] = await response.json();
    return data.map(u => userDtoToUser(u));
}

export const getUserById = async (id: string): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    const data: UserDto = await response.json();
    return userDtoToUser(data);
}

export const createUser = async (user: UserRequest): Promise<void> => {
    const data = userRequestToDto(user);
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
}

export const updateUser = async (id: string, user: UserUpdateRequest): Promise<void> => {
    const data = userUpdateRequestToDto(user);
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
}

export const deleteUser = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
}