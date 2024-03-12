import "./css/productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotification } from "../../hooks";
import { getOrderDetails } from "../../api/admin";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  const { updateNotification } = useNotification();

  const getOrder = async () => {
    const { error, orders } = await getOrderDetails(false);
    console.log(orders);
    if (error) return updateNotification("error", error);
    setOrders([...orders]);
  };
  useEffect(() => {
    getOrder();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (productId) => {
    // const { message, error } = await deleteUser(productId);
    // if (error) return updateNotification("error", error);
    // updateNotification("success", message);
    // setProducts(products.filter((item) => item._id !== userId));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "products",
      headerName: "Product",
      width: 90,
      renderCell: (params) => {
        return (
          <div className="productListItem">{params.row.products.length}</div>
        );
      },
    },
    { field: "total", headerName: "Amount", width: 100 },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 160,
    },
    {
      field: "shippingAddress",
      headerName: "Shipping Address",
      width: 160,
    },
    {
      field: "transactionCode",
      headerName: "Code",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/view/" + params.row._id}>
              <button className="productListEdit">View</button>
            </Link>
            <MdDelete
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col space-y-3 productList">
      <Link to="/product/create">
        <button className="font-bold productAddButton">CREATE</button>
      </Link>
      <DataGrid
        rows={orders.reverse()}
        disableRowSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
}
