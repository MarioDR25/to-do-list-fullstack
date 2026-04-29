import { Request, Response } from 'express';
import { createNewTask } from '../models/task.model.js';
import { supabase } from '../supabase.js';

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const userId = req.headers['x-user-id'] as string;
        const { data, error } = await supabase.from('tasks').select('*').eq('user_id', userId);
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const userId = req.headers['x-user-id'] as string;
        const newTask = createNewTask(title, userId, description);
        const { data, error } = await supabase.from('tasks').insert(newTask).select().single();
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase.from('tasks').update(req.body).eq('id', req.params.id).select().single();
        if (error) throw error;
        if (!data) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { error } = await supabase.from('tasks').delete().eq('id', req.params.id);
        if (error) throw error;
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};