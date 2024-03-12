import "./css/UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../api/admin";
import { deleteUser } from "../../api/user";
import { useNotification } from "../../hooks";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const { updateNotification } = useNotification();

  const getUsers = async () => {
    const { users } = await getUserDetails(false);
    setUsers([...users]);
  };

  const handleDelete = async (userId) => {
    const { message, error } = await deleteUser(userId);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    setUsers(users.filter((item) => item._id !== userId));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "username", headerName: "Username", width: 120 },
    { field: "email", headerName: "Email", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <MdDelete
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableRowSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        // checkboxSelection
      />
    </div>
  );
}
