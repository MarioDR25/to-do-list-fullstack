import { Request, Response } from 'express';
import Task, { createNewTask } from '../models/task.model.js';
import { readData, writeData } from '../helpers/fileManager.js';
import path from 'node:path';
import { supabase } from '../supabas.js';
const sup = supabase;
const taskPath = path.resolve('data', 'tasks.json')

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const userId = req.headers['x-user-id'] as string;
        const tasks = await readData<Task>(taskPath);
        const userTasks = tasks.filter(t => t.user_id === userId);
        res.status(200).json(userTasks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const userId = req.headers['x-user-id'] as string;
        const tasks: Task[] = await readData<Task>(taskPath);
        const newTask: Task = createNewTask(title, userId, description);
        tasks.push(newTask);
        await writeData<Task>(taskPath, tasks);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const idP = req.params.id;
        const tasks: Task[] = await readData<Task>(taskPath);
        const taskIndex = tasks.findIndex(t => t.id === idP);
        if (taskIndex === -1) return res.status(404).json({ message: "Task not found" });
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        await writeData<Task>(taskPath, tasks);
        res.status(200).json(tasks[taskIndex]);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const idP = req.params.id;
        const tasksData = await readData<Task>(taskPath);
        const exist = tasksData.some(t => t.id === idP);
        if (!exist) return res.status(404).json({ message: "Task does not exist" });
        const tasks = tasksData.filter(t => t.id !== idP);
        await writeData<Task>(taskPath, tasks);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};