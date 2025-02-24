import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";

// this 1st : const cartContext= createContext();
export const cartContext = createContext();

/*  this 2nd : wrap by <cartContext.Provider> */

export default function CartContext({ children }) {
  const { userToken } = useContext(authContext);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [productsWishList, setProductsWishList] = useState([]);

  const [loading, setLoading] = useState(false)

  function resetValues() {
    setNumOfCartItems(0)
    setTotalCartPrice(0)
    setProducts(null)
    setCartId(null)
  }

  

  async function addProductToCart(id) {
    const res = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then(function (res) {
        // console.log("cart1", res.data.numOfCartItems);
        // setNumOfCartItems(res.data.numOfCartItems);

        setCartId(res.data.cartId);
        // console.log("cartID-add:", res.data.cartId);
      
      
        getUserCart();
        return true;
      })
      .catch(function (err) {
        console.log("errr", err);

        return false;
      });
    return res;
  }

  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: userToken,
        },
      })
      .then(function (result) {
        // console.log("cartsucess::::", result.data.numOfCartItems);

        setNumOfCartItems(result.data.numOfCartItems);
        setTotalCartPrice(result.data.data.totalCartPrice);
        setProducts(result.data.data.products);

        setCartId(result.data.cartId);
        // console.log("cartID-get", result.data.cartId);
      })
      .catch(function (err) {
        console.log("cartFail:::", err);
      });
  }

  async function getUpdateCount(id, newCount) {
    const newRes = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then(function (res) {
        console.log("res+", res);

        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);

        return true;
      })

      .catch(function (err) {
        console.log("err+", err);

        return false;
      });

    return newRes;
  }

  async function removeItemFromCart(id) {
    const removeRes = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: userToken,
        },
      })
      .then(function (res) {
        console.log("numOfCartItems:", res.data.numOfCartItems);

        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);

        return true;
      })
      .catch(function (err) {
        console.log("err-delete", err);

        return false;
      });

    return removeRes;
  }
// Comment start wish list context
  async function addProductToWishList(id) {
    const res = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("tkn")
          },
        }
      )
      .then(function (res) {
        console.log("Then-addProductToWishList", res)
        getWishList()
        
        return res;

      })
      .catch(function (err) {
        console.log("Catch-addProductToWishList", err);
        return false;

      });

    return res;
  }


  function getWishList() {
    setLoading(true)
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("tkn")
        },
      })
      .then(function (result) {

        console.log("Get-whishList-then", result.data.data);
        setProductsWishList(result.data.data)
        console.log("ProductsWishList-then", result.data.data);
        setLoading(false)
        return result.data

        
      })
      .catch(function (err) {
        console.log("getWishList-Catch", err);
        setLoading(false)
      });
  }


  async function removeItemWishList(id) {
    const removeWish = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem("tkn")
        },
      })

      .then(function (result) {
        console.log("Then-removeItemWishList:", result.data.data);
        setProductsWishList(result.data.data)
        return result;
      })

      .catch(function (err) {
        console.log("Catch-removeItemWishList", err);
        return false;
      });

    return removeWish;
  }


  useEffect(() => {
    if (userToken) {
      getWishList();
    }
  }, [userToken]);



  useEffect(() => {
    if (userToken) {
      getUserCart();
    }
  }, [userToken]);



  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getUserCart,
        numOfCartItems,
        totalCartPrice,
        products,
        getUpdateCount,
        removeItemFromCart,
        cartId,
        userToken,
        resetValues,
        setProducts,
        setNumOfCartItems,
        setTotalCartPrice,
        addProductToWishList,
        getWishList,
        productsWishList,
        removeItemWishList,
        loading, setLoading,
      }}
    >
      <div>

        {children}
      
      
      </div>
    </cartContext.Provider>
  );
  
}
