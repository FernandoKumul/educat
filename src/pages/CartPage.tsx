import { useContext, useEffect, useState } from "react";
import CartContext from "../contexts/CartContext";
import CartService from "../services/CartService";
import { ICartItemCourse } from "../interfaces/ICartItemCourse";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { RiLoader4Line } from "@remixicon/react";
import CartRow from "../components/cart/CartRow";
import { CurrencyFormat } from "../utils/CurrencyUtils";
import { Button } from "@tremor/react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { setItems } = useContext(CartContext);
  const [isLoading, setLoading] = useState(true)
  const [isCartItems, setCartItems] = useState<ICartItemCourse[]>([])

  const getItems = async () => {
    try {
      setLoading(true)
      const items = await CartService.getUserCart()
      setCartItems(items)
      setItems(items)
    } catch (error) {
      console.log(error)
      setCartItems([])
      setItems([])
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
      }
    } finally {
      setLoading(false)
    }
  };

  const handleDelete = async (itemId: number) => {
    try {
      await CartService.deleteCartItem(itemId)
      const newItems = isCartItems.filter(item => item.pkCartWishList !== itemId)
      setCartItems(newItems)
      setItems(newItems)
      toast.success("Curso borrado del carrito")
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
      }
    }
  }

  const totalPrice = () => {
    let count = 0
    for (const item of isCartItems) {
      count += item.course.price ?? 0
    }
    return count
  }

  useEffect(() => {
    getItems()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ( 
    <section className="w-[80%] mx-auto flex-grow pb-4">
      <h1 className="text-3xl font-medium text-center mt-10">Carrito de compras</h1>
      {isLoading
      ?
        <div className="flex justify-center mt-12">
          <RiLoader4Line size={48} className="animate-spin" />
        </div>
      :
        isCartItems.length === 0 
        ?
        <h2 className="text-center mt-8 text-xl">El carrito está vacío</h2>
        :
        <>
        
          <table className="w-full mt-8">
            <thead className="bg-header rounded-sm text-xl">
              <tr>
                <th className="w-[260px]"></th>
                <th className="py-3 font-semibold">Curso</th>
                <th className="py-3 font-semibold w-48">Precio</th>
                <th className="py-3 w-[92px]"></th>
              </tr>
            </thead>
            <tbody>
              {isCartItems.map(item => (
                <CartRow key={item.pkCartWishList} item={item} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4 gap-4 items-center">
            <h3 className="text-xl font-medium">Total</h3>
            <p>{CurrencyFormat(totalPrice())} MXN</p>
            <Button className="px-12">
              <Link to={"/"} className="text-base">Pagar</Link>
            </Button>
          </div>
        </>
      }
    </section>
  )
}
 
export default CartPage;