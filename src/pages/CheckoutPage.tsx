import PayPalservice from "../services/PayPalService";
import { OnApproveBraintreeActions, OnApproveBraintreeData, PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions } from "@paypal/react-paypal-js";
import { AxiosError } from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import CartContext from "../contexts/CartContext";


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

  const handleCreateOrder = async () => {
    try {
      const orderId = await PayPalservice.createOrder()
      return orderId
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        const errorDetail = error.response?.data?.data?.details[0];
        if(errorDetail) {
          toast.error(`${errorDetail.issue} ${errorDetail.description}`)
          throw error
        }

        if(error.response?.data?.data?.name) {
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
      //Redirect to mi cursos
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

  return (
    <section>
      <h2>Checkout</h2>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            color: 'black',
            layout: "vertical",
          }}
          createOrder={handleCreateOrder}
          onApprove={(data, actions) => handleCaptureOrder(data as OnApproveBraintreeData, actions as OnApproveBraintreeActions)}
        />
      </PayPalScriptProvider>
    </section>
  );
}

export default CheckoutPage;