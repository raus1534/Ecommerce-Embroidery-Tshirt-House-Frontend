import "../css/WidgetSm.css";
import { MdVisibility } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../../api/admin";
import { Link } from "react-router-dom";
import Empty from "../../user/Empty";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const { users } = await getUserDetails(true);
    setUsers([...users]);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="bg-white widgetSm rounded-xl">
      <span className="widgetSmTitle">New Joined Members</span>
      {users.length ? (
        <ul className="widgetSmList">
          {users.map((user) => (
            <li className="flex space-x-4 widgetSmListItem" key={user._id}>
              <FaUserAstronaut className="widgetSmImg text-[#8293E3]" />
              <div className="flex-1 widgetSmUser">
                <span className="uppercase widgetSmUsername">{user?.name}</span>
                <span className="text-sm text-gray-600 widgetSmUsername">
                  {user.createdAt.split("T")[0]}
                </span>
              </div>
              <div className="flex-1 widgetSmUser">
                <span className="widgetSmUsername">{user?.username}</span>
              </div>
              <Link
                to={"/user/" + user?._id}
                className="widgetSmButton rounded-xl"
              >
                <MdVisibility className="widgetSmIcon text-[#8293E3]" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Empty emptyMessage="No Records" className="h-full" />
      )}
    </div>
  );
}
