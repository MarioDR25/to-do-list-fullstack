export interface Task {
    id: number;
    date: Date;
    title: string,
    description?: string,
    completed: boolean 
}
 export type TaskRequest = Omit<Task, 'id' | 'date'>