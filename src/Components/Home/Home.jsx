import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategorySlider from "./../CategorySlider/CategorySlider";

export default function Home() {
  return (
    <>
      <CategorySlider />
      <RecentProducts />
    </>
  );
}
