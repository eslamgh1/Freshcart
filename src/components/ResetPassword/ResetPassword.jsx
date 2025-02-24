import React, { useContext, useState } from "react";

import { useFormik } from "formik";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { authContext } from "../../context/AuthContext";
import * as yup from "yup";


export default function ResetPassword() {

  const navigate = useNavigate();
  const { setUserToken } = useContext(authContext);

  const [errorMessage, SetErrorMessage] = useState("");
  const [successMessage, SetSuccessMessage] = useState(false);
  const [isClick, setIsClick] = useState(false);


  let resetEmailPass = {
    email:"",
    newPassword:"",
  };

  //   loginUser need user {} to onSubmit in registerFormik using Api:
  function resetPassword(values) {
    console.log(values, "resetPassword");

    setIsClick(true);
    // using Api:
    const { data } = axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then(function (x) {
        console.log("resetPassword-then:", x);

        SetSuccessMessage(true);
        setIsClick(false);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })

      .catch(function (x) {
        console.log("resetPassword-catch: ", x.response.data.message);
        SetErrorMessage(x.response.data.message);
        setIsClick(false);

        setTimeout(() => {
          SetErrorMessage(null);
        }, 3000);
      });
  }

  // login and validation
  const resetPasswordFormik = useFormik({
    initialValues: resetEmailPass,
    onSubmit: resetPassword,
    // validationSchema: yup.object().shape({
    //       email: yup.string().required("email is required").email("envaild email"),
    //       password: yup.string().required("password is required").min(6).max(12),
    //     }),


  });





  return <>
      
      <div className="py-5">
        {successMessage ? (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium"> Congratulations </span>
          </div>
        ) : (
          ""
        )}

        {errorMessage ? (
          <div
            className="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{errorMessage} </span>
          </div>
        ) : (
          ""
        )}

        <h1 className="text-center py-4 text-3xl my-5 font-bold"> Reset Password  <span className="text-sm font-normal"> 3.Final step</span> </h1>
        
        <form
          onSubmit={resetPasswordFormik.handleSubmit}
          className="max-w-md mx-auto"
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={resetPasswordFormik.values.email}
              onChange={resetPasswordFormik.handleChange}
              onBlur={resetPasswordFormik.handleBlur}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>

          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={resetPasswordFormik.values.newPassword}
              onChange={resetPasswordFormik.handleChange}
              onBlur={resetPasswordFormik.handleBlur}
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
            {resetPasswordFormik.errors.password &&
            resetPasswordFormik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Danger alert!</span> Ensures at
                least 4 elements {resetPasswordFormik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {!isClick ? (
              "Reset New Password"
            ) : (
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            )}
            { }
          </button>
        </form>

      </div>


      
  </>
}
