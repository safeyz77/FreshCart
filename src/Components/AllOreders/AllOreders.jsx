import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AllOrders() {
  const [Result, setResult] = useState([]);
  async function GetAllOrders() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/`)
      .then((res) => {
        setResult(res);
        console.log(res.data.data);
      });
  }
  useEffect(() => {
    GetAllOrders();
  }, []);

  return (
    <>
      {/* {Result?.data?.data?.map((order) => {
              order.cartItems.map((product) => {
                console.log(product.product.brand.name);
                
              });
            })} */}
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                My orders
              </h2>
            </div>

            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {Result?.data?.data?.map((order) =>
                  order.cartItems.map((product) => (
                    <h1>{product.product.brand.name}</h1>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
