import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import AuthContextProvider from "./context/AuthContext";
import Footer from "./components/Footer/Footer";
import Categories from "./components/Categories/Categories";
import ProductDetails from "./components/ProductDetails/ProductDetails";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContext from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Order from "./components/Order/Order";
import { Offline, Online } from "react-detect-offline";
import WishList from "./components/WishList/WishList";

import ForgetPassword from "./components/ForgetPassword/ForgetPassword"
import VerifyCode from "./components/VerifyCode/VerifyCode"
import ResetPassword from "./components/ResetPassword/ResetPassword"

QueryClientProvider;

//! router package { createBrowserRouter  } from "react-router-dom";
let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "order",
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList/>
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetpassword",
        element: (
            <ForgetPassword />
        ),
      },
      {
        path: "verifycode",
        element: (
            <VerifyCode />
        ),
      },
      {
        path: "resetpassword",
        element: (
            <ResetPassword />
        ),
      },
    ],
  },
]);

const client = new QueryClient();

//! router packageRouterProvider  from "react-router-dom";

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <CartContext>
            <RouterProvider router={x}/>
            <Toaster />
          </CartContext>
        </AuthContextProvider>
    
      </QueryClientProvider>

      <div>
        <Offline className="">
          <h1 className=" border-2 border-red-700 box-content text-black fixed top-10 left-10 right font-semibold bg-orange-500">
            
          You're offline right now. Check your connection.
          </h1>

        </Offline>
      </div>
  
    </>
  );
}

export default App;
