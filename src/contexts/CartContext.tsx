import { createContext } from "react";
import { ICartItemCourse } from "../interfaces/ICartItemCourse";

interface defaultValues {
  isCartItems: ICartItemCourse[]
  isLoading: boolean
  getItems: () => void
}

const CartContext = createContext<defaultValues>({
  isCartItems: [],
  isLoading: false,
  getItems: () => {}
});

export default CartContext