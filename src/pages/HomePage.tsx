import { RemixiconComponentType, RiBarChart2Fill, RiBookReadLine, RiCameraFill, RiCpuLine, RiGroup2Line, RiLoader4Line, RiMacLine, RiMarkupFill, RiMusic2Fill, RiPencilRulerLine, RiScissorsFill, RiSparklingLine, RiUser5Line, RiUserFill } from "@remixicon/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import CardCourse from "../components/common/CardCourse";
import { useEffect, useState } from "react";
import { ICourseSearch } from "../interfaces/ICourseSearch";
import CourseService from "../services/CourseService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ICategory {
  name: string,
  id: number,
  icon: RemixiconComponentType
}

const CategoriesData: ICategory[] = [
  { id: 1, name: 'Diseño' , icon: RiMarkupFill},
  { id: 2, name: 'Informática y software' , icon: RiMacLine},
  { id: 3, name: 'Fotografía' , icon: RiCameraFill},
  { id: 4, name: 'Desarrollo' , icon: RiCpuLine},
  { id: 5, name: 'Desarrollo personal' , icon: RiUser5Line},
  { id: 6, name: 'Música' , icon: RiMusic2Fill},
  { id: 7, name: 'Marketing' , icon: RiPencilRulerLine},
  { id: 8, name: 'Negocios' , icon: RiBarChart2Fill},
  { id: 8, name: 'Manualidades' , icon: RiScissorsFill},
];

const HomePage = () => {
  const [isPopularCourses, setPopularCourses] = useState<ICourseSearch[]>([])
  const [isLoadingPopular, setLoadingPopular] = useState(true)

  const sliderSettings: Settings = {
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    focusOnSelect: true,
    infinite: true,
    swipeToSlide: true,
    draggable: false,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
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

  useEffect(() => {
    const getPopularCourses = async () => {
      try {
        setLoadingPopular(true)
        const courses = await CourseService.getCoursePopular(8)
        setPopularCourses(courses)
      } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
          if (error.response?.data.message) {
            return toast.error(error.response?.data.message);
          }
  
          return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
        }
      } finally {
        setLoadingPopular(false)
      }
    }

    getPopularCourses()
  }, [])

  return (
    <section>

      <div className="bg-[rgb(49,43,57)] flex flex-col py-20 px-12 lg:h-[70vh] relative overflow-hidden">
        <div className="my-auto lg:ml-9 lg:w-1/3">
          <h1 className='
          text-3xl 
          font-bold
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

        <img src="./src/assets/computers.png" alt="computers" className="m-auto absolute bottom-0 right-0 lg:top-0 opacity-10 lg:opacity-85 lg:w-1/2"/>
      </div>
      


{/* ¿Por qué educat? */}
      <div className='px-14 mt-8' >
        <h1 className='text-details flex justify-center text-xl md:text-2xl font-semibold mb-5 '>¿Por qué Educat?</h1>
        <div className="flex justify-between max-sm:flex-col gap-6">
          <div>
            <RiSparklingLine className="text-[#D9D9D9] w-10 h-10 mb-3"></RiSparklingLine>
            <h2 className='text-base items-center font-semibold mb-3'>Educat ofrece cursos de calidad impartidos por expertos</h2>
            <p className='text-sm font-light'>Aprende de profesionales y expertos en diversos campos.
            Amplia variedad de cursos.
            Contenido actualizado, para asegurar que estés aprendiendo lo más nuevo.</p>
          </div>
          <div>
            <RiBookReadLine className="text-[#D9D9D9] w-10 h-10 mb-3"></RiBookReadLine>
            <h2 className='text-base items-center font-semibold mb-3'>Flexibilidad y accesibilidad para tu aprendizaje</h2>
            <p className='text-sm font-light'>Accede a tus cursos en cualquier momento y desde cualquier lugar.
            Progresión del curso guardada automáticamente para que puedas continuar donde lo dejaste.</p>
          </div>
          <div>
            <RiGroup2Line className="text-[#D9D9D9] w-10 h-10 mb-3"></RiGroup2Line>
            <h2 className='text-base items-center font-semibold mb-3'>Interacción y comunidad para un mejor aprendizaje</h2>
            <p className='text-sm font-light'>Comenta y discute lecciones con otros estudiantes para un aprendizaje colaborativo.
              Deja reseñas y calificaciones para ayudar a otros estudiantes a encontrar los mejores cursos.</p>
          </div>    

        </div>

      </div>

{/* rayita */}
      <div className="w-1/4 bg-details rounded-full h-[2px] mx-auto my-11"></div>


{/* Más populares */}
      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center text-xl md:text-2xl font-semibold mb-8'>Más populares</h1>
        {/* Slider */}
        <div>
          {isLoadingPopular
          ?
          <div className="flex-grow flex items-center justify-center h-48">
            <RiLoader4Line size={48} className="animate-spin" />
          </div>
          :
            isPopularCourses.length === 0
            ?
            <div className="flex-grow flex items-center justify-center h-48">
              <h2 className="text-xl font-medium">Por el momento no hay cursos populares.</h2>
            </div>
            :
            <Slider className="flex flex-auto m-auto" {...sliderSettings}>
              {isPopularCourses.map(item => (
                <CardCourse
                  className="px-4"
                  key={item.pkCourse} image={item.cover} id={item.pkCourse} title={item.title}
                  instructor={item.instructorName + " " + item.instructorLastName} price={item.price} score={item.rating} />
              ))}
            </Slider>
          }
          
        </div>
      </div>

{/* rayita */}
      <div className="w-1/4 bg-details rounded-full h-[2px] mx-auto my-11"></div>

{/* Categorías */}
      <div className='px-14 my-5'>
        <h1 className='text-details flex justify-center text-xl md:text-2xl font-semibold mb-5'>Categorías</h1>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {CategoriesData.map(category => (            
            <div key={category.id} className="flex justify-between items-center bg-[#312B39] px-5 h-20 rounded-sm">
              <div className="flex">
                <h1 className="white text-base lg:text-lg mr-5">{category.name}</h1>
                {/* <RiArrowRightLine className="flex-shrink-0"></RiArrowRightLine>  */}
              </div>
              <category.icon className="size-7 flex-shrink-0" />
            </div>
          ))}


        </div>
      </div>

{/* rayita */}
      <div className="w-1/4 bg-details rounded-full h-[2px] mx-auto my-11"></div>

{/* Nuestro Equipo */}
      <div className='px-14 my-10'>
        <h1 className='text-details flex justify-center text-xl md:text-2xl font-semibold mb-5'>Nuestro equipo</h1>
        
        <div className="flex mt-5 flex-wrap flex-row justify-between max-sm:flex max-sm:justify-center max-sm:">
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