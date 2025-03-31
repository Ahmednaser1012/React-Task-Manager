// import React from "react";

import { NavBar } from "../components/common/NavBar";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Search, UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { StatCard } from "../components/common/StatCard";

// export const UsersPage = () => {
//   return (
//     <div className="flex  relative z-30 min-h-screen">
//       <div className="flex flex-col flex-1 ">
//         <NavBar title={"Users"} />

//         <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
//           <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8 mt-5">
//             <StatCard
//               name="Total Sales"
//               icon={Zap}
//               value="$12,345"
//               color="#6366F1"
//             />
//             <StatCard
//               name="New Users"
//               icon={Users}
//               value="1,234"
//               color="#8B5CF6"
//             />
//             <StatCard
//               name="Total Products"
//               icon={ShoppingBag}
//               value="567"
//               color="#EC4899"
//             />
//             <StatCard
//               name="Conversion Rate"
//               icon={BarChart2}
//               value="12.5%"
//               color="#10B981"
//             />
//           </motion.div>

//           {/* CHARTS */}

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 overflow-auto">
//             {/* <SalesOverView />
//             <CategoryDistribution />
//             <SalesChannel /> */}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/users/Api";
import DataTable from "../components/users/DataTable";

function UsersPage() {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex  relative z-30 min-h-screen">
      <div className="flex flex-col flex-1 ">
        <NavBar title={"Users"} />

        <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8 mt-5">
            <StatCard
              name="Total Users"
              icon={UsersIcon}
              value="152,845"
              color="#6366F1"
            />
            <StatCard
              name="New Users Today"
              icon={UserPlus}
              value="243"
              color="#10B981"
            />
            <StatCard
              name="Active Users"
              icon={UserCheck}
              value="98,520"
              color="#F59E0B"
            />
            <StatCard
              name="Churn Rate"
              icon={UserX}
              value="2.4%"
              color="#EF4444"
            />
          </motion.div>

          {/* table Users */}

          <div className="space-y-4 grid grid-cols-1 overflow-auto">
            <div className="flex items-center justify-between bg-[#2b3c6433] h-18 rounded-2xl  px-6">
              <h2 className="text-min[(10vh,25px)] font-bold tracking-tight text-amber-50">
                Data-Table
              </h2>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center rounded-md border border-gray-800 bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-400 hover:text-black cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
            </div>
            <div className="rounded-lg border border-gray-700  p-6">
              <h3 className="font-semibold text-white">Users</h3>
              <p className="text-sm text-gray-500">
                Manage your users and their permissions.
              </p>
              <div className="mt-4">
                <div className="mb-4">
                  <div className="relative w-full sm:w-auto">
                    <input
                      type="search"
                      placeholder="Search users..."
                      className="w-full  pl-10 pr-3 py-2  border border-[#c7c7c737] rounded-lg  focus:border-white focus:outline-none  text-gray-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search
                      className="absolute left-3 top-3.5 text-gray-400"
                      size={15}
                    />
                  </div>
                </div>
                <DataTable data={filteredUsers} status={status} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UsersPage;
