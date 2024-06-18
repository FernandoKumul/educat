import { RiArrowRightLine, RiBookReadLine, RiGroup2Line, RiPencilRulerLine, RiSparklingLine, RiUserFill } from "@remixicon/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardCourse from "../components/common/CardCourse";

const HomePage = () => {

  const sliderSettings = {
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    focusOnSelect: true,
    infinite: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

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

{/* ¿Por qué educat? */}
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

{/* Más populares */}
      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center text-xl md:text-2xl font-semibold mb-5 mt-20'>Más populares</h1>
        {/* Slider */}
        <div>
          <Slider className="flex justify-center" {...sliderSettings}>
            <div>
              <CardCourse title="Título del curso 1" instructor="Nombre instructos" price="$150MX" score={4.5}></CardCourse>
            </div>
            <div>
              <CardCourse title="Título del curso 2" instructor="Nombre instructos" price="$150MX" score={4.5}></CardCourse>

            </div>
            <div>
              <CardCourse title="Título del curso 3" instructor="Nombre instructos" price="$150MX" score={4.5}></CardCourse>

            </div>
            <div>
              <CardCourse title="Título del curso 4" instructor="Nombre instructos" price="$150MX" score={4.5}></CardCourse>

            </div>
            <div>
              <CardCourse title="Título del curso 5" instructor="Nombre instructos" price="$150MX" score={4.5}></CardCourse>

            </div>
            <div>
              <CardCourse title="Título del curso agivuhaeviaernacfahio" instructor="Nombre instructos" price="$150MX" score={4.5}></CardCourse>

            </div>
          </Slider>
        </div>
      </div>
{/* Categorías */}
      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center text-xl md:text-2xl font-semibold mb-5 mt-20'>Categorías</h1>
        
        <div className="flex flex-wrap flex-row  gap-5">

          <div className="flex justify-between bg-[#312B39] w-1/3 p-3 rounded-sm">
            <div className="flex">
              <h1 className="white text-lg mr-5">Diseño</h1>
              <RiArrowRightLine></RiArrowRightLine> 
            </div>
              <RiPencilRulerLine className="size-7"></RiPencilRulerLine>
          </div>

          <div className="flex justify-between bg-[#312B39] w-1/3 p-3 rounded-sm">
            <div className="flex">
              <h1 className="white text-lg mr-5">Diseño</h1>
              <RiArrowRightLine></RiArrowRightLine> 
            </div>
              <RiPencilRulerLine className="size-7"></RiPencilRulerLine>
          </div>
          
          <div className="flex justify-between bg-[#312B39] w-1/3 p-3 rounded-sm">
            <div className="flex">
              <h1 className="white text-lg mr-5">Diseño</h1>
              <RiArrowRightLine></RiArrowRightLine> 
            </div>
              <RiPencilRulerLine className="size-7"></RiPencilRulerLine>
          </div>

          <div className="flex justify-between bg-[#312B39] w-1/3 p-3 rounded-sm">
            <div className="flex">
              <h1 className="white text-lg mr-5">Diseño</h1>
              <RiArrowRightLine></RiArrowRightLine> 
            </div>
              <RiPencilRulerLine className="size-7"></RiPencilRulerLine>
          </div>

          <div className="flex justify-between bg-[#312B39] w-1/3 p-3 rounded-sm">
            <div className="flex">
              <h1 className="white text-lg mr-5">Diseño</h1>
              <RiArrowRightLine></RiArrowRightLine> 
            </div>
              <RiPencilRulerLine className="size-7"></RiPencilRulerLine>
          </div>

          <div className="flex justify-between bg-[#312B39] w-1/3 p-3 rounded-sm">
            <div className="flex">
              <h1 className="white text-lg mr-5">Diseño</h1>
              <RiArrowRightLine></RiArrowRightLine> 
            </div>
              <RiPencilRulerLine className="size-7"></RiPencilRulerLine>
          </div>

          <div className="flex justify-between bg-[#312B39] w-1/3 p-3 rounded-sm">
            <div className="flex">
              <h1 className="white text-lg mr-5">Diseño</h1>
              <RiArrowRightLine></RiArrowRightLine> 
            </div>
              <RiPencilRulerLine className="size-7"></RiPencilRulerLine>
          </div>

          <div className="flex justify-between bg-[#312B39] w-1/3 p-3 rounded-sm">
            <div className="flex">
              <h1 className="white text-lg mr-5">Diseño</h1>
              <RiArrowRightLine></RiArrowRightLine> 
            </div>
              <RiPencilRulerLine className="size-7"></RiPencilRulerLine>
          </div>

        </div>
      </div>

{/* Nuestro Equipo */}
      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center text-xl md:text-2xl font-semibold mb-5 mt-20'>Nuestro equipo</h1>
        
        <div className="flex mt-5 flex-wrap flex-row justify-between">
          <div>
            <div className="rounded-full bg-gray-400 p-3 flex justify-center">
              <RiUserFill className="size-40 white"/>
            </div>
            <h1 className="flex justify-center">Kumul Herrera Jose</h1>
            <h1 className="flex justify-center">Fernando</h1>
          </div>
          <div>
            <div className="rounded-full bg-gray-400 p-3 flex justify-center">
              <RiUserFill className="size-40 white"/>
            </div>
            <h1 className="flex justify-center">Gómez Flores Luis</h1>
            <h1 className="flex justify-center">Enrique</h1>
          </div>
          <div>
            <div className="rounded-full bg-gray-400 p-3 flex justify-center">
              <RiUserFill className="size-40 white"/>
            </div>
            <h1 className="flex justify-center">Un Hernández Noemi</h1>
            <h1 className="flex justify-center">Elizabeth</h1>
          </div>
          <div>
            <div className="rounded-full bg-gray-400 p-3 flex justify-center">
              <RiUserFill className="size-40 white"/>
            </div>
            <h1 className="flex justify-center">Morales García Ana</h1>
            <h1 className="flex justify-center">Teresa</h1>
          </div>
        </div>
      </div>


    </section>
  )
}
 
export default HomePage;