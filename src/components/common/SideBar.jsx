import { useState } from "react";
import { Link } from "react-router-dom";

import {
  AlignJustify,
  BarChart2,
  Settings,
  ShoppingBag,
} from "lucide-react";

const sidebarItems = [
  {
    name: "Overview",
    icon: <BarChart2 />,
    color: "#6366f1",
    href: "/dashboard",
  },
  {
    name: "Tasks",
    icon: <ShoppingBag />,
    color: "#8B5CF6",
    href: "/tasks",
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

   const width = isSidebarOpen ? (window.innerWidth <= 375 ? 200 : 256) : 60;

  return (
    <div
      className="relative z-10 transition-all duration-300 ease-in-out"
      style={{ width }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-2 flex flex-col border-r border-gray-700">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit cursor-pointer"
        >
          <AlignJustify
            color="#dfdddd"
            absoluteStrokeWidth
            size={30}
            className="max-[399px]:hidden"
          />
        </button>

        <nav className="mt-8 flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <div className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer">
                <span
                  style={{ color: item.color }}
                  className="flex items-center justify-center w-8 h-8"
                >
                  {item.icon}
                </span>

                {isSidebarOpen && (
                  <span className="ml-4">
                    <div className="text-white">{item.name}</div>
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
