import style from "./CategoriesSlider.module.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import useCategories from '../../assets/customHooks/useCategories'

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024, // Medium screens (e.g., tablets)
        settings: {
          slidesToShow: 4, // Show 4 slides on medium screens
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // Small screens (e.g., mobile phones)
        settings: {
          slidesToShow: 2, // Show 2 slides on small screens
          slidesToScroll: 1,
        },
      },
    ],
    autoplay: true,          // Enable autoplay
    autoplaySpeed: 2000,   
  };

const { data , isLoading} = useCategories();

const allCategories = data?.data.data;

  return (
<div className="flex px-5 pb-20">

  <div className="w-full">
  <Slider {...settings}>

    { allCategories?.map( category => <div key={category._id }>
        <img src={category.image} alt={category.name} className="w-full h-72" />
          <h2 className="font-bold text-lg text-gray-800 text-center"> {category.name} </h2>
      </div> )}

      {/* <div>
        <img src={img1} alt={"pic1"} className="w-full h-72" />
      </div>

      <div>
        <img src={img2} alt={"pic2"} className="w-full h-72" />
      </div>

      <div>
        <img src={img3} alt={"pic2"} className="w-full h-72" />
      </div>

      <div>
        <img src={img4} alt={"pic2"} className="w-full h-72" />
      </div>

      <div>
        <img src={img1} alt={"pic5"} className="w-full h-72" />
      </div>

      <div>
        <img src={img1} alt={"pic6"} className="w-full h-72" />
      </div> */}
    </Slider>
  </div>


</div>
  );
}
