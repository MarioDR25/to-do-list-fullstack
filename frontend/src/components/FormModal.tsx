"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useTaskContext } from "@/context/TaskContext";
import { actionAddTask, actionUpdateTask } from "@/data/actions/taskActions";
import { TaskRequest } from "@/types/task";


type MyChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type MySubmitEvent = React.SubmitEvent<HTMLFormElement>

const FormModal = () => {
  const { isOpen, selectedTask, closeModal } = useTaskContext();
  const [formData, setFormData] = useState<TaskRequest>({ title: "", description: "", completed: false });

  
  useEffect(() => {
    if (selectedTask) {
      setFormData({ title: selectedTask.title, description: selectedTask.description, completed: selectedTask.completed });
    } else {
      setFormData({ title: "", description: "", completed: false });
    }
  }, [selectedTask]);


  const handleSubmit = async (e : MySubmitEvent) => {
    e.preventDefault();
    (selectedTask) ? await actionUpdateTask(selectedTask.id, formData) : await actionAddTask(formData);
    setFormData({ title: "", description: "", completed: false });
    closeModal();
  };

  const handleChange = (e: MyChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  return (
    <div>
      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        {/* Fondo */}
        <DialogBackdrop className="fixed inset-0 bg-black/1 backdrop-blur-sm" />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 shadow-xl border border-white/10">

            <DialogTitle as="h3" className="text-xl font-bold text-white uppercase tracking-widest mb-4">
              {(!selectedTask) ? "Nueva Tarea" : "Editar Tarea"}
            </DialogTitle>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Título
                </label>
                <input
                  required
                  maxLength={15}
                  minLength={3}
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ej: Comprar café"
                  className="w-full bg-gray-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  maxLength={300}
                  placeholder="Detalles de la tarea..."
                  className="w-full bg-gray-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
                />
              </div>

              {/* Guardar Tarea*/}
              <div className="mt-8 flex flex-row-reverse gap-3">
                <button
                  type="submit"
                  className="rounded-md bg-red-500 px-6 py-2 text-sm font-bold text-white hover:bg-red-400 transition-all active:scale-95"
                >
                  GUARDAR TAREA
                </button>

              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default FormModal;