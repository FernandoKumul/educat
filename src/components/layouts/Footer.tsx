import { Text } from "@tremor/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return ( 
    <footer className='bg-[#3F3848] px-20 py-5 flex justify-center items-center flex-col'>
      <div>
        <img src="/src/assets/Logo.svg" alt="logo" className='w-50' />
      </div>
      <div className='flex items-center flex-col'>
        <div className='items-center flex flex-col'>
          <Text>Contenido</Text>
          <Link to={'/login'}>Iniciar sesión</Link>
          <Link to={'/'}>Términos y condiciones</Link>
          <Link to={'/'}>Preguntas frecuentes</Link>
          <Link to={'/'}>Aviso privacidad</Link>            
        </div>
        <div className='max-sm:text-center flex flex-col'>
          <Text className='mt-4'>Equipo:</Text>
          <p>Gómez Flores Luis Enrique</p>
          <p>Kumul Herrera Jose Fernando</p>
          <p>Un Hernandéz Noemi Elizabeth</p>
          <p>Morales García Ana Teresa</p>
        </div>

      </div>
    </footer>
  );
}
 
export default Footer;