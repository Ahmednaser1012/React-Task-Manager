import { Outlet } from "react-router-dom";

import { SideBar } from "../components/common/SideBar";
import { NavBar } from "../components/common/NavBar";

const MainLayout = () => {
  return (
    <div className="flex relative z-30 min-h-screen">
      <SideBar />

      <div className="flex flex-col flex-1 min-h-screen">
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
