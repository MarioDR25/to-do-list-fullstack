'use server';
import { revalidatePath } from "next/cache";
import { createUser, updateUser, deleteUser } from "../services/userApi";
import { UserRequest, UserUpdateRequest } from "@/types/user";

export const actionCreateUser = async (user: UserRequest) => {
    try {
        await createUser(user);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error en action:", error);
        return { success: false, error: "No se pudo crear el usuario." };
    }
}

export const actionUpdateUser = async (id: string, user: UserUpdateRequest) => {
    try {
        await updateUser(id, user);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error en action:", error);
        return { success: false, error: "No se pudo actualizar el usuario." };
    }
}

export const actionDeleteUser = async (id: string) => {
    try {
        await deleteUser(id);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error en action:", error);
        return { success: false, error: "No se pudo eliminar el usuario." };
    }
}