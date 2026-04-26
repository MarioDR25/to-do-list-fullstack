import { Task } from "@/types/task";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

interface TaskCardProps {
    index: number;
    task: Task;
}
const TaskCard = ({ index, task }: TaskCardProps) => {

    return (
        <div className="w-64 h-64 bg-[#555555] p-5 rounded-sm shadow-md flex flex-col justify-between text-stone-100 border border-white/5">

            {/*  Cabecera  */}
            <div className="flex items-center gap-2 border-b border-stone-100 pb-2 mb-3">
                <span className="text-xl font-mono  ">#{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-xl font-bold truncate flex-1">{task.title}</h3>
                <button className="cursor-pointer">
                    <FontAwesomeIcon icon={faSquareCheck} className="text-emerald-500/80" />
                </button>
            </div>

            {/*  Cuerpo  */}
            <div className="flex-1  mb-4">
                <p className="text-sm  ">{task.description}</p>
            </div>

            {/*  Pie de Nota  */}
            <div className="flex justify-between gap-2 border-t border-stone-100 pt-3 items-center">
                <span className="text-xs  font-medium">
                    {task.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}.
                </span>

                <div className="flex gap-2">
                    <button className="cursor-pointer">
                        <FontAwesomeIcon icon={faPenToSquare} className="text-slate-400" />
                    </button>
                    <button className="cursor-pointer">
                        <FontAwesomeIcon icon={faTrash} className="text-rose-400/90" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard;