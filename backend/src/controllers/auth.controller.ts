import { Request, Response } from 'express';
import { supabase } from '../supabase.js';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const userClean: string = username.trim().toLowerCase()
        const { data: user, error } = await supabase.from('users').select('id, username, password').eq('username', userClean).single();
        if (error || !user) return res.status(401).json({ message: "Invalid credentials" });
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: "Invalid credentials" });
        res.status(200).json({ id: user.id, username: user.username });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};