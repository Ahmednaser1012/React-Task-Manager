 
 
export function formatDate(dateString) {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// priority colors - should probably move to css
export const getPriorityColor = (priority) => {
  const colors = {
    high: 'bg-red-600',
    medium: 'bg-yellow-600', 
    low: 'bg-green-600'
  };
  return colors[priority?.toLowerCase()] || 'bg-gray-600';
}

// truncate text
export function truncateText(text, maxLen = 100) {
  if (!text) return '';
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text;
}

// check if overdue
export const isTaskOverdue = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  const due = new Date(dueDate);
  return due < today;
}