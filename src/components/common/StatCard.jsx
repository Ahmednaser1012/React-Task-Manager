import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <>
      <motion.div
        className="bg-gray-800 bg-opacity-50  shadow-lg rounded-xl border border-gray-700"
        whileHover={{
          scale: 1.05,
          transition: {
            duration: 0.2,
          },
          y: -5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="px-4 py-5 sm:p-6">
          <span className="flex items-center text-sm font-medium text-gray-400">
            {Icon && <Icon size={18} className="mr-2 " style={{ color }} />}
            <span className="max-[345px]:text-xs">{name}</span>
          </span>
          <p className="mt-1 text-3xl max-[345px]:text-xs font-semibold text-gray-100">
            {value}
          </p>
        </div>
      </motion.div>
    </>
  );
};
