import { useContext, useEffect, useState } from "react";
import CartContext from "../contexts/CartContext";

const CartPage = () => {
  const { getItems, isLoading, isCartItems } = useContext(CartContext);
  const [isLoadingCart, setLoadingCart] = useState(true)

  useEffect(() => {
    getItems()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(!isLoading) {
      setLoadingCart(false)
    }
  }, [isLoading])

  if(isLoadingCart) {
    return (
      <h1>Cargando...</h1>
    )
  }

  return ( 
    <section>
      <h1>Carrito</h1>
      {isCartItems.length === 0 
      ?
      <h2>Carrito vacio</h2>
      :
      isCartItems.map(item => (
        <p key={item.pkCartWishList}>{item.course.title}</p>
      ))
      }
    </section>
  )
}
 
export default CartPage;