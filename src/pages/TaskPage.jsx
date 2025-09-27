import { NavBar } from "../components/common/NavBar";
import { TaskManager } from "../components/TaskManager/TaskManager";
export const TaskPage = () => {
  return (
    <div className="flex relative z-30 min-h-screen w-full">
      <div className="flex flex-col flex-1">
        <NavBar title={"Task Manager"} />

        <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8">
          <div className="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700">
            <TaskManager />
          </div>
        </main>
      </div>
    </div>
  );
};
