import "../css/WidgetSm.css";
import { MdVisibility } from "react-icons/md";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../../api/admin";

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
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <MdVisibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
