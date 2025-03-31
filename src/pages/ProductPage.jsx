import React from "react";
import { NavBar } from "../components/common/NavBar";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import { StatCard } from "../components/common/StatCard";
import { ProductTable } from "../components/Product/ProductTable";
import { SalesOverView } from "../components/overViewPage/SalesOverView";
import { CategoryDistribution } from "../components/overViewPage/CategoryDistribution";
export const ProductPage = () => {
  return (
    <div className="flex relative z-30 min-h-screen w-full">
      <div className="flex flex-col flex-1">
        <NavBar title={"Product"} />

        <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8 mt-5">
            <StatCard
              name="Total Products"
              icon={Package}
              value="1234"
              color="#6366F1"
            />
            <StatCard
              name="Top Selling"
              icon={TrendingUp}
              value="89"
              color="#10B981"
            />
            <StatCard
              name="Low Stock"
              icon={AlertTriangle}
              value="23"
              color="#F59E0B"
            />
            <StatCard
              name="Total Revenue"
              icon={DollarSign}
              value="$543,210"
              color="#EF4444"
            />
          </motion.div>

          <div className=" grid grid-cols-1 overflow-auto">
            <ProductTable />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 overflow-auto">
            <SalesOverView />
            <CategoryDistribution />
          </div>
        </main>
      </div>
    </div>
  );
};
