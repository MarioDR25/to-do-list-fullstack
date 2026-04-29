export interface TaskDto {
    id: number;
    date: Date;
    title: string;
    description?: string;
    completed: boolean;
}

export type TaskRequestDto = Pick<TaskDto, 'title' | 'description'>;
export type TaskUpdateDto = Pick<TaskDto, 'title' | 'description' | 'completed'>