import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";

import { StatCard } from "../components/common/StatCard";
import { TasksOverView } from "../components/overViewPage/TasksOverView";
import { TaskStatusDistribution } from "../components/overViewPage/TaskStatusDistribution";
import { TaskPriority } from "../components/overViewPage/TaskPriority";
import { NavBar } from "../components/common/NavBar";

export const DashBoardLayout = () => {
  return (
    <>
      <div className="flex  relative z-30 min-h-screen">
        <div className="flex flex-col flex-1 ">
          <NavBar title={"Task Overview"} />

          <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8 mt-5">
              <StatCard
                name="Total Tasks"
                icon={Zap}
                value="45"
                color="#6366F1"
              />
              <StatCard
                name="Active Tasks"
                icon={Users}
                value="24"
                color="#8B5CF6"
              />
              <StatCard
                name="Completed Tasks"
                icon={ShoppingBag}
                value="21"
                color="#EC4899"
              />
              <StatCard
                name="Completion Rate"
                icon={BarChart2}
                value="87%"
                color="#10B981"
              />
            </div>

            {/* CHARTS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 overflow-auto">
              <TasksOverView />
              <TaskStatusDistribution />
              <TaskPriority />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
