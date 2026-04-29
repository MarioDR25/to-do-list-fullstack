import { Request, Response } from 'express';
import { createNewUser } from '../models/user.model.js';
import { supabase } from '../supabase.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase.from('users').select('id, username, createdAt');
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserByID = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase.from('users').select('id, username, createdAt').eq('id', req.params.id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ message: "User not found" });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const { data: exists } = await supabase.from('users').select('id').eq('username', username).single();
        if (exists) return res.status(400).json({ message: "Username already taken" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = createNewUser(username, hashedPassword);
        const { data, error } = await supabase.from('users').insert(newUser).select('id, username').single();
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const body = req.body.password ? { ...req.body, password: await bcrypt.hash(req.body.password, 10) }: req.body;
        const { data, error } = await supabase.from('users').update(body).eq('id', req.params.id).select('id, username').single();
        if (error) throw error;
        if (!data) return res.status(404).json({ message: "User not found" });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { error } = await supabase.from('users').delete().eq('id', req.params.id);
        if (error) throw error;
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};