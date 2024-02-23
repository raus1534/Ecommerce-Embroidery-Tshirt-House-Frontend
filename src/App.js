import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/user/Home";
import ProductList from "./components/user/ProductList";
import ProductIndividual from "./components/user/ProductIndividual";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/products/" element={<AllProducts />} /> */}
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductIndividual />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
