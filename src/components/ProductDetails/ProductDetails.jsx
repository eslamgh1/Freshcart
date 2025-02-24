import { useQuery } from "@tanstack/react-query";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import axios from "axios";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";




export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);

  async function handleAddProductToCart() {
    const res = await addProductToCart(id);
    if (res) {
      console.log("sucess");
      toast.success("sucess",{duration:3000 , position:"top-center"})
  
    } else {
      console.log("Try again");
      toast.error("error",{duration:3000 , position:"top-center"})
    
    }
  }

  //call API of products-details
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });

  // console.log('Data test1:',data )

  const productDetailsObj = data?.data.data;
  console.log('productDetailsObj',productDetailsObj )

  if (isError) {
    return <h1> Product is not found</h1>;
  }

  if (isLoading) {
    return (
      <span>
        {" "}
        <LoaderScreen />{" "}
      </span>
    );
  }

  return (
    <>
      <div className="container mx-auto">
        {/* <h1>Product Details </h1> */}
        <div className="grid sm:grid-cols-5 gap-3">
          <div className="col-span-2">
            <img
              className="w-full"
              src={productDetailsObj.imageCover}
              alt="title"
            />
          </div>
          <div className="col-span-3">
            <h1 className="text-green-500 text-3xl font-bold mb-5" > {productDetailsObj.title}</h1>
            <p className="text-lg"> {productDetailsObj.description}</p>
            <h3 className="text-green-800 my-10 font-bold"> {productDetailsObj.price} EGP</h3>
            <h3 className="text-green-800 my-10 font-bold">    <i className="text-amber-500 fa-solid fa-star"></i> {productDetailsObj.ratingsAverage} </h3>

            
      
            <button   onClick={handleAddProductToCart} type="button" className="w-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add to cart +</button>

          </div>
        </div>
      </div>
    </>
  );
}
