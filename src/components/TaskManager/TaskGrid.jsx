
import { TaskCard } from "./TaskCard";

function TaskGrid({ tasks, onDeleteTask, onEditTask, onViewTask, categories = [] }) {
  
  // show message if no tasks
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-white mb-2">No tasks found</h3>
        <p className="text-gray-400">Create your first task to get started!</p>
      </div>
    );
  }

   return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onDelete={onDeleteTask} 
          onEdit={onEditTask}
          onView={onViewTask}
          categories={categories}
        />
      ))}
    </div>
  );
}

export { TaskGrid };