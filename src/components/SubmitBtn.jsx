import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SubmitBtn({
  children,
  type,
  className,
  busy,
  ...rest
}) {
  return (
    <button
      type={type || "button"}
      className={"flex justify-center items-center " + className}
      {...rest}
    >
      {!busy ? (
        children
      ) : (
        <AiOutlineLoading3Quarters size={20} className="animate-spin" />
      )}
    </button>
  );
}
