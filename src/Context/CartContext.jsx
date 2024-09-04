import axios from "axios";
import { createContext } from "react";
import Cart from "../Components/Cart/Cart";

export let CartContext = createContext();

let headers = {
  token: localStorage.getItem("UserToken"),
};
export default function CartContextProvider(props) {

  
  function addProductToCart(productId) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: productId },
      { headers }
    ).then((res) => res).catch((err) => err);
  }
 

  async function GetLoggedUserCart() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  async function UpdateQuantity(productId ,newCount) {
    return await axios
      .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount},{headers})
      .then((res) => res)
      .catch((err) => err);
  }

 async function ClearCartFromItems() {
   return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).then((res)=>res).catch((err)=>err)
  }
 async function removeItemFromCart(productId) {
   return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers}).then((res)=>res).catch((err)=>err)
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        GetLoggedUserCart,
        UpdateQuantity,
        ClearCartFromItems,
        removeItemFromCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
