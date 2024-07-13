import { Link } from "react-router-dom";

const Footer = () => {
  return ( 
    <footer className='bg-[#3F3848] flex justify-between p-10 max-sm:items-center max-sm:px-20 max-sm:py-5  max-sm:flex-col'>

      <Link to={'/'}>
        <img src="/src/assets/Logo.svg" alt="logo" className='w-50'/>
      </Link>
        

        <div className='max-sm:items-center flex flex-col'>
          <h1 className='text-white text-base'>Contenido</h1>
          <Link to={'/login'}>Iniciar sesión</Link>
          <Link to={'/'}>Términos y condiciones</Link>
          <Link to={'/'}>Preguntas frecuentes</Link>
          <Link to={'/'}>Aviso privacidad</Link>            
        </div>

        <div className='max-sm:text-center flex flex-col'>
          <h1 className='max-sm:mt-4 text-white text-base'>Equipo:</h1>
          <p>Gómez Flores Luis Enrique</p>
          <p>Kumul Herrera Jose Fernando</p>
          <p>Un Hernandéz Noemi Elizabeth</p>
          <p>Morales García Ana Teresa</p>
        </div>

    </footer>
  );
}
 
export default Footer;