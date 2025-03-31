import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";

import { StatCard } from "../components/common/StatCard";
import { SalesOverView } from "../components/overViewPage/SalesOverView";
import { CategoryDistribution } from "../components/overViewPage/CategoryDistribution";
import { SalesChannel } from "../components/overViewPage/SalesChannel";
import { NavBar } from "../components/common/NavBar";

export const DashBoardLayout = () => {
  return (
    <>
      <div className="flex  relative z-30 min-h-screen">
        <div className="flex flex-col flex-1 ">
          <NavBar title={"Dach-Bord"} />

          <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8 mt-5">
              <StatCard
                name="Total Sales"
                icon={Zap}
                value="$12,345"
                color="#6366F1"
              />
              <StatCard
                name="New Users"
                icon={Users}
                value="1,234"
                color="#8B5CF6"
              />
              <StatCard
                name="Total Products"
                icon={ShoppingBag}
                value="567"
                color="#EC4899"
              />
              <StatCard
                name="Conversion Rate"
                icon={BarChart2}
                value="12.5%"
                color="#10B981"
              />
            </motion.div>

            {/* CHARTS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 overflow-auto">
              <SalesOverView />
              <CategoryDistribution />
              <SalesChannel />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
