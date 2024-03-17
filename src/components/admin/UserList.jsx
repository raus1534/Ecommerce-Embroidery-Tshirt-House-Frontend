import "./css/UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../api/admin";
import { deleteUser } from "../../api/user";
import { useNotification } from "../../hooks";
import { Link } from "react-router-dom";
import ConfirmModal from "../modal/ConfirmModal";
import Empty from "../user/Empty";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { updateNotification } = useNotification();

  const getUsers = async () => {
    const { users } = await getUserDetails(false);
    setUsers([...users]);
  };

  const handleDelete = async () => {
    const { message, error } = await deleteUser(selectedUser);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    setUsers(users.filter((item) => item._id !== selectedUser));
    handleConfirmModalClose();
  };

  const visibleConfirmModal = (userId) => {
    setShowConfirmModal(true);
    setSelectedUser(userId);
  };
  const handleConfirmModalClose = () => {
    setSelectedUser(null);
    setShowConfirmModal(false);
  };
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      renderCell: (
        params // Customize cell contents
      ) => <div className="font-semibold">{params.value}</div>,
    },
    {
      field: "name",
      headerName: "Name",
      renderCell: (
        params // Customize cell contents
      ) => <div className="font-semibold">{params.value}</div>,
    },
    {
      field: "username",
      headerName: "Username",
      renderCell: (
        params // Customize cell contents
      ) => <div className="font-semibold">{params.value}</div>,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: (
        params // Customize cell contents
      ) => <div className="font-semibold">{params.value}</div>,
    },

    {
      field: "createdAt",
      headerName: "Joined At",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="font-semibold">
            {params.row?.createdAt.split("T")[0]}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center space-x-2">
            <Link to={"/user/" + params.row._id}>
              <AiFillEdit size={22} className="userListEdit" />
            </Link>
            <MdDelete
              size={22}
              className="userListDelete"
              onClick={() => visibleConfirmModal(params.row._id)}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="font-bold userList">
        {users.length ? (
          <DataGrid
            rows={users}
            disableRowSelectionOnClick
            columns={columns.map((column) => ({
              ...column,
              flex: 1,
              renderHeader: (params) => (
                <div className="font-bold tracking-wider uppercase">
                  {params.colDef.headerName}
                </div>
              ),
            }))}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            // checkboxSelection
          />
        ) : (
          <Empty emptyMessage="No Users Yet" />
        )}
      </div>
      <ConfirmModal
        visible={showConfirmModal}
        onClose={handleConfirmModalClose}
        onConfirm={handleDelete}
      />
    </>
  );
}
