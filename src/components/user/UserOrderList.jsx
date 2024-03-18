import "../admin/css/productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { MdVisibility } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth, useNotification } from "../../hooks";
import { getAllOrders } from "../../api/order";
import Empty from "./Empty";

export default function UserOrderList() {
  const [orders, setOrders] = useState([]);

  const { authInfo } = useAuth();
  const userId = authInfo?.profile?._id;

  const { updateNotification } = useNotification();

  const getOrder = async () => {
    const { error, orders } = await getAllOrders(userId);
    if (error) return updateNotification("error", error);
    if (!orders) return setOrders([]);
    setOrders([...orders]);
  };
  useEffect(() => {
    getOrder();
    // eslint-disable-next-line
  }, []);

  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "products",
      headerName: "Product",
      renderCell: (params) => {
        return (
          <div className="font-semibold productListItem">
            {params.row.products.length}
          </div>
        );
      },
    },
    {
      field: "total",
      headerName: "Amount",
      renderCell: (
        params // Customize cell contents
      ) => <div className="font-semibold">{params.value}</div>,
    },

    {
      field: "status",
      headerName: "Status",
      renderCell: (
        params // Customize cell contents
      ) => <div className="font-semibold">{params.value}</div>,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center space-x-2">
            <Link to={"/order/" + params.row._id}>
              <MdVisibility size={20} className=" text-[#8293E3]" />
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col space-y-3 productList">
      {orders.length ? (
        <DataGrid
          rows={orders}
          disableRowSelectionOnClick
          columns={columns.map((column) => ({
            ...column,
            flex: 1,
            renderHeader: (params) => (
              <div className="font-semibold tracking-wide capitalize">
                {params.field}
              </div>
            ),
          }))}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20]}
        />
      ) : (
        <Empty emptyMessage="No Orders Yet" />
      )}
    </div>
  );
}
