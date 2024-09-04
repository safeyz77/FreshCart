import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
  const [Categories, setCategories] = useState([]);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false
  };
  return (
    <>
      <h2 className="pt-7 text-start font-bold">Shopping by category </h2>
      <Slider {...settings}>
        {Categories.map((category, index) => (
          <div key={`${category.id}-${index}`} className="pt-7">
            <img
              src={category.image}
              className="w-full h-[200px] object-cover"
              alt={category.name}
            />
            <h3 className="font-semibold">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
