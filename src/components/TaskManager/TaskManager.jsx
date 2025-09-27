import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskFilter } from "./TaskFilter";
import { AddTaskButton } from "./AddTaskButton";
import { TaskGrid } from "./TaskGrid";
import { TaskDetail } from "./TaskDetail";
import { AddTaskModal } from "./AddTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { Pagination } from "./Pagination";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
  fetchCategories,
} from "../../redux/api/apiSlice.jsx";

export const TaskManager = () => {
  const dispatch = useDispatch();
  const { items: tasks, status, error } = useSelector((state) => state.tasks);
  const { categories } = useSelector((state) => state.categories);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [viewingTask, setViewingTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCategories());
  }, [dispatch]);

  // get categories  
  const allCategories = categories.length > 0 
    ? categories 
    : [...new Set(tasks.map((task) => task.category_id))].sort().map(id => ({ id, name: id }));

  // filter  
  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category_id === selectedCategory);

  // pagination  
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setCurrentPage(1); 
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAddTask() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleAddNewTask(newTask) {
    const taskData = {
      title: newTask.title,
      description: newTask.description,
      due_date: newTask.due_date,
      priority: newTask.priority.toLowerCase(),
      category_id: newTask.category_id,
      completed: newTask.completed,
      image_url: newTask.image_url,
    };

    dispatch(addTask(taskData));
    setCurrentPage(1);
  }

  function handleDeleteTask(taskId) {
    dispatch(deleteTask(taskId));
    
     const remainingTasks = currentTasks.length - 1;
    if (remainingTasks === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleEditTask(task) {
    const editTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      priority: task.priority,
      category_id: task.category_id,
      image_url: task.image_url || "",
      completed: task.completed,
    };
    setTaskToEdit(editTask);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  }

  function handleUpdateTask(updatedTask) {
    const updates = {
      title: updatedTask.title,
      description: updatedTask.description,
      due_date: updatedTask.due_date,
      priority: updatedTask.priority,
      category_id: updatedTask.category_id,
      image_url: updatedTask.image_url || "",
      completed: updatedTask.completed,
    };

    dispatch(updateTask({ id: updatedTask.id, updates }));
  }

  function handleToggleComplete(taskId, completed) {
    const updates = {
      completed: completed,
    };

    dispatch(updateTask({ id: taskId, updates }));
  }

  function handleViewTask(task) {
    setViewingTask(task);
  }

  function handleBackFromDetails() {
    setViewingTask(null);
  }

  function handleDeleteFromDetails(taskId) {
     if (confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId));
      setViewingTask(null);
    }
  }

  function handleEditFromDetails(task) {
    setViewingTask(null);
    handleEditTask(task);
  }

  if (viewingTask) {
    return (
      <TaskDetail
        task={viewingTask}
        categories={allCategories}
        onBack={handleBackFromDetails}
        onEdit={handleEditFromDetails}
        onDelete={handleDeleteFromDetails}
        onToggleComplete={handleToggleComplete}
      />
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">Task Manager</h2>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {tasks.length} Tasks
          </span>
        </div>
        <AddTaskButton onClick={handleAddTask} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Error loading tasks</span>
          </div>
          <p className="text-red-300 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {status === "loading" ? (
        <div className="flex flex-col items-center justify-center py-12">
          {/* Loading Spinner */}
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-blue-400 rounded-full animate-spin animation-delay-150"></div>
          </div>

          {/* Loading Text */}
          <div className="mt-4 text-center">
            <p className="text-gray-300 font-medium">Loading tasks...</p>
            <p className="text-gray-500 text-sm mt-1">
              Please wait while we fetch your data
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Filter */}
          <TaskFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={allCategories}
          />

          {/* Tasks Grid */}
          <TaskGrid
            tasks={currentTasks}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onViewTask={handleViewTask}
            categories={allCategories}
          />

          {/* Pagination   */}
          {filteredTasks.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredTasks.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddTask={handleAddNewTask}
        categories={allCategories}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEditTask={handleUpdateTask}
        task={taskToEdit}
        categories={allCategories}
      />
    </div>
  );
};
