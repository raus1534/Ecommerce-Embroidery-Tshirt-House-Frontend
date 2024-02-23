import React from "react";
import Announcement from "./Announcement";
import Navbar from "./Navbar";
import Slider from "./Home/Slider";
import Categories from "./Home/Categories";
import Products from "./Products";
import Newsletter from "./Home/Newsletter";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <h1 className="text-5xl font-bold tracking-widest text-center">
        Top Collection
      </h1>
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
}
