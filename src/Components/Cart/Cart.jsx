import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    GetLoggedUserCart,
    UpdateQuantity,
    ClearCartFromItems,
    removeItemFromCart,
  } = useContext(CartContext);

  const [cartData, setCartData] = useState([]);

  async function getItems() {
    let response = await GetLoggedUserCart();
    if (response.data.status == "success") {
      setCartData(response.data);
    } else {
      toast.error(response.data.status);
    }
  }

  async function updateItemsQuantity(id, count) {
    let response = await UpdateQuantity(id, count);
    setCartData(response.data);
    toast.success("Product Count Updated Successfully");
  }
  async function DeleteAllItems() {
    let response = await ClearCartFromItems()
    toast.success("Your Cart Is Empty Now ")
    setCartData(response.data);
    
  }
  async function DeleteSingleItem(id) {
    let response = await removeItemFromCart(id);
    toast.error("item Deleted ")
    setCartData(response.data);
    
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <>
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Your Shopping Cart
            </h2>

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    {cartData?.data?.products?.map((item) => (
                      <div
                        key={item.data?.product?.id}
                        className="space-y-4 py-3 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"
                      >
                        <a href="#" className="w-20 shrink-0 md:order-1">
                          <img
                            className="h-20 w-20 object-cover dark:hidden"
                            src={item.product.imageCover}
                            alt="imac image"
                          />
                        </a>

                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() =>
                                updateItemsQuantity(
                                  item.product?.id,
                                  item.count - 1
                                )
                              }
                              id="decrement-button-5"
                              data-input-counter-decrement="counter-input-5"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              id="counter-input-5"
                              data-input-counter
                              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                              placeholder=""
                              value={item.count}
                              required
                            />
                            <button
                              onClick={() =>
                                updateItemsQuantity(
                                  item.product?.id,
                                  item.count + 1
                                )
                              }
                              type="button"
                              id="increment-button-5"
                              data-input-counter-increment="counter-input-5"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              {item.price} EGP
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base text-start font-medium text-gray-900 hover:underline dark:text-white"
                          >
                            {item.product.title}
                          </a>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                />
                              </svg>
                              Add to Favorites
                            </button>

                            <button
                              onClick={() => DeleteSingleItem(item.product.id)}
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">
                          Order summary
                        </p>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <dl className="flex items-center justify-between gap-4">
                              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                Cart Items
                              </dt>
                              <dd className="text-base font-medium text-gray-900 dark:text-white">
                                {cartData?.numOfCartItems}
                              </dd>
                            </dl>
                          </div>
                          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">
                              Total
                            </dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">
                              {cartData?.data?.totalCartPrice}
                            </dd>
                          </dl>
                        </div>

                        <Link to={"/checkOut"}
                          href="#"
                          className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Proceed to Checkout
                        </Link>

                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {" "}
                            or{" "}
                          </span>

                          <a
                            href="#"
                            title=""
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                          >
                            Continue Shopping
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 12H5m14 0-4 4m4-4-4-4"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <button
          onClick={() => DeleteAllItems()}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Clear Cart
          </span>
        </button>
      </>
    </>
  );
}
