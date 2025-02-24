import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import LoaderScreen from "../LoaderScreen/LoaderScreen";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategoriesSlider from "../../components/CategoriesSlider/CategoriesSlider";
import SearchBar from "../../components/SearchBar/SearchBar";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";

export default function Home() {

    useEffect(() => {
        document.title = "Fresh Cart [Home]";
      }, []);
    
  const {
    addProductToCart,
    addProductToWishList,
    removeItemWishList,
    getWishList,
  } = useContext(cartContext);

  const [wishListClicked, setWishListClicked] = useState([]);

  async function handleAddProductToCart(id) {
    const res = await addProductToCart(id);

    if (res) {
      toast.success("Product is Added to cart ", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.error("Error during adding to cart", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    // enabled:false,
  });

  const allProducts = data?.data.data;


  async function getWishListProducts() {
    const data = await getWishList()
    console.log(data);
    const wishData = data.data.map((item) => item._id);
    console.log("wishData :",wishData);
    setWishListClicked(wishData)
    
  }

  async function toggleWishList(id) {
    if(wishListClicked.includes(id)) {
      const {data} = await removeItemWishList(id)
      console.log(data.data);
      setWishListClicked(data.data)
      toast.error("Removed from Wish List", {
              duration: 3000,
              position: "top-center",
            });
      
    }else {
      const {data} = await addProductToWishList(id)
      console.log(data.data);
      setWishListClicked(data.data)
      toast.success("Addeded to Wish List ", {
             duration: 3000,
              position: "top-center",
           });
    }
  }


  useEffect(() => {
    getWishListProducts();
  }, []);

  // return at the bottom  of code and before UI
  if (isLoading) {
    return <LoaderScreen />;
  }

  if (isError) {
    return <h2> Error From Home page</h2>;
  }

  return (
    <>

      <div className="container mx-auto p-5">
        <div className="flex flex-col gap-5">
  
          <HomeSlider />
          <CategoriesSlider />
          {/* <SearchBar /> */}

          <div className="grid gap-2 md:grid-cols-2 md:gap-5 lg:grid-cols-5">
            {/* 3rd Div Card for IMG */}

            {allProducts?.map((product) => (
              <Link
                to={`/productdetails/${product._id}`}
                key={product._id}
                className="rounded-sm border border-red-100 relative  overflow-hidden group shadow-xl hover:shadow-green-500"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full"
                />
                <h2 className="text-green-500 px-3">{product.category.name}</h2>
                <h3 className="px-3">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>

                <div className="flex justify-between items-center px-3">
                  <div className="">
                    {product.priceAfterDiscount ? (
                      <>
                        <p>{product.priceAfterDiscount} EGP</p>
                        <p className="line-through text-red-600">
                          {product.price} EGP
                        </p>
                      </>
                    ) : (
                      <p>{product.price} EGP</p>
                    )}
                  </div>
                  <div className="flex justify-center items-center">
                    <i className="text-amber-500 fa-solid fa-star"></i>
                    <p>{product.ratingsAverage}</p>
                  </div>
                </div>

                <div className="grid place-items-end pt-5 pe-5 pb-10 md:pb-20 xl:pb-10">
                  <button onClick={(e)=> { 
                    e.preventDefault()
                    toggleWishList(product.id)}  }>
        

                    <i
                      className={`fa-solid fa-heart text-2xl ${wishListClicked.includes(product.id)? "text-red-500" : "text-black"}  transition-colors duration-300`}
                    ></i>
                  </button>
                </div>
                <div className="absolute bottom-0 left-[30%] translate-y-[100%]">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddProductToCart(product._id);
                    }}
                    type="button"
                    className="addBtn group-hover:translate-y-[-130%] transition-all duration-500 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
                  >
                    +Add
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
