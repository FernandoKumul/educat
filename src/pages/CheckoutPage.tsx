import { PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions } from "@paypal/react-paypal-js";
import { useState } from "react";
import PayPalservice from "../services/PayPalService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const initialOptions: ReactPayPalScriptOptions = {
    "clientId": "AV5qm5wBjliE-EHZ-wdX-sew8-KpXXcm7HS2InT6nUN9WBnvEmZBYjv_r3kwfHuTJpU22rir0yP5fxlE",
    "enable-funding": "paylater,venmo",
    "data-sdk-integration-source": "integrationbuilder_sc",
    currency: "MXN",
    components: "buttons",
  }

  const [message, setMessage] = useState("")

  const handleCreateOrder = async () => {
    try {
      const orderId = await PayPalservice.createOrder()
      return orderId
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'Su cuenta existe, pero su correo no está verificado') {
          toast.warn(error.response?.data.message)
          throw error
        }
        console.log(error)
        toast.error('Oops... Ocurrió un error, Intentelo más tarde');
        throw error
      }
      console.log(error)
      throw error
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
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(
                `/api/orders/${data.orderID}/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );

              const orderData = await response.json();
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`,
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2),
                );
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`,
              );
            }
          }}
          
        />
      </PayPalScriptProvider>
      <h3>{message}</h3>
    </section>
  );
}
 
export default CheckoutPage;