import { Button } from "@tremor/react";
import { ICommentUser } from "../../interfaces/ICommentUser";
import {useEffect, useState } from "react";
import CommentService from "../../services/CommentService";
import Avatar from "../common/Avatar";
import { formatDate } from "../../utils/DateUtils";
import { RiLoader4Line, RiStarFill, RiThumbUpLine } from "@remixicon/react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import UserReviewEditor from "./UserReviewEditor";

type IProps = {
  initReviews: ICommentUser[]
  total: number,
  courseId: number,
  rating: number,
  purchased: boolean,
  onRefresh: (rating: number, count: number) => void
}

const LIMIT = 12

const ReviewList = ({ initReviews, total, courseId, rating, purchased, onRefresh }: IProps) => {
  const [isReviews, setReviews] = useState<ICommentUser[]>(initReviews)
  const [isPage, setPage] = useState<number>(1)
  const [isTotalPage] = useState<number>(Math.ceil(total / LIMIT))
  const [isLoadingMore, setLoadingMore] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isReviewByUser, setReviewByUser] = useState<null | ICommentUser>(null)

  const handleRefreshReviews = async () => {
    try {
      setLoading(true)
      const { result, count, rating } = await CommentService.getReviewsByCourse(courseId, 1, LIMIT)
      setReviews(result)
      setPage(1)
      const reviewByUser = await CommentService.GetCourseReviewByUser(courseId)
      setReviewByUser(reviewByUser)
      const ratingRound = Math.round(rating * 100) / 100
      onRefresh(count, ratingRound)
    } catch (error) {
      console.log(error)
      setReviews([])
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
      }
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
  }

  const handleNextPage = async (page: number) => {
    if (page === 1) {
      return
    }

    try {
      setLoadingMore(true)
      const { result } = await CommentService.getReviewsByCourse(courseId, page, LIMIT)
      setReviews([...isReviews, ...result])
      setPage(page)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
      }
    } finally {
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    const getReviewUser = async () => {
      try {
        const reviewByUser = await CommentService.GetCourseReviewByUser(courseId)
        setReviewByUser(reviewByUser)
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

    getReviewUser()
    //Revisar que no se repita
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(isLoading) {
    return (
      <div className="min-h-[50vh] flex-grow flex items-center justify-center">
        <RiLoader4Line size={48} className="animate-spin" />
        <h1>Cargando reseñas...</h1>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-semibold text-xl mb-1">Reseñas de los estudiantes</h2>
      <p className="mb-3 text-secundary-text">{rating} de puntuación | {total} reseñas</p>
      <UserReviewEditor courseId={courseId} purchased={purchased} reviewByUser={isReviewByUser} onRefreshReviews={handleRefreshReviews} />
      <div className="grid align-top mb-4 gap-4 lg:grid-cols-3 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
        {isReviews.map(review => (
          <article key={review.pkComment} className="bg-header rounded-md p-4 min-h-64 flex flex-col gap-2 lg:px-5">
            <header className="flex gap-2">
              <Avatar className="size-10" url={review.user.avatarUrl} />
              <div className="flex-grow min-w-0">
                <p className="overflow-hidden text-nowrap text-ellipsis">{review.user.name + " " + review.user.lastName}</p>
                <p className="text-sm text-gray-400">{formatDate(review.cretionDate)}</p>
              </div>
            </header>
            <div className="flex-grow">
              <p className="text-secundary-text">{review.text}</p>
            </div>
            <footer className="flex justify-between items-center">
              <div className="bg-[#50475C] rounded-full items-center py-1 cursor-pointer px-4 flex gap-2 select-none">
                <RiThumbUpLine size={20} />
                {review.likes}
              </div>
              <p>
                {review.score}
                <RiStarFill size={20} className="text-yellow-300 inline ml-1 mb-1" />
              </p>
            </footer>
          </article>
        ))}
      </div>
      <Button className="focus:outline focus:outline-current" loading={isLoadingMore} 
        disabled={isPage === isTotalPage} onClick={() => handleNextPage(isPage + 1)}>Cargar más</Button>
    </div>
  );
}

export default ReviewList;