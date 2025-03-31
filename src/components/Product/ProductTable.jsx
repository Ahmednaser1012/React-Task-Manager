/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
const PRODUCT_DATA = [
  {
    id: 1,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 59.99,
    stock: 143,
    sales: 1200,
  },
  {
    id: 2,
    name: "Leather Wallet",
    category: "Accessories",
    price: 39.99,
    stock: 89,
    sales: 800,
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 56,
    sales: 650,
  },
  {
    id: 4,
    name: "Yoga Mat",
    category: "Fitness",
    price: 29.99,
    stock: 210,
    sales: 950,
  },
  {
    id: 5,
    name: "Coffee Maker",
    category: "Home",
    price: 79.99,
    stock: 78,
    sales: 720,
  },
];
export const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = PRODUCT_DATA.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };
  return (
    <motion.div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-5 border border-gray-700 mb-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full sm:w-64 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <div className="inline-block min-w-full align-middle">
          <table className="w-full table-auto border-collapse divide-y divide-gray-900">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-3 sm:px-6 py-4 text-sm font-medium text-gray-100 flex items-center gap-2 max-w-xs truncate">
                    <img
                      src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60"
                      alt="Product img"
                      className="w-6 h-6 sm:w-10 sm:h-10 rounded-full"
                    />
                    <span className="truncate max-w-[100px] sm:max-w-none">
                      {product.name}
                    </span>
                  </td>

                  <td className="px-3 sm:px-6 py-4 text-sm text-gray-300 max-w-sm truncate">
                    {product.category}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm text-gray-300 max-w-md truncate">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                    {product.stock}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                    {product.sales}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm text-gray-300 flex gap-2">
                    <button className="text-indigo-400 hover:text-indigo-300 p-1 cursor-pointer">
                      <Edit size={15} />
                    </button>
                    <button className="text-red-400 hover:text-red-300 p-1 cursor-pointer">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
