import { useParams } from "react-router-dom";
import "./css/product.css";
import { useEffect, useState } from "react";
import { useNotification } from "../../hooks";
import { getUserDetails, updateUserStatus } from "../../api/user";

export default function User() {
  const [userDetail, setUserDetail] = useState({});
  const [userStatus, setUserStatus] = useState(true);
  const { userId } = useParams();

  const { updateNotification } = useNotification();

  const getUserDetail = async () => {
    const { error, user } = await getUserDetails(userId);
    if (error) return updateNotification("error", error);
    if (!user) return updateNotification("error", "User Not Found");

    setUserDetail({ ...user });
    setUserStatus(user?.status);
  };

  const handleUserStatusChange = async () => {
    const { error, message } = await updateUserStatus(userId);
    if (error) return updateNotification("error", error);
    setUserDetail({ ...userDetail, status: !userStatus });
    setUserStatus(!userStatus);
    updateNotification("success", message);
  };
  useEffect(() => {
    getUserDetail();
    //eslint-disable-next-line
  }, [userId]);

  return (
    <div className="h-full product">
      <div className="w-full h-full bg-white shadow-lg rounded-xl">
        <div className="flex flex-col w-full p-5 space-y-6">
          <div
            className={`flex items-center justify-between w-full p-4 pr-8  shadow-lg h-1/4 rounded-xl transition-colors ${
              userStatus ? "bg-green-400" : "bg-red-400"
            }`}
          >
            <div>
              <h1 className="text-4xl font-bold uppercase">
                {userDetail?.name}
              </h1>
              <span className="text-lg font-semibold tracking-normal ">
                {userDetail?.username}
              </span>
            </div>

            {userStatus !== null && (
              <label className="relative px-8 py-4 mr-3 bg-white switch rounded-2xl">
                <input
                  type="checkbox"
                  checked={userStatus}
                  onChange={handleUserStatusChange}
                />
                <span className="absolute inset-0 rounded-full slider"></span>
              </label>
            )}
          </div>

          <div className="flex items-center justify-around px-2 py-5">
            <InputField title="User Id" value={userDetail?._id} />
            <InputField title="Email" value={userDetail?.email} />
            <InputField title="Orders" value={userDetail?.orderQuantity} />
            <InputField
              title="Joined Date"
              value={userDetail?.createdAt?.split("T")[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const InputField = ({ title, value }) => {
  return (
    <div className="flex flex-col p-4 border-l-2 border-l-stone-600">
      <label
        htmlFor="Title"
        className="text-2xl font-bold tracking-wider uppercase"
      >
        {title}
      </label>
      <span className="text-xl font-medium">{value}</span>
    </div>
  );
};
