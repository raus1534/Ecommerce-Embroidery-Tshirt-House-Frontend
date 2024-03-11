import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SubmitBtn({ children, type, className, busy }) {
  return (
    <button
      type={type || "button"}
      className={"flex justify-center items-center " + className}
    >
      {!busy ? (
        children
      ) : (
        <AiOutlineLoading3Quarters size={20} className="animate-spin" />
      )}
    </button>
  );
}
