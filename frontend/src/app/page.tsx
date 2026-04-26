import TaskCard from "@/components/TaskCard";
import { getAllTasks } from "@/data/services/api";
import { Task } from "@/types/task";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default async function Home() {
  const tasks: Task[] = await getAllTasks();

  return (
    <main className="min-h-screen w-full bg-[#242424] flex items-center justify-center p-4">

      <div className="w-[75%] max-w-[1200px] h-[75vh] max-h-[800px] bg-slate-300 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-4 border-white/30 flex flex-col overflow-hidden">

        <div className="w-full bg-stone-800 backdrop-blur-md p-4 flex items-center border-b border-black/5">
          <h1 className="font-bold text-stone-100 tracking-widest uppercase text-center w-full text-2xl">Lista de Tareas</h1>
          <div className="flex gap-2 mrl-auto">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        </div>

        <div className="flex-1 flex flex-wrap gap-8 overflow-y-auto p-10 justify-start content-start scrollbar-hide">
          <div className="w-64 h-64 border-2 border-dashed border-black/20 bg-transparent flex justify-center cursor-pointer">
            <button className="cursor-pointer">
              <FontAwesomeIcon icon={faPlus} size="4x" className="text-black/40 hover:text-black/80" />
            </button>
          </div>
          {tasks.map((t, i) => (<TaskCard key={t.id} index={i} task={t} />))}
        </div>

      </div>
    </main>
  );
}
