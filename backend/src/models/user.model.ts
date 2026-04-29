import { v4 as uuidv4 } from 'uuid';

export default interface User {
    id: string;
    username: string;
    password: string;
    created_at: string;
}

export type CreateUserDTO = {
    username: string;
    password: string;
}

export const createNewUser = (username: string, password: string): User => {
    return {
        id: uuidv4(),
        username,
        password,
        created_at: new Date().toISOString(),
    };
}