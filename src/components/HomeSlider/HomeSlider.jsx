import style from "./HomeSlider.module.css";
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../assets/Images/grocery-banner.png";
import img2 from "../../assets/Images/grocery-banner-2.jpeg";
import img3 from "../../assets/Images/banner-4.jpeg";
import img4 from "../../assets/Images/slider-image-1.jpeg";
import img7 from "../../assets/Images/img-slide1.jpg"
import img8 from "../../assets/Images/img-slide2.jpg"

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,          // Enable autoplay
    autoplaySpeed: 2000
  };

  return (
    <div className="flex flex-col gap-10 w-full md:flex-row md:gap-0 px-1 pb-20 items-center">
      <div className="w-3/4 flex-col gap-5">
        <Slider {...settings}>
          <div>
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
          </div>
        </Slider>
      </div>

      <div className="">
        <img src={img7} className="w-full h-40 block" alt="img7" />
        <img src={img8} className="w-full h-40 block" alt="img8" />
      </div>
    </div>
  );
}
