import style from "./WishList.module.css";
import React, { useContext, useEffect, useState } from "react";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import axios from "axios";
import toast from "react-hot-toast";
import { cartContext } from "../../context/CartContext";
import { authContext } from "../../context/AuthContext";

export default function WishList() {

    useEffect(() => {
          document.title = "Wish List FreshCart";
        }, []);
      
  const { userToken } = useContext(authContext);



  const {
    getWishList,
    productsWishList,
    removeItemWishList,
    addProductToCart,
    setLoading,
    loading,
  } = useContext(cartContext);

  console.log("productsWishList:", productsWishList);


  


  async function handleAddwishProductToCart(id) {
    const isSuccess = await addProductToCart(id);
    removeItemWishList(id);
    getWishList();
  }

  async function handleRemoveItemWishList(id) {
    const isSuccess = await removeItemWishList(id);

    // isSuccess ? toast.success("Product is removed") : toast.error("Error during remove operation, Try again")

    if (isSuccess) {
      toast.success("Product-Wish is removed");
    } else {
      toast.error("Error during remove Product-Wish, Try again");
    }
    getWishList();
  }

  useEffect(() => {
  getWishList();
  }, []);

  return (
<div className="pb-24">
<>
      <h1 className="text-4xl font-bold pb-5 text-green-400">
        My Wish List
      </h1>
      <h2 className="text-xl font-semibold pb-3">
        <span className="text-green-400"></span>
      </h2>
  
      <div className="container mx-auto p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5">
                    <LoaderScreen />
                  </td>
                </tr>
              ) : productsWishList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 border">
                  <i className="text-red-500 fa-solid fa-cart-shopping"> </i>
                    <h1 className=" text-lg text-red-500">Empty cart </h1>
                  </td>
                </tr>
              ) : (
                productsWishList.map((productwish) => (
                  <tr
                    key={productwish.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={productwish.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={""}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {productwish.title}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {productwish.price} EGP
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <button
                        onClick={() => handleAddwishProductToCart(productwish.id)}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                          Add to cart
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() => handleRemoveItemWishList(productwish.id)}
                        className="no-underline cursor-pointer font-medium text-red-600 dark:text-red-500 hover:text-red-800"
                      >
                        Remove <i className="fa-solid fa-trash px-1"></i>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
  
          <div className="flex justify-center items-center"></div>
        </div>
      </div>
    </>
</div>
  );
}
