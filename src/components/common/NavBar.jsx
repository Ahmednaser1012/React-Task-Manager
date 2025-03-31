import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/autth/authSlice";
import { Search } from "lucide-react";
export const NavBar = ({ title }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    setTimeout(() => {
      try {
        dispatch(logout());
        console.log("signout success");
        navigate("/login");
      } catch (error) {
        alert(error.message);
      }
    }, 1000);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4  px-4 md:px-6 shadow-md">
      <div className="flex items-center justify-between md:mx-10">
        {/* Dach-Bord */}
        <h1 className="font-extrabold text-[min(20vw,18px)] text-gray-100 tracking-wider">
          {title}
        </h1>
      </div>
      <div className="flex-1 w-auto md:block">
        <div className="relative text-gray-200 max-[399px]:hidden">
          <div className="relative w-full sm:w-auto">
            <input
              type="search"
              placeholder="Search..."
              className="w-full md:w-2/3 lg:w-1/3 pl-10 pr-3 py-2  border border-[#c7c7c737] rounded-md  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-20"
            />
            <Search
              className="absolute left-3 top-3.5 text-gray-400"
              size={15}
            />
          </div>
        </div>
      </div>

      <div className="flex  gap-3 ">
        <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-600 cursor-pointer">
          🔔 <span className="sr-only">Notifications</span>
        </button>

        <div className="relative  ">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-600 cursor-pointer"
          >
            👤 <span className="sr-only">User menu</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-400  border border-gray-300 rounded-md shadow-lg">
              <div className="px-4 py-2 text-gray-700 font-semibold">
                {user ? user.name : "My Account"}
              </div>
              <hr className="text-gray-500 " />
              <button className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                Settings
              </button>
              <button className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                Support
              </button>
              <hr className="text-gray-500 " />
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
