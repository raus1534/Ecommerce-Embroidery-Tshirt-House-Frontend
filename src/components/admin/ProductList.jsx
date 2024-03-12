import "./css/productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotification } from "../../hooks";
import { deleteProduct, getProducts } from "../../api/product";

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
