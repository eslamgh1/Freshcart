import React, { useState } from "react";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import useCart from "./useCart";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import  {  useEffect } from "react";

export default function Cart() {
  useEffect(() => {
      document.title = "Cart";
    }, []);
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    products,
    handleRemoveItemFromCart,
    handleChangeCount,
    totalCartPrice,
    numOfCartItems,
    cartId,
    setNumOfCartItems,
    setProducts,
    setTotalCartPrice,
  } = useCart();

  if (!products) {
    return <LoaderScreen />;
  }

  // Create cash order
  function createCashOrder(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Pay Cash on delivery");
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log("Error from order:", err);
        toast.error("Failed to create order. Please try again.");
      });
  }

  // Remove cart
  async function removeCart() {
    setLoading(true);
    await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        if (res) {
          toast.success("Cart is removed successfully");
          setNumOfCartItems(0);
          setTotalCartPrice(0);
          setProducts([]);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log("removeCart-catch:", err);
        toast.error("Failed to remove cart. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
<div>
      <>
      <h1 className="text-green-950 text-4xl font-bold pb-5">Shop Cart:</h1>
      <h2 className="text-2xl font-semibold pb-3">
        Total cart price:{" "}
        <span className="text-green-400">
          <i className="fa-solid fa-cash-register"></i> {totalCartPrice} EGP
        </span>
      </h2>

      <div className="container mx-auto p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 text-base">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-base">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3 text-base">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-base">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                  <LoaderScreen />
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                  <h1 className=" text-lg text-red-500">Empty cart </h1>
                  <i className="text-red-500 fa-solid fa-cart-shopping"> </i>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleChangeCount(
                              product.product._id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <input
                            type="number"
                            id="first_product"
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={product.count}
                            readOnly
                          />
                        </div>
                        <button
                          onClick={() =>
                            handleChangeCount(
                              product.product._id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() =>
                          handleRemoveItemFromCart(product.product._id)
                        }
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
          <Link to="/order" className="flex justify-center items-center">
            <button
              type="button"
              className="text-xl my-2 w-[90%] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
            >
              Pay to my cart
            </button>
          </Link>
          <div className="flex justify-center items-center">
            <button
              onClick={removeCart}
              type="button"
              className="text-xl my-2 w-[30%] text-white bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
            >
              Clear Your cart
            </button>
          </div>
        </div>
      </div>
    </>
</div>
  );
}