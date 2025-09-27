import React from "react";

export const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <>
      <div className="bg-gray-800/70 rounded-xl border border-gray-700 hover:shadow-lg transition-all">
        <div className="px-4 py-5 sm:p-6">
          <span className="flex items-center text-sm font-medium text-gray-400">
            {Icon && <Icon size={18} className="mr-2" style={{ color }} />}
            <span className="max-[345px]:text-xs">{name}</span>
          </span>
          <p className="mt-1 text-3xl font-semibold text-gray-100">
            {value}
          </p>
        </div>
      </div>
    </>
  );
};
