import { Button, Textarea } from "@tremor/react";
import { ICommentUser } from "../../interfaces/ICommentUser";
import { FormEvent, useEffect, useState } from "react";
import CommentService from "../../services/CommentService";
import Avatar from "../common/Avatar";
import { formatDate } from "../../utils/DateUtils";
import { RiStarFill, RiThumbUpLine } from "@remixicon/react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import AddRating from "./AddRating";

type IProps = {
  initReviews: ICommentUser[]
  total: number,
  courseId: number,
  rating: number
}

const LIMIT = 12

const ReviewList = ({ initReviews, total, courseId, rating }: IProps) => {
  const [isReviews, setReviews] = useState<ICommentUser[]>(initReviews)
  const [isPage, setPage] = useState<number>(1)
  const [isTotalPage] = useState<number>(Math.ceil(total / LIMIT))
  const [isLoading, setLoading] = useState(false)
  const [isLoadingAddReview, setLoadingAddReview] = useState(false)
  const [isTextReview, setTextReview] = useState('')
  const [isErrorText, setErroText] = useState(false)
  const [isScore, setScore] = useState(5)

  const handleAddReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = isTextReview.trim()
    if(!text) {
      setErroText(true)
      return toast.warning('No puedes dejar una reseña vacía')
    }

    try {
      setLoadingAddReview(true)
      await CommentService.createReview({courseId, text: isTextReview, score: isScore})
      toast.success('Reseña agregada correctamente');
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          return toast.error(error.response?.data.message);
        }

        return toast.error('Oops... Ocurrió un error, Inténtelo más tarde');
      }
    } finally {
      setLoadingAddReview(false)
      setErroText(false)
    }

  }

  useEffect(() => {
    if (isPage === 1) {
      return
    }

    const getReviews = async () => {
      try {
        setLoading(true)
        const { result } = await CommentService.getReviewsByCourse(courseId, isPage, LIMIT)
        setReviews([...isReviews, ...result])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPage])
  return (
    <div>
      <h2 className="font-semibold text-xl mb-1">Reseñas de los estudiantes</h2>
      <p className="mb-3 text-secundary-text">{rating} de puntuación | {total} reseñas</p>
      <form className="mb-6" onSubmit={handleAddReview}>
        <Textarea placeholder="Escribe tu reseña del curso" error={isErrorText && !isTextReview.trim()}
        rows={4} onValueChange={value => setTextReview(value)} value={isTextReview} />
        <div className="mt-2 flex justify-between">
          <AddRating defaultScore={isScore} onScoreChange={value => setScore(value)} />
          <Button className="focus:outline focus:outline-current" loading={isLoadingAddReview}>Enviar</Button>
        </div>
      </form>
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
      <Button className="focus:outline focus:outline-current" loading={isLoading} 
        disabled={isPage === isTotalPage} onClick={() => setPage(prev => prev + 1)}>Cargar más</Button>
    </div>
  );
}

export default ReviewList;