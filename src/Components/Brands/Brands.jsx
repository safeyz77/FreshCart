import React, { useState } from "react";
import style from "./Brands.module.css";

import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Brands() {

  const [brands, setBrands] = useState([])
  async function getAllBrands() {
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setBrands(response.data.data)
    console.log(response.data.data);
    
    
  }

  useEffect(() => {
    getAllBrands();
  }, []);
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
          <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">
            Brands and Companies
          </h2>
          <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
            {brands.map((brand) => (
              <Link >
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src={brand.image}
                      alt="Brand Name"
                    />
                  </a>
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-lg  font-bold tracking-tight text-gray-500 dark:text-white">
                        {brand.name}
                      </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
