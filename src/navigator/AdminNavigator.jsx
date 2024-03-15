import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/admin/Home/Home";
import TopBar from "../components/admin/TopBar";
import SideBar from "../components/admin/SideBar";
import UserList from "../components/admin/UserList";
import ProductList from "../components/admin/ProductList";
import Product from "../components/admin/Product";
import NewProduct from "../components/admin/NewProduct";
import OrderList from "../components/admin/OrderList";
import Order from "../components/admin/Order";
import User from "../components/admin/User";

export default function AdminNavigator() {
  return (
    <div className="bg-primary">
      <TopBar />
      <div className="flex mt-3">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/product/create" element={<NewProduct />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/:orderId" element={<Order />} />
        </Routes>
      </div>
    </div>
  );
}
