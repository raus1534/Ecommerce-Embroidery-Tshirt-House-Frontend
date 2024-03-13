import "./css/productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotification } from "../../hooks";
import { deleteProduct, getProducts } from "../../api/product";
import { AiFillEdit } from "react-icons/ai";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const { updateNotification } = useNotification();

  const getProduct = async () => {
    const { error, products } = await getProducts();
    if (error) return updateNotification("error", error);
    setProducts([...products]);
  };

  const updateProductList = (productId) => {
    const newProductList = products.filter(
      (product) => product._id !== productId
    );
    setProducts([...newProductList]);
  };

  const handleDelete = async (productId) => {
    console.log(productId);
    const { message, error } = await deleteProduct(productId);
    if (error) return updateNotification("error", error);
    updateProductList(productId);
    updateNotification("success", message);
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
      field: "product",
      headerName: "Product",
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            <span className="font-semibold">{params.row.title}</span>
          </div>
        );
      },
    },
    {
      field: "inStock",
      headerName: "Stock",
      renderCell: (
        params // Customize cell contents
      ) => (
        <div className="font-semibold capitalize">
          {params.value.toString()}
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      renderCell: (
        params // Customize cell contents
      ) => <div className="font-semibold">{"रु " + params.value}</div>,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center space-x-2">
            <Link to={"/product/" + params.row._id}>
              <AiFillEdit size={22} className="userListEdit" />
            </Link>
            <MdDelete
              size={22}
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col space-y-3 productList">
      <Link to="/product/create">
        <button className="font-bold productAddButton">CREATE</button>
      </Link>
      <DataGrid
        rows={products}
        disableRowSelectionOnClick
        columns={columns.map((column) => ({
          ...column,
          flex: 1,
          renderHeader: (params) => (
            <div className="font-bold tracking-wider uppercase">
              {params.field}
            </div>
          ),
        }))}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
