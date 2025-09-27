import React, { useState } from "react";
import { Bell } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

export const Notifications = () => {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true,
  });

  return (
    <>
      <div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mb-3">
          <Bell className="text-indigo-400 mt-1" size="24" />
          <h2 className="text-xl font-semibold text-gray-300">Notifications</h2>
        </div>
        <ToggleSwitch
          label={"Push Notifications"}
          isOn={notifications.push}
          onToggle={() =>
            setNotifications({ ...notifications, push: !notifications.push })
          }
        />
        <ToggleSwitch
          label={"Email Notifications"}
          isOn={notifications.email}
          onToggle={() =>
            setNotifications({ ...notifications, email: !notifications.email })
          }
        />
        <ToggleSwitch
          label={"SMS Notifications"}
          isOn={notifications.sms}
          onToggle={() =>
            setNotifications({ ...notifications, sms: !notifications.sms })
          }
        />
      </div>
    </>
  );
};
