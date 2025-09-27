import { Edit, Trash2, Calendar, Tag, Eye } from "lucide-react";
import { useState } from "react";
import { formatDate, getPriorityColor } from "../../utils/helpers.jsx";

export const TaskCard = ({
  task,
  onDelete,
  onEdit,
  onView,
  categories = [],
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // find category
  const category = categories.find((cat) => cat.id === task.category_id) || {
    name: `Category ${task.category_id}`,
    color: "#666666",
    icon_url: "",
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      {/* task image */}
      {task.image_url && (
        <div className="mb-3 relative">
          {imageLoading && (
            <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          )}
          {imageError ? (
            <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="text-2xl mb-1">📷</div>
                <p className="text-xs">Failed to load</p>
              </div>
            </div>
          ) : (
            <img
              src={task.image_url}
              alt={task.title}
              className={`w-full h-32 object-cover rounded-lg ${
                imageLoading ? "hidden" : ""
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>
      )}

      {/* title and buttons */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white truncate">
          {task.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onView && onView(task)}
            className="text-green-400 hover:text-green-300 p-1 cursor-pointer"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit && onEdit(task)}
            className="text-blue-400 hover:text-blue-300 p-1 cursor-pointer"
            title="Edit Task"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete && onDelete(task.id)}
            className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* description */}
      <div className="mb-3">
        <p className="text-sm text-gray-300 line-clamp-2">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* category with color and icon */}
      <div className="flex items-center mb-3">
        <div className="flex items-center gap-2">
          {category.icon_url && (
            <img src={category.icon_url} alt="" className="w-4 h-4" />
          )}
          <span
            className="px-2 py-1 rounded text-xs font-medium text-white"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
          </span>
        </div>
      </div>

      {/* status and priority */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`px-2 py-1 rounded text-xs ${
            task.completed
              ? "bg-green-600 text-white"
              : "bg-gray-600 text-white"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
        <span
          className={`px-2 py-1 rounded text-xs ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority
            ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
            : "No Priority"}
        </span>
      </div>

      {/* due date */}
      <div className="flex items-center">
        <Calendar size={14} className="text-gray-400 mr-2" />
        <span className="text-sm text-gray-300">
          Due: {formatDate(task.due_date)}
        </span>
      </div>
    </div>
  );
};
