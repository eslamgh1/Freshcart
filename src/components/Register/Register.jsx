import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

export default function Register() {
  // TOP Level Function Component
  const navigate = useNavigate();
  const [errorMessage, SetErrorMessage] = useState('')
  const [successMessage, SetSuccessMessage] = useState(false)
  const [isClick, setIsClick] = useState(false)

  let user = {
    "name": "",
    "email": "",
    "password": "",
    "rePassword": "",
    "phone": ""
  }

  //   registerFormik: onSubmit: registerUser,
  function registerUser(values) {

    console.log("register-registerUser(values)",values)

      //button return Loaaaaading-RotatingLines when click onSubmit FORM
      setIsClick(true);

    // axios return promise " as response" as like fetch so i will use then&catch to handle errors
    const { data } = axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then(function (x) {
  
        console.log('registerUser-then:', x.data);
        SetSuccessMessage(true);
      //button return submit
        setIsClick(false)
        
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      })
      
      // catch of Fetch is handling only network errors
      .catch(function (x) {

        console.log('registerUser-catch : ', x.response.data);
        SetErrorMessage(x.response.data.message)
      //button return submit
        setIsClick(false)


        setTimeout(() => {
          SetErrorMessage(null)
        }, 2000);

      });

  }


  const registerFormik = useFormik({
    initialValues: user,
    //onsubmit in function==>return values
    onSubmit: registerUser,

    // // validation section:
    // validate: function (kanbaValues) {
    //   const errors = {};
    //   const nameRegex = /[a-zA-Z0-9]/;
    //   const phoneRegex = /[0-9]/;
    //   const passwordRegex = /^.{4,}$/;

    //   if (!nameRegex.test(kanbaValues.name)) {
    //     errors.name = " Enter your user name";
    //   }
    //   if (kanbaValues.email.includes('@') == false || kanbaValues.email.includes('.') == false) {
    //     errors.email = " Enter your right email";
    //   }

    //   if (!phoneRegex.test(kanbaValues.phone)) {
    //     errors.phone = " Enter right phone number";
    //   }

    //   if (passwordRegex.test(kanbaValues.password) == false ) {
    //     errors.password = " Ensures at least 4 elements  ";
    //   }

    //   if ( kanbaValues.password !== kanbaValues.rePassword) {
    //     errors.rePassword = " Enter same repassowrd ";
    //   }

    //   // console.log("kanba.name:", kanbaValues.name);
    //   // console.log("Regex test result:", nameRegex.test(kanbaValues.name));

    //   console.log(errors)

    //   return errors;


    // }
    // validation yup library:
    validationSchema: yup.object().shape({
      name: yup.string().required('new name is required by yup').min(3, "mimumm 3"),
      email: yup.string().required('email is required').email("envaild email"),
      password: yup.string().required('password is required').min(6).max(12),
      rePassword: yup.string().required('re enter same password is required').oneOf([yup.ref('password')], " repassword doesn't match"),
      phone: yup.string().required('phone is required').matches(/[0-9]/),
    })

  });

  return (
    <>
      <div className="py-5">
        {successMessage ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium"> Congratulations </span>
        </div> : ''}

        {errorMessage ? <div className="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{errorMessage} </span>
        </div> : ''}

        <h1 className="text-center" >Register Now:</h1>

        {/* Do submit without refresh registerFormik <form onSubmit={registerFormik.handleSubmit}> */}
        <form onSubmit={registerFormik.handleSubmit} className="max-w-md mx-auto">

          <div className="relative z-0 w-full mb-5 group">
            <input value={registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
            {registerFormik.errors.name && registerFormik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Danger alert!</span> Enter your user name: {registerFormik.errors.name}
            </div> : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={registerFormik.values.email} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
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
            {registerFormik.errors.email && registerFormik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Danger alert!</span> Enter your right email:{registerFormik.errors.errors}
            </div> : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={registerFormik.values.password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
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
            {registerFormik.errors.password && registerFormik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Danger alert!</span> Ensures at least 4 elements {registerFormik.errors.password}
            </div> : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={registerFormik.values.rePassword} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
            {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Danger alert!</span> Enter your same above password again {registerFormik.errors.password}
            </div> : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={registerFormik.values.phone} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
            {registerFormik.errors.phone && registerFormik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Danger alert!</span> Enter your phone number {registerFormik.errors.phone}
            </div> : null}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {  !isClick ? 'Submit' : <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClassName=""
            /> }
          </button>

        </form>
      </div>
    </>
  );
}
