import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/admin/Home/Home";
import TopBar from "../components/admin/TopBar";
import SideBar from "../components/admin/SideBar";
import UserList from "../components/admin/UserList";
import ProductList from "../components/admin/ProductList";
import Product from "../components/admin/Product";
import NewProduct from "../components/admin/NewProduct";

export default function AdminNavigator() {
  return (
    <div>
      <TopBar />
      <div className="flex mt-3">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
        </Routes>
      </div>
    </div>
  );
}
