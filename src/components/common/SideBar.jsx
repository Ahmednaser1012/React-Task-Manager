import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  AlignJustify,
  BarChart2,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: <BarChart2 />,
    color: "#6366f1",
    href: "/dashboard",
  },
  {
    name: "Products",
    icon: <ShoppingBag />,
    color: "#8B5CF6",
    href: "/products",
  },
  {
    name: "Users",
    icon: <Users />,
    color: "#EC4899",
    href: "/users",
  },
  {
    name: "Orders",
    icon: <ShoppingCart />,
    color: "#F59E0B",
    href: "/orders",
  },
  {
    name: "Analytics",
    icon: <TrendingUp />,
    color: "#3B82F6",
    href: "/analytics",
  },
  {
    name: "Settings",
    icon: <Settings />,
    color: "#6EE7B7",
    href: "/settings",
  },
];

export const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.div
      className="relative z-10 transition-all duration-300 ease-in-out "
      animate={{
        width: isSidebarOpen ? (window.innerWidth <= 375 ? 200 : 256) : 60,
      }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-2 flex flex-col border-r border-gray-700">
        <motion.button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2  rounded-full hover:bg-gray-700 transition-colors max-w-fit cursor-pointer"
        >
          <AlignJustify
            color="#dfdddd"
            absoluteStrokeWidth
            size={30}
            className="max-[399px]:hidden"
          />
        </motion.button>

        <nav className="mt-8 flex flex-col gap-1">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer">
                <span
                  style={{ color: item.color }}
                  className="flex items-center justify-center w-8 h-8"
                >
                  {item.icon}
                </span>

                {isSidebarOpen && (
                  <motion.span
                    className="ml-4 "
                    transition={{ duration: 0.2, delay: 0.3 }}
                  >
                    <div className="text-white">{item.name}</div>
                  </motion.span>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
