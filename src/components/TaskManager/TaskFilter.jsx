function TaskFilter({ selectedCategory, onCategoryChange, categories }) {
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-3">Filter by Category</h3>
      
      <div className="flex flex-wrap gap-2">
        
        {/* show all tasks */}
        <button
          onClick={() => onCategoryChange("All")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          All Tasks
        </button>
        
         {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                isSelected
                  ? "text-white"
                  : "text-white hover:opacity-80"
              }`}
              style={{ 
                backgroundColor: isSelected ? category.color : `${category.color}80`
              }}
            >
              {category.icon_url && (
                <img src={category.icon_url} alt="" className="w-4 h-4" />
              )}
              {category.name}
            </button>
          );
        })}
        
      </div>
    </div>
  );
}

export { TaskFilter };