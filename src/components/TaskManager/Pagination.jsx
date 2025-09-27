import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}) {
   const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // page numbers 
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
       for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = currentPage - 2;
      let end = currentPage + 2;
      
      if (start < 1) {
        start = 1;
        end = 5;
      }
      if (end > totalPages) {
        end = totalPages;
        start = totalPages - 4;
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
      
      <div className="text-sm text-gray-300">
        Showing {startItem} to {endItem} of {totalItems} tasks
      </div>

      <div className="flex items-center gap-2">
        {/* previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm ${
            currentPage === 1
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {/* page numbers */}
        <div className="flex gap-1">
          {/* first page */}
          {getPageNumbers()[0] > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="px-3 py-2 rounded-md text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                1
              </button>
              {getPageNumbers()[0] > 2 && <span className="px-2 text-gray-500">...</span>}
            </>
          )}

          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 rounded-md text-sm ${
                pageNum === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* last page */}
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
            <>
              {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-2 rounded-md text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm ${
            currentPage === totalPages
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export { Pagination };