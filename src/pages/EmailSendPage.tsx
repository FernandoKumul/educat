import { RiMailSendLine } from "@remixicon/react";
import { Button } from "@tremor/react";
import {Link, useParams} from "react-router-dom";

const EmailSendPage = () => {
  const {email} = useParams()

  return ( 
    <main className="flex min-h-screen justify-center items-center px-[5%]">
      <article className="px-4 py-6 bg-black-auth flex flex-col  items-center rounded-lg max-w-[440px] md:px-6">
        <RiMailSendLine size={48} />
        <h2 className="font-medium text-xl sm:text-[22px] mt-2 mb-1">Gracias por registarte en Educat</h2>
        <p className="text-secundary-text text-center text-[15px] mb-4 text-balance w-full">
          Te hemos enviado un correo a <span className="font-bold block text-ellipsis overflow-hidden">{email} </span>para verificar tu dirección de correo.
        </p>
        <Link to={'/login'}><Button><span className="text-base">Iniciar sesión</span></Button></Link>
      </article>
    </main>
  );
}
 
export default EmailSendPage;