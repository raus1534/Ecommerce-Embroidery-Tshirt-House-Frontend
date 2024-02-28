import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

let timeOutId;
export default function NotificationProvider({ children }) {
  const [className, setClassName] = useState("");
  const [notification, setNotification] = useState("");

  const updateNotification = (type, value) => {
    clearTimeout(timeOutId);
    switch (type) {
      case "error":
        setClassName("bg-red-500");
        break;
      case "success":
        setClassName("bg-green-500");
        break;
      case "warning":
        setClassName("bg-orange-500");
        break;

      default:
        setClassName("bg-red-500");
    }
    setNotification(value);
    timeOutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };
  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed -translate-x-1/2 top-24 left-1/2">
          <div className={className + " rounded "}>
            <p className="px-4 py-2 font-semibold text-white">{notification}</p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
