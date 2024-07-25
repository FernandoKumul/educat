import { Link, useParams } from "react-router-dom";
import { AccordionList, Button } from "@tremor/react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  RiCheckboxCircleLine, RiGlobalLine, RiGraduationCapFill,
  RiGroupFill, RiHeartFill, RiHeartLine, RiLoader4Line, RiTimeLine, RiVideoLine
} from "@remixicon/react";
import CourseService from "../services/CourseService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import CategoriesData from "../data/CategoriesData";
import { ICoursePublic } from "../interfaces/ICoursePublic";
import { ICommentUser } from "../interfaces/ICommentUser";
import AuthContext from "../contexts/AuthContext";
import CommentService from "../services/CommentService";
import UnitCard from "../components/course/UnitCard";
import BadgeDifficulty from "../components/course/BadgeDifficulty";
import Avatar from "../components/common/Avatar";
import PresentationVideo from "../components/course/PresentationVideo";
import Rating from "../components/common/Rating";
import { formatDate } from "../utils/DateUtils";
import { CurrencyFormat } from "../utils/CurrencyUtils";
import { getFormatTime } from "../utils/TimeUtils";
import ReviewList from "../components/Comment/ReviewList";
import CartService from "../services/CartService";
import WishlistService from "../services/WishlistService";
import CartContext from "../contexts/CartContext";
import ProgressBar from "../components/common/ProgressBar";

const CoursePage = () => {
  const { courseId } = useParams()
  const [isCourse, setCourse] = useState<null | ICoursePublic>(null)
  const [isTotalReviews, setTotalReviews] = useState<number>(0)
  const [isReviews, setReviews] = useState<ICommentUser[]>([])
  const [isWishlist, setWishlist] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isLoadingCart, setLoadingCart] = useState<boolean>(false)
  const dataFetch = useRef<boolean>(false)

  const { isUser } = useContext(AuthContext);
  const { getItems, isCartItems } = useContext(CartContext)

  useEffect(() => {
    const getCourse = async () => {
      dataFetch.current = true
      const courseIdInt = parseInt(courseId ?? '0')
      try {
        const dataCourse = await CourseService.getCoursePublic(courseIdInt)
        const { result, count } = await CommentService.getReviewsByCourse(courseIdInt, 1, 12)
        const data = await WishlistService.getUserWishlist()
        if(data.length !== 0) {
          const isWishlist = data.find(item => item.pkCourse === parseInt(courseId ?? '0'))
          if (isWishlist) {
            setWishlist(true)
          }
        }
        setReviews(result)
        setTotalReviews(count)
        dataCourse.rating = Math.round(dataCourse.rating * 100) / 100
        setCourse(dataCourse)
      } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
          if (error.response?.data.message) {
            return toast.error(error.response?.data.message);
          }

          return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
        }
      } finally {
        setLoading(false)
      }
    }

    if (!dataFetch.current) {
      getCourse()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleWishlist = async () => {
    if (!isUser) {
      toast.dismiss()
      return toast.info("Necesitas iniciar sesión para usar la lista de deseos")
    }
    handleStateWishlist()
    toast.dismiss()
    if (!isWishlist) {
      try {
        await WishlistService.createWishlistItem(parseInt(courseId ?? '0'))
        toast.success("Curso añadido a la lista de deseos")
      } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
          if (error.response?.data.message) {
            return toast.error(error.response?.data.message);
          }
          return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
        }
      }
    } else {
      try {
        await WishlistService.deleteWishlistItem(parseInt(courseId ?? '0'))
        toast.success("Curso eliminado de la lista de deseos")
      } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
          if (error.response?.data.message) {
            return toast.error(error.response?.data.message);
          }
          return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
        }
      }
    }
  }

  const handleStateWishlist = () => {
    setWishlist(!isWishlist)
  }

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <RiLoader4Line size={48} className="animate-spin" />
      </div>
    )
  }

  if (!isCourse) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-lg">Curso no encontrado</h1>
      </div>
    )
  }

  const languageText = (): string => {
    switch (isCourse.language) {
      case 'spanish':
        return 'Español'
      case 'english':
        return 'Inglés'
      default:
        return 'Sin idioma'
    }
  }

  const getNumbersLessons = () => {
    let countLessons = 0
    isCourse.units.forEach(unit => {
      countLessons += unit.lessons.length
    });
    return countLessons
  }

  const getNumbersLessonsCompleted = () => {
    let countLessons = 0
    isCourse.units.forEach(unit => {
      unit.lessons.forEach(lesson => {
        if (lesson.completed) {
          countLessons++
        }
      })
    });
    return countLessons
  }

  const getTimeByLessons = () => {
    let totalTime = 0
    isCourse.units.forEach(unit => {
      unit.lessons.forEach(lesson => totalTime += lesson.timeDuration)
    });
    return getFormatTime(totalTime)
  }

  const hoursByLessons = () => {
    let totalTime = 0
    isCourse.units.forEach(unit => {
      unit.lessons.forEach(lesson => totalTime += lesson.timeDuration)
    });

    const totalHours = Math.floor(totalTime / 1440)

    if (totalHours <= 0) return 'Menos de 0 horas de contenido'

    if (totalHours === 1) return '1 Hora de contenido'

    return `${totalHours} Horas de contenido`
  }

  const handleAddCart = async () => {
    if (!isUser) {
      return toast.info("Necesitas iniciar sesión para usar el carrito")
    }

    try {
      setLoadingCart(true)
      await CartService.createCartItem(parseInt(courseId ?? ''))
      toast.success("Artículo añadido al carrito")
      getItems()
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
      }
    } finally {
      setLoadingCart(false)
    }
  }

  const handleRefreshReviews = (rating: number, count: number) => {
    setTotalReviews(count)
    setCourse({ ...isCourse, rating })
  }

  return (
    <section>
      <header className="bg-header px-8 py-6 lg:flex lg:px-24 lg:py-10 lg:gap-4 xl:px-36">
        <div className="mb-6 lg:grow lg:mb-0">
          <h1 className="text-2xl font-semibold mb-2">{isCourse.title}</h1>
          <p className="text-secundary-text mb-4">{isCourse.summary}</p>
          <div className="lg:flex lg:gap-4 lg:items-center">
            <div className="flex gap-2 mb-3">
              <Rating score={isCourse.rating} />
              <p className="pt-[2px]">{isCourse.rating} ({isTotalReviews} Reseñas)</p>
            </div>
            <div className="flex gap-2 mb-3 text-[15px]">
              <RiGroupFill size={20} />
              <p>{isCourse.numberStudents} {isCourse.numberStudents === 1 ? 'Estudiante' : 'Estudiantes'}</p>
            </div>
          </div>
          <div className="flex gap-2 text-[15px] mb-3">
            <RiTimeLine size={20} />
            <p>Actualizado por última vez {formatDate(isCourse.updateDate)}</p>
          </div>
          <div className="flex gap-2 mb-3 items-center">
            <RiGlobalLine size={20} />
            <p>{languageText()}</p>
          </div>
          <div className="flex gap-2">
            <BadgeDifficulty value={isCourse.difficulty ?? ''} />
            <div className="bg-black/[0.3] rounded-full py-1 px-4 w-fit">
              {CategoriesData.find(item => item.id === isCourse.fkCategory)?.name}
            </div>
          </div>
        </div>
        {/* Info card shop */}
        <div className="lg:w-[300px] flex-shrink-0">
          <PresentationVideo className="mb-4" url={isCourse.videoPresentation!} />
          <div className="flex gap-2 items-center">
            <Avatar url={isCourse.instructor.avatarUrl} className="min-w-8" />
            <p>Creado por {isCourse.instructor.name + ' ' + isCourse.instructor.lastName}</p>
          </div>
          <div className="my-2 h-[1px] bg-[#787081]"></div>
          <h3 className="font-semibold text-xl mb-2">
            {CurrencyFormat(isCourse.price ?? 0)} MXN
          </h3>
          {
            isCourse.purchased
              ?

              <Link to={`/course/${isCourse.pkCourse}/lesson?number=1`}>
                <Button className="w-full"><span className="text-base">Continuar</span></Button>
              </Link>
              :
              <div className="flex gap-3">
                {isCartItems.find(item => item.fkCourse === parseInt(courseId ?? '0'))
                  ?
                  <Button className="grow" disabled={true}>
                    <span className="text-base">Curso en el carrito</span>
                  </Button>
                  :
                  <Button className="grow" loading={isLoadingCart} onClick={handleAddCart}
                    disabled={isUser?.pkUser === isCourse.instructor.pkUser}>
                    <span className="text-base">Añadir al carrito</span>
                  </Button>
                }
                <div onClick={handleWishlist} className="size-11 flex items-center justify-center rounded-full bg-[#50475C] hover:scale-110 transition-transform cursor-pointer hover:bg-[#645971] active:scale-95">
                  {isWishlist ? <RiHeartFill size={30} className="text-tremor-brand" /> : <RiHeartLine size={30} className="text-secundary-text" />}
                </div>
              </div>
          }
        </div>
      </header>
      {/* Informacion detallada del curso */}
      <div className="px-8 py-6 lg:flex lg:px-24 lg:py-10 lg:gap-4 xl:px-36">
        <div className="mb-6 lg:grow lg:mb-0 lg:min-w-0">
          <h2 className="font-semibold text-xl mb-1">Temario</h2>
          <p className="text-secundary-text mb-2">
            {`${isCourse.units.length} ${isCourse.units.length === 1 ? 'Unidad' : 'Unidades'} | `}
            {`${getNumbersLessons()} ${getNumbersLessons() === 1 ? 'Lección' : 'Lecciones'} | `}
            {`${getTimeByLessons()}`}
          </p>
          <AccordionList>
            {isCourse.units.map(item => (
              <UnitCard purchased={isCourse.purchased} unit={item} key={item.pkUnit} />
            ))}
          </AccordionList>

          <h2 className="font-semibold text-xl mb-1">Requisitos</h2>
          <p className="text-secundary-text whitespace-pre-line mb-6">{isCourse.requeriments}</p>
          <h2 className="font-semibold text-xl mb-1">Descripción</h2>
          <p className="text-secundary-text whitespace-pre-line">{isCourse.description}</p>
        </div>
        <div className="lg:w-[300px] flex-shrink-0">
          {isCourse.purchased &&
            <article>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Progreso</h2>
                <span>{(getNumbersLessonsCompleted() * 100 / getNumbersLessons()).toFixed(2)}%</span>
              </div>
              <ProgressBar className="mb-2" value={getNumbersLessonsCompleted() * 100 / getNumbersLessons()} />
              <div className="flex mb-4 justify-between text-secundary-text">
                <h2>Tareas completadas</h2>
                <span>{getNumbersLessonsCompleted()}/{getNumbersLessons()}</span>
              </div>
            </article>
          }
          <h2 className="font-semibold text-xl mb-1">Incluye</h2>
          <div className="flex gap-y-4 flex-col mb-4">
            <div className="flex gap-3">
              <RiVideoLine /> {hoursByLessons()}
            </div>
            <div className="flex gap-3">
              <RiGraduationCapFill /> {`${getNumbersLessons()} ${getNumbersLessons() === 1 ? 'Lección' : 'Lecciones'}  `}
            </div>
          </div>
          <h2 className="font-semibold text-xl mb-1">Aprenderás</h2>
          <div className="flex flex-col gap-y-3">
            {isCourse.learnText?.split(',').map((text, index) => (
              <div key={index} className="flex gap-2">
                <RiCheckboxCircleLine />
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="px-8 lg:px-24  xl:px-36 mb-10">
        <ReviewList initReviews={isReviews} rating={isCourse.rating} purchased={isCourse.purchased}
          onRefresh={(rating, count) => handleRefreshReviews(rating, count)}
          total={isTotalReviews} courseId={parseInt(courseId ?? '0')} />
      </section>
    </section>
  );
}

export default CoursePage;