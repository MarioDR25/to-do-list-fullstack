import  { TaskRequest }  from "@/types/task"
import  { TaskRequestDto, TaskUpdateDto }  from "../dtos/taskDto"

export const taskDataToTaskDataDto = (task: TaskRequest): TaskRequestDto => {
    return {
        title: task.title.charAt(0).toUpperCase() + task.title.slice(1).toLowerCase(),
        description: task.description
    }
}

export const taskDataToUpdateDto  = (task: TaskRequest): TaskUpdateDto => {
    return {
        title: task.title.charAt(0).toUpperCase() + task.title.slice(1).toLowerCase(),
        description: task.description,
        completed: task.completed || false
    }
}