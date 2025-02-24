import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { authContext } from "../../context/AuthContext";



export default function Login() {
  // TOP Level Function Component
  const navigate = useNavigate();
  const { setUserToken } = useContext(authContext);

  const [errorMessage, SetErrorMessage] = useState("");
  const [successMessage, SetSuccessMessage] = useState(false);
  const [isClick, setIsClick] = useState(false);

  let user = {
    email: "",
    password: "",
  };

  //   loginUser need user {} to onSubmit in registerFormik using Api:
  function loginUser(values) {
    console.log(values, "loginUser-values");

    setIsClick(true);
    // using Api:
    const { data } = axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(function (x) {
        console.log("loginUser-then:", x.data.token);

        localStorage.setItem("tkn", x.data.token);
        setUserToken(x.data.token);

        SetSuccessMessage(true);
        setIsClick(false);

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })

      .catch(function (x) {
        console.log("loginUser-catch: ", x.response.data.message);
        SetErrorMessage(x.response.data.message);
        setIsClick(false);

        setTimeout(() => {
          SetErrorMessage(null);
        }, 3000);
      });
  }

  // login and validation
  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: loginUser,

    // validation yup library:
    validationSchema: yup.object().shape({
      email: yup.string().required("email is required").email("envaild email"),
      password: yup.string().required("password is required").min(6).max(12),
    }),
  });

  return (
    <>
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

        {/* <h1 className="text-center py-4"> Login</h1> */}
        

        <div className="mb-10 w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400" role="alert">
            <div className="flex items-center justify-center">
                <span className="sr-only">User info</span>
                <h3 className="font-extrabold  text-center text-2xl">login now</h3>

            </div>
        </div>

        <form
          onSubmit={registerFormik.handleSubmit}
          className="max-w-md mx-auto"
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={registerFormik.values.email}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
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
            {registerFormik.errors.email && registerFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Danger alert!</span> Enter your
                right email:{registerFormik.errors.errors}
              </div>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={registerFormik.values.password}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {registerFormik.errors.password &&
            registerFormik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Danger alert!</span> Ensures at
                least 4 elements {registerFormik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {!isClick ? (
              "Submit"
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
          </button>
        </form>
        <div className="text-center mt-20">
          <Link to="/forgetpassword" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Forget your password ?
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
