import { RiCheckboxCircleLine } from "@remixicon/react";
import { Button } from "@tremor/react";
import { Link } from "react-router-dom";

const SuccessPaymentPage = () => {
  return (
    <main className="flex min-h-screen justify-center items-center px-[5%]">
      <article className="px-4 py-6 bg-black-auth flex flex-col  items-center rounded-lg max-w-[440px] md:px-6">
        <RiCheckboxCircleLine size={48} />
        <h2 className="font-medium text-xl sm:text-[22px] mt-2 mb-1">¡Pago Exitoso!</h2>
        <p className="text-secundary-text text-center text-[15px] mb-4 text-balance w-full">
          Gracias por tu compra, es hora de aprender.
        </p>
        <Link to={'/'}>
          <Button><span className="text-base">Volver al inicio</span></Button>
        </Link>
      </article>
    </main>
  );
}

export default SuccessPaymentPage;