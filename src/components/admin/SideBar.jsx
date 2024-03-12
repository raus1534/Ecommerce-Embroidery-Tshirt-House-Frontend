import "./css/Sidebar.css";
import { MdLineStyle, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbReorder } from "react-icons/tb";

import { FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <MdLineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <FaUser className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <MdOutlineProductionQuantityLimits className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className="sidebarListItem">
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
