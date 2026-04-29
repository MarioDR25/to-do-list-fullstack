import express, { Application } from 'express';
import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

const app: Application = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());

const PORT: number = Number(process.env.PORT) || 3000;

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});