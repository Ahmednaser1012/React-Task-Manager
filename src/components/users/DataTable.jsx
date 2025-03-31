import { useState } from "react";

/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";

function DataTable({ data, status }) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (newPage) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  if (status === "loading") {
    return (
      <div className="flex h-40 items-center justify-center">
        <svg
          className="animate-spin h-8 w-8 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-md border border-gray-700">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-50  divide-y divide-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((user) => (
                <motion.tr
                  key={user.id}
                  className="hover:bg-gray-400 transition-colors"
                >
                  <td className="px-6 py-4 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center">
                        <span className="text-gray-100 font-medium ">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 ">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-2 py-4 ">
                    <span className="px-2 inline-flex text-xs  font-semibold rounded-full bg-blue-800 text-blue-100">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4  py-4 ">
                    <span
                      className={`px-2 inline-flex text-xs  font-semibold rounded-full
                         ${
                           user.status === "active"
                             ? "bg-green-100 text-green-800"
                             : "bg-gray-100 text-gray-800"
                         }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-2 py-4 text-left text-sm font-medium">
                    <button className="text-indigo-400 hover:text-indigo-300 p-1 cursor-pointer">
                      <Edit size={15} />
                    </button>
                    <button className="text-red-400 mx-6 hover:text-red-800 p-1 cursor-pointer">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <motion.tr>
                <td
                  colSpan={5}
                  className="px-6 py-4  text-sm text-gray-500 text-center"
                >
                  No results.
                </td>
              </motion.tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-end space-x-2">
          <button
            className="inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-500 cursor-pointer "
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-500 cursor-pointer"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default DataTable;
