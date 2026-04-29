"use client";
import { createContext, useContext, useState } from "react";
import { Task } from "@/types/task";
import { Session } from "@/types/session";

interface TaskContextType {
    isOpen: boolean;
    selectedTask: Task | null;
    session: Session;
    openModal: (task?: Task) => void;
    closeModal: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children, session }: { children: React.ReactNode; session: Session }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const openModal = (task?: Task) => {
        setSelectedTask(task || null);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedTask(null);
    };

    return (
        <TaskContext.Provider value={{ isOpen, selectedTask, session, openModal, closeModal }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTaskContext debe usarse dentro de TaskProvider");
    return context;
};