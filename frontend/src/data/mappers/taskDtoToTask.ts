import { Task } from "@/types/task";
import { TaskDto } from "../dtos/taskDto";

export const taskDtoToTask = (dto: TaskDto): Task => {
    return {
        id: dto.id,
        date: new Date(dto.date),
        title: dto.title.charAt(0) + dto.title.slice(1),
        description: dto.description,
        completed: dto.completed
    }
}