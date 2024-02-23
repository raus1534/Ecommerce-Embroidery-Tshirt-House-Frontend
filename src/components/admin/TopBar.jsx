import React from "react";
import "./css/topbar.css";
import { useAuth } from "../../hooks";

export default function TopBar() {
  const { handleLogout } = useAuth();
  const handleOnLogout = (e) => {
    e.preventDefault();
    handleLogout();
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">EmbroideryTshirtHouse</span>
        </div>
        <div className="topRight">
          <button onClick={handleOnLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
