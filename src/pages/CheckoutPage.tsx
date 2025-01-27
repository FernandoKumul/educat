import PayPalservice from "../services/PayPalService";
import { OnApproveBraintreeActions, OnApproveBraintreeData, PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions } from "@paypal/react-paypal-js";
import { AxiosError } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import CartContext from "../contexts/CartContext";
import { ICartItemCourse } from "../interfaces/ICartItemCourse";
import CartService from "../services/CartService";
import { useNavigate } from "react-router-dom";
import { CurrencyFormat } from "../utils/CurrencyUtils";
import LoaderCat from "../components/common/LoaderCat";


const CheckoutPage = () => {
  const initialOptions: ReactPayPalScriptOptions = {
    "clientId": "AV5qm5wBjliE-EHZ-wdX-sew8-KpXXcm7HS2InT6nUN9WBnvEmZBYjv_r3kwfHuTJpU22rir0yP5fxlE",
    "enable-funding": "venmo",
    "disable-funding": "card",
    "data-sdk-integration-source": "integrationbuilder_sc",
    currency: "MXN",
    components: "buttons",
  }

  const { setItems } = useContext(CartContext)
  const [isLoading, setLoading] = useState(true)
  const [isCartItems, setCartItems] = useState<ICartItemCourse[]>([])
  const dataFetch = useRef<boolean>(false)
  const navigate = useNavigate()



  const handleCreateOrder = async () => {
    try {
      const orderId = await PayPalservice.createOrder()
      return orderId
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        const errorDetail = error.response?.data?.data?.details[0];
        if (errorDetail) {
          toast.error(`${errorDetail.issue} ${errorDetail.description}`)
          throw error
        }

        if (error.response?.data?.data?.name) {
          toast.error(error.response?.data.data.name)
        }

        if (error.response?.data.message) {
          toast.error(error.response?.data.message)
          throw error
        }
        toast.error('Oops... Ocurrió un error: ' + error.message);
        throw error
      }
      toast.error('Oops... Ocurrió un error, Intentelo más tarde');
      throw error
    }
  }

  const handleCaptureOrder = async (data: OnApproveBraintreeData, actions: OnApproveBraintreeActions) => {
    try {
      await PayPalservice.captureOrder(data.orderID)
      toast.success("Pago hecho con exíto")
      setItems([])
      navigate('/pago-exitoso')    
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        const response = error.response?.data
        const errorDetail = response.data?.details?.[0];
        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
          return actions.restart();
        } else if (errorDetail) {
          toast.error(`${errorDetail.description} (${response?.data?.debug_id})`,)
          return
        }

        if (response?.message) {
          toast.error(response?.message)
          return
        }

        toast.error('Oops... Ocurrió un error: ' + error.message);
        return
      }
      toast.error('Oops... Ocurrió un error, Intentelo más tarde');
    }
  }

  const getItems = async () => {
    try {
      dataFetch.current = true
      setLoading(true)
      const items = await CartService.getUserCart()
      if (items.length === 0) {
        toast.info("No tienes ningún producto en el carrito para comprar")
        navigate("/")
      }
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

  const totalPrice = () => {
    let count = 0
    for (const item of isCartItems) {
      count += item.course.price ?? 0
    }
    return count
  }

  useEffect(() => {
    if (!dataFetch.current) {
      getItems()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <LoaderCat/>
      </div>
    )
  }

  return (
    <section className="grid gap-12 grid-cols-1 lg:grid-cols-[5fr_2fr] py-8 w-[80%] mx-auto items-start">
      <article className="bg-[#25202A] rounded-md py-10 px-8">
        <h2 className="text-2xl font-semibold mb-4">Cursos de la compra</h2>
        {isCartItems.map((item, index) => (
          <article key={item.pkCartWishList} className={`flex items-start gap-4 ${isCartItems.length !== (index - 1) && 'border-b-[1px] border-[#787081] py-6'}`}>
            <div className="w-24 bg-gradient-to-r flex-shrink-0 from-purple-500 via-violet-600 to-indigo-400 aspect-video rounded-md">
              {item.course.cover &&
                <img className="w-full h-full rounded-md object-cover" src={item.course.cover} alt={item.course.title} />
              }
            </div>
            <div className="flex-grow lg:flex lg:justify-between">
              <div>
                <h4 className="font-medium text-lg">{item.course.title}</h4>
              </div>
              <p className="text-secundary-text font-semibold">{CurrencyFormat(item.course.price ?? 0)}</p>
            </div>
          </article>
        ))}
      </article>
      <article className="bg-[#25202A] rounded-md py-10 px-8">
        <h2 className="text-center text-2xl font-semibold  mb-4">Resumen</h2>
        <div className="flex justify-between">
          <p>Precio: </p><p>{CurrencyFormat(totalPrice())}</p>
        </div>
        <div className="h-[1px] bg-[#787081] my-6"></div>
        <div className="flex justify-between mb-6">
          <p>Total: </p><p>{CurrencyFormat(totalPrice())}</p>
        </div>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{
              shape: "rect",
              color: 'silver',
              layout: "vertical",
            }}
            createOrder={handleCreateOrder}
            onApprove={(data, actions) => handleCaptureOrder(data as OnApproveBraintreeData, actions as OnApproveBraintreeActions)}
          />
        </PayPalScriptProvider>
      </article>
    </section>
  );
}

export default CheckoutPage;