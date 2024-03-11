import { useState } from "react";
import "./css/newProduct.css";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNotification } from "../../hooks";
import { createProduct } from "../../api/product";
import { app } from "../../utils/firebase";
import SubmitBtn from "../SubmitBtn";
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

const validateProductInfo = (productDetail, file) => {
  const { title, desc, price, size, color } = productDetail;
  if (!file) return { ok: false, error: "Image Is Missing" };
  if (!title) return { ok: false, error: "Title Is Missing" };
  if (!desc) return { ok: false, error: "Description Is Missing" };
  if (!price || isNaN(price)) return { ok: false, error: "Price Is Missing" };
  if (!size) return { ok: false, error: "Size Is Missing" };
  if (!color) return { ok: false, error: "Color Is Missing" };
  return { ok: true };
};

export default function NewProduct() {
  const [productInfo, setProductInfo] = useState({
    title: "",
    desc: "",
    price: 0,
    size: "",
    color: "",
    categories: "men",
    inStock: true,
  });
  const [selectedImg, setSelectedImg] = useState(null);
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value, files } = target;
    if (name === "file") {
      const file = files[0];
      const urlForPoster = URL.createObjectURL(file);
      setSelectedImg(urlForPoster);
      return setFile(file);
    }
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { ok, error } = validateProductInfo(productInfo, file);
    if (!ok) return updateNotification("error", error);
    setBusy(true);

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
          const product = { ...productInfo, img: downloadURL };
          const { message } = await createProduct(product);
          if (error) return updateNotification("error", error);
          setBusy(false);
          updateNotification("success", message);
          navigate("/");
        });
      }
    );
  };

  const { title, desc, price, size, color } = productInfo;
  return (
    <div className="h-full newProduct">
      <h1 className="text-4xl font-bold addProductTitle">Create New Product</h1>
      <form
        onSubmit={handleClick}
        className="flex flex-row-reverse items-center justify-center h-full addProductForm"
      >
        <div className="w-1/3 h-full">
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
              {!selectedImg ? (
                <span className="flex flex-col items-center justify-center">
                  <FaCloudUploadAlt size={80} />
                  <span>UPLOAD PRODUCT</span>
                </span>
              ) : (
                <img
                  className="w-96 h-96 aspect-square"
                  src={selectedImg}
                  alt="STUDENT"
                />
              )}
            </div>
          </label>
        </div>
        <div className="flex flex-col flex-1 space-y-2">
          <InputField
            title="Title"
            name="title"
            value={title}
            onChange={handleChange}
          />

          <InputField
            title="Description"
            name="desc"
            placeholder="This is our best..."
            value={desc}
            onChange={handleChange}
          />
          <InputField
            title="Price"
            name="price"
            type="Number"
            value={price}
            onChange={handleChange}
          />
          <InputField
            title="Size"
            name="size"
            value={size}
            placeholder="e.g., S, M, L"
            onChange={handleChange}
          />
          <InputField
            title="Color"
            name="color"
            value={color}
            placeholder="e.g., red, blue, green"
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
          <SubmitBtn type="submit" busy={busy} className="addProductButton">
            Create
          </SubmitBtn>
        </div>
      </form>
    </div>
  );
}

const InputField = ({ title, name, value, placeholder, ...rest }) => {
  return (
    <div className="w-full addProductItem">
      <label>{title}</label>
      <input
        name={name}
        value={value}
        placeholder={placeholder}
        {...rest}
        className="border-2 border-gray-600 rounded-lg"
      />
    </div>
  );
};
