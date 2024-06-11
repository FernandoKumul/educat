import { RiMailCheckLine } from "@remixicon/react";
import { Button } from "@tremor/react";
import { Link } from "react-router-dom";

const VerifyEmailPage = () => {
  return ( 
    <main className="flex min-h-screen justify-center items-center px-[5%]">
      <article className="px-4 py-6 bg-black-auth flex flex-col  items-center rounded-lg max-w-[440px] md:px-6">
        <RiMailCheckLine size={48} />
        <h2 className="font-medium text-xl sm:text-[22px] mt-2 mb-1">Bienvenido a Educat</h2>
        <p className="text-secundary-text text-center text-[15px] mb-4 text-balance w-full">
          Gracias por confirmar tu dirección de correo.
        </p>
        <Link to={'/login'} ><Button><span className="text-base">Iniciar sesión</span></Button></Link>
      </article>
    </main>
  );
}
 
export default VerifyEmailPage;