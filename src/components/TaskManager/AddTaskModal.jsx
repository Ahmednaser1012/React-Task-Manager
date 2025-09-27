import { useState } from "react";
import { X, Calendar, Tag, AlertCircle, Upload, Image } from "lucide-react";

export const AddTaskModal = ({ isOpen, onClose, onAddTask, categories }) => {
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    description: "",
    priority: " ",
    due_date: "",
    image_url: "",
    completed: false
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  const priorities = ["High", "Medium", "Low"];

   function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
     if (name === "image_url") {
      setImagePreview(value);
    }
    
     if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  }

   function handleCheckboxChange(e) {
    const name = e.target.name;
    const checked = e.target.checked;
    
    setFormData({
      ...formData,
      [name]: checked
    });
  }

   function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setFormData({
          ...formData,
          image_url: imageUrl
        });
        setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }

   function removeImage() {
    setFormData({
      ...formData,
      image_url: ""
    });
    setImagePreview("");
  }

  //form validation
  function checkFormValid() {
    const newErrors = {};    
    if (formData.title === "") {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 255) {
      newErrors.title = "Title must be less than 255 characters";
    }

    if (!formData.category_id) {
      newErrors.category_id = "Category is required";
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters";
    }

    if (formData.image_url && formData.image_url.length > 500) {
      newErrors.image_url = "Image URL must be less than 500 characters";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    if (checkFormValid()) {
       const randomId = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      const newTask = {
        id: randomId,
        title: formData.title,
        category_id: formData.category_id,
        description: formData.description,
        priority: formData.priority,
        due_date: formData.due_date,
        image_url: formData.image_url,
        completed: formData.completed
      };
      
      onAddTask(newTask);
      
      // reset form
      setFormData({
        title: "",
        category_id: "",
        description: "",
        priority: " ",
        due_date: "",
        image_url: "",
        completed: false
      });
      setErrors({});
      setImagePreview("");
      onClose();
    } else {
      alert("Please fix the errors before submitting");
    }
  }

  // Handle close modal
  function handleClose() {
    setFormData({
      title: "",
      category_id: "",
      description: "",
      priority: "",
      due_date: "",
      image_url: "",
      completed: false
    });
    setErrors({});
    setImagePreview("");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Add New Task</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Enter task title"
              maxLength={255}
            />
            <div className="flex justify-between items-center mt-1">
              <div>
                {errors.title && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.title}
                  </p>
                )}
              </div>
              <span className={`text-xs ${formData.title.length > 240 ? 'text-yellow-400' : 'text-gray-500'}`}>
                {formData.title.length}/255
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Tag size={16} className="inline mr-1" />
              Category *
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map(category => {
                const categoryId = typeof category === 'string' ? category : category.id;
                const categoryName = typeof category === 'string' ? category : category.name;
                
                return (
                  <option key={categoryId} value={categoryId}>
                    {categoryName}
                  </option>
                );
              })}
            </select>
            {errors.category_id && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.category_id}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter task description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.description}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar size={16} className="inline mr-1" />
              Due Date
            </label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.due_date && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.due_date}
              </p>
            )}
          </div>

          {/* Completed Status */}
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <div className={`relative w-5 h-5 rounded border-2 transition-colors ${
                formData.completed 
                  ? 'bg-green-600 border-green-600' 
                  : 'bg-transparent border-gray-400 hover:border-gray-300'
              }`}>
                {formData.completed && (
                  <svg
                    className="absolute inset-0 w-3 h-3 text-white m-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${formData.completed ? 'text-green-400' : 'text-gray-300'}`}>
                Mark as completed
              </span>
            </label>
          </div>

          {/* Task Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Image size={16} className="inline mr-1" />
              Task Image (Optional)
            </label>
            
            {/* Image Preview */}
            {(imagePreview || formData.image_url) && (
              <div className="mb-3 relative">
                <img 
                  src={imagePreview || formData.image_url} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Upload Options */}
            <div className="space-y-3">
               <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md text-gray-300 cursor-pointer transition-colors"
                >
                  <Upload size={16} className="mr-2" />
                  Upload Image
                </label>
              </div>

              {/* URL Input */}
              <div>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Or paste image URL"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};