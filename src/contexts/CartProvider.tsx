import { ReactNode, useEffect, useState } from "react";
import CartService from "../services/CartService";
import CartContext from "./CartContext";
import { ICartItemCourse } from "../interfaces/ICartItemCourse";

const CartProvider = ({children}: {children: ReactNode}) => {
  const [isCartItems, setCartItems] = useState<ICartItemCourse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false)

  const getItems = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        setLoading(true)
        const items = await CartService.getUserCart()
        setCartItems(items);
        console.log(items)
      } catch (error) {
        console.log(error)
        setCartItems([])        
      } finally {
        setLoading(false)
      }
    }
  };

  useEffect(() => {
    getItems();
  }, []); 

  return (
    <CartContext.Provider value={{ getItems, isCartItems, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider