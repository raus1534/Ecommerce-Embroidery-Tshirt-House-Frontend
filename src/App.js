import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/user/Home";
import ProductList from "./components/user/ProductList";
import ProductIndividual from "./components/user/ProductIndividual";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/user/Cart";
import Announcement from "./components/user/Announcement";
import Navbar from "./components/user/Navbar";
import { useAuth } from "./hooks";
import AdminNavigator from "./navigator/AdminNavigator";
import UserOrderList from "./components/user/UserOrderList";
import Order from "./components/user/Order";

export default function App() {
  const { authInfo } = useAuth();
  const isAdmin = authInfo?.profile?.isAdmin;

  if (isAdmin) return <AdminNavigator />;
  return (
    <>
      <Announcement />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-orders" element={<UserOrderList />} />
        <Route path="/order/:orderId" element={<Order/>} />
        {/* <Route path="/products/" element={<AllProducts />} /> */}
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductIndividual />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
