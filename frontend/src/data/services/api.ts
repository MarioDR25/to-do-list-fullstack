import { Task } from "@/types/task";
import { TaskDto } from "../dtos/task.dto";
import { mapTaskDtoToTask } from "../mappers/mapTaskDtoToTask";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


export const getAllTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${BASE_URL}/tasks`)
    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status} ${response.statusText}`)
    }
    const data: TaskDto[] = await response.json()
 
    const tasks = data.map(t => mapTaskDtoToTask(t));
    
    return tasks;
} 