import { createContext } from "react";
import { ICartItemCourse } from "../interfaces/ICartItemCourse";

interface defaultValues {
  isCartItems: ICartItemCourse[]
  isLoading: boolean
  getItems: () => void,
  setItems: (items: ICartItemCourse[]) => void
}

const CartContext = createContext<defaultValues>({
  isCartItems: [],
  isLoading: false,
  getItems: () => {},
  setItems: () => {}
});

export default CartContext