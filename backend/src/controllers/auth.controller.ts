import { Request, Response } from "express";
import { readData } from "../helpers/fileManager.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import path from "path";

const usersPath = path.resolve('data', 'users.json');

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: "Username and password are required" });

        const users: User[] = await readData<User>(usersPath);
        const user = users.find(u => u.username === username);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

        res.status(200).json({ id: user.id, username: user.username });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};