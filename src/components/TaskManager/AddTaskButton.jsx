import { Plus } from "lucide-react";

 function AddTaskButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
    >
      <Plus size={20} />
      Add Task
    </button>
  );
}

export { AddTaskButton };
