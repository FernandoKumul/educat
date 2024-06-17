import { RiBookReadLine, RiGroup2Line, RiSparklingLine } from "@remixicon/react";

const HomePage = () => {
  return (
    <section>
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
        <h1 className='text-details flex justify-center text-xl md:text-2xl font-semibold mb-5 mt-20'>¿Por qué Educat?</h1>
        <div className="flex justify-between max-sm:flex-col gap-6">
          <div>
            <RiSparklingLine className="text-[#D9D9D9] w-10 h-10"></RiSparklingLine>
            <h2 className='text-base items-center font-semibold'>Educat ofrece cursos de calidad impartidos por expertos</h2>
            <p className='text-sm'>Aprende de profesionales y expertos en diversos campos.
            Amplia variedad de cursos.
            Contenido actualizado, para asegurar que estés aprendiendo lo más nuevo.</p>
          </div>
          <div>
            <RiBookReadLine className="text-[#D9D9D9] w-10 h-10"></RiBookReadLine>
            <h2 className='text-base items-center font-semibold'>Flexibilidad y accesibilidad para tu aprendizaje:</h2>
            <p className='text-sm'>Accede a tus cursos en cualquier momento y desde cualquier lugar.
            Progresión del curso guardada automáticamente para que puedas continuar donde lo dejaste.</p>
          </div>
          <div>
            <RiGroup2Line className="text-[#D9D9D9] w-10 h-10"></RiGroup2Line>
            <h2 className='text-base items-center font-semibold'>Interacción y comunidad para un mejor aprendizaje:</h2>
            <p className='text-sm'>Comenta y discute lecciones con otros estudiantes para un aprendizaje colaborativo.
              Deja reseñas y calificaciones para ayudar a otros estudiantes a encontrar los mejores cursos.</p>
          </div>    

      </div>

      {/* rayita */}
      <div className="w-1/4 bg-details rounded-full h-[2px] mx-auto my-10"></div>


      </div>

      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center max-sm:text-xl md:text-2xl font-semibold mb-5 mt-20'>Más populares</h1>
      </div>

      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center max-sm:text-xl md:text-2xl font-semibold mb-5 mt-20'>Categorías</h1>
      </div>

      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center max-sm:text-xl md:text-2xl font-semibold mb-5 mt-20'>Nuestro equipo</h1>

      </div>


    </section>
  )
}
 
export default HomePage;