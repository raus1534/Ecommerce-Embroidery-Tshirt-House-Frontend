import "./css/Sidebar.css";
import { MdLineStyle, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function SideBar() {
  const [active, setActive] = useState("");

  function handleURLChange() {
    var currentURL = window.location.href;
    const currentComponent = currentURL.split("/")[3];
    setActive(currentComponent);
  }
  // Event listener for URL changes for Navbar Styling
  window.addEventListener("popstate", handleURLChange);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="flex flex-col space-y-2 sidebarList">
            <Link
              to="/"
              className="link"
              onClick={() => {
                setActive("");
              }}
            >
              <li
                className={`sidebarListItem ${active === "" ? "active" : ""}`}
              >
                <MdLineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link
              to="/users"
              className="link"
              onClick={() => {
                setActive("users");
              }}
            >
              <li
                className={`sidebarListItem ${
                  active === "users" ? "active" : ""
                }`}
              >
                <FaUser className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link
              to="/products"
              className="link"
              onClick={() => {
                setActive("products");
              }}
            >
              <li
                className={`sidebarListItem ${
                  active === "products" ? "active" : ""
                }`}
              >
                <MdOutlineProductionQuantityLimits className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link
              to="/orders"
              className="link"
              onClick={() => {
                setActive("orders");
              }}
            >
              <li
                className={`sidebarListItem ${
                  active === "orders" ? "active" : ""
                }`}
              >
                <TbReorder className="sidebarIcon" />
                Orders
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
