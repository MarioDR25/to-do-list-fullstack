import { Task, TaskRequest } from "@/types/task";
import { taskDtoToTask } from "../mappers/taskDtoToTask";
import { taskDataToTaskDataDto, taskDataToUpdateDto } from "../mappers/taskDataToTaskDataDto";
import { TaskDto, TaskRequestDto } from "../dtos/taskDto";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const getAllTasks = async (userId: string): Promise<Task[]> => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        headers: { 'x-user-id': userId },
        cache: 'no-store'
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data: TaskDto[] = await response.json();
    return data.map(t => taskDtoToTask(t));
}

export const deleteTask = async (id: string, userId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': userId }
    });
    if (!response.ok) throw new Error(`No se pudo eliminar: ${response.status}`);
}

export const addTask = async (task: TaskRequest, userId: string): Promise<void> => {
    const data : TaskRequestDto = taskDataToTaskDataDto(task);
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-user-id': userId
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`No se pudo agregar: ${response.status} `);
}

export const updateTask = async (id: string, task: TaskRequest, userId: string): Promise<void> => {
    const data = taskDataToUpdateDto(task);
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-user-id': userId
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`No se pudo actualizar: ${response.status}`);
}