export interface Task {
    id: string;
    date: Date;
    title: string,
    description?: string,
    completed: boolean 
}
 export type TaskRequest = Omit<Task, 'id' | 'date'>