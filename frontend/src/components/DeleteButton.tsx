'use client';
import { actionDeleteTask } from "@/data/actions/taskActions";
import { useTaskContext } from "@/context/TaskContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteButton = ({ id }: { id: string }) => {
    const { session } = useTaskContext();
    return (
        <button
            className="cursor-pointer"
            onClick={() => actionDeleteTask(id, session.id)}>
            <FontAwesomeIcon icon={faTrash} className="text-rose-400/90" />
        </button>
    );
}

export default DeleteButton;