import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const [dataRetrieved, setDataRetrieved] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  let { addProductToCart } = useContext(CartContext);

  async function getAllProducts() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setDataRetrieved(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  }

  async function addToCart(id) {
    let response = await addProductToCart(id);
    console.log(response.data);
    if (response.data.status == "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="row">
        {loading ? (
          <div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
          </div>
        ) : dataRetrieved.length > 0 ? (
          dataRetrieved.map((product) => (
            <div className="w-1/6 shadow-sm" key={product.id}>
              <div className="p-3 productBody flex flex-col ">
                <Link to={`/productDetails/${product.id}`}>
                  <img src={product.imageCover} className="w-full" alt="" />
                  <h3 className="text-green-500 text-start font-bold">
                    {product.category.name}
                  </h3>
                  <h3 className="me-auto text-start">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between pt-3">
                    <span className="font-semibold">${product.price}</span>
                    <span className="font-semibold">
                      <i className="fa-solid fa-star text-yellow-500"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button className="btn" onClick={() => addToCart(product.id)}>
                  Add to cart <span className="text-xl">+</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
}
