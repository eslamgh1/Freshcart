import React, { useState } from 'react'
import style from './NotFound.module.css'
import error from "../../assets/Images/error.svg";

export default function NotFound() {
  return <>
  
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-1">
          {/* 3rd Div Card for IMG */}
            <div
              className="cursor-pointer rounded-sm border border-green-100 shadow-xl hover:shadow-green-500 hover:transition-all hover:duration-300"
            >
              <img
                src={error}
                alt={error}
                className="w-full"
              />
            </div>  
        </div>
      </div>

  </>
}

