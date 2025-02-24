import { useContext, useState } from "react";
import style from "./Order.module.css";
import { cartContext } from "../../context/CartContext";
import axios from "axios";
import { authContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const { cartId, resetValues } = useContext(cartContext);
  const { userToken } = useContext(authContext);
  const [ isCash, setIsCash ] = useState(true);
  const navigate = useNavigate();

  
  console.log("tt", isCash)
  // const [isCash, setIsCash] = useState(true)

  const formikCart = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    // onSubmit: createCashOrder,
    onSubmit: function(values){
      if (isCash){
        createCashOrder(values)
        console.log("nowwww",isCash)
      }else{
        checkoutOrder(values)
      }
    },
  });

  function createCashOrder(values) {
    console.log(" values-createCashOrder", values);
    console.log("cart-id:::::::::::", cartId);

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then(function (res) {
        if (res.data.status === "success") {
          toast.success("Pay Cash on delievery");
          navigate("/home");
        }
      })
      .catch(function (err) {
        console.log("error from order", err);
      });

    // axios
    //   .post(
    //     `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    //     {
    //       shippingAddress: values,

    //       // shippingAddress: {
    //       //   details: "details",
    //       //   phone: "01010800921",
    //       //   city: "Cairo",
    //       // },
    //     },
    //     {
    //       headers: {
    //         token: userToken,
    //       },
    //     }
    //   )
    //   .then(function (res) {
    //     if (res.data.status === "success") {
    //       toast.success("Order is created to pay");
    //       resetValues();
    //     }
    //   })
    //   .catch(
    //     then(function (err) {
    //       console.log("error from order", err);
    //     })
    //   );
  }

  function checkoutOrder(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: userToken,
          },
          params: {
            url: "http://localhost:3000",
          },
        }
      )
      .then(function (res) {
        toast.success("Add card number to complete payment process");
        window.open(res.data.session.url, "_self");
      })

      .catch(function (err) {
        console.log("error from order", err);
      });

    // axios
    //   .post(
    //     `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    //     {
    //       shippingAddress: values,

    //       // shippingAddress: {
    //       //   details: "details",
    //       //   phone: "01010800921",
    //       //   city: "Cairo",
    //       // },
    //     },
    //     {
    //       headers: {
    //         token: userToken,
    //       },
    //     }
    //   )
    //   .then(function (res) {
    //     if (res.data.status === "success") {
    //       toast.success("Order is created to pay");
    //       resetValues();
    //     }
    //   })
    //   .catch(
    //     then(function (err) {
    //       console.log("error from order", err);
    //     })
    //   );
  }

  return (
    <>
      <h1>Order</h1>
      <div className="container mx-auto py-5">
        <form onSubmit={formikCart.handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your details
            </label>
            <input
              value={formikCart.values.details}
              onChange={formikCart.handleChange}
              type="text"
              id="details"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="You details"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone
            </label>
            <input
              value={formikCart.values.phone}
              onChange={formikCart.handleChange}
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your city
            </label>
            <input
              value={formikCart.values.city}
              onChange={formikCart.handleChange}
              type="text"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            onClick={() => setIsCash(true)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Pay Cash on delievery
          </button>
          <button
            type="submit"
            onClick={() => setIsCash(false)}
            className=" mx-3 text-white bg-cyan-500 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Checkout with card
          </button>
        </form>
      </div>
    </>
  );
}
