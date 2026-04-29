import { getSession } from '@/lib/session';
import { getAllTasks } from '@/data/services/taskApi';
import { Task } from '@/types/task';
import TaskBoard from '@/components/TaskBoard';
import Login from '@/components/Login';

export default async function Home() {
    const session = await getSession();

    if (!session) return (
        <main className="min-h-screen w-full bg-[#353535] flex items-center justify-center p-4">
            <div className="bg-slate-300 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-10 w-full max-w-sm">
                <Login />
            </div>
        </main>
    );

    const tasks: Task[] = await getAllTasks(session.id);

    return (
        <main className="min-h-screen w-full bg-[#353535] flex items-center justify-center p-4">
            <div className="w-[80%] max-w-[1300px] h-[80vh] max-h-[800px] bg-slate-300 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-4 border-white/30 flex flex-col overflow-hidden">
                <div className="w-full bg-stone-800 backdrop-blur-md p-4 flex items-center border-b border-black/5">
                    <h1 className="font-bold text-stone-100 tracking-widest uppercase text-center w-full text-2xl">Lista de Tareas</h1>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                </div>
                <TaskBoard tasks={tasks} session={session} />
            </div>
        </main>
    );
}