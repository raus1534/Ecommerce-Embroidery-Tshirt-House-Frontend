import React from "react";
import { PiSmileySadThin } from "react-icons/pi";

export default function Empty({ emptyMessage, className = "" }) {
  return (
    <div
      className={
        "w-full h-[60vh] flex flex-col justify-center items-center space-y-2 text-gray-700 " +
        className
      }
    >
      <span className="text-2xl font-medium capitalize">{emptyMessage}</span>
      <PiSmileySadThin size={50} />
    </div>
  );
}
