export interface TaskDto {
    id: number,
    date: Date,
    title: string,
    description?: string,
    completed: boolean
}