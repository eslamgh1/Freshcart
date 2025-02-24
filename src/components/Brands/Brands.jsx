import React from "react";
import style from "./Brands.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import  {  useEffect } from "react";



export default function Brands() {

  useEffect(() => {
    document.title = "All Brands-FreshCart ";
  }, []);

  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
  });

  const allBrands = data?.data.data;
  // console.log("resGetAllBrands", allBrands)
  // console.log("getAllBrands", getAllBrands)



    if (isLoading) {
      return <LoaderScreen />;
    }

  return (
    <>
      <h1 className="text-center pt-14 font-bold text-5xl text-green-500 ">All Brands</h1>

      <div className="container mx-auto py-4">
        <div className="grid gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {/* 3rd Div Card for IMG */}

          {allBrands?.map((brand) => (
            <div
              key={brand._id}
              className="cursor-pointer rounded-sm border border-green-100 shadow-xl hover:shadow-green-500 hover:transition-all hover:duration-300"
            >
              <img
                src={brand.image}
                alt={"brand image"}
                className="w-full"
              />

              <p className="pb-14 text-center pt-14 font-bold text-3xl text-green-500">
              {brand.name}
            
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
