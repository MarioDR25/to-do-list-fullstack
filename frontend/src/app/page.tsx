import TaskCard from "@/components/TaskCard";
import { getAllTasks } from "@/data/services/api";
import { Task } from "@/types/task";
import FormModal from "@/components/FormModal";
import CreateButton from "@/components/CreateButton";


export default async function Home() {
  const tasks: Task[] = await getAllTasks();

  return (
    <main className="min-h-screen w-full bg-[#353535] flex items-center justify-center p-4">

      <div className="w-[80%] max-w-[1300px] h-[80vh] max-h-[800px] bg-slate-300 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-4 border-white/30 flex flex-col overflow-hidden">
        {/* Barra Encabezado*/}
        <div className="w-full bg-stone-800 backdrop-blur-md p-4 flex items-center border-b border-black/5">
          <h1 className="font-bold text-stone-100 tracking-widest uppercase text-center w-full text-2xl">Lista de Tareas</h1>
          <div className="flex gap-2 mrl-auto">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        </div>

        {/* Tablero de Tareas */}
        <div className="w-full h-full overflow-y-auto scrollbar-hide  flex items-start justify-center">
          <div className="p-5 w-full grid grid-cols-[repeat(auto-fill,280px)] gap-6 justify-center">
            <CreateButton />{/* Contenedor Cliente */}
            {tasks.map((t, i) => (<TaskCard key={t.id} index={i} task={t} />))}{/* Tareas */}
            <FormModal /> 
          </div>
        </div>

      </div>
    </main>
  );
}
