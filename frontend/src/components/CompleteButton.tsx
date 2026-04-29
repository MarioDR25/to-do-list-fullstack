'use client';
import { actionUpdateTask } from "@/data/actions/taskActions";
import { useTaskContext } from "@/context/TaskContext";
import { Task } from "@/types/task";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CompleteButton = ({ task }: { task: Task }) => {
    const { session } = useTaskContext();

    const handleToggle = () => {
        actionUpdateTask(task.id, { ...task, completed: !task.completed }, session.id);
    };

    return (
        <button className="cursor-pointer" onClick={handleToggle}>
            <FontAwesomeIcon icon={faSquareCheck} className={task.completed ? 'text-emerald-500/80' : 'text-white/50'} />
        </button>
    );
}

export default CompleteButton;