import toast from "react-hot-toast";
import {useContext} from "react";
import {cartContext} from "../../context/CartContext";



export default function useCart() {
  const {
    numOfCartItems,
    totalCartPrice,
    products,
    getUpdateCount,
    removeItemFromCart,
    setNumOfCartItems,
    setProducts,
    resetValues,
    setTotalCartPrice,
    getUserCart,
  } = useContext(cartContext);

  console.log("products from cart:", products);

  async function handleChangeCount(id, newCount) {
    const res = await getUpdateCount(id, newCount);

    res
      ? toast.success("Product is changed")
      : toast.error("Error during operation, Try again");
  }

  async function handleRemoveItemFromCart(id) {
    const isSuccess = await removeItemFromCart(id);

    // isSuccess ? toast.success("Product is removed") : toast.error("Error during remove operation, Try again")

    if (isSuccess) {
      toast.success("Product is removed");
    } else {
      toast.error("Error during remove operation, Try again");
    }
  }

  return {products, handleRemoveItemFromCart ,handleChangeCount ,totalCartPrice,numOfCartItems,setNumOfCartItems,setProducts,setTotalCartPrice,resetValues,getUserCart}
}