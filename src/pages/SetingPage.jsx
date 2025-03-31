import React from "react";
import { NavBar } from "../components/common/NavBar";
import { Profile } from "../components/setting/Profile";
import { Notifications } from "../components/setting/Notifications";
import DangerZone from "../components/setting/DangerZone";

export const SetingPage = () => {
  return (
    <div className="flex  relative z-30 min-h-screen">
      <div className="flex flex-col flex-1 ">
        <NavBar title={"Setting"} />

        <main className=" mx-auto py-6 px-4  lg:px-8">
          <Profile />

          <Notifications />

          <DangerZone />
        </main>
      </div>
    </div>
  );
};
