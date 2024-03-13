import { useNavigate, useParams } from "react-router-dom";
import "./css/product.css";
import { useEffect, useState } from "react";
import { getProductDetail, updateProduct } from "../../api/product";
import { MONTHS } from "../../utils/helper";
import { useNotification } from "../../hooks";
import { app } from "../../utils/firebase";
import SubmitBtn from "../SubmitBtn";

const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

const validateProductInfo = (productDetail) => {
  const { title, desc, price, size, color } = productDetail;
  if (!title) return { ok: false, error: "Title Is Missing" };
  if (!desc) return { ok: false, error: "Description Is Missing" };
  if (!price || isNaN(price)) return { ok: false, error: "Price Is Missing" };
  if (!size) return { ok: false, error: "Size Is Missing" };
  if (!color) return { ok: false, error: "Color Is Missing" };
  return { ok: true };
};

export default function Product() {
  const [productDetail, setProductDetail] = useState({});
  const [posterForUI, setPosterForUI] = useState(null);
  const [busy, setBusy] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();

  const { updateNotification } = useNotification();

  const getProductDetails = async () => {
    const { error, product } = await getProductDetail(productId);
    if (error) return updateNotification("error", error);
    if (!product) return updateNotification("error", "Product Not Found");
    console.log(product);
    setPosterForUI(product.img);
    setProductDetail({ ...product, img: null });
  };

  const handleChange = ({ target }) => {
    const { name, value, files } = target;
    if (name === "file") {
      const file = files[0];
      const urlForPoster = URL.createObjectURL(file);
      setPosterForUI(urlForPoster);
      return setProductDetail({ ...productDetail, img: file });
    }
    setProductDetail({ ...productDetail, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(productDetail);
    const { ok, error } = validateProductInfo(productDetail);
    if (!ok) return updateNotification("error", error);
    setBusy(true);

    if (productDetail?.img) {
      const fileName = new Date().getTime() + productDetail?.img.name;
      console.log(productDetail.img.name);
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, productDetail?.img);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          setBusy(false);
          return updateNotification("error", error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const product = { ...productDetail, img: downloadURL };
            console.log(product);
            const { error, message } = await updateProduct(product, productId);
            if (error) return updateNotification("error", error);
            setBusy(false);
            updateNotification("success", message);
            navigate("/products");
          });
        }
      );
    }

    if (!productDetail.img) {
      const { message } = await updateProduct(productDetail, productId);
      if (error) return updateNotification("error", error);
      setBusy(false);
      updateNotification("success", message);
      navigate("/");
    }
  };

  // const getStats = async () => {
  //   const res = await axios.get(
  //     "localhost:8000/api/order/income?pid=" + productId
  //   );
  //   const list = res.data.sort((a, b) => {
  //     return a._id - b._id;
  //   });
  //   list.map((item) =>
  //     setPStats((prev) => [
  //       ...prev,
  //       { name: MONTHS[item._id - 1], Sales: item.total },
  //     ])
  //   );
  // };

  useEffect(() => {
    getProductDetails();
    // getStats();
  }, [productId, MONTHS]);

  return (
    <>
      <div className="h-full product">
        <div className="tracking-wider productTitleContainer">
          <h1 className="text-2xl font-bold uppercase">
            {productDetail.title}
          </h1>
        </div>
        <form
          onSubmit={handleUpdate}
          className="w-full h-full bg-white shadow-lg rounded-xl"
        >
          <div className="flex space-x-3">
            <div className="flex flex-col w-2/3 p-3 space-y-4">
              <InputField
                title="Name"
                name="title"
                value={productDetail.title}
                onChange={handleChange}
              />
              <InputField
                title="Description"
                name="desc"
                value={productDetail.desc}
                onChange={handleChange}
              />
              <InputField
                title="Price"
                name="price"
                value={productDetail.price}
                onChange={handleChange}
              />
              <InputField
                title="Size"
                name="size"
                value={productDetail.size}
                onChange={handleChange}
              />
              <InputField
                title="Color"
                name="color"
                value={productDetail.color}
                onChange={handleChange}
              />
              <div className="flex space-x-4">
                <div className="flex-1 addProductItem ">
                  <label>Categories</label>
                  <select
                    name="categories"
                    onChange={handleChange}
                    className="border-2 border-gray-500 rounded-lg"
                  >
                    <option value="men">Men</option>
                    <option value="woman">Women</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>
                <div className="flex-1 addProductItem">
                  <label>Stock</label>
                  <select
                    name="inStock"
                    onChange={handleChange}
                    className="border-2 border-gray-500 rounded-lg"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-1/3">
              <label className="h-full">
                <input
                  accept="image/jpg,image/png,image/jpeg"
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleChange}
                  hidden
                />
                <div className="flex items-center justify-center w-full h-full cursor-pointer">
                  <img
                    className="w-96 h-96 aspect-square"
                    src={posterForUI}
                    alt="STUDENT"
                  />
                </div>
              </label>
            </div>
          </div>
          <SubmitBtn type="submit" busy={busy} className="addProductButton">
            Update
          </SubmitBtn>
        </form>
      </div>
    </>
  );
}

const InputField = ({ name, title, value, ...rest }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="Title" className="ml-1 text-base font-semibold uppercase">
        {title}
      </label>
      <input
        name={name}
        value={value}
        {...rest}
        className="p-2 bg-transparent border-2 border-gray-600 outline-none rounded-xl text-pretty focus:border-black"
      />
    </div>
  );
};
