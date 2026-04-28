'use server';
import { revalidatePath } from "next/cache";
import { addTask, deleteTask, updateTask } from "../services/taskApi";
import { TaskRequest } from "@/types/task";

export const actionDeleteTask = async (id: number) => {
    try {
        await deleteTask(id);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error en action:", error);
        return {
            success: false,
            error: "No se pudo conectar con el servidor."
        };
    }
}

export const actionAddTask = async (task: TaskRequest) => {
    try {
        await addTask(task)
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Error en action:", error);
        return {
            success: false,
            error: "No se pudo conectar con el servidor."
        };
    }
}

export const actionUpdateTask = async (id: number, task: TaskRequest) => {
    try {
        await updateTask(id, task)
        revalidatePath('/')
        return { success: true };
    } catch (error) {
        console.error("Error en action:", error);
        return {
            success: false,
            error: "No se pudo conectar con el servidor."
        };
    }
}

