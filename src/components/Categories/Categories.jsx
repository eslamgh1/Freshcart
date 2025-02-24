import React, { useState } from "react";
import style from "./Categories.module.css";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useCategories from "../../assets/customHooks/useCategories";
import  {  useEffect } from "react";

export default function Categories() {
    useEffect(() => {
        document.title = "Categories -FreshCart ";
      }, []);

    
  const { data, isLoading } = useCategories();
  const allCategories = data?.data.data;

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <>
      <div className="container mx-auto py-4">
        <div className="grid gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {/* 3rd Div Card for IMG */}

          {allCategories?.map((category) => (
            <div
              key={category._id}
              className="cursor-pointer rounded-sm border border-green-100 shadow-xl hover:shadow-green-500 hover:transition-all hover:duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-3/4"
              />

              <div className="pb-14">
                <h2 className="text-center pt-14 font-bold text-3xl text-green-500 ">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
