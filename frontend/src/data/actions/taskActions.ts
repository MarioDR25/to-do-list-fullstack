'use server';
import { revalidatePath } from "next/cache";
import { addTask, deleteTask, updateTask } from "../services/taskApi";
import { TaskRequest } from "@/types/task";

export const actionDeleteTask = async (id: string, userId: string) => {
    try {
        await deleteTask(id, userId);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { success: false, error: "No se pudo eliminar la tarea." };
    }
}

export const actionAddTask = async (task: TaskRequest, userId: string) => {
    try {
        await addTask(task, userId);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { success: false, error: "No se pudo agregar la tarea." };
    }
}

export const actionUpdateTask = async (id: string, task: TaskRequest, userId: string) => {
    try {
        await updateTask(id, task, userId);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { success: false, error: "No se pudo actualizar la tarea." };
    }
}