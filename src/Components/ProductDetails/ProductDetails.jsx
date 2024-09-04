import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let {addProductToCart} = useContext(CartContext)
  const [loading, setLoading] = useState(true);
  const [Product, setProduct] = useState(null);
  let { id } = useParams();
  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
         setLoading(false);
      })
      .catch((res) => {
         setLoading(false);
        alert("Error");
      });
  }
  useEffect(() => {
    getProduct(id);
  }, []);
  async function addToCart(id) {
    let response = await addProductToCart(id);
    console.log(response.data)
    if (response.data.status == "success") {
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }
   var settings = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
     autoplay: true,
     autoplaySpeed: 2000,
     dots: false,
   };
  return (
    <>
      {loading ? (
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
      ) : Product? (
        <div className="mainContainer p-7 text-start shadow-lg mt-3 flex">
          <div className="w-1/4">
              <Slider {...settings}>
              {Product?.images.map((src)=> <img src={src} className="w-full"/>)}
            </Slider>
          </div>
          <div className="w-3/4 p-3 flex flex-col items-center  m-auto text-start">
            <h3 className="me-auto font-semibold">{Product?.title}</h3>
            <p className="me-auto text-gray-500 p-3">{Product?.description}</p>
            <h3 className="me-auto">{Product?.category.name}</h3>
            <div className="flex justify-between w-full  pt-3">
              <span className="font-semibold ">${Product?.price}</span>
              <span className="font-semibold ">
                <i className="fa-solid fa-star text-yellow-500"></i>
                {Product?.ratingsAverage}
              </span>
            </div>
            <button className="btn py-5" onClick={()=> addToCart(id)}>
              Add to cart <span className="text-xl">+</span>
            </button>
          </div>
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </>
  );
}
