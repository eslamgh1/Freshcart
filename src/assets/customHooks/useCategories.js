//! Notes
//^ Custom_Hooks  starting with use..... return [ Logic or Object or so on but not UI] 
//^ we can use Hooks only Inside custom_Hooks 
//~  Components return UI

import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export default function useCategories() {

  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const res = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
  });

  

  return res;

}
