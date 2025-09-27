import { useState } from "react";
import { ArrowLeft, Edit, Trash2, Calendar, Tag, CheckCircle, Circle } from "lucide-react";
import { formatDate, getPriorityColor } from "../../utils/helpers.jsx";

export const TaskDetail = ({ task, categories, onBack, onEdit, onDelete, onToggleComplete }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  if (!task) return null;

   const category = categories.find(cat => cat.id === task.category_id) || { name: 'Unknown', color: '#666666', icon_url: '' };



  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Tasks
        </button>
      </div>

      {/* Main content */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        {/* Title and actions */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-white">{task.title}</h1>
          <div className="flex gap-3">
            <button
              onClick={() => onToggleComplete(task.id, !task.completed)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                task.completed 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              {task.completed ? <CheckCircle size={18} /> : <Circle size={18} />}
              {task.completed ? 'Completed' : 'Mark Complete'}
            </button>
            <button
              onClick={() => onEdit(task)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Edit size={18} />
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex gap-3 mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            task.completed ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
          }`}>
            {task.completed ? 'Completed' : 'In Progress'}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getPriorityColor(task.priority)}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>
        </div>

        {/* Image */}
        {task.image_url && (
          <div className="mb-6">
            {imageLoading && (
              <div className="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
            {imageError ? (
              <div className="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">📷</div>
                  <p>Image failed to load</p>
                </div>
              </div>
            ) : (
              <img
                src={task.image_url}
                alt={task.title}
                className={`w-full h-64 object-cover rounded-lg ${imageLoading ? 'hidden' : ''}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
          <p className="text-gray-300 leading-relaxed">
            {task.description || 'No description provided.'}
          </p>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Tag size={18} className="text-gray-400" />
              <h4 className="font-medium text-white">Category</h4>
            </div>
            <div className="flex items-center gap-3">
              {category.icon_url && (
                <img src={category.icon_url} alt="" className="w-6 h-6" />
              )}
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </span>
            </div>
          </div>

          {/* Due Date */}
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={18} className="text-gray-400" />
              <h4 className="font-medium text-white">Due Date</h4>
            </div>
            <p className="text-gray-300">{formatDate(task.due_date)}</p>
          </div>
        </div>

        {/* Timestamps */}
        <div className="mt-6 pt-6 border-t border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <span className="font-medium">Created:</span> {new Date(task.created_at).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Updated:</span> {new Date(task.updated_at).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};