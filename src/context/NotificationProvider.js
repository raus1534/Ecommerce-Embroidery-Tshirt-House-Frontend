import React, { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const updateNotification = (type, value) => {
    switch (type) {
      case "error":
        toast.error(value);
        break;
      case "success":
        toast.success(value);
        break;
      case "warning":
        toast.warning(value);
        break;

      default:
        toast.info(value);
    }
  };
  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </NotificationContext.Provider>
  );
}
