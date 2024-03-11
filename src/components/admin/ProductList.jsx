import "./css/productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNotification } from "../../hooks";
import { getProducts } from "../../api/product";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const { updateNotification } = useNotification();

  const getProduct = async () => {
    const { error, products } = await getProducts();
    if (error) return updateNotification("error", error);
    setProducts([...products]);
  };
  useEffect(() => {
    getProduct();
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
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
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
        rows={products}
        disableRowSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
