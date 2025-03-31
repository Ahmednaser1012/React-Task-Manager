import React from "react";
import { NavBar } from "../components/common/NavBar";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { StatCard } from "../components/common/StatCard";
import DailyOrders from "../components/oreders/DailyOrders";
import OrderDistribution from "../components/oreders/OrderDistribution";

export const OrderPage = () => {
  return (
    <div className="flex  relative z-30 min-h-screen">
      <div className="flex flex-col flex-1 ">
        <NavBar title={"Order"} />

        <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8 mt-5">
            <StatCard
              name="Total Orders"
              icon={ShoppingBag}
              value="1,234"
              color="#6366F1"
            />
            <StatCard
              name="Pending Orders"
              icon={Clock}
              value="56"
              color="#F59E0B"
            />
            <StatCard
              name="Completed Orders"
              icon={CheckCircle}
              value="1,178"
              color="#10B981"
            />
            <StatCard
              name="Total Revenue"
              icon={DollarSign}
              value="$98,765"
              color="#EF4444"
            />
          </motion.div>

          {/* CHARTS */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <DailyOrders />
            <OrderDistribution />
          </div>
        </main>
      </div>
    </div>
  );
};
