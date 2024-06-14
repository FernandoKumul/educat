import { RiCircleFill } from "@remixicon/react";
import { Button } from "@tremor/react";

const HomePage = () => {
  return (
    <section>
      <Button  onClick={() => location.href = 'https://youtu.be/dQw4w9WgXcQ?si=GkE7OM_u2s4Bm5yk'}>Clcik Aqui :D</Button>
      <div className="bg-[rgb(49,43,57)] flex flex-col py-20 px-12">
        <h1 className='
        text-3xl 
        border-l-4 
        px-2 border-solid 
        border-details 
        rounded-sm
        md:text-5xl'>
          Cursos online para aprender
        <span className='text-details'>
          .
        </span></h1>
        <p className='my-3 text-sm md:text-base'>Habilidades para tú presente (y tú futuro). Da tus primeros pasos con nosotros.</p>
      </div>

      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center text-xl md:text-2xl'>¿Por qué Educat?</h1>
        <div className="flex justify-between max-sm:flex-col gap-6">
          <div>
            <RiCircleFill className="text-[#D9D9D9] w-10 h-10"></RiCircleFill>
            <h2 className='text-base items-center'>Lorem ipsum dolor sit amet</h2>
            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit, sed do eiusmod tempor incididunt 
              ut labore et dolore magna aliqua.</p>
          </div>
          <div>
            <RiCircleFill className="text-[#D9D9D9] w-10 h-10"></RiCircleFill>
            <h2 className='text-base items-center'>Lorem ipsum dolor sit amet</h2>
            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit, sed do eiusmod tempor incididunt 
              ut labore et dolore magna aliqua.</p>
          </div>
          <div>
            <RiCircleFill className="text-[#D9D9D9] w-10 h-10"></RiCircleFill>
            <h2 className='text-base items-center'>Lorem ipsum dolor sit amet</h2>
            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit, sed do eiusmod tempor incididunt 
              ut labore et dolore magna aliqua.</p>
          </div>        
      </div>


      </div>

      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center max-sm:text-xl md:text-2xl'>Más populares</h1>
      </div>

      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center max-sm:text-xl md:text-2xl'>Categorías</h1>
      </div>

      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center max-sm:text-xl md:text-2xl'>Nuestro equipo</h1>

      </div>


    </section>
  )
}
 
export default HomePage;